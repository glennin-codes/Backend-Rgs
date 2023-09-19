import { RealEsatate } from "../../Models/realEstate.js";

export const getSingleData=async()=>{
    try {
        const id =req.params.id
        const data=await RealEsatate.findOne({
            _id:id
        });
        if(!data){
            res.status(
                404).json({
                   message:"data not found"
                });
        }else{
            res.status(200).json({
                data:data
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
           message:e
        })
    }
}