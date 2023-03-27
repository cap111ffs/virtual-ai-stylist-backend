import mongoose from 'mongoose'

const OtpCodeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    code: {
      type: String,
      require: true,
      unique: false,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('OtpCodeModel', OtpCodeSchema)
