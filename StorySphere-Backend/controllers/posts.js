import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    const { page, limit } = req.query;

    try {
        const defaultPageLimit = 3;
        const Limit = Number(limit) ? Number(limit) : defaultPageLimit;
        const Page = Number(page) > 0 ? Number(page) : 1;
        const StartIndex = (Page - 1) * Limit;
        const TotalPosts = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(Limit).skip(StartIndex);

        res.status(200).json({ data: posts, currentPage: Page, numberOfPages: Math.ceil(TotalPosts / Limit) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts. Please try again.' });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(',') } }]
        });
        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(500).json({ message: 'Error searching posts. Please try again.' });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    if (!post.title || !post.message) {
        return res.status(400).json({ message: 'Title and message are required.' });
    }

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: 'Error creating post. Please try again.' });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: `No post with id: ${_id}` });
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, createdAt: new Date().toISOString() }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post. Please try again.' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No post with id: ${id}` });
    }

    try {
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({ message: `Post with id: ${id} has been deleted.` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post. Please try again.' });
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(400).json({ message: 'Unauthenticated. Access denied.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No post with id: ${id}` });
    }

    try {
        const post = await PostMessage.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error liking the post. Please try again.' });
    }
};
