import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  
  },
  phone: {
    type: String,
   
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentUniqueId: {
    type: String,
  },
  numberOfFamily: {
    type: Number,
  },
  landInSquareMetres: {
    type: Number,
  },
  houseNo: {
    type: String,
  },
  religion: {
    type: String,
  },
  postedBy: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
});

export const RealEsatate = mongoose.model("RealEsatate", userSchema);
