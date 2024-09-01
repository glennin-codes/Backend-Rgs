import { RealEsatate } from "./Models/realEstate.js";
import dummyData from "./dummydata.js";

const populate =async()=>{
    try {
//         const batchSize = 1; // Adjust the batch size as needed
// for (let i = 0; i < dummyData.length; i += batchSize) {
//   const batch = dummyData.slice(i, i + batchSize);
//   await RealEsatate.insertMany(batch,{ timeout: 60000 });
// }
// const bulkOps = [];
// for (const doc of dummyData) {
//   bulkOps.push({
//     insertOne: {
//       document: doc,
//     },
//   });
// }

// await RealEsatate.bulkWrite(bulkOps, { ordered: false });
const dataToInsert = req.body;
const insertedData = await RealEsatate.insertMany(dataToInsert);

// await RealEsatate.insertMany(dummyData,{ timeout: 60000 });
        console.log('Dummy data inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
}
populate();