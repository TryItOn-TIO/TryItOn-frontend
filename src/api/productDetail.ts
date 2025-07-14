import { ProductDetailResponse } from "@/types/productDetail";
import { ProductResponse } from "@/types/product";
import { axiosWithAuth, axiosWithoutAuth } from "@/api";

export const getProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  try {
    // 로그인 상태 확인
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (token) {
      console.log("로그인된 사용자 - 인증된 상품 상세 조회");
      const response = await axiosWithAuth().get(`/api/products/${productId}`);
      return response.data;
    } else {
      console.log("비로그인 사용자 - 비인증 상품 상세 조회 시도");
      // 비로그인 사용자는 axiosWithoutAuth 사용
      const response = await axiosWithoutAuth().get(
        `/api/products/${productId}`
      );
      return response.data;
    }
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);

    // 인증 오류인 경우 비인증으로 재시도
    if ((error as any)?.status === 401 || (error as any)?.status === 403) {
      console.log("인증 오류 - 비인증으로 재시도");
      try {
        const response = await axiosWithoutAuth().get(
          `/api/products/${productId}`
        );
        return response.data;
      } catch (retryError) {
        console.error("비인증 재시도도 실패:", retryError);
        throw retryError;
      }
    }

    throw error;
  }
};

// 유사한 상품 목록 조회
export const getSimilarProducts = async (
  productId: number
): Promise<ProductResponse[]> => {
  const response = await axiosWithAuth().get(
    `/api/products/${productId}/similar`
  );
  return response.data;
};
