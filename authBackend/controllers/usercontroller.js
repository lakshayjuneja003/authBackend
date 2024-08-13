import User from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";

const signupHandler = async (req , res , next) =>{
   try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // checking if some fields are empty or not

    if(
        [email, username, password].some((field) => field?.trim() === "")
    ){
        // throw new ApiError(400 , "All Fileds are mendatory");
        return res.status(400).json({
            message:"all firlds are mendatory"
        })
    }

    const existedUser = await User.findOne({email});
    
    if(existedUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const user = await User.create({
        username , 
        email, 
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if(!createdUser){
        return res.status(400).json({
            message:"error while creating user !"
        })
    }
    return res.status(200).json({
        message : "User created succesfully",
        data: createdUser
    })
   } catch (error) {
        return res.status(400).json({
            message:"error while creating user !"
        })
   }

}
const signinHandler = async (req , res , next)=>{
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"All Fields are mendatory"
        })
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:" no user found"
        })
    }

    if(!(user.password == password)){
        return res.status(400).json({
            message:"Invalid password"
        })
    }
    
    const jwt = await user.createJWT();


    const loggedInUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
        message:"Loggged in succesfully",
        data: loggedInUser,
        jwt: jwt
    })
}

const allUsers = async (req , res , next)=>{
    try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find().limit(limit);

    return res.status(200).json(
        {
            data : users
        }
    )
    } catch (error) {
        return res.status(400).json({
            message: "Error fetching users",
            error: error.message
        })
    }
}
export {
    signinHandler,
    signupHandler,
    allUsers
}