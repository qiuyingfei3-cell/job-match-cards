import SearchHeader from "@/components/SearchHeader";
import SwipeJobStack from "@/components/SwipeJobStack";
import { mockJobs } from "@/data/mockJobs";
import { useState } from "react";

const Index = () => {
  const [likedJobs, setLikedJobs] = useState<any[]>([]);
  const [passedJobs, setPassedJobs] = useState<any[]>([]);
  const [superLikedJobs, setSuperLikedJobs] = useState<any[]>([]);

  const handleJobLiked = (job: any) => {
    setLikedJobs(prev => [...prev, job]);
  };

  const handleJobPassed = (job: any) => {
    setPassedJobs(prev => [...prev, job]);
  };

  const handleJobSuperLiked = (job: any) => {
    setSuperLikedJobs(prev => [...prev, job]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center text-green-500">Sorce</h1>
        </div>
      </div>
      
      {/* Swipe Job Interface */}
      <div className="container mx-auto px-4 py-6">
        <SwipeJobStack
          jobs={mockJobs}
          onJobLiked={handleJobLiked}
          onJobPassed={handleJobPassed}
          onJobSuperLiked={handleJobSuperLiked}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-green-500 rounded mb-1"></div>
            <span className="text-xs text-green-500 font-medium">Feed</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Applications</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Feedback</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-300 rounded mb-1"></div>
            <span className="text-xs text-gray-400">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
