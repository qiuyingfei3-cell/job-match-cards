import { Settings, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Sorce Resume</h1>
          <Settings className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Credits Section */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">⚡</span>
              </div>
              <div>
                <p className="text-orange-500 font-bold">10 Swipes</p>
                <p className="text-gray-700 font-medium">Get More Credits</p>
              </div>
            </div>
            <span className="text-gray-400">×</span>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="43, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">43%</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Complete your profile</h3>
                <p className="text-gray-500">Auto-fill more job application fields</p>
              </div>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl">
              Finish
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-gray-200">
          <button className="pb-3 text-green-500 border-b-2 border-green-500 font-medium">
            Resume
          </button>
          <button className="pb-3 text-gray-400">Personal</button>
          <button className="pb-3 text-gray-400">Files</button>
        </div>

        {/* Resume Sections */}
        <div className="space-y-6">
          {[
            { title: "Experiences", count: 0 },
            { title: "Education", count: 0 },
            { title: "Projects", count: 0 },
            { title: "Exams", count: 0 },
            { title: "Languages", count: 0 }
          ].map((section) => (
            <div key={section.title} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-medium text-gray-900">{section.title}</h3>
                <span className="text-gray-400">({section.count})</span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Profile;