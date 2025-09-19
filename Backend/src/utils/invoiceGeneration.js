import easyinvoice from "easyinvoice";
import fs from "fs/promises";
import Product from "../model/product.model.js";  
import User from "../model/user.model.js";

const generateInvoice = async (order) => {
    const user = await User.findById(order.user);

    const detailedProducts = await Promise.all(
        order.products.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
                quantity: item.quantity,
                description: product?.name || "Unknown Product",
                price: product?.price || 0
            };
        })
    );

    const shippingCharge = 40;

    // Add shipping as a separate line item
    detailedProducts.push({
        quantity: 1,
        description: "Shipping Charges",
        price: shippingCharge
    });

    const data = {
        documentTitle: "Invoice",
        currency: "INR",
        sender: {
            company: "Sanco Toys",
            address: "A 106 & 107,H Block,MIDC Pimpri",
            zip: "411018",
            city: "Pune",
            country: "India"
        },
        client: {
            company: ` ${user.name}\n \n${user.email}\n${user.phoneNumber}`,
            address: order.shippingAddress,
            country: "India"
        },
        invoiceNumber: order._id.toString(),
        invoiceDate: new Date().toISOString().split("T")[0],
        products: detailedProducts,
        bottomNotice: `Invoice No: ${order._id} | Date: ${new Date().toISOString().split("T")[0]}`
    };
    

    const result = await easyinvoice.createInvoice(data);
    // return result.pdf;
    // const result = await easyinvoice.createInvoice(data);

    const reportsDir = 'reports';
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    const outputPath = path.join(reportsDir, `Monthly_Report_${user._id}_${Date.now()}.pdf`);
    fs.writeFileSync(outputPath, result.pdf, 'base64');

    return result.pdf;
};

export { generateInvoice };
