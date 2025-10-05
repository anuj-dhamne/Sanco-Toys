import Product from "../model/product.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

// Admin
const createProduct=asyncHandler(async(req,res)=>{
    const {name,description,price,stock,category,discount} = req.body;
    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }


    const imageUrls = await Promise.all(req.files.images.map(file => uploadOnCloudinary(file.path)));
    // console.log("image upload to cloudinary ! ");
    
    let videoUrls=[];
    if( req.files.videos){
        videoUrls = await Promise.all(req.files.videos.map(file => uploadOnCloudinary(file.path)));
    }
    
    // console.log("video upload to cloudinary ")
    const createdProduct = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        discount,
        images: imageUrls,
        videos: videoUrls,
    });

    // console.log("Product created ",createdProduct);
    
    if(!createProduct){
        return res.status(500).json(500,null,"Error in Createing product !");
    }
    return res.status(201).json(new ApiResponse(201, createdProduct, "Product created successfully"));
});

const getAllProduct=asyncHandler(async(req,res)=>{
    const products = await Product.find();

    if (!products || products.length === 0) {
        return res.status(404).json(new ApiResponse(404, null, "No products found"));
    }

    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
const getProductById=asyncHandler(async(req,res)=>{
    const  productId  = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }

    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});


// Admin

const updateProduct=asyncHandler(async(req,res)=>{
    // console.log("just enter in update function");
    const productId = req.params.id;
    const { name, description, price, stock, category,discount } = req.body;
    // console.log("req body : ",req.body);
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }
    // console.log("product found in DB : ",product);
    let imageUrl = product.images;
    if (req.file) {
        imageUrl = await uploadOnCloudinary(req.file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, stock, category, images: imageUrl,discount },
        { new: true, runValidators: true }
    );
    // console.log("Updated Product : ",updatedProduct);
    

    return res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});
// Admin
const deleteProduct=asyncHandler(async(req,res)=>{
    const  productId  = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }
    await Product.findByIdAndDelete(productId);
    // console.log("product deleted ! ");
    return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});


export {createProduct,getAllProduct,getProductById,updateProduct,deleteProduct};