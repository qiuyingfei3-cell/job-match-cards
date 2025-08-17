import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/", label: "Feed", active: location.pathname === "/" },
    { path: "/applications", label: "Applications", active: location.pathname === "/applications" },
    { path: "/feedback", label: "Feedback", active: location.pathname === "/feedback" },
    { path: "/profile", label: "Profile", active: location.pathname === "/profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center py-2"
          >
            <div 
              className={`w-6 h-6 rounded mb-1 ${
                tab.active ? "bg-primary" : "bg-gray-300"
              }`}
            ></div>
            <span 
              className={`text-xs font-medium ${
                tab.active ? "text-primary" : "text-gray-400"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;