import { app } from "./app.js";
import connectDb from "./database/db.js";
const port = 3004;
connectDb()
.then(()=>{
    app.listen(port || 3000 , () =>{
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})