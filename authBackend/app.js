import express from  "express";
import route from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
// app.use(bodyparser());

app.use("/api/vi/users" ,route);

export {app};