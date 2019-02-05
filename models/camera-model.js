import mongoose from 'mongoose';

const { Schema } = mongoose;
const cameraModel = new Schema({
  _id: Number,
  camera_id: { type: Number, required: true, index: true, unique: true },
  images: [{ file_size: Number }],
});

export default mongoose.model('camera', cameraModel);
