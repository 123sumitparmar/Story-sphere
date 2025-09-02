import * as api from '../api'; // API calls to your backend
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST, FETCH_BY_SEARCH } from '../constants/ActionTypes';

// Fetch all posts (with pagination)
export const getPosts = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page);  // Call to your backend API
        dispatch({
            type: FETCH_ALL,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
};

// Fetch posts by search (search title and tags)
export const getPostsBySearch = (searchTitle, tags) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostsBySearch(searchTitle, tags); // Call to your backend API
        dispatch({
            type: FETCH_BY_SEARCH,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
};

// Create a new post (with file upload if necessary)
export const createPost = (post) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('message', post.message);
        formData.append('tags', post.tags);
        
        if (post.selectedFile) {
            formData.append('selectedFile', post.selectedFile); // Append the file for Multer handling
        }

        const { data } = await api.createPost(formData); // Post data with the form-data containing file
        dispatch({
            type: CREATE,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
};

// Update an existing post (with file upload if necessary)
export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('title', updatedPost.title);
        formData.append('message', updatedPost.message);
        formData.append('tags', updatedPost.tags);

        if (updatedPost.selectedFile) {
            formData.append('selectedFile', updatedPost.selectedFile); // Append the updated file if any
        }

        const { data } = await api.updatePost(id, formData); // Update post with form-data
        dispatch({
            type: UPDATE,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
};

// Delete a post
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id); // Call to delete the post from backend
        dispatch({
            type: DELETE,
            payload: id
        });
    } catch (error) {
        console.log(error);
    }
};

// Like a post
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id); // Call to like the post in backend
        dispatch({
            type: LIKE_POST,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
};
