import { create } from "zustand";
import { produce } from "immer";
import {
  teamMembers,
  availableRoles,
  Department,
  allDepartments,
} from "../data/careersData.tsx";

export type ActiveTab = "openings" | "orgchart" | "buildteam";
export type ViewMode = "hierarchy" | "department";

export interface SelectedTeamMember {
  id: string; // Unique ID for the selected item instance
  roleId: string; // ID of the role from availableRoles
  count: number;
}

export interface CareersState {
  // --- General State ---
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // --- Org Chart State ---
  hoveredMemberId: string | null;
  selectedMemberId: string | null;
  expandedDepartments: Department[];
  viewMode: ViewMode;
  searchQuery: string;
  zoomLevel: number;
  isDragging: boolean;

  setHoveredMemberId: (id: string | null) => void;
  setSelectedMemberId: (id: string | null) => void;
  toggleDepartment: (department: Department) => void;
  expandDepartment: (department: Department) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setZoomLevel: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // --- Team Builder State ---
  selectedTeam: SelectedTeamMember[];
  teamDuration: number; // in months
  selectedDepartmentFilter: Department | null;

  setSelectedTeam: (team: SelectedTeamMember[]) => void;
  addToTeam: (roleId: string) => void;
  removeFromTeam: (id: string) => void;
  updateTeamMemberCount: (id: string, count: number) => void;
  setTeamDuration: (duration: number) => void;
  setTeamDepartmentFilter: (department: Department | null) => void;
  clearTeam: () => void;

  // --- Computed/Derived State (Selectors) ---
  getFilteredMembers: () => typeof teamMembers;
  getFilteredRoles: () => typeof availableRoles;
  getMonthlyTeamCost: () => number;
  getTotalTeamCost: () => number;
}

export const useCareersStore = create<CareersState>((set, get) => ({
  // --- Initial State ---
  activeTab: "buildteam",
  hoveredMemberId: null,
  selectedMemberId: null,
  expandedDepartments: [...allDepartments],
  viewMode: "hierarchy",
  searchQuery: "",
  zoomLevel: 1,
  isDragging: false,

  selectedTeam: [],
  teamDuration: 3,
  selectedDepartmentFilter: null,

  // --- Actions ---
  setActiveTab: (tab) => set({ activeTab: tab }),

  setHoveredMemberId: (id) => set({ hoveredMemberId: id }),

  setSelectedMemberId: (id) => {
    // Get current state to check if we need to expand a department
    const currentState = get();

    if (!id) {
      return set({ selectedMemberId: null });
    }

    const member = teamMembers.find((m) => m.id === id);
    if (
      member &&
      !currentState.expandedDepartments.includes(member.department)
    ) {
      // If member exists and department not expanded, expand it
      return set({
        selectedMemberId: id,
        expandedDepartments: [
          ...currentState.expandedDepartments,
          member.department,
        ],
      });
    }

    // Otherwise just update the selectedMemberId
    return set({ selectedMemberId: id });
  },

  toggleDepartment: (department) => {
    const { expandedDepartments } = get();
    const index = expandedDepartments.indexOf(department);

    if (index !== -1) {
      // Department is currently expanded, remove it
      const newDepartments = [...expandedDepartments];
      newDepartments.splice(index, 1);
      set({ expandedDepartments: newDepartments });
    } else {
      // Department is not expanded, add it
      set({ expandedDepartments: [...expandedDepartments, department] });
    }
  },

  expandDepartment: (department) => {
    const { expandedDepartments } = get();
    if (!expandedDepartments.includes(department)) {
      set({ expandedDepartments: [...expandedDepartments, department] });
    }
  },

  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setZoomLevel: (level) => set({ zoomLevel: level }),

  zoomIn: () =>
    set((state) => ({
      zoomLevel: Math.min(state.zoomLevel + 0.1, 1.5),
    })),

  zoomOut: () =>
    set((state) => ({
      zoomLevel: Math.max(state.zoomLevel - 0.1, 0.6),
    })),

  resetZoom: () => set({ zoomLevel: 1 }),

  setSelectedTeam: (team) => set({ selectedTeam: team }),

  addToTeam: (roleId) => {
    const newId = `team-${Date.now()}-${roleId}`;
    const newMember = { id: newId, roleId, count: 1 };

    set((state) => ({
      selectedTeam: [...state.selectedTeam, newMember],
    }));
  },

  removeFromTeam: (id) => {
    set((state) => ({
      selectedTeam: state.selectedTeam.filter((item) => item.id !== id),
    }));
  },

  updateTeamMemberCount: (id, count) => {
    if (count < 1) {
      // Remove the item if count is less than 1
      set((state) => ({
        selectedTeam: state.selectedTeam.filter((item) => item.id !== id),
      }));
    } else {
      // Update the count
      set((state) => ({
        selectedTeam: state.selectedTeam.map((item) =>
          item.id === id ? { ...item, count } : item
        ),
      }));
    }
  },

  setTeamDuration: (duration) => set({ teamDuration: duration }),
  setTeamDepartmentFilter: (department) =>
    set({ selectedDepartmentFilter: department }),
  clearTeam: () => set({ selectedTeam: [] }),

  // --- Selectors ---
  getFilteredMembers: () => {
    const { searchQuery } = get();
    if (!searchQuery) return teamMembers;

    const lowerQuery = searchQuery.toLowerCase();
    return teamMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(lowerQuery) ||
        m.role.toLowerCase().includes(lowerQuery) ||
        (m.skills &&
          m.skills.some((skill) => skill.toLowerCase().includes(lowerQuery)))
    );
  },

  getFilteredRoles: () => {
    const { selectedDepartmentFilter } = get();
    if (!selectedDepartmentFilter) return availableRoles;

    return availableRoles.filter(
      (role) => role.department === selectedDepartmentFilter
    );
  },

  getMonthlyTeamCost: () => {
    const { selectedTeam } = get();
    return selectedTeam.reduce((total, item) => {
      const role = availableRoles.find((role) => role.id === item.roleId);
      if (!role) return total;
      return total + role.monthlyCost * item.count;
    }, 0);
  },

  getTotalTeamCost: () => {
    const { teamDuration } = get();
    return get().getMonthlyTeamCost() * teamDuration;
  },
}));
