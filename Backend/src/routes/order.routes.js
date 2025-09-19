import { syncUser } from "../middlewares/syncuser.middleware.js"
import { checkAdmin } from "../middlewares/checkAdmin.middleware.js"
import { Router } from "express"
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node" 
import { cancelOrder, createOrder, getAllOrders, getOrderById, getUserOrders, updateOrderStatus,testOrder } from "../controller/order.controller.js"

const orderRouter=Router();

orderRouter.post("/create-order",ClerkExpressRequireAuth(),syncUser,createOrder);

orderRouter.get("/get-user-orders",ClerkExpressRequireAuth(),syncUser,getUserOrders);

orderRouter.get("/get-order/:id",ClerkExpressRequireAuth(),syncUser,getOrderById);

// Admin
orderRouter.patch("/update-order-status/:id",ClerkExpressRequireAuth(),syncUser,checkAdmin,updateOrderStatus);

orderRouter.delete("/cancel-order/:id",ClerkExpressRequireAuth(),syncUser,cancelOrder);

// admin
orderRouter.get("/get-all-orders",ClerkExpressRequireAuth(),syncUser,checkAdmin,getAllOrders);

// test api route
orderRouter.post("/test-pdf",testOrder);
export default orderRouter;