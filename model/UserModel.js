const mongoose = require('mongoose')

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
    profilePic: {
      type: String,
      require: false,
      unique: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('UserModel', UserSchema)
