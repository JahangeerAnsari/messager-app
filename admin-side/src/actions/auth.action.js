import Axios from "../Axios";
import { LoginConstant } from "./constant";

export const login = (user) =>{
    return async (dispatch) => {
      dispatch({
          type: LoginConstant.LOGIN_REQUEST,
          payload:{
           ...user
         }
      })
     const res = await Axios.post(`/admin/signin`,{...user} );
     console.log('res signin',res)

     if(res.status === 200){
         const {token ,user } = res.data;
         console.log(" token", token);
         localStorage.setItem('token',token);
         localStorage.setItem('user',JSON.stringify(user));
         dispatch({
            type: LoginConstant.LOGIN_SUCCESS,
            payload:{
             token,user
           }   
         })
     }
     if(res.status === 400){
        dispatch({
            type: LoginConstant.LOGIN_FAILURE,
            payload:{
             error: res.data.error
           }   
         })
     }
     return res
    }
   
 }


//  isUserLogin

 export const isUserLogin = () => {
  return async (dispatch) =>{
    const token = localStorage.getItem('token'); 
     if(token){
       const user = JSON.parse(localStorage.getItem('user'));
       dispatch({
        type: LoginConstant.LOGIN_SUCCESS,
        payload:{
         token,user
       } 
       })
     }else{
      dispatch({
        type: LoginConstant.LOGIN_FAILURE,
        payload:{
          error:'Failed to login'
          
        }
      })
     }

  }
}

export const signout = () =>{
 return async (dispatch) =>{
        localStorage.clear();
        dispatch({
          type: LoginConstant.LOGOUT_REQUEST,

        })
 }
}

