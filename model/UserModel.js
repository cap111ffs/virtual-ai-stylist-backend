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
    passWord: {
      type: String,
      require: true,
      unique: false,
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
