import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type NavigateBtnProps = {
  onNextPage: () => void;
  onPrevPage: () => void;
};

const NavigateBtn = ({ onNextPage, onPrevPage }: NavigateBtnProps) => {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        animate={{ y: [-5, 0, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, y: -8 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer bg-white bg-opacity-90 rounded-full p-3 shadow-lg backdrop-blur-sm hover:bg-opacity-100 transition-all"
        onClick={onPrevPage}
      >
        <Image
          src="/images/story/up_arrow.svg"
          alt="이전 스토리"
          width={40}
          height={40}
        />
      </motion.div>

      <motion.div
        animate={{ y: [5, 0, 5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, y: 8 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer bg-white bg-opacity-90 rounded-full p-3 shadow-lg backdrop-blur-sm hover:bg-opacity-100 transition-all"
        onClick={onNextPage}
      >
        <Image
          src="/images/story/down_arrow.svg"
          alt="다음 스토리"
          width={40}
          height={40}
        />
      </motion.div>
    </div>
  );
};

export default NavigateBtn;
