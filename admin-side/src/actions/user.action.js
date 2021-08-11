import Axios from "../Axios";
import { registerationConstant, messageConstants } from "./constant";

export const registeration = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: registerationConstant.USER_RESISTERATATION_REQUEST });

        // dipatch actions
        const res = await Axios.post(`signup`, {
            ...user
        });
        if (res.status === 201) {
            // just take the data from front-end

            const { message } = res.data;

            dispatch({
                type: registerationConstant.USER_RESISTERATATION_SUCCESS,
                payload: {
                    message
                }
            })

        } else {
            if (res.status === 400) {
                dispatch({
                    type: registerationConstant.USER_RESISTERATATION_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        return res;
    }
}



export const fetchAllUsers = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: registerationConstant.GET_ALL_USER_REQUEST });

        // dipatch actions
        const res = await Axios.get(`/getAllUser`);
        console.log("res get user", res);
        const { users } = res.data;
        if (res.status === 200) {
            // just take the data from front-end
            dispatch({
                type: registerationConstant.GET_ALL_USER_SUCCESS,
                payload: {
                    usersList: users
                }
            })

        } else {
            if (res.status === 400) {
                dispatch({
                    type: registerationConstant.GET_ALL_USER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        return res;
    }
}
export const getConversationsAction = (senderId, receiverId) => {
    return async (dispatch) => {
        const url = `/conversations/${senderId}/${receiverId}`
        dispatch({ type: messageConstants.GET_CONVERSATIONS_REQUEST });

        // dipatch actions
        const res = await Axios.get(url);
        console.log("res get user", res);
        if (res.status === 200) {
            // console.log('===> conversations : ', res);
            // console.log('===> conversations : ', JSON.stringify(res));
            dispatch({
                type: messageConstants.GET_CONVERSATIONS_SUCCESS,
                payload: {
                    data: res.data
                }
            })

        } else {
            if (res.status === 400) {
                dispatch({
                    type: messageConstants.GET_CONVERSATIONS_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        return res;
    }
}


