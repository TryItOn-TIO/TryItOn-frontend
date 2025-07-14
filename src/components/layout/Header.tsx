"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// 클라이언트 전용으로 SearchInput 불러오기
const SearchInput = dynamic(() => import("@/components/common/SearchInput"), {
  ssr: false,
});

const Header = () => {
  return (
    <>
      <div className="w-screen h-[10vh] py-6 bg-black flex justify-center">
        <div className="w-full max-w-[1440px] flex justify-between items-center mx-10">
          {/* 로고 */}
          <Link href={"/"}>
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
          </Link>

          {/* 검색창 */}
          <div className="relative flex items-center w-[70%] h-10">
            <SearchInput />
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
    </>
  );
};

export default Header;
