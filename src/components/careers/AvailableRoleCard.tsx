import React, { useCallback, memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  AvailableRole,
  departmentColors,
  departmentIcons,
  Department,
} from "./data/careersData.tsx";
import { Clock, DollarSign, PlusCircle } from "lucide-react";

interface AvailableRoleCardProps {
  role: AvailableRole;
  onAdd: (roleId: string) => void;
}

// Create a separate component for the role skills display
const RoleSkills = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-1.5">
    {skills.map((skill) => (
      <span key={skill} className="text-xs bg-gray-800/70 px-2 py-0.5 rounded">
        {skill}
      </span>
    ))}
  </div>
);

// Create a separate component for the department badge
const DepartmentBadge = ({ department }: { department: Department }) => (
  <div
    className="text-xs rounded px-2 py-0.5 flex items-center flex-shrink-0"
    style={{
      backgroundColor: departmentColors[department],
      opacity: 0.8,
    }}
  >
    {departmentIcons[department]}
    <span className="ml-1">{department}</span>
  </div>
);

// Main component - use memo to prevent unnecessary re-renders
const AvailableRoleCard: React.FC<AvailableRoleCardProps> = memo(
  ({ role, onAdd }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: role.id,
        data: { role },
      });

    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 10 : undefined,
      cursor: isDragging ? "grabbing" : "grab",
    };

    // Memoize the click handler
    const handleAddClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onAdd(role.id);

        // Add visual feedback
        const button = e.currentTarget;
        button.classList.add("bg-indigo-500/30");
        setTimeout(() => {
          button.classList.remove("bg-indigo-500/30");
        }, 300);
      },
      [role.id, onAdd]
    );

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-black/20 border border-gray-800 rounded-lg p-4 hover:bg-black/30 transition-all flex flex-col justify-between touch-none"
      >
        <div>
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-medium">{role.title}</h4>
            <DepartmentBadge department={role.department as Department} />
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex text-sm text-gray-400">
              <div className="flex items-center w-1/2">
                <Clock size={14} className="mr-1.5 opacity-70" />
                <span>{role.availability}</span>
              </div>
              <div className="flex items-center w-1/2">
                <DollarSign size={14} className="mr-1.5 opacity-70" />
                <span>${role.monthlyCost.toLocaleString()}/mo</span>
              </div>
            </div>

            <RoleSkills skills={role.skills} />
          </div>
        </div>

        <div>
          <button
            className="w-full mt-2 bg-white/10 hover:bg-white/20 transition-all py-2 rounded-md flex items-center justify-center text-sm"
            onClick={handleAddClick}
          >
            <PlusCircle size={16} className="mr-1.5" />
            Add to Team
          </button>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
AvailableRoleCard.displayName = "AvailableRoleCard";

export default AvailableRoleCard;
