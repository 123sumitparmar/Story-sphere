import axios from 'axios';

const API = axios.create({ baseURL: 'https://memories-backend.up.railway.app/' });

// Intercept requests to add Authorization header if user is logged in
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// API endpoints
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchTitle, tags) => API.get(`/posts/search?searchQuery=${searchTitle || 'none'}&tags=${tags || 'none'}`);
export const createPost = (newPost) => API.post(`/posts`, newPost);  // newPost is FormData in frontend
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (user) => API.post(`/user/signin`, user);
export const signUp = (user) => API.post(`/user/signup`, user);
