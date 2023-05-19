import { Schema, model } from 'mongoose';

const CardSchema = new Schema(
  {
    cardName: {
      type: String,
      require: true,
      unique: false,
    },
    image: {
      type: String,
      require: true,
      unique: true,
    },
    createdAt: {
      type: String,
      require: true,
      unique: false,
    },
    isFavourite: {
      type: Boolean,
      require: true,
      unique: false,
    },
    userId: {
      type: String,
      require: true,
      unique: true,
    },
    rating: {
      type: Number,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('CardModel', CardSchema);
