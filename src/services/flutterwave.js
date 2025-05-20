require('dotenv').config();
const axios = require('axios');
const User = require('../models/usermodel');

const generatePaymentLink = async (email) => {
    try {
        const user = await User.findById(email);
        if (!user) {
            throw new Error("User not found");
        }

        const response = await axios.post(
            'https://api.flutterwave.com/v3/payments',
            {
                tx_ref: `TX_${user.email}_${Date.now()}`,
                amount: user.savingAmount,
                currency: 'NGN',
                redirect_url: 'http://localhost:4900/auth/google/dashboard',
                customer: {
                    email: user.email,
                    name: user.firstName,
                    phonenumber: "N/A"
                },
                customizations: {
                    title: 'Bookly Payment',
                    description: 'Payment for saved items on Bookly',
                    logo: 'https://res.cloudinary.com/dwx1tdonc/image/upload/v1745532815/ChatGPT_Image_Apr_24_2025_11_10_53_PM_ktlsmn.png',
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Payment link generated:', response.data.data.link);
        return response.data.data.link;
    } catch (err) {
        console.error('Error generating payment link:', err.response?.data || err.message);
        throw err;
    }
};

module.exports = { generatePaymentLink };

