export const setAccessToken = (token: string | null) => {
  if (typeof window !== "undefined") {
    // localStorage 관련 작업 수행 코드
    // value = localStorage.getItem("pw") || "";
    localStorage.setItem("access_token", token || "");
  }
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    // localStorage 관련 작업 수행 코드
    // value = localStorage.getItem("pw") || "";
    return localStorage.getItem("access_token");
  }
};

export const deleteAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};

export const clearSessionStorage = () => {
  localStorage.removeItem("@tosspayments/merchant-browser-id");
  localStorage.removeItem("avatar-storage");
  localStorage.removeItem("google-token-storage");
  localStorage.removeItem("orderItems");
};
