"use client";

import Modal from "@/components/ui/Modal";
import ClothesInfo from "@/app/story/[id]/_components/ClothesInfo";
import type { ProductResponse } from "@/types/product";

interface ShowClothesInfoModalProps {
  onClose: () => void;
  data: ProductResponse[];
}

const ShowClothesInfoModal = ({ onClose, data }: ShowClothesInfoModalProps) => {
  return (
    <Modal onClose={onClose}>
      {/* <div className="w-full max-w-sm mx-auto"> */}
      <div className="w-full max-w-xs sm:max-w-sm mx-auto max-h-[70vh] overflow-y-auto pb-2">
        <ClothesInfo data={data} />
      </div>
    </Modal>
  );
};

export default ShowClothesInfoModal;
