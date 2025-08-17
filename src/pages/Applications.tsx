import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Applications = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center text-green-500">GoJob</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Resume Upload Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-12 w-12 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Your Resume</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Upload your main resume to activate job applications and track your progress.
          </p>
          
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium">
            <Upload className="h-5 w-5 mr-2" />
            Upload Resume
          </Button>
        </div>

        {/* Recent Applications */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your recent applications</h3>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-gray-500 text-center">No results found.</p>
          </div>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Applications;