import { RealEsatate } from "../../Models/realEstate.js";

export const getData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    let query = {}; // Initialize an empty query object

    // Check if startDate and endDate parameters are provided
    if (startDate && endDate) {
      query.dateField = {
        $gte: new Date(startDate), // Greater than or equal to start date
        $lte: new Date(endDate),   // Less than or equal to end date
      };
    }

    const skip = (page - 1) * limit;
    const items = await RealEsatate.find(query)
      .skip(skip)
      .limit(limit);

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
