import RealEsatate from "../../Models/realEstate.js";


// Controller function to edit a user by ID
export const editData = async (req, res) => {
  try{  
  
const dataId=req.params.id;

    const updateData = req.body; // Extract the data to update from the request body

    // Use $set to update only the fields present in req.body
    const updatedData = await RealEsatate.findByIdAndUpdate(
      dataId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.status(200).json({ message: 'Data updated successfully', data: updatedData });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
