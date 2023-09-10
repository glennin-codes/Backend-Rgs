import User from "../../../Models/User.js";
import bcrypt from 'bcrypt'
export const UpdateEmployee=async(req,res)=>{
try {
    const id=req.params.id;
    const password=req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee=await User.findOneAndUpdate({_id:id},{
       
        password:hashedPassword 

    },
        {new:true});
    if(employee){
        return res.status(200).json({message:"user updated successfully"})
    }else{
        return res.status(404).json({message:"user not found"})
    }
} catch (error) {
    console.error(error)
    return res.status(500).json({message:error.message})
}

}