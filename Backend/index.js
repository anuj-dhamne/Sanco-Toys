import connectDB from "./db/index.js";
import { app } from "./app.js";
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node"
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log("Server is running on ",process.env.PORT)
    })
})
.catch((err)=>{
console.log("MongoDb connection get failed",err);
})