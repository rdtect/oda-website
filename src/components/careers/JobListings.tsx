import React from "react";
import { jobs } from "./data/careersData.tsx";
import { Plus, X } from "lucide-react";

const JobListings = () => {
  return (
    <div className="space-y-1 animate-fadeIn">
      <div className="grid grid-cols-3 gap-4 py-4 border-b border-gray-800 text-gray-400 font-medium">
        <div>POSITION</div>
        <div>LOCATION</div>
        <div>TYPE</div>
      </div>

      {jobs.map((job, index) => (
        <div key={index} className="group border-b border-gray-800">
          <div className="grid grid-cols-3 gap-4 py-6 hover:bg-gray-900/30 transition-colors cursor-pointer">
            <div className="font-medium">{job.position}</div>
            <div>{job.location}</div>
            <div className="flex justify-between items-center pr-4">
              <span>{job.type}</span>
              {job.description ? (
                <Plus className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              ) : (
                <X className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>
          {job.description && (
            <div className="hidden group-hover:block p-8 bg-black/30 backdrop-blur-sm rounded-b-lg">
              <p className="text-gray-300 whitespace-pre-line mb-6">
                {job.description}
              </p>
              <button className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-md font-medium">
                Apply Now
              </button>
            </div>
          )}
        </div>
      ))}

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

export default JobListings;
