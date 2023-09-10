// Used to get all admins
import User from "../../../Models/User.js";

export const getAllAdmins=async(req,res)=>{
    try{
        const admins=await User.find({role:"user"});
        if(admins){
            return res.status(200).json({message:"Admins fetched successfully",admins})
        }
      else{
            return res.status(404).json({message:"No Admins found"})
      }
    }catch(error){
        
        return res.status(500).json({message:"Error fetching admins",error})
    }
}