import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST, FETCH_BY_SEARCH, LOAD_PAGE } from '../constants/ActionTypes';

const initialState = {
  posts: [], // Holds the list of posts
  currentPage: 1, // Default to page 1
  numberOfPages: 1, // Default to 1 page
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PAGE:
      return { ...state, posts: null }; // Optional, depending on how you handle the 'page' loading

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload], // Adding new post to the list
      };

    default:
      return state;
  }
};
