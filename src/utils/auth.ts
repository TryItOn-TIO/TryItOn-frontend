export const setAccessToken = (token: string | null) => {
  localStorage.setItem("access_token", token || "");
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const deleteAccessToken = () => {
  localStorage.removeItem("access_token");
};
