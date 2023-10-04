import mongoose, { Schema } from "mongoose";
const estateSchema = new mongoose.Schema({
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

const RealEsatate = mongoose.model("RealEsatate", estateSchema);

async function createIndexes() {
  // await RealEsatate.collection.dropIndexes();

// // Concatenate the fields you want to search
// estateSchema.virtual("searchField").get(function () {
//   return this.mudMar + " " + this.kunaYaal + " " + this.Degmada + " " + this.Tirsi;
// });

// // Create a text index on the concatenated field
// await RealEsatate.collection.createIndex({ searchField: "text" });

await RealEsatate.collection.createIndex({ date: 1 });
// await RealEsatate.collection.createIndex({ mudMar: "text" }, { name: "mudMar_text_index" });
// await RealEsatate.collection.createIndex({ kunaYaal: "text" }, { name: "kunaYaal_text_index" });
// await RealEsatate.collection.createIndex({ Degmada: "text" }, { name: "Degmada_text_index" });
// await RealEsatate.collection.createIndex({ Tirsi: "text" }, { name: "Tirsi_text_index" });
//   await RealEsatate.collection.createIndex({ Degmada: "text" }); // Index for text search
//   await RealEsatate.collection.createIndex({ Tirsi: "text" }); // Index for text search
}

// Call the createIndexes function before starting your application
createIndexes().then(() => {
  console.log("Indexes created successfully");
  // Start your application or server here
}) .catch((error) => {
  console.error("Error creating index:", error);
});

export default RealEsatate;