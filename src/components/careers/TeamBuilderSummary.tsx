import React, { useMemo } from "react";
import { useCareersStore } from "./store/careersStore";
import {
  availableRoles,
  departmentColors,
  Department,
} from "./data/careersData.tsx";
import { Briefcase, Users, Trash2, DollarSign } from "lucide-react";

// Separate TeamMember component for better code organization
const TeamMemberItem = ({ item, onUpdateCount, onRemove }) => {
  const role = availableRoles.find((r) => r.id === item.roleId);

  if (!role) return null;

  return (
    <div
      key={item.id}
      className="flex items-center justify-between bg-black/20 border border-gray-800 rounded-lg p-3 animate-fadeInItem"
    >
      <div>
        <div className="font-medium">{role.title}</div>
        <div className="text-xs text-gray-400 flex items-center">
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{
              backgroundColor: departmentColors[role.department as Department],
            }}
          />
          {role.department}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* Count adjuster */}
        <div className="flex items-center border border-gray-700 rounded">
          <button
            className="w-6 h-6 flex items-center justify-center hover:bg-black/30 rounded-l transition-colors"
            onClick={() => onUpdateCount(item.id, item.count - 1)}
            aria-label={`Decrease count for ${role.title}`}
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium bg-black/10">
            {item.count}
          </span>
          <button
            className="w-6 h-6 flex items-center justify-center hover:bg-black/30 rounded-r transition-colors"
            onClick={() => onUpdateCount(item.id, item.count + 1)}
            aria-label={`Increase count for ${role.title}`}
          >
            +
          </button>
        </div>
        {/* Remove button */}
        <button
          className="text-gray-500 hover:text-red-500 transition-colors p-1"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${role.title}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const TeamBuilderSummary = () => {
  // Use destructuring to get all needed values in one subscription
  const {
    selectedTeam,
    teamDuration,
    updateTeamMemberCount,
    removeFromTeam,
    setTeamDuration,
    clearTeam,
  } = useCareersStore();

  // Create memoized handler functions
  const handleUpdateCount = useMemo(() => {
    return (id: string, count: number) => {
      updateTeamMemberCount(id, count);
    };
  }, [updateTeamMemberCount]);

  const handleRemove = useMemo(() => {
    return (id: string) => {
      removeFromTeam(id);
    };
  }, [removeFromTeam]);

  const handleDurationChange = useMemo(() => {
    return (duration: number) => {
      setTeamDuration(duration);
    };
  }, [setTeamDuration]);

  const handleClearTeam = useMemo(() => {
    return () => {
      clearTeam();
    };
  }, [clearTeam]);

  // Use this key to force re-render when team changes
  const teamKey = `team-summary-${selectedTeam.length}`;

  return (
    <div
      className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 p-6 sticky top-36"
      key={teamKey}
    >
      <h3 className="text-xl mb-4 flex items-center">
        <Briefcase className="mr-2" />
        Your Selected Team{" "}
        {selectedTeam.length > 0 ? `(${selectedTeam.length})` : ""}
      </h3>

      {/* Duration selector */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Estimated Project Duration
        </label>
        <div className="flex border border-gray-800 rounded-lg overflow-hidden">
          {[1, 3, 6, 12].map((months) => (
            <button
              key={months}
              className={`flex-1 py-2 text-sm transition-colors ${
                teamDuration === months
                  ? "bg-white/20"
                  : "bg-black/20 hover:bg-black/30"
              }`}
              onClick={() => handleDurationChange(months)}
            >
              {months} {months === 1 ? "month" : "months"}
            </button>
          ))}
        </div>
      </div>

      {/* Selected team members list */}
      <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
        {selectedTeam.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-400">
            <Users className="mx-auto mb-2 opacity-40" size={24} />
            Select or drag roles here to build your team & request a quote.
          </div>
        ) : (
          selectedTeam.map((item) => (
            <TeamMemberItem
              key={item.id}
              item={item}
              onUpdateCount={handleUpdateCount}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>

      {/* Action buttons */}
      <div className="space-y-3 border-t border-gray-800 pt-6">
        <button
          className={`w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-3 rounded-lg font-medium flex items-center justify-center ${
            selectedTeam.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedTeam.length === 0}
        >
          <DollarSign size={18} className="mr-1.5" />
          Request Quote for This Team
        </button>

        <button
          className={`w-full bg-white/10 hover:bg-white/20 transition-colors py-3 rounded-lg font-medium ${
            selectedTeam.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedTeam.length === 0}
        >
          Schedule Consultation
        </button>

        {selectedTeam.length > 0 && (
          <button
            className="w-full text-gray-400 hover:text-white text-sm transition-colors py-2 mt-2"
            onClick={handleClearTeam}
          >
            Clear Team Selection
          </button>
        )}
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeInItem {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInItem {
          animation: fadeInItem 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TeamBuilderSummary;
