const generateRandomOtpCode = (length) => {
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
};

export default generateRandomOtpCode;
