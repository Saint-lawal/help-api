import mongoose from 'mongoose';

const policeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Location: {
    address: {
      type: String,
      required
    },
    coords: {
      type: {
        type: String,
        default: 'point'
      },
      coordinates: []
    }
  },
  mobile: {
    type: 'string',
    match: /^[0]\d{10}$/,
    maxLength: 11,
    minLength: 11,
    unique: true
  }
});