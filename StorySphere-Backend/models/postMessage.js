import mongoose from 'mongoose';

// Define schema for a post
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,  // Ensures the title is required
    },
    message: {
        type: String,
        required: true,  // Ensures the message is required
    },
    name: {
        type: String,
        required: true,  // Ensures the name is required
    },
    creator: {
        type: String,
        required: true,  // Ensures the creator is required
    },
    tags: {
        type: [String],  // Array of strings for tags
        default: [],  // Default to empty array if no tags provided
    },
    selectedFile: {
        type: String,
        default: '',  // Default to empty string if no file selected
    },
    likes: {
        type: [String],  // Array of strings to store user IDs who liked the post
        default: [],  // Default to empty array if no likes
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Default to current date and time
    },
});

// Create and export model based on the post schema
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
