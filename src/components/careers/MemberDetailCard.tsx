import React from "react";
import { useCareersStore } from "./store/careersStore";
import {
  teamMembers,
  departmentColors,
  departmentIcons,
  getChildrenNodes,
} from "./data/careersData.tsx";
import { X } from "lucide-react";
import styles from "./OrgChart.module.css"; // For animation

const MemberDetailCard = () => {
  const selectedMemberId = useCareersStore((state) => state.selectedMemberId);
  const setSelectedMemberId = useCareersStore(
    (state) => state.setSelectedMemberId
  );

  if (!selectedMemberId) {
    return null; // Don't render if no member is selected
  }

  const member = teamMembers.find((m) => m.id === selectedMemberId);

  if (!member) {
    console.error("Selected member not found!");
    return null; // Should not happen if ID is valid
  }

  const reportsTo = member.parentId
    ? teamMembers.find((m) => m.id === member.parentId)
    : null;
  const directReports = getChildrenNodes(member.id).length;

  return (
    <div
      className={`member-detail bg-black/40 backdrop-blur-md rounded-lg border border-gray-700 p-6 mb-8 relative ${styles.animateSlideIn}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left section: Avatar, Name, Role */}
        <div className="md:col-span-1 flex flex-col items-center md:items-start">
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-3xl font-semibold mb-4 flex-shrink-0 border-2 border-white/20"
            style={{
              backgroundColor: departmentColors[member.department],
              opacity: 0.9,
            }}
          >
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h3 className="text-2xl font-light text-center md:text-left">
            {member.name}
          </h3>
          <p className="text-gray-400 text-center md:text-left">
            {member.role}
          </p>
        </div>

        {/* Middle section: Details (Dept, Joined, Reports To, Team Size) */}
        <div className="md:col-span-1">
          <h4 className="text-sm uppercase text-gray-500 mb-4">Details</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
            <div className="text-gray-400">Department</div>
            <div className="text-white flex items-center">
              <span className="mr-1.5 opacity-80">
                {departmentIcons[member.department]}
              </span>
              {member.department}
            </div>

            <div className="text-gray-400">Joined</div>
            <div>{member.yearJoined || "N/A"}</div>

            <div className="text-gray-400">Reports To</div>
            <div>{reportsTo ? reportsTo.name : "N/A"}</div>

            <div className="text-gray-400">Team Size</div>
            <div>{directReports > 0 ? directReports : "0"}</div>

            <div className="text-gray-400">Availability</div>
            <div>{member.availability || "N/A"}</div>

            <div className="text-gray-400">Est. Cost</div>
            <div>
              {member.monthlyCost
                ? `$${member.monthlyCost.toLocaleString()}/mo`
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Right section: Key Skills */}
        <div className="md:col-span-1">
          <h4 className="text-sm uppercase text-gray-500 mb-4">Key Skills</h4>
          {member.skills && member.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No skills listed.</p>
          )}
        </div>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        onClick={() => setSelectedMemberId(null)}
        aria-label="Close member details"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default MemberDetailCard;
