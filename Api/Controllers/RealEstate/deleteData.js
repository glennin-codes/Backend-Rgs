import { RealEsatate } from "../../Models/realEstate.js";

export const deleteData=async(req,res)=>{
    try {
        

        const id=req.params.id;
        const result=await RealEsatate.findOneAndDelete({
            _id:id
        });
        if(result){
            res.status(200).json({
                message:"Deleted Successfully"
            })
        }else{
            res.status(404).json({
                message:"data Not Found"
            })
        }
    }
     catch (error) {
        console.error(error)
        res.status(500).json({
           message:error
        });
    }
}