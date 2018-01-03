import mongoose from 'mongoose';

const medicSchema = new mongoose.Schema({
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
  },
  website: {
    type: String,
    lowercase: true
  },
  services: [{
    type: String,
    require: true,
    unique: true
  }],
  createdAt: {
    type: Date,
    default: new Date
  },
  modifiedAt: {
    type: Date,
    default: new Date
  }
});

export default mongoose.model('Medic', medicSchema);