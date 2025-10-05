import Order from "../model/order.model.js"
import Product from "../model/product.model.js"
import Cart from "../model/cart.model.js"
import User from "../model/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendInvoiceEmail } from "../utils/sendEmail.js"

const createOrder = asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
    const user = await User.findOne({ clerkId: userId });
    // console.log("user : ",user);
    if (!user) {
        return res.status(401).json(new ApiResponse(401, "null", "Unauthorised req "));
    }
    const { shippingAddress } = req.body;
    // console.log("Shipping address : ", shippingAddress);
    let cart = await Cart.findOne({ user: user._id });
    if (!cart || cart.products.length === 0) {
        return res.status(400).json(new ApiResponse(400, null, "The cart is empty . Add items for order !"));
    }

    let totalAmount = 0;
    const productsWithDetails = await Promise.all(
        cart.products.map(async (item) => {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new ApiError(404, `Product with ID ${item.product} not found`);
            }
            totalAmount += product.price * item.quantity;
            return {
                product: product._id,  // Store only product ID
                quantity: item.quantity
            };
        })
    );
    // console.log("Total Amount:", totalAmount);

    const order = new Order({
        user: user._id,
        products: productsWithDetails,
        totalAmount,
        paymentStatus: "pending",
        shippingAddress
    });
    await order.save();
    // console.log("Order : ", order);
    cart.products = [];
    await cart.save();

    res.status(201).json(new ApiResponse(201, order, "Order placed successfully!"));
});

const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return res.status(401).json(new ApiResponse(401, "null", "Unauthorised req "));
    }

    let orders = await Order.find({ user: user });


    res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully!"));
});

const getOrderById = asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return res.status(401).json(new ApiResponse(401, "null", "Unauthorised req "));
    }
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json(new ApiResponse(404, order, "The order is not found !"));
    }
    return res.status(200).json(new ApiResponse(200, order, "The order by id get fetched successfully ! "));

});

const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return res.status(401).json(new ApiResponse(401, null, "Unauthorised request ! "));
    }
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId, user: user._id });
    if (!order) {
        return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    if (order.orderStatus !== "processing") {
        return res.status(400).json(new ApiResponse(400, null, "Order cannot be canceled after processing starts."))
    }

    await order.deleteOne();
    res.status(200).json(new ApiResponse(200, null, "Order canceled successfully!"));

});
// Admin 

const updateOrderStatus = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json(new ApiResponse(200, order, "Order status updated successfully!"));
});

const getAllOrders = asyncHandler(async (req, res) => {
    const allOrder = await Order.find();
    if (!allOrder) {
        return res.status(404).json(new ApiResponse(404, allOrder, "There is no orders yet !"));
    }
    return res.status(200).json(new ApiResponse(200, allOrder, "All orders are get fetched ! "));
});



export {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus,
    getAllOrders,
}