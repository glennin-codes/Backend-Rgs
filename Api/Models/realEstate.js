import mongoose, { Schema } from "mongoose";
const estateSchema = new mongoose.Schema({
  No: {
    type: String,
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
    type: String,
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
  location: {
    type: String
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
  

  // Concatenate the fields you want to search
  estateSchema.virtual("searchField").get(function () {
    return this.mudMar + " " + this.kunaYaal + " " + this.Degmada + " " + this.Tirsi + this.location + " ";
  });

  // Create a text index on the concatenated field
  await RealEsatate.collection.createIndex({ searchField: "text" });

  await RealEsatate.collection.createIndex({ date: 1 });
 
}

// Call the createIndexes function before starting your application
createIndexes()
  .then(() => {
    console.log("Indexes created successfully");
    // Start your application or server here
  })
  .catch((error) => {
    console.error("Error creating index:", error);
  });

export default RealEsatate;
