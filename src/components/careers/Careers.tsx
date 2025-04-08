import { ArrowRight, Briefcase } from "lucide-react";
import { useCareersStore, CareersState } from "./store/careersStore"; // Import the store and state type
import JobListings from "./JobListings"; // Import new components
import OrgChart from "./OrgChart";
import TeamBuilder from "./TeamBuilder";

const CareersPage = () => {
  // Get state and actions from the store
  const activeTab = useCareersStore((state: CareersState) => state.activeTab);
  const setActiveTab = useCareersStore(
    (state: CareersState) => state.setActiveTab
  );

  return (
    <div
      className="min-h-screen w-full overflow-y-auto section-bg pt-20"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      {/* Sticky Apply Now Banner - positioned below the navigation */}
      <div className="sticky top-20 z-40 bg-gradient-to-r from-indigo-600 to-violet-600 py-3 px-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-white" />
          <span className="text-white font-medium">
            Ready to join our innovative team?
          </span>
        </div>
        <button className="bg-white text-indigo-700 hover:bg-indigo-50 transition-colors px-5 py-2 rounded-full text-sm font-medium flex items-center">
          Apply Now <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <h1 className="text-8xl mb-4">Work With Us</h1>
            <p className="text-xl text-gray-400 italic mb-10">
              Join our ondemand team and help us create Innovative and Scalable
              solutions
            </p>

            {/* Tab navigation */}
            <div className="mb-10 border-b border-gray-800">
              <div className="flex space-x-8">
                <button
                  className={`pb-4 px-1 text-xl transition-all ${
                    activeTab === "openings"
                      ? "border-b-2 border-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("openings")}
                >
                  Open Positions
                </button>
                <button
                  className={`pb-4 px-1 text-xl transition-all ${
                    activeTab === "orgchart"
                      ? "border-b-2 border-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("orgchart")}
                >
                  Our Team Structure
                </button>
                <button
                  className={`pb-4 px-1 text-xl transition-all ${
                    activeTab === "buildteam"
                      ? "border-b-2 border-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("buildteam")}
                >
                  Build Your Team
                </button>
              </div>
            </div>

            {/* Conditional rendering based on activeTab from store */}
            {activeTab === "openings" && <JobListings />}
            {activeTab === "orgchart" && <OrgChart />}
            {activeTab === "buildteam" && <TeamBuilder />}

            {/* Add "Hire Our Team" section at the bottom */}
            <div className="mt-20 bg-black/40 backdrop-blur-md rounded-xl p-10 border border-indigo-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-light mb-4">
                    Don't see the right role?
                  </h3>
                  <p className="text-gray-300 mb-8">
                    We're always looking for talented individuals to join our
                    team. If you don't see a position that matches your skills,
                    send us your resume anyway!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Submit Open Application
                    </button>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg flex items-center justify-center">
                      Hire Our Team
                    </button>
                  </div>
                </div>
                <div className="grid-cols-2 gap-4 md:grid">
                  <div className="bg-indigo-500/10 rounded-lg p-6">
                    <h4 className="font-medium mb-2">Contract Work</h4>
                    <p className="text-sm text-gray-400">
                      Need specialists for project-based work? Our team is ready
                      to help.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-6">
                    <h4 className="font-medium mb-2">Full-Time Employment</h4>
                    <p className="text-sm text-gray-400">
                      Join our core team and help shape the future of our
                      products.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-6">
                    <h4 className="font-medium mb-2">Remote Positions</h4>
                    <p className="text-sm text-gray-400">
                      Work from anywhere. Our team is distributed globally.
                    </p>
                  </div>
                  <div className="bg-pink-500/10 rounded-lg p-6">
                    <h4 className="font-medium mb-2">Internship Program</h4>
                    <p className="text-sm text-gray-400">
                      Kickstart your career with our mentorship program.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
