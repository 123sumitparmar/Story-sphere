import { combineReducers } from "redux";
import posts from './posts';      // Posts reducer (no changes needed here, assuming you don't use Firebase)
import Auth from './Auth';        // Auth reducer (might involve local JWT storage, no Firebase specific code)

export default combineReducers({
    posts,                      // Posts-related state
    Auth                        // Auth-related state (manage user authentication and JWT token)
});
