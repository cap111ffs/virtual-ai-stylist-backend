import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    userName: {
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

export default mongoose.model('UserModel', UserSchema)
