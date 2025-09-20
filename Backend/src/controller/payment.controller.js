import {asyncHandler} from "../utils/asyncHandler.js";
// import razorpay from "../utils/razorpay.js";
import{ ApiResponse }from "../utils/ApiResponse.js";
import crypto from "crypto";
import Order from "../model/order.model.js"
import Cart from "../model/cart.model.js"
import Product from "../model/product.model.js";
import User from "../model/user.model.js"
import { generateInvoice } from "../utils/invoiceGeneration.js";
import { sendInvoiceEmail } from "../utils/sendEmail.js";
import Razorpay from "razorpay"

export const createOrder = asyncHandler(async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
  const { amount ,shippingAddress} = req.body; 

  console.log("The the order stored in DB : ");
  console.log("Amount received from client:", amount, typeof amount);
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(new ApiResponse(200, order, "Order created successfully"));
  } catch (error) {
    console.error("Error creating order:", error);
  }
});

export const verifyRazorpaySignature = async(req, res) => {
    
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature ,shippingAddress,amount} = req.body;


    const userId = req.auth?.userId;
    const user = await User.findOne({ clerkId: userId });
    // console.log("user : ",user);
    if (!user) {
       return res.status(401).json(new ApiResponse(401,"null","Unauthorised req "));
    }
    console.log("Shipping address : ",shippingAddress);
    let cart =await Cart.findOne({user:user._id});
    if(!cart || cart.products.length===0){
        return res.status(400).json(new ApiResponse(400,null,"The cart is empty . Add items for order !"));
    }
  
    const productsWithDetails = await Promise.all(
        cart.products.map(async (item) => {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new ApiError(404, `Product with ID ${item.product} not found`);
            }
            return {
                product: product,  
                quantity: item.quantity
            };
        })
    );
  
 


    // Create expected signature by hashing order_id + "|" + payment_id with your Razorpay Secret
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare the generated signature with the one from Razorpay
    if (generated_signature === razorpay_signature) {
      // Signature matched -> Payment is verified

      const orderDB = new Order({
        user: user,
        products: productsWithDetails,
        totalAmount:amount,
        paymentStatus: "paid",
        shippingAddress
    });
    const invoiceRes = await generateInvoice(orderDB);
      await orderDB.save();
      orderDB.invoice=invoiceRes;
      await orderDB.save();
      console.log("Order : ",orderDB);
      cart.products = [];
      await cart.save();

      sendInvoiceEmail(user, invoiceRes);
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      // Signature mismatch -> Possible tampering
      const orderDB = new Order({
        user: user,
        products: productsWithDetails,
        totalAmount:amount,
        paymentStatus: "failed",
        shippingAddress
    });
    await orderDB.save();
    console.log("Order : ",orderDB);
    cart.products = [];
    await cart.save();
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
    });
  }
};