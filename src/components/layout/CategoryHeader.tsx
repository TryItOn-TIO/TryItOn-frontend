import React from "react";

const CategoryHeader = () => {
  const category = ["전체", "상의", "아우터", "바지", "원피스/스커트", "가방"];

  return (
    <div className="w-full bg-black px-5 py-2 text-white font-light text-[0.9rem] flex items-center gap-5">
      {category.map((category) => (
        <div>{category}</div>
      ))}
    </div>
  );
};

export default CategoryHeader;
