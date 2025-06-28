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
