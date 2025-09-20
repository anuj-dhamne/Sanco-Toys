import connectDB from "./db/index.js";
import { app } from "./app.js";
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
const PORT = process.env.PORT || 4000;
connectDB()
.then(()=>{
    app.listen(PORT || 4000,"0.0.0.0",()=>{
        console.log("Server is running on ",process.env.PORT)
    })
})
.catch((err)=>{
console.log("MongoDb connection get failed",err);
})