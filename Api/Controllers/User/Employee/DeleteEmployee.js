import User from "../../../Models/User.js"

export const DeleteEmployee=async(req,res)=>{
const id= req.params.id
try {
    const deleteUser=await User.findOneAndDelete({_id:id});
   if (deleteUser){
    return res.status(200).json({message:"user deleted successfully"})
   }
   else{
        return res.status(404).json({message:"user not found"})
    }
    
} catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Error while deleteing the user", error });

}
     
}