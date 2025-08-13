import SearchHeader from "@/components/SearchHeader";
import JobCard from "@/components/JobCard";
import RecommendedSection from "@/components/RecommendedSection";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockJobs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      
      <RecommendedSection />
      
      {/* Job Cards Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="px-8">
            查看更多岗位
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
