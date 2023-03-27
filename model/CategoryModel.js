import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
})
export default mongoose.model('CategoryModel', CategorySchema)
