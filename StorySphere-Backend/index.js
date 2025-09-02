import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my StorySphere');
});

// Environment Variables
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

if (!CONNECTION_URL) {
    console.error("MongoDB connection URL is not defined in the environment variables.");
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        console.log("Connected to MongoDB successfully!");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
