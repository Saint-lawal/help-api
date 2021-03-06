import mongoose from 'mongoose';

const policeSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  location: {
    address: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    coords: {
      type: {
        type: String,
        default: 'point'
      },
      coordinates: []
    }
  },
  area: {
    type: String
  },
  state: {
    type: String,
    lowercase: true,
    default: 'lagos'
  },
  mobile: [{
    type: String,
    match: /^[0]\d{10}$/,
    maxLength: 11,
    minLength: 11,
    required: true,
    unique: true
  }],
  email:{
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true
  }
});

export default mongoose.model('Police', policeSchema);