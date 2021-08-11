import { messageConstants, registerationConstant } from "../actions/constant";

const initialState = {
    usersList: [],
    loading: true,
    error: null
}
const userReducer = (state = initialState, action) => {
    // return always new state from current state
    // return state+1 
    console.log("----> hello", action);
    switch (action.type) {
        case registerationConstant.USER_RESISTERATATION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case registerationConstant.USER_RESISTERATATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                action: action.payload.message
            }
            break;
        case registerationConstant.USER_RESISTERATATION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case registerationConstant.GET_ALL_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case registerationConstant.GET_ALL_USER_SUCCESS:
            state = {
                ...state,
                loading: false,
                usersList: action.payload.usersList
            }
            break;


        case registerationConstant.GET_ALL_USER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case messageConstants.GET_CONVERSATIONS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case messageConstants.GET_CONVERSATIONS_SUCCESS:
            const { chats, senderId, receiverId, } = action.payload.data;
            // console.log("\n\n======> data : ",,. JSON.stringify(chats, senderId, receiverId,));
            const users = state.usersList.map(u => {
                if (u._id === receiverId) {
                    console.log('\n\n##############========> in user reducer')
                    u.chats = chats;
                }
                return u;
            });
            console.log('\n\n##############========> ', users)

            state = {
                ...state,
                loading: false,
                usersList: users
            }
            break;


        default:
            break;

    }

    //  return always new state
    return state

}
export default userReducer