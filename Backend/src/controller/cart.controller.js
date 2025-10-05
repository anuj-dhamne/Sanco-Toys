import Cart from "../model/cart.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Product from "../model/product.model.js"
import User from "../model/user.model.js"
import mongoose from "mongoose"



const addToCart = asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
  
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return new res.status(401).json(401, "Unauthorized request!");
    }
  
    const productId = req.params.id;
    const { quantity } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return new res.status(400).json(400, "Invalid product ID");
    }
  
    const product = await Product.findById(productId);
    if (!product) {
      return new res.status(404).json(404, "Product not found!");
    }
  
    let cart = await Cart.findOne({ user: user._id });
  
    if (!cart) {
      cart = new Cart({ user: user._id, products: [] });
    }
  
    const existingProductIndex = cart.products.findIndex(
      (item) => item.product._id.toString()===product._id.toString()
    );
  
    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        product: product,
        quantity,
      });
    }
  
    await cart.save();
  
    return res.status(200).json(
      new ApiResponse(200, cart, "Product added to cart successfully!")
    );
  });

const removeFromCart=asyncHandler(async(req,res)=>{
    const userId=req.auth?.userId;
    // console.log("userID :",userId);
    const user=await User.findOne({clerkId:userId});
    if(!user){
        return res.status(401).json(new ApiResponse(401,null,"Unauthorised req !"));
    }
    // console.log("User : ",user);
    const  productId  = req.params.id;

    let cart = await Cart.findOne({ user: user._id});
    // console.log("Cart : ",cart);
    if (!cart) {
        return res.status(404).json(new ApiResponse(404, null, "Cart not found"));
    }
    const itemIndex =cart.products.findIndex(item=>item.product._id.toString()===productId);
    // console.log("ItemIndex : ",itemIndex);
    if(itemIndex>-1){
        cart.products.splice(itemIndex,1);
    }else{
      return res.status(404).json(new ApiResponse(404,null,"This item is already absent in cart"));
    }
   
    await cart.save();
    // console.log(" Cart after delete element : ",cart);
    return res.status(200).json(new ApiResponse(200, cart, "Product removed from cart"));
});

const getCart=asyncHandler(async(req,res)=>{
    const userId=req.auth?.userId;
    const user= await User.findOne({clerkId: userId});
    if(!user){
        return res.status(401).json(new ApiResponse(401,null,"Unauthorised user !"));
    }

    const cart=await Cart.findOne({user: user._id});

    if(!cart || cart.products.length === 0){
        return res.status(404).json(new ApiResponse(404,null,"No items in a cart ! "));
    }
    // console.log("cart : ",cart);
    return res.status(200).json(new ApiResponse(200,cart,"Cart fetched Successfully ! "));
});

const updateCartItem=asyncHandler(async(req,res)=>{
  // console.log("In update function")
    const userId=req.auth?.userId;
    const user=await User.findOne({clerkId:userId});
    if(!user){
        return res.status(401).json(new ApiResponse(401,null,"Unauthorised req !"));
    }
    const productId=req.params.id;
    const {quantity}=req.body;

    let cart =await Cart.findOne({user:user._id});
    // console.log("cart : ",cart);
    if(!cart){
        return res.status(404).json(new ApiResponse(404,null,"cart not found !"));
    }
    const itemIndex =cart.products.findIndex(item=>item.product._id.toString()===productId);
    // console.log("Item : ",itemIndex);
    
    if(itemIndex>-1){
     cart.products[itemIndex].quantity=quantity;
    }else{
      return res.status(404).json(new ApiResponse(404,null,"no such item"));
    }
    await cart.save();
    // console.log("The updated cart : ",cart);
    return res.status(200).json(new ApiResponse(200,cart,"Cart updated Successfully ! "));
});

const clearCart=asyncHandler(async(req,res)=>{
    const userId=req.auth?.userId;
    const user=await User.findOne({clerkId:userId});
    if(!user){
        return res.status(401).json(new ApiResponse(401,null,"Unauthorised req !"));
    }

    const cart=await Cart.findOne({user:user._id});
    if(!cart){
        return res.status(404).json(new ApiResponse(404,null,"the cart is already empty ! "));
    }
    cart.products=[];
    await cart.save();
    return res.status(200).json(new ApiResponse(200,cart,"cart cleared successfully ! "));
});


export {addToCart,removeFromCart,getCart,updateCartItem,clearCart}