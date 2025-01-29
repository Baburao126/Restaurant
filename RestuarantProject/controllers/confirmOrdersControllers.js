const ConfirmOrders=require('../models/ConfirmOrders');

const addItems=async (req,res)=>{
    const {DelivaryAddress,itemNames,totalPrice,userId,DateAndTime}=req.body;
    try{

        const response= await ConfirmOrders.create({DateAndTime,DelivaryAddress,itemNames: itemNames.join(', '),totalPrice,userId,Action:'waiting'});
    
    
        return res.status(200).json(response);
        
    }
    catch(error){

        return res.status(500).json({message:'Error in adding',error:error})
    }

}

const UpdateOrders=async (req,res)=>{
    try{

        const response=await ConfirmOrders.update({Action},{where:{userId}});
        if(response.ok){
            return res.status(200).json({message:'succesfull'});
        }
    }
    catch(err){
        res.status(500).json({error:err})
    }
}

module.exports={ addItems };