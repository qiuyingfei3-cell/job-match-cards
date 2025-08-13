import { Heart, X, MapPin, Clock, Building, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface SwipeJobCardProps {
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
  onSwipe: (direction: 'left' | 'right', jobId: string) => void;
  onSuperLike: (jobId: string) => void;
}

const SwipeJobCard = ({ job, onSwipe, onSuperLike }: SwipeJobCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [startX, setStartX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const distance = e.clientX - startX;
    setDragDistance(distance);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 'right' : 'left';
      onSwipe(direction, job.id);
    }
    
    setDragDistance(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const distance = e.touches[0].clientX - startX;
    setDragDistance(distance);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 'right' : 'left';
      onSwipe(direction, job.id);
    }
    
    setDragDistance(0);
  };

  const getRotation = () => {
    return dragDistance * 0.1;
  };

  const getOpacity = () => {
    return Math.max(0.7, 1 - Math.abs(dragDistance) * 0.002);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px]">
      <div
        ref={cardRef}
        className="absolute inset-0 bg-card border border-card-border rounded-2xl shadow-lg cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          transform: `translateX(${dragDistance}px) rotate(${getRotation()}deg)`,
          opacity: getOpacity(),
          transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe Indicators */}
        {isDragging && (
          <>
            <div 
              className={`absolute top-8 left-8 transform rotate-12 text-6xl font-bold border-4 rounded-lg px-4 py-2 transition-opacity ${
                dragDistance > 50 ? 'opacity-100 text-success border-success' : 'opacity-30 text-success/30 border-success/30'
              }`}
            >
              LIKE
            </div>
            <div 
              className={`absolute top-8 right-8 transform -rotate-12 text-6xl font-bold border-4 rounded-lg px-4 py-2 transition-opacity ${
                dragDistance < -50 ? 'opacity-100 text-destructive border-destructive' : 'opacity-30 text-destructive/30 border-destructive/30'
              }`}
            >
              PASS
            </div>
          </>
        )}

        <div className="p-6 h-full flex flex-col">
          {/* Company Logo & Basic Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-accent-blue rounded-xl flex items-center justify-center">
              <Building className="h-8 w-8 text-accent-blue-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-2xl text-foreground leading-tight">
                {job.title}
              </h2>
              <p className="text-muted-foreground text-lg">{job.company}</p>
            </div>
          </div>

          {/* Match Score - Prominent */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-medium text-foreground">匹配度</span>
              <span className={`text-2xl font-bold ${getMatchColor(job.matchScore)}`}>
                {job.matchScore}%
              </span>
            </div>
            <div className="match-progress h-3">
              <div 
                className={`match-progress-bar ${getMatchBgColor(job.matchScore)}`}
                style={{ width: `${job.matchScore}%` }}
              />
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4 mb-6 flex-1">
            <div className="flex items-center text-muted-foreground space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span className="text-base">{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-base">{job.postedTime}</span>
              </div>
            </div>

            <div className="text-lg font-semibold text-foreground">
              {job.salary} · {job.workType}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <span key={index} className="benefit-tag text-sm">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-6 mt-auto">
            <button
              onClick={() => onSwipe('left', job.id)}
              className="w-14 h-14 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => onSuperLike(job.id)}
              className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-colors"
            >
              <Star className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => onSwipe('right', job.id)}
              className="w-14 h-14 rounded-full bg-success/10 hover:bg-success/20 text-success flex items-center justify-center transition-colors"
            >
              <Heart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeJobCard;