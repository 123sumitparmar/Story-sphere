
import bcrypt from 'bcrypt'; // Ensure bcrypt is correctly installed and imported
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import dotenv from 'dotenv';

dotenv.config();

// Helper function to validate email format
const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

// Signin function
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate email format
        if (!validateEmailFormat(email)) {
            return res.status(400).json({ message: 'Invalid email format!' });
        }

        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password.trim(), existingUser.password);
        console.log("Plaintext password (signin):", password.trim());
        console.log("Stored hash (signin):", existingUser.password);
        console.log("Password comparison result:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password!' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the user info and the token
        res.status(200).json({
            result: { name: existingUser.name, email: existingUser.email },
            token,
            message: 'Signin successful',
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Something went wrong during signin.' });
    }
};

// Signup function
export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Validate email format
        if (!validateEmailFormat(email)) {
            return res.status(400).json({ message: 'Invalid email format!' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password.trim(), 10);
        console.log("Plaintext password (signup):", password.trim());
        console.log("Hashed password (signup):", hashedPassword);

        // Save the new user
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the user info and the token
        res.status(201).json({
            result: { name: newUser.name, email: newUser.email },
            token,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Something went wrong during signup.' });
    }
};


