import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex gap-4 h-14 items-center">
      <div>Header</div>
      <Link className="text-pink-900" href={"/"}>
        메인페이지로 이동
      </Link>
    </div>
  );
};

export default Header;
