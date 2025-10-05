
import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';

const sendInvoiceEmail = async (user,pdfPath) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from:  `"Sanco Toys" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "🧾 Your Invoice is Ready! ",
        html: `
        <h2>Thank you for your purchase!</h2>
        <p>Your invoice is attached. If you have any questions, feel free to <a href="mailto:${process.env.EMAIL_USER}">contact us</a>.</p>
    `,
     attachments: [
            {
                filename: `Invoice_${user.name}.pdf`,
                path: path.resolve(pdfPath),
                contentType: 'application/pdf'
            }
        ],

        replyTo: process.env.EMAIL_USER  
    };

    await transporter.sendMail(mailOptions);
};

export {sendInvoiceEmail}

