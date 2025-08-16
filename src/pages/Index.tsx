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
    <div className="min-h-screen bg-background">
      <SearchHeader />
      
      {/* Swipe Job Interface */}
      <div className="container mx-auto px-4 py-6">
        <SwipeJobStack
          jobs={mockJobs}
          onJobLiked={handleJobLiked}
          onJobPassed={handleJobPassed}
          onJobSuperLiked={handleJobSuperLiked}
        />
      </div>
    </div>
  );
};

export default Index;
