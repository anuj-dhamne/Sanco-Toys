import { syncUser } from "../middlewares/syncuser.middleware.js"
import { checkAdmin } from "../middlewares/checkAdmin.middleware.js"
import { Router } from "express"
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node"
import { createOrder, verifyRazorpaySignature } from "../controller/payment.controller.js";

const paymentRouter=Router();

paymentRouter.post("/create-order",ClerkExpressRequireAuth(),syncUser,createOrder);

paymentRouter.post("/verify",ClerkExpressRequireAuth(),syncUser,verifyRazorpaySignature);

export default paymentRouter;