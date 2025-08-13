import { useState, useEffect } from "react";
import SwipeJobCard from "./SwipeJobCard";
import { Button } from "@/components/ui/button";
import { RotateCcw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  benefits: string[];
  salary: string;
  workType: string;
  logo: string;
  postedTime: string;
}

interface SwipeJobStackProps {
  jobs: Job[];
  onJobLiked: (job: Job) => void;
  onJobPassed: (job: Job) => void;
  onJobSuperLiked: (job: Job) => void;
}

const SwipeJobStack = ({ jobs, onJobLiked, onJobPassed, onJobSuperLiked }: SwipeJobStackProps) => {
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [swipedJobs, setSwipedJobs] = useState<{[key: string]: 'left' | 'right' | 'super'}>({});
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right', jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setSwipedJobs(prev => ({ ...prev, [jobId]: direction }));
    
    if (direction === 'right') {
      onJobLiked(job);
      toast({
        title: "已收藏职位",
        description: `${job.title} @ ${job.company}`,
      });
    } else {
      onJobPassed(job);
    }

    // Move to next job after a short delay
    setTimeout(() => {
      setCurrentJobIndex(prev => prev + 1);
    }, 300);
  };

  const handleSuperLike = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setSwipedJobs(prev => ({ ...prev, [jobId]: 'super' }));
    onJobSuperLiked(job);
    
    toast({
      title: "超级喜欢！",
      description: `${job.title} @ ${job.company}`,
    });

    setTimeout(() => {
      setCurrentJobIndex(prev => prev + 1);
    }, 300);
  };

  const handleUndo = () => {
    if (currentJobIndex > 0) {
      const prevIndex = currentJobIndex - 1;
      const prevJob = jobs[prevIndex];
      
      setSwipedJobs(prev => {
        const updated = { ...prev };
        delete updated[prevJob.id];
        return updated;
      });
      
      setCurrentJobIndex(prevIndex);
      
      toast({
        title: "已撤销操作",
        description: "返回上一个职位",
      });
    }
  };

  const currentJob = jobs[currentJobIndex];
  const nextJob = jobs[currentJobIndex + 1];
  const hasMoreJobs = currentJobIndex < jobs.length;

  if (!hasMoreJobs) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">没有更多职位了</h2>
          <p className="text-muted-foreground">我们会为你寻找更多匹配的工作机会</p>
        </div>
        <Button onClick={() => setCurrentJobIndex(0)} className="px-8">
          重新开始
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Job Cards Stack */}
      <div className="relative h-[600px]">
        {/* Next job card (background) */}
        {nextJob && (
          <div 
            className="absolute inset-0 bg-card border border-card-border rounded-2xl shadow-md opacity-50 scale-95 z-0"
            style={{ transform: 'translateY(10px) scale(0.95)' }}
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-blue rounded-lg"></div>
                <div>
                  <h3 className="font-semibold text-foreground">{nextJob.title}</h3>
                  <p className="text-muted-foreground text-sm">{nextJob.company}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current job card */}
        {currentJob && (
          <div className="relative z-10">
            <SwipeJobCard
              job={currentJob}
              onSwipe={handleSwipe}
              onSuperLike={handleSuperLike}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUndo}
          disabled={currentJobIndex === 0}
          className="flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>撤销</span>
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {currentJobIndex + 1} / {jobs.length}
          </p>
        </div>

        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>设置</span>
        </Button>
      </div>
    </div>
  );
};

export default SwipeJobStack;