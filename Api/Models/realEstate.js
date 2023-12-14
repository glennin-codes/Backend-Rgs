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

export async function createIndexes() {
  try {
    // Check if the text index already exists
    const existingIndexes = await RealEsatate.collection.indexes();
    console.log(existingIndexes);
    if (!existingIndexes.some(index => index.name === 'searchField_text')) {
      // Concatenate the fields you want to search
      estateSchema.virtual('searchField').get(function () {
        return this.mudMar + ' ' + this.kunaYaal + ' ' + this.Degmada + ' ' + this.Tirsi + this.location + ' ';
      });

      // Create a text index on the concatenated field
      await RealEsatate.collection.createIndex({ searchField: 'text' });
    }

    // Check if the date index already exists
    if (!existingIndexes.some(index => index.name === 'date_1')) {
      // Create an index on the date field
      await RealEsatate.collection.createIndex({ date: 1 });
    }

    console.log('Indexes checked/created successfully');
  } catch (error) {
    console.error('Error checking/creating indexes:', error);
  }
}


export default RealEsatate;
