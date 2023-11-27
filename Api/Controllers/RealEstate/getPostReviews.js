import RealEsatate from "../../Models/realEstate.js";
import moment from "moment-timezone";

export const getPostReviewData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search || ''; // Get the search query from the request
  const id = req.params.id;

  console.log(id);

  try {
    let query = {};
    
  

    const timezone = 'Africa/Mogadishu';

    // Use moment-timezone to get the current date and time in the specified time zone
    const now = moment().tz(timezone);
    // Calculate the start and end time for the working hours of the current day
    const startOfDay = now.clone().startOf('day');
    const startTime = startOfDay.clone().add(8, 'hours'); // 8:00 AM
    const endTime = startOfDay.clone().add(17, 'hours'); // 5:00 PM\
    query.date = { $gte: startTime.toDate(), $lt: endTime.toDate() };
     
    if (searchQuery ) {
      query.$or = [
        {  mudMar: { $regex: searchQuery, $options: 'i' } }, 
        { kunaYaal: { $regex: searchQuery, $options: 'i' } }, 
        { Degmada: { $regex: searchQuery, $options: 'i' } }, 
        { Tirsi: { $regex: searchQuery, $options: 'i' } }, 
        
      ];
    }
    const totalItems = await RealEsatate.countDocuments({  ...query,
      'postedBy.userId': id});
    const skip = (page - 1) * limit;
    const items = await RealEsatate.find({
      ...query,
      'postedBy.userId': id,
    })
      .skip(skip)
      .limit(limit);
      if (items.length > 0) {
        res.status(200).json({ items, totalItems, message: "Fetched successfully" });
      } else {
        res.status(404).json({ message: "No items found" });
      }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
