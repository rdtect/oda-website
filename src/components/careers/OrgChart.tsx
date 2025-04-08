import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useCareersStore, CareersState, ViewMode } from "./store/careersStore";
import {
  teamMembers,
  departmentColors,
  departmentIcons,
  getChildrenNodes,
  getNodesByLevel,
  Department,
  allDepartments,
} from "./data/careersData.tsx";
import OrgChartControls from "./OrgChartControls";
import MemberDetailCard from "./MemberDetailCard";
import styles from "./OrgChart.module.css"; // Import CSS module

interface NodeCardProps {
  member: (typeof teamMembers)[0];
  isHovered: boolean;
  isSelected: boolean;
  isExpanded?: boolean; // For department head nodes
  cardType: "executive" | "cLevel" | "director" | "teamMember" | "flatCard";
  onClick: (id: string) => void;
  onHover: (id: string | null) => void;
  onExpandToggle?: (department: Department) => void; // For department head nodes
}

// --- Reusable Node Card Component ---
const NodeCard: React.FC<NodeCardProps> = React.memo(
  ({
    member,
    isHovered,
    isSelected,
    isExpanded,
    cardType,
    onClick,
    onHover,
    onExpandToggle,
  }) => {
    const cardClasses = [
      styles.nodeCard,
      styles[cardType], // Apply type-specific style
      isHovered ? styles.active : "",
      isSelected ? styles.selected : "",
      isExpanded ? styles.expanded : "", // Used for C-Level expand state
      styles.animateFadeInNode, // Apply fade-in animation
    ].join(" ");

    const directReportsCount = getChildrenNodes(member.id).length;
    const showTeamSize = cardType !== "flatCard" && cardType !== "teamMember"; // Only show count for managers/directors etc.

    const handleCardClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering clicks on parent elements
      onClick(member.id);
    };

    const handleExpandClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when clicking expand toggle
      if (onExpandToggle) {
        onExpandToggle(member.department);
      }
    };

    return (
      <div
        className={cardClasses}
        onMouseEnter={() => onHover(member.id)}
        onMouseLeave={() => onHover(null)}
        onClick={handleCardClick}
        style={{
          // Apply dynamic selected shadow with department color
          boxShadow: isSelected
            ? `0 0 0 2px ${
                departmentColors[member.department]
              }, 0 10px 25px rgba(0,0,0,0.3)`
            : "",
        }}
      >
        <div
          className={`${styles.avatar} ${
            cardType === "teamMember" || cardType === "flatCard"
              ? styles.small
              : ""
          }`}
          style={{
            backgroundColor: departmentColors[member.department],
            opacity: isSelected ? 1 : 0.9, // Slightly more opaque when selected
          }}
        >
          <div className={styles.initials}>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{member.name}</div>
          <div className={styles.role}>{member.role}</div>
          {cardType === "flatCard" && member.skills && (
            <div className={styles.skillsList}>
              {member.skills.slice(0, 2).map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        {showTeamSize && directReportsCount > 0 && (
          <div
            className={styles.teamSize}
            onClick={handleExpandClick}
            title="Toggle Department Members"
          >
            <span>{directReportsCount}</span>
          </div>
        )}
      </div>
    );
  }
);

// --- Main Org Chart Component ---
const OrgChart = () => {
  // Get state from store using individual selectors for better performance
  const viewMode = useCareersStore((state) => state.viewMode);
  const hoveredMemberId = useCareersStore((state) => state.hoveredMemberId);
  const selectedMemberId = useCareersStore((state) => state.selectedMemberId);
  const expandedDepartments = useCareersStore(
    (state) => state.expandedDepartments
  );
  const zoomLevel = useCareersStore((state) => state.zoomLevel);
  const searchQuery = useCareersStore((state) => state.searchQuery); // Get searchQuery from store
  const setHoveredMemberId = useCareersStore(
    (state) => state.setHoveredMemberId
  );
  const setSelectedMemberId = useCareersStore(
    (state) => state.setSelectedMemberId
  );
  const toggleDepartment = useCareersStore((state) => state.toggleDepartment);
  const getFilteredMembers = useCareersStore(
    (state) => state.getFilteredMembers
  );

  // Calculate filteredMembers using useMemo based on searchQuery
  const filteredMembers = useMemo(() => {
    if (!searchQuery) return teamMembers;
    const lowerQuery = searchQuery.toLowerCase();
    return teamMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(lowerQuery) ||
        m.role.toLowerCase().includes(lowerQuery) ||
        (m.skills &&
          m.skills.some((skill) => skill.toLowerCase().includes(lowerQuery)))
    );
  }, [searchQuery]); // Dependency is only searchQuery

  // Local state for drag/pan
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInnerContainerRef = useRef<HTMLDivElement>(null);

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chartInnerContainerRef.current) {
      if ((e.target as HTMLElement).closest("button, a")) {
        return;
      }
      setIsDragging(true);
      setStartPos({
        x: e.clientX - translate.x,
        y: e.clientY - translate.y,
      });
      chartInnerContainerRef.current.style.transition = "none";
    }
  };

  const handleMouseUp = () => {
    if (isDragging && chartInnerContainerRef.current) {
      setIsDragging(false);
      chartInnerContainerRef.current.style.transition =
        "transform 0.15s ease-out";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !chartInnerContainerRef.current) return;
    e.preventDefault();
    setTranslate({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp(); // End drag if mouse leaves container
    }
  };

  // Reset pan on view mode change
  useEffect(() => {
    setTranslate({ x: 0, y: 0 });
  }, [viewMode]);

  // isMemberVisible can now be a simple check or a stable useCallback
  const isMemberVisible = useCallback(
    (memberId: string) => {
      if (!searchQuery) return true; // No filter applied
      // Check against the memoized filteredMembers
      return filteredMembers.some((m) => m.id === memberId);
    },
    [searchQuery, filteredMembers]
  ); // Depends on stable searchQuery and memoized filteredMembers

  // --- Render Functions for Hierarchy View ---
  const renderHierarchyLevel = (level: number) => {
    const members = getNodesByLevel(level).filter((m) => isMemberVisible(m.id));
    if (members.length === 0) return null;

    return (
      <div className={styles.level}>
        <div className={`grid grid-cols-${Math.min(members.length, 3)} gap-6`}>
          {members.map((member) => (
            <NodeCard
              key={member.id}
              member={member}
              isHovered={hoveredMemberId === member.id}
              isSelected={selectedMemberId === member.id}
              isExpanded={expandedDepartments.includes(member.department)}
              cardType={level === 1 ? "executive" : "cLevel"}
              onClick={setSelectedMemberId}
              onHover={setHoveredMemberId}
              onExpandToggle={toggleDepartment}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDepartments = () => {
    const departmentHeads = getNodesByLevel(2)
      .filter((head) => expandedDepartments.includes(head.department))
      .filter(
        (head) =>
          isMemberVisible(head.id) ||
          getChildrenNodes(head.id).some((child) => isMemberVisible(child.id))
      ); // Show dept if head or any child is visible

    if (departmentHeads.length === 0) return null;

    return (
      <div className={styles.departmentsContainer}>
        {departmentHeads.map((deptHead) => (
          <div
            key={deptHead.id}
            id={`department-section-${deptHead.department}`} // For aria-controls
            className={`${styles.department} ${styles.expanded}`}
            style={{
              borderLeft: `3px solid ${departmentColors[deptHead.department]}`,
            }}
          >
            <div
              className={styles.departmentName}
              style={{ color: departmentColors[deptHead.department] }}
            >
              <span className="mr-2">
                {departmentIcons[deptHead.department]}
              </span>
              {deptHead.department}
            </div>
            <div className={styles.departmentMembers}>
              {renderDepartmentMembers(deptHead.id)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDepartmentMembers = (parentId: string) => {
    const children = getChildrenNodes(parentId).filter((m) =>
      isMemberVisible(m.id)
    );
    if (children.length === 0) return null;

    return (
      <div className={styles.subLevel}>
        {children.map((member) => (
          <div key={member.id} className={styles.subNodeContainer}>
            <NodeCard
              member={member}
              isHovered={hoveredMemberId === member.id}
              isSelected={selectedMemberId === member.id}
              cardType="director" // Assuming level 3 are directors/leads
              onClick={setSelectedMemberId}
              onHover={setHoveredMemberId}
            />
            {/* Render next level if exists */}
            {renderTeamMembersList(member.id)}
          </div>
        ))}
      </div>
    );
  };

  const renderTeamMembersList = (parentId: string) => {
    const team = getChildrenNodes(parentId).filter((m) =>
      isMemberVisible(m.id)
    );
    if (team.length === 0) return null;

    return (
      <div className={styles.teamMembersList}>
        {team.map((teamMember) => (
          <NodeCard
            key={teamMember.id}
            member={teamMember}
            isHovered={hoveredMemberId === teamMember.id}
            isSelected={selectedMemberId === teamMember.id}
            cardType="teamMember"
            onClick={setSelectedMemberId}
            onHover={setHoveredMemberId}
          />
        ))}
      </div>
    );
  };

  // --- Render Function for Department View ---
  const renderDepartmentView = () => {
    const visibleDepartments = allDepartments.filter((dept) =>
      expandedDepartments.includes(dept)
    );

    return (
      <div className={styles.departmentView}>
        <div className={styles.departmentGrid}>
          {visibleDepartments.map((department) => {
            const departmentMembers = teamMembers
              .filter((m) => m.department === department)
              .filter((m) => isMemberVisible(m.id));

            if (
              departmentMembers.length === 0 &&
              useCareersStore.getState().searchQuery
            )
              return null; // Hide empty filtered depts
            if (
              departmentMembers.length === 0 &&
              !useCareersStore.getState().searchQuery
            )
              return null; // Hide empty depts if nothing expanded

            return (
              <div key={department} className={styles.departmentColumn}>
                <div
                  className={styles.departmentHeader}
                  style={{
                    backgroundColor: departmentColors[department],
                  }}
                >
                  <span className="flex items-center font-medium">
                    <span className="mr-2 opacity-90">
                      {departmentIcons[department]}
                    </span>
                    {department} Team
                  </span>
                  <span className="text-sm opacity-80">
                    {departmentMembers.length} members
                  </span>
                </div>
                <div className={styles.departmentMembersGrid}>
                  {departmentMembers.length > 0 ? (
                    departmentMembers.map((member) => (
                      <NodeCard
                        key={member.id}
                        member={member}
                        isHovered={hoveredMemberId === member.id}
                        isSelected={selectedMemberId === member.id}
                        cardType="flatCard"
                        onClick={setSelectedMemberId}
                        onHover={setHoveredMemberId}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 p-4 text-center">
                      No members match the current filter in this department.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className={`${styles.orgChartContainer} animate-fadeIn`}>
      <OrgChartControls />

      {/* Member Detail Panel */}
      <MemberDetailCard />

      <div ref={chartContainerRef} className={styles.orgChart}>
        <div
          ref={chartInnerContainerRef}
          className={`${styles.chartInnerContainer} ${
            isDragging ? styles.dragging : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave} // Important to stop dragging if mouse leaves
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoomLevel})`,
          }}
        >
          {viewMode === "hierarchy" && (
            <>
              {renderHierarchyLevel(1)}
              {getNodesByLevel(1).length > 0 && (
                <div className={styles.connectorVertical}></div>
              )}
              {renderHierarchyLevel(2)}
              {renderDepartments()}
            </>
          )}

          {viewMode === "department" && renderDepartmentView()}
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-3">
        Drag to pan • Use zoom controls or scroll wheel (Cmd/Ctrl + Scroll) •
        Click member for details
      </div>
      {/* Add a simple fade-in animation */}
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
  );
};

export default OrgChart;
