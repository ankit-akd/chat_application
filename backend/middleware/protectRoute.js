import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error:'unauthorized no token given'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({error:'decoded token is not authorized'});
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            res.status(401).json({error:'user not found'});
        }
        req.user = user;
        next();        
        
    } catch (error) {
        console.log('error in route protection',error.message);
        res.status(500).json({error:'not able to authenticate this route'});        
    }
};

export default protectRoute;