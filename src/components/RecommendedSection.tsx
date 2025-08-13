const RecommendedSection = () => {
  const quickFilters = [
    "Remote", "双休", "年假多", "技术氛围好", "弹性工作", 
    "不加班", "六险一金", "期权激励", "学习机会", "团队氛围"
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">为你推荐的岗位</h2>
        <p className="text-muted-foreground text-sm">基于你的技能和偏好精准匹配</p>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {quickFilters.map((filter, index) => (
          <span 
            key={index}
            className="filter-tag"
          >
            {filter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;