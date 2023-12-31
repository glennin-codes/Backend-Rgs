
import RealEsatate from "../../Models/realEstate.js";

// Controller function to create a new user
export const createData = async (req, res) => {
  console.log(req.body)
  try {
    // Extract data from the request body
    const { 
  
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
      id,
      name, 
 location
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
      location,
      postedBy: {
        userId: id,
        userName: name,
      },
    });

    // Save the user to the database
    await newData.save();
    const data={
      name:newData.mudMar,
      id:newData._id
    }
    res.status(200).json({ message: 'Data uploaded successfully', data });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

