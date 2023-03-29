import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
    userName: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
      require: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model('PostModel', PostSchema);
