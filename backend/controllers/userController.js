import User from "../models/user.js";

export const getUserForSidebar = async (req,res) => {
    try {
        const loggedinUser = req.user._id;
        const filteredUser = await User.find({_id:{$ne:loggedinUser}}).select('-password');
        
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log('error in getUserForSidebar',error.message);
        res.status(401).json({error:'find out why did error occurred'});        
    }
};