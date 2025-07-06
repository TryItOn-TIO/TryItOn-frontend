export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  return email === "" || emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"'<>,.?/~`|\\]).{8,}$/;
  return password === "" || passwordRegex.test(password);
};

export const validateNickname = (nickname: string) => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,16}$/;
  return nickname === "" || nicknameRegex.test(nickname);
};

export const validatphoneNum = (phoneNum: string) => {
  const phoneNumRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return phoneNum === "" || phoneNumRegex.test(phoneNum);
};

export const validateDate = (dateString: string): boolean => {
  if (dateString.length !== 10) return false;

  const [year, month, day] = dateString.split("-").map(Number);

  // 기본 범위 체크
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // 실제 날짜 유효성 체크
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
