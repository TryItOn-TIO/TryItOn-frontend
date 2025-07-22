"use client";

const Spinner = () => {
  return (
    <div className="fixed top-0 mt-16 left-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.1)] z-50">
      {/* <Image
        src={"/images/common/spinner.gif"}
        width={100}
        height={100}
        alt="로딩 중"
      /> */}
      <iframe src="https://lottie.host/embed/17cfaef6-f1cf-4ee8-a07e-943f60d3c330/VPi3Q5w5il.lottie"></iframe>
    </div>
  );
};

export default Spinner;
