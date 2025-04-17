const Admin = require('./models/adminmodel'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
require('dotenv').config(); 

exports.inviteadmin = async (req, res) => {
    const { name, email } = req.body;
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
    }

        // Create signup token with email and name
        const signupToken = jwt.sign(
        { email, name }, process.env.SECRET_KEY,{ expiresIn: '30m' }
        );
    
        // Generate signup link with base URL from env
        const signupLink = `http://localhost:${process.env.PORT}/api/admin/signup/${signupToken}`;

        // Save invited admin to database
        const invitedAdmin = new Admin({
            name,
            email,
            status: 'pending',
            inviteToken: signupToken,
            inviteExpires: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
        });
        
        await invitedAdmin.save();

        // Send response with signup link
        return res.status(200).json({ 
            message: 'Invite link generated successfully',
            signupLink,
            expiresIn: '30 minutes'
        });

    } catch (error) {
        console.error('Invite admin error:', error);
        return res.status(500).json({ message: 'Failed to generate invite link' });
    }
}; 

exports.adminsignup = async (req, res) => {
    const { password } = req.body;
    const adminInfo = req.headers.authorization;
    
    try {
        // Verify token from header
        if (!adminInfo || !adminInfo.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Invalid authorization header' });
        }

        const token = adminInfo.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { email } = decoded;

        // Find invited admin
        const invitedAdmin = await Admin.findOne({ 
            email,
            status: 'pending',
            inviteExpires: { $gt: new Date() }
        });

        if (!invitedAdmin) {
            return res.status(404).json({ 
                message: 'Invalid or expired invite. Contact SuperAdmin for a new invite.' 
            });
        }

        // Hash password and update admin
        const hashedPassword = await bcrypt.hash(password, 10);
        invitedAdmin.password = hashedPassword;
        invitedAdmin.status = 'active';
        invitedAdmin.inviteToken = undefined;
        invitedAdmin.inviteExpires = undefined;

        await invitedAdmin.save();

        return res.status(200).json({
            message: 'Admin signup successful',
            data: {
                name: invitedAdmin.name,
                email: invitedAdmin.email
            }
        });

    } catch (error) {
        console.error('Admin signup error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Server Error' });
    }
};