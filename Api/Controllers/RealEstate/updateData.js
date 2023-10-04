import RealEsatate from "../../Models/realEstate.js";

// Controller function to edit a user by ID
export const editData = async (req, res) => {
    try {
      const dataId = req.params.id; // Extract the user ID from the request parameters
      const updateData = req.body; // Extract the data to update from the request body
  
      // Find the user by ID and update their data
      const updatedData = await RealEsatate.findByIdAndUpdate(dataId, updateData, { new: true });
  
      if (!updatedData) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'Data updated successfully', data: updatedData });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  