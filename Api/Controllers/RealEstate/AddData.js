import { RealEsatate } from "../../Models/realEstate.js";

// Controller function to create a new user
export const createData = async (req, res) => {
  try {
    // Extract data from the request body
    const { 
      id,
      name, 
      userName,
      No,
      BollectarioNo,
      Tirsi,
      BolletaNo,
      Taariikh,
      Sanadka,
      Xaafadda,
      vacant1,
      vacant2,
      mudMar,
      X,
      kunaYaal,
      Degmada,
      SoohdintiisuTahay,
      Waqooyi,
      Galbeed,
      Bari,
      kofuur,
      lacagNo,
      ee,
      Agaasimaha,
      Duqa,
     } = req.body;

    // Create a new User document
    const newData = new RealEsatate({
      No,
      BollectarioNo,
      Tirsi,
      BolletaNo,
      Taariikh,
      Sanadka,
      Xaafadda,
      vacant1,
      vacant2,
      mudMar,
      X,
      kunaYaal,
      Degmada,
      SoohdintiisuTahay,
      Waqooyi,
      Galbeed,
      Bari,
      kofuur,
      lacagNo,
      ee,
      Agaasimaha,
      Duqa,
      postedBy: {
        userId: id,
        userName: name,
      },
    });

    // Save the user to the database
    await newData.save();

    res.status(200).json({ message: 'Data uploaded successfully', data: newData });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

