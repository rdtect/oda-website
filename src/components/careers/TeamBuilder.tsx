import React, { useCallback } from "react";
import { useCareersStore } from "./store/careersStore";
import {
  departmentColors,
  departmentIcons,
  Department,
} from "./data/careersData.tsx";
import { Users, Clock, DollarSign, PlusCircle } from "lucide-react";
import TeamBuilderControls from "./TeamBuilderControls";
import TeamBuilderSummary from "./TeamBuilderSummary";
import AvailableRoleCard from "./AvailableRoleCard";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

// Move SummaryDropzone to a separate component for clarity
const SummaryDropzone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "team-summary-dropzone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`lg:col-span-1 transition-colors relative ${
        isOver ? "bg-indigo-900/10" : ""
      }`}
    >
      {isOver && (
        <div className="absolute inset-0 bg-indigo-500/10 border-2 border-dashed border-indigo-400 rounded-lg pointer-events-none flex items-center justify-center text-indigo-300">
          <p>Drop here to add</p>
        </div>
      )}
      <TeamBuilderSummary />
    </div>
  );
};

// Create a separate component for the Available Roles panel
const AvailableRolesPanel = ({ roles, onAddRole }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
        <h3 className="text-xl mb-4 flex items-center">
          <Users className="mr-2" />
          Available Roles
        </h3>

        {/* Department filters */}
        <TeamBuilderControls />

        {/* Roles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.length === 0 ? (
            <p className="md:col-span-2 text-center text-gray-500 py-8">
              No roles found matching the selected department.
            </p>
          ) : (
            roles.map((role) => (
              <AvailableRoleCard key={role.id} role={role} onAdd={onAddRole} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const TeamBuilder = () => {
  // Get necessary state and actions from the store
  const getFilteredRoles = useCareersStore((state) => state.getFilteredRoles);
  const addToTeam = useCareersStore((state) => state.addToTeam);

  const filteredRoles = getFilteredRoles();

  // Use useCallback to memoize the handler functions
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { over, active } = event;

      // Check if dropped over the summary dropzone
      if (over && over.id === "team-summary-dropzone") {
        const droppedRoleId = String(active.id);
        addToTeam(droppedRoleId);
      }
    },
    [addToTeam]
  );

  const handleAddRole = useCallback(
    (roleId: string) => {
      addToTeam(roleId);
    },
    [addToTeam]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="build-team-container animate-fadeIn">
        <div className="mb-8">
          <h2 className="text-2xl font-light mb-4">Build Your Custom Team</h2>
          <p className="text-gray-400 max-w-3xl">
            Select roles from the list below, click 'Add to Team' or drag them
            to the summary panel on the right to build your project team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Available Roles Panel (Left) */}
          <AvailableRolesPanel
            roles={filteredRoles}
            onAddRole={handleAddRole}
          />

          {/* Selected Team Panel (Right) */}
          <SummaryDropzone />
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    </DndContext>
  );
};

export default TeamBuilder;
