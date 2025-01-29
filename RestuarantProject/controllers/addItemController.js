const restuarantModel=require('../models/restuarantModel');

const addItems=async (req,res)=>{
    const {itemName,itemPrice,itemImage,itemRating,itemDescription}=req.body;
    
    if (!itemName || !itemPrice || !itemImage || !itemRating || !itemDescription) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    await restuarantModel.create({itemName,itemPrice,itemImage,itemRating,itemDescription})
    .then(item=>{
        return res.status(200).json({success:'success',item:item});
    })

    .catch(err=>{
       return res.status(500).json(err);
    });
}



const getItems= async (req,res)=>{
    try{
    const response= await restuarantModel.findAll();
    if(!response){
        return res.status(500).json({message:'not able to fetch data'});
    }
    return res.status(200).json({Items:response});
    }
    catch(err){
        return res.status(500).json(err);
    }

}


const deleteItem= async (req,res)=>{
    const {item_id }=req.body;
    if(!item_id){
        console.log("item id required");
        return;
    }
    await restuarantModel.destroy({where:{item_id}})
    .then(item=>{
        res.status(200).json({message:'item delete succesfully'})
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })

}

const editItem = async (req, res) => {
    const { item_id, itemName, itemPrice, itemImage, itemRating, itemDescription } = req.body;

    try {

        await restuarantModel.update(
            { itemName, itemPrice, itemImage, itemRating, itemDescription },
            { where: { item_id } }
        );

        const updatedItem = await restuarantModel.findOne({ where: { item_id } });

     
        if (updatedItem) {
            res.status(200).json({
                message: 'successfully updated',
                item: [updatedItem] 
            });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports={addItems,getItems,deleteItem,editItem};

