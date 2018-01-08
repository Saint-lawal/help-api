import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  webpage: {
    type: String
  },
  title: {
    type: String,
    required: true,
    enum: ['armed-robbery', 'kidnapping', 'human-trafficking', 'advanced-fee-fraud', 'arms-trafficking', 'others']
  },
  content: {
    type: String,
    required: true
  },
  file: {
    format: {
      type: String
    },
    url: {
      type: String
    }
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  closed: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Report', reportSchema);