import { RealEsatate } from "../../Models/realEstate.js";

export const getData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const searchQuery = req.query.search || ''; // Get the search query from the request

  try {
    let query = {};

    // Check if startDate and endDate parameters are provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startDateWithoutTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDateWithoutTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      query.date = {
        $gte: startDateWithoutTime,
        $lte: endDateWithoutTime,
      };
    }

    // Build a query to search by name, location, and paymentId
    if (searchQuery) {
      query.$or = [
        {  mudMar: { $regex: searchQuery, $options: 'i' } }, 
        { kunaYaal: { $regex: searchQuery, $options: 'i' } }, 
        { Degmada: { $regex: searchQuery, $options: 'i' } }, 
        { Tirsi: { $regex: searchQuery, $options: 'i' } }, 
      ];
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