import OtpCode from '../model/OtpCodeModel'

const deleteCurrentOtpCode = async (id, seconds) => {
  const otpCode = await OtpCode.findOne({ id })
  setTimeout(() => otpCode.deleteOne(), seconds * 1000)
}

export default deleteCurrentOtpCode
