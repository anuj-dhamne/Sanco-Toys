import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node"
import { syncUser } from "./middlewares/syncUser.middleware.js"
const app= express();
import { sendInvoiceEmail } from "./utils/sendEmail.js"

app.use(cors({
    // origin:process.env.CORS_ORIGIN,
    origin: [
    "https://www.sancotoys.shop",
    "https://sancotoys.shop"
  ],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

// Time pass email sending check 
// sendInvoiceEmail("anujcode10@gmail.com")
//     .then((res) => console.log("Invoice email sent successfully!",res))
//     .catch((error) => console.error("Error sending invoice email:", error));

    app.get("/api/v1/sync-user", ClerkExpressRequireAuth(), syncUser, (req, res) => {
      res.status(200).json({
        success: true,
        message: "User synced successfully",
        user: req.user,
      });
    });
    


// import user routes 
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter);

// import product route 
import productRouter from "./routes/product.routes.js"
app.use("/api/v1/product",productRouter);

// import cart route 
import cartRouter from "./routes/cart.routes.js"
app.use("/api/v1/cart",cartRouter);

// import order route 
import orderRouter from "./routes/order.routes.js"
app.use("/api/v1/order",orderRouter);

// import payment routes
import paymentRouter from "./routes/payment.routes.js"
app.use("/api/v1/payment",paymentRouter);


  export {app};