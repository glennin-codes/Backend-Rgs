import RealEsatate from "../../Models/realEstate.js";

export const getData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const searchQuery = req.query.search || ''; // Get the search query from the request
  const locationQuery = req.query.l || ''; 

  try {
// Initialize an empty query
let query = {};
let locationSearchPerformed = false;
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

// Check if a location is specified
if (locationQuery) {
  // If the date range is already specified, narrow down the results within that range
  if (!query.date) {
    query.$text = { $search: locationQuery };
   locationSearchPerformed=true;
  } 
  // Check if a name (MudMar) search is specified
  if (searchQuery) {
    if(!locationSearchPerformed){
         
     
      // Use a regex search for the specified name within the specified location and dates
    query.$and = [
      { $or: [
        { mudMar: { $regex: searchQuery, $options: 'i' } }, 
       { kunaYaal: { $regex: searchQuery, $options: 'i' } }, 
       { Degmada: { $regex: searchQuery, $options: 'i' } }, 
       { Tirsi: { $regex: searchQuery, $options: 'i' } }, 
     ]},
     
    ];
    }else{
       query.$text = { $search: locationQuery };
      query.$and = [
        { $or: [
           { mudMar: { $regex: searchQuery, $options: 'i' } }, 
          { kunaYaal: { $regex: searchQuery, $options: 'i' } }, 
          { Degmada: { $regex: searchQuery, $options: 'i' } }, 
          { Tirsi: { $regex: searchQuery, $options: 'i' } }, 
        ]},
      ];
    }
   
  }
} else if (searchQuery) {

  // query.$text = { $search: searchQuery};

  const regex = new RegExp(searchQuery, "i"); // case-insensitive
  // If no location is specified, use the compound text index for the name search
  query.$and =[
    {
      mudMar: { $regex: regex }, // regex search on mudMar
    },
   
   
  ]
}

// Now 'query' contains the dynamic conditions based on the provided parameters


// Now 'query' contains the dynamic conditions based on the provided parameters

    // if(locationQuery){
    //   query.location=locationQuery;
    // }
    
    // if (searchQuery) {
    //   query.$or = [
    //     {  mudMar: { $regex: searchQuery, $options: 'i' } }, 
    //     { kunaYaal: { $regex: searchQuery, $options: 'i' } }, 
    //     { Degmada: { $regex: searchQuery, $options: 'i' } }, 
    //     { Tirsi: { $regex: searchQuery, $options: 'i' } }, 
    //     { location: { $regex: searchQuery, $options: 'i' } }, 
    //   ];
    // }
  




    const totalItems = await RealEsatate.countDocuments(query);
    const skip = (page - 1) * limit;
    const items = await RealEsatate.find(query)
      .skip(skip)
      .limit(limit);

      if (items.length > 0) {
        res.status(200).json({ items, totalItems, message: "Fetched successfully" });
      } else {
        res.status(404).json({ message: "No items found" });
      }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
