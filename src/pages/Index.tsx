import SearchHeader from "@/components/SearchHeader";
import SwipeJobStack from "@/components/SwipeJobStack";
import RecommendedSection from "@/components/RecommendedSection";
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
      
      <RecommendedSection />
      
      {/* Swipe Job Interface */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">发现你的理想工作</h2>
          <p className="text-muted-foreground">向右滑动喜欢，向左滑动跳过</p>
        </div>
        
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
