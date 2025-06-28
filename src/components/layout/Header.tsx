import React from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryHeader from "@/components/layout/CategoryHeader";

const Header = () => {
  return (
    <>
      <div className="w-screen py-6 bg-black flex justify-center">
        <div className="w-full max-w-[1440px] flex justify-between items-center">
          {/* 로고 */}
          <Link href={"/"}>
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
          </Link>

          {/* 검색창 */}
          <div className="relative flex items-center w-[70%] h-10">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full placeholder:text-slate-400 bg-[#D9D9D9] text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <button className="absolute right-3">
              <Image
                src="/images/common/search.svg"
                width={25}
                height={25}
                alt="logo"
              />
            </button>
          </div>

          {/* 옷장, 장바구니, 마이페이지 */}
          <div className="flex items-center gap-3 text-white text-[1rem] font-light">
            <div className="flex gap-2 items-center">
              <Link href={"/closet"}>옷장</Link>
              <div className="bg-white w-[1px] h-[16px]" />
              <Link href={"/cart"}>장바구니</Link>
            </div>
            <Link href={"/mypage"}>
              <Image
                src="/images/common/mypage.svg"
                width={25}
                height={25}
                alt="logo"
              />
            </Link>
          </div>
        </div>
      </div>
      <CategoryHeader />
    </>
  );
};

export default Header;
