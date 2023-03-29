import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

export default model('CategoryModel', CategorySchema);
