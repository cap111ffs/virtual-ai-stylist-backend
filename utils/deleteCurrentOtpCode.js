import OtpCode from '../model/OtpCodeModel.js';

const deleteCurrentOtpCode = async (id, seconds) => {
  const otpCode = await OtpCode.findOne({ id });
  setTimeout(() => otpCode.deleteOne(), seconds * 1000);
};

export default deleteCurrentOtpCode;
