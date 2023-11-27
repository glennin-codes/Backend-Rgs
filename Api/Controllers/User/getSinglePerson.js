import User from "../../Models/User.js";

export const getSinglePerson=async(req,res)=>{

    try {
        
        let person = await User.findById({_id: req.params.id});
        if(!person){
            return res.status(404).json({message:"No person found"})
        }
      
        return res.status(200).json({message:"Person fetched successfully",person})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'something went wrong ,we are working on it'})
    }
}