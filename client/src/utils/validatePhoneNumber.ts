export const validatePhoneNumber = (phone_number: string) => {
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(phone_number);
};
