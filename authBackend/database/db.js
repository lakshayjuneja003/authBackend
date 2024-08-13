import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://lakshayjuneja003:lakshayjuneja003@cluster0.djmep22.mongodb.net/user")
        console.log(`\\Db connected to ${connectionInstance.Connection}`);
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default connectDb;