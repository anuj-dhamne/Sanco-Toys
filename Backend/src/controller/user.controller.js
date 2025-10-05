import User from "../model/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse} from "../utils/ApiResponse.js"
import {  clerkClient  } from "@clerk/clerk-sdk-node";

const getAlluser=asyncHandler(async(req,res)=>{
    const users=await User.find({role:"user"});
    if(!users){
        return res.status(500).json(new ApiResponse(500,users,"Users not found ! "));
    }
    return res.status(200).json(new ApiResponse(200,users,"all users get Fetched"))
});

const deleteUser=asyncHandler(async (req,res)=>{
    // console.log(" request params : ",req.params);
    const userId=req.params.id;
    // console.log(" req params (userid): ",userId );
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }
    const clerkId=user.clerkId;

    const deletedUser=await User.findByIdAndDelete(userId);
    if(!deletedUser){
        return res.status(500).json(new ApiResponse(500,null,"User not get deleted from database"));
    }
    await clerkClient.users.deleteUser(clerkId);

    return res.status(200).json(new ApiResponse(200,null,"User get deleted from databse and clerk !")) 
});

const getUserProfile =asyncHandler(async(req,res)=>{
    const userId=req.auth?.userId;
    if(!userId){
        return res.status(400).json(new ApiResponse(400,userId,"Unauthorised Request"));
    }
    let user=await User.findOne({clerkId: userId});
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res.status(200).json(new ApiResponse(200,user,"User fetch Successfully ! "));
});

const updateProfile =asyncHandler(async (req,res)=>{
    const userId=req.auth?.userId;
    if(!userId){
        return res.status(401).json(new ApiResponse(401,null,"Unauthorised Request")); 
    }
    const user=await User.findOne({clerkId: userId});
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }
    const {name,address}= req.body;

    const updatedUser=await User.findByIdAndUpdate(user._id,{
        name,address
    },{
        new:true,
        runValidators: true
    })

    if(!updatedUser){
        return res.status(500).json(new ApiResponse(500,updatedUser,"The User not get updated ! "));
    }
    return res.status(201).json(new ApiResponse(200,updatedUser,"User get updated Successfully ! "));
});

export {getAlluser,deleteUser,getUserProfile,updateProfile}