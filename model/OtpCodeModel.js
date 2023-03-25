const mongoose = require('mongoose')

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

module.exports = mongoose.model('OtpCodeModel', OtpCodeSchema)
