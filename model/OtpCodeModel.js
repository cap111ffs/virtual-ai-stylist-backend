import mongoose from 'mongoose'

const OtpCodeSchema = new mongoose.Schema(
  {
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
    id: {
      type: String,
      require: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 120 },
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('OtpCodeModel', OtpCodeSchema)
