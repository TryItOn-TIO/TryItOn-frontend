import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type NavigateBtnProps = {
  onNextPage: () => void;
  onPrevPage: () => void;
};

const NavigateBtn = ({ onNextPage, onPrevPage }: NavigateBtnProps) => {
  return (
    <div>
      <motion.div
        animate={{ y: [-10, 0, -10] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        onClick={onPrevPage}
      >
        <Image
          src="/images/story/up_arrow.svg"
          alt="이전 스토리"
          width={50}
          height={50}
        />
      </motion.div>

      <motion.div
        animate={{ y: [10, 0, 10] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        onClick={onNextPage}
      >
        <Image
          src="/images/story/down_arrow.svg"
          alt="다음 스토리"
          width={50}
          height={50}
        />
      </motion.div>
    </div>
  );
};

export default NavigateBtn;
