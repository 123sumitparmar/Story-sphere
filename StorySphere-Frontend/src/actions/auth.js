import * as api from '../api'; // API calls to your backend
import { AUTH } from '../constants/ActionTypes';
import swal from 'sweetalert';

// Sign In Action
export const signIn = (user) => async (dispatch) => {
    try {
        const { data } = await api.signIn(user); // Call to your backend API for signing in
        const result = data.result;
        const token = data.token;

        // Dispatch authentication data to Redux store
        dispatch({
            type: AUTH,
            data: { result, token }
        });

        // Success alert
        swal({
            title: "Signed In Successfully!",
            icon: "success",
        });

    } catch (error) {
        // Error alert
        swal({
            title: `Error: ${error}`,
            text: `${error.message}`,
            icon: "warning",
        });
    }
};

// Sign Up Action
export const signUp = (user) => async (dispatch) => {
    try {
        const { data } = await api.signUp(user); // Call to your backend API for signing up
        const result = data.result;
        const token = data.token;

        // Dispatch authentication data to Redux store
        dispatch({
            type: AUTH,
            data: { result, token }
        });

        // Success alert
        swal({
            title: "Registered Successfully!",
            icon: "success",
        });

    } catch (error) {
        // Error alert
        swal({
            title: `Error: ${error}`,
            text: `${error.message}`,
            icon: "warning",
        });
    }
};
