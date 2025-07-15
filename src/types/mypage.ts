// 프로필 관련 타입
export interface UserProfile {
  userId?: number; // 백엔드 API 응답에 포함된 경우 추가
  email: string;
  username: string;
  height: number;
  weight: number;
  shoeSize: number;
  avatarBaseImageUrl?: string; // 아바타 베이스 이미지 URL
  avatarImageUrl?: string; // 현재 아바타 이미지 URL
  userBaseImageUrl?: string; // 사용자 베이스 이미지 URL (회원가입 시 설정)
  loginType?: 'GOOGLE' | 'EMAIL'; // 로그인 타입 추가
}

export interface ProfileUpdateRequest {
  username: string;
  height: number;
  weight: number;
  shoeSize: number;
}

// 주문내역 관련 타입 (API 응답에 맞게 수정)
export interface OrderItem {
  productName: string;
  brand: string;
  imageUrl: string;
  quantity: number;
  price: number;
  size?: string; // API 명세에는 없지만 UI에서 필요할 수 있음
}

export interface Order {
  orderId: number;
  orderUid: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrdersResponse {
  content: Order[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

// 배송지 관련 타입 (API 응답에 맞게 수정)
export interface Address {
  addressId: number; // API 응답에서는 addressId
  zipCode: string;
  address: string;
  addressDetail: string;
  receiver: string;
  primaryNum: string;
  alternateNum: string | null;
  isDefaultAddr: boolean;
  deliverRequest: string;
}

export interface AddressRequest {
  zipCode: string;
  address: string;
  addressDetail: string;
  receiver: string;
  primaryNum: string;
  alternateNum: string;
  isDefaultAddr: boolean;
  deliverRequest: string;
}
