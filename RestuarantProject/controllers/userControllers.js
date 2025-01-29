const userModel=require('../models/userModel');

const addUser=async (req,res)=>{
    try{
        const{userName,userEmail,userPassword,userConfirmPassword}=req.body;
        if (!userName || !userEmail || !userPassword ) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        await userModel.create({userName,userEmail,userPassword,userConfirmPassword})
        .then(user=>{
            res.status(200).json({user:user});
        })
        .catch(err=>{
            res.status(500).json({error:err});
        })
        
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err,Message:'error in catch'});
    }
};

const getUser  = async (req, res) => {
    try {
        const { userEmail, password } = req.body; 
        const user = await userModel.findOne({ where: { userEmail } });

        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }
        if (user.userPassword !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        return res.status(200).json({ user: user });
    } catch (err) {
        console.error('Error in getUser :', err);
        return res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};



module.exports={addUser,getUser};