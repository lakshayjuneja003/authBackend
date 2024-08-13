import jwt from"jsonwebtoken"
import User from "../models/userModel.js"
const jwtSecret = "cheen dabak dam dam";


const authenticateUser = async (req , res , next)=>{
    try {
    const token = req.query.token;
    if(!token){
        return res.status(400).json({
            message:"invalid Token" 
        })
    }

    const decodUser = jwt.verify(token , jwtSecret);

    const user = await User.findById(decodUser._id);
    if(!user){
        return res.status(401).json({
            message: "Invalid token. User not found."
        });
    }
    // Attach user to request object for use in other routes
    req.user = user;

    // Continue to the next middleware or route handler
    next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid token.",
            error: error.message
        });
    }
}

export default authenticateUser;

