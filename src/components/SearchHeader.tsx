import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchHeader = () => {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="搜索职位、公司或技能..." 
              className="pl-10 h-12 bg-card border-card-border focus:ring-primary"
            />
          </div>
          
          {/* Filter Row */}
          <div className="flex items-center space-x-3 overflow-x-auto">
            <Button variant="outline" size="sm" className="flex items-center space-x-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              <span>筛选</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-2 whitespace-nowrap">
              <MapPin className="h-4 w-4" />
              <span>地点</span>
            </Button>
            
            <div className="flex space-x-2">
              {["远程办公", "全职", "大厂", "创业公司"].map((filter) => (
                <span 
                  key={filter}
                  className="filter-tag whitespace-nowrap"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;