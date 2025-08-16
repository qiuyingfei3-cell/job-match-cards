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
    <div className="relative w-full max-w-sm mx-auto h-[650px]">
      <div
        ref={cardRef}
        className="absolute inset-0 bg-white rounded-3xl shadow-xl cursor-grab active:cursor-grabbing overflow-hidden border border-gray-100"
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
              className={`absolute top-8 left-8 transform rotate-12 text-4xl font-bold border-4 rounded-lg px-3 py-1 transition-opacity ${
                dragDistance > 50 ? 'opacity-100 text-green-500 border-green-500 bg-green-50' : 'opacity-30 text-green-300 border-green-300'
              }`}
            >
              LIKE
            </div>
            <div 
              className={`absolute top-8 right-8 transform -rotate-12 text-4xl font-bold border-4 rounded-lg px-3 py-1 transition-opacity ${
                dragDistance < -50 ? 'opacity-100 text-red-500 border-red-500 bg-red-50' : 'opacity-30 text-red-300 border-red-300'
              }`}
            >
              PASS
            </div>
          </>
        )}

        <div className="p-8 h-full flex flex-col">
          {/* Job Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {job.title}
            </h1>
            
            {/* Company Info */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-gray-600">
                  {job.company.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">{job.company}</p>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Work Arrangement */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Work arrangement</h3>
            <div className="flex space-x-3">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700 font-medium">Remote</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 font-medium">{job.workType}</span>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Compensation</h3>
            <div className="bg-green-50 px-4 py-3 rounded-xl">
              <div className="flex items-center space-x-2">
                <div className="text-green-600">$</div>
                <span className="text-green-800 font-semibold text-lg">{job.salary}</span>
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Experience level</h3>
            <div className="bg-orange-50 px-4 py-3 rounded-xl">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-orange-500" />
                <span className="text-orange-800 font-semibold">Senior level</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-8 flex-1">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-8 mt-auto">
            <button
              onClick={() => onSwipe('left', job.id)}
              className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all shadow-lg"
            >
              <X className="h-7 w-7" />
            </button>
            
            <button
              onClick={() => onSuperLike(job.id)}
              className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white flex items-center justify-center transition-all shadow-lg"
            >
              <Star className="h-6 w-6" fill="currentColor" />
            </button>
            
            <button
              onClick={() => onSwipe('right', job.id)}
              className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 hover:border-green-300 text-gray-400 hover:text-green-500 flex items-center justify-center transition-all shadow-lg"
            >
              <Heart className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeJobCard;