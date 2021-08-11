import { LoginConstant } from "../actions/constant";

// ()
const initialState = {
  token: null,
  user:{
    firstName: '',
        lastName: '',
        email: '',
        password: '',
  },
    authenticate : false,
    authenticating: false
}

const authReducer = (state =initialState, action) =>{
    console.log("auth action", action)
    // reducer always gives us new state +1
    switch(action.type){

        case LoginConstant.LOGIN_REQUEST:
      state = {
             ...state,
             authenticating: true,
              }
      break;

      case LoginConstant.LOGIN_SUCCESS:
        state = {
               ...state,
               authenticating: false,
               authenticate: true,
               user: action.payload.user,
               token: action.payload.token,
        }
        break;
        case LoginConstant.LOGIN_FAILURE:
        state = {
             
               authenticating: false,
               authenticate: false,
               error: action.payload.error,
        }
        break;
        case LoginConstant.LOGOUT_REQUEST:
          state = {
            ...initialState
          }
          break;

        
      default:
      break

    }
    return state;
}
export default  authReducer