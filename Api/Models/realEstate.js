import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
  No: { 
    type: String
   },
  BollectarioNo: {
    type: String,
  },
  Tirsi: {
    type: String,
  },
  BolletaNo: {
    type: String,
  },
  Taariikh: {
    type: String,
  },

  Sanadka: {
    type: String,
  },
  Xaafadda: {
    type: String,
  },
  vacant1: {
    type: String,
  },
  vacant2: {
    type: String,
  },
  mudMar: {
    type: String,
  },
  X: {
    type: String,
  },
  kunaYaal: {
    type: String,
  },
  Degmada: {
    type: String,
  },
  SoohdintiisuTahay: { 
    type: String 
  },
  Waqooyi: {
    type: String,
  },
  Galbeed: {
    type: String,
  },
  Bari: {
    type: String,
  },
  kofuur: {
    type: String,
  },
  lacagNo: {
    type: String,
  },
  ee: {
    type: String,
  },
  Agaasimaha: {
    type: String,
  },
  Duqa: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
  },
});

export const RealEsatate = mongoose.model("RealEsatate", userSchema);
