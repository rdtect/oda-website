import React from "react";
import { useCareersStore, ViewMode, Department } from "./store/careersStore";
import {
  allDepartments,
  departmentColors,
  departmentIcons,
} from "./data/careersData.tsx";
import { Search, ChevronDown } from "lucide-react";
import styles from "./OrgChart.module.css"; // Import CSS module for shadowGlow

const OrgChartControls = () => {
  // Use individual selectors
  const viewMode = useCareersStore((state) => state.viewMode);
  const searchQuery = useCareersStore((state) => state.searchQuery);
  const expandedDepartments = useCareersStore(
    (state) => state.expandedDepartments
  );
  const setViewMode = useCareersStore((state) => state.setViewMode);
  const setSearchQuery = useCareersStore((state) => state.setSearchQuery);
  const zoomIn = useCareersStore((state) => state.zoomIn);
  const zoomOut = useCareersStore((state) => state.zoomOut);
  const resetZoom = useCareersStore((state) => state.resetZoom);
  const toggleDepartment = useCareersStore((state) => state.toggleDepartment);

  return (
    <div className="org-chart-controls">
      {/* Top row: Description and Search/View/Zoom */}
      <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-light mb-2 md:mb-4">
            Organization Structure
          </h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">
            At ODA, we operate with a flat, collaborative structure designed to
            foster creativity and innovation. Explore our team to see how we are
            organized.
          </p>
        </div>

        {/* Search, View Mode, Zoom */}
        <div className="flex flex-col space-y-3 items-start md:items-end flex-shrink-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              className="bg-black/30 border border-gray-700 rounded-full px-4 py-2 pl-10 w-full text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-start sm:items-center w-full md:w-auto">
            {/* View Controls */}
            <div className="view-controls p-1 rounded-md bg-black/30 border border-gray-800 flex">
              <button
                className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
                  viewMode === "hierarchy"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setViewMode("hierarchy")}
                aria-pressed={viewMode === "hierarchy"}
              >
                Hierarchy View
              </button>
              <button
                className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
                  viewMode === "department"
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setViewMode("department")}
                aria-pressed={viewMode === "department"}
              >
                Department View
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="zoom-controls flex items-center space-x-2">
              <button
                title="Zoom Out"
                aria-label="Zoom Out"
                className="h-8 w-8 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full border border-gray-800 transition-colors"
                onClick={zoomOut}
              >
                <span className="text-lg leading-none select-none">−</span>
              </button>
              <button
                title="Reset Zoom"
                aria-label="Reset Zoom"
                className="h-8 w-8 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full border border-gray-800 transition-colors"
                onClick={resetZoom}
              >
                <span className="text-xs font-medium select-none">100%</span>
              </button>
              <button
                title="Zoom In"
                aria-label="Zoom In"
                className="h-8 w-8 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full border border-gray-800 transition-colors"
                onClick={zoomIn}
              >
                <span className="text-lg leading-none select-none">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Department Filters */}
      <div className="department-filters flex flex-wrap gap-3 mb-6">
        {allDepartments.map((dept) => {
          const isExpanded = expandedDepartments.includes(dept);
          return (
            <button
              key={dept}
              className={`px-4 py-2 text-sm rounded-full flex items-center space-x-1.5 transition-all border ${
                isExpanded
                  ? `bg-opacity-30 border-white/40 ${styles.shadowGlow}`
                  : "bg-opacity-10 border-white/10 hover:bg-opacity-20"
              }`}
              style={{
                backgroundColor: departmentColors[dept],
              }}
              onClick={() => toggleDepartment(dept)}
              aria-expanded={isExpanded}
              aria-controls={`department-section-${dept}`}
            >
              <span className="dept-icon">{departmentIcons[dept]}</span>
              <span>{dept}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrgChartControls;
