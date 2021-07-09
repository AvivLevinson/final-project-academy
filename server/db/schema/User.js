const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  expoToken: {
    type: String,
  },
  id: {
    type: String,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  birthday: {
    day: {
      type: String,
      trim: true,
    },
    month: { type: String, trim: true },
    year: { type: String, trim: true },
  },
  age: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
  },
  location: {
    address: {
      type: String,
      trim: true,
    },
    cords:{ 
      lat: {
      type: String,
      trim: true,
    },
    lon: {
      type: String,
      trim: true,
    },

    }
   
  },
  covidResult: {
    positive:{
      type: String,
      trim: true,
    },
    withSymptoms:{
      type: String,
      trim: true,
    }
    
  },
  date:{
    startInsulation: {
      type: String,
      trim: true,
    },
    endInsulation: {
      type: String,
      trim: true,
    },
    days:{
      type: String,
      trime: true
    },

  },
  image: {
    type: String,
  },
  isCompleteLoginProcess: {
    type: Boolean,
  },
  isLogin: {
    type: Boolean,
  },
  collaborator: {
    type: String,
    default: "Collaborator",
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
