export const validatePassword = (password: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  return re.test(password);
};
