"use client";

import Image from "next/image";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.25)] z-2">
      <Image
        src={"/images/common/spinner.gif"}
        width={100}
        height={100}
        alt="로딩 중"
      />
    </div>
  );
};

export default Spinner;
