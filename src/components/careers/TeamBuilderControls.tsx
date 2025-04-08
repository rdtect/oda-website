import React from "react";
import { useCareersStore } from "./store/careersStore";
import {
  allDepartments,
  departmentColors,
  departmentIcons,
} from "./data/careersData.tsx";
import { Search, ChevronDown } from "lucide-react";
import styles from "./OrgChart.module.css";

const TeamBuilderControls = () => {
  const selectedDepartmentFilter = useCareersStore(
    (state) => state.selectedDepartmentFilter
  );
  const setTeamDepartmentFilter = useCareersStore(
    (state) => state.setTeamDepartmentFilter
  );

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
          !selectedDepartmentFilter
            ? "bg-white/20 border border-white/30"
            : "bg-black/40 hover:bg-black/20 border border-gray-800"
        }`}
        onClick={() => setTeamDepartmentFilter(null)}
      >
        All Departments
      </button>

      {allDepartments.map((dept) => (
        <button
          key={dept}
          className={`px-3 py-1.5 text-sm rounded-full flex items-center transition-all border ${
            selectedDepartmentFilter === dept
              ? "bg-opacity-40 border-white/30"
              : "bg-opacity-10 hover:bg-opacity-20 border-gray-800"
          }`}
          style={{
            backgroundColor: departmentColors[dept],
          }}
          onClick={() => setTeamDepartmentFilter(dept)}
        >
          <span className="mr-1.5">{departmentIcons[dept]}</span>
          {dept}
        </button>
      ))}
    </div>
  );
};

export default TeamBuilderControls;
