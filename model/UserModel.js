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
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('UserModel', UserSchema)
