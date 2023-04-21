import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
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
);

export default model('UserModel', UserSchema);
