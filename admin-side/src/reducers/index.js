import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import authReducer from "./auth.reducer";

//  we have multiple reducer so we can 
// redux only return newState only
const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
})
export default rootReducer