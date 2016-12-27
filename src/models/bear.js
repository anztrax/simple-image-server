import mongoose from 'mongoose';

const BearSchema = new mongoose.Schema({
  name : String
});

const BearModel = mongoose.model('Bear',BearSchema);
export default BearModel;