// 프로필 관련 타입
export interface UserProfile {
  email: string;
  username: string;
  height: number;
  weight: number;
  shoeSize: number;
}

export interface ProfileUpdateRequest {
  username: string;
  height: number;
  weight: number;
  shoeSize: number;
}

// 주문내역 관련 타입
export interface OrderItem {
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
  size: string;
}

export interface Order {
  orderId: number;
  orderUid: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrdersResponse {
  content: Order[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
}

// 배송지 관련 타입
export interface Address {
  id: number;
  zipCode: string;
  address: string;
  addressDetail: string;
  receiver: string;
  primaryNum: string;
  alternateNum: string;
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
