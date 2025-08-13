import { Heart, MapPin, Clock, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JobCardProps {
  job: {
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
  };
}

const JobCard = ({ job }: JobCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    return "text-warning";
  };

  const getMatchBgColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-primary";
    return "bg-warning";
  };

  return (
    <div className="job-card group hover:border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-12 h-12 bg-accent-blue rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-accent-blue-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-muted-foreground text-sm">{job.company}</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`p-2 rounded-full transition-colors ${
            isFavorited 
              ? "text-red-500 bg-red-50" 
              : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{job.postedTime}</span>
          </div>
        </div>

        <div className="text-sm text-foreground font-medium">
          {job.salary} · {job.workType}
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-2">
          {job.benefits.map((benefit, index) => (
            <span key={index} className="benefit-tag">
              {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* Match Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">匹配度</span>
          <span className={`text-sm font-semibold ${getMatchColor(job.matchScore)}`}>
            {job.matchScore}%
          </span>
        </div>
        <div className="match-progress h-2">
          <div 
            className={`match-progress-bar ${getMatchBgColor(job.matchScore)}`}
            style={{ width: `${job.matchScore}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button variant="outline" size="sm" className="flex-1">
          查看详情
        </Button>
        <Button size="sm" className="flex-1 bg-primary hover:bg-primary-dark">
          立即申请
        </Button>
      </div>
    </div>
  );
};

export default JobCard;