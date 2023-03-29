import { Schema, model } from 'mongoose';

const OtpCodeSchema = new Schema(
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
);

export default model('OtpCodeModel', OtpCodeSchema);
