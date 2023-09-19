import { RealEsatate } from "../../Models/realEstate.js";

// Controller function to create a new user
export const createData = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, phone, location, paymentUniqueId, numberOfFamily, landInSquareMetres, houseNo, religion } = req.body;

    // Create a new User document
    const newData = new RealEsatate({
      name,
      phone,
      location,
      paymentUniqueId,
      numberOfFamily,
      landInSquareMetres,
      houseNo,
      religion,
    });

    // Save the user to the database
    await newData.save();

    res.status(201).json({ message: 'Data uploaded successfully', data: newData });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

