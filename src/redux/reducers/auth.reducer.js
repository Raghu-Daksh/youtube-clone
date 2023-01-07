import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actionType";

const initialState= {
    accessToken: sessionStorage.getItem('ytc-access-token')? sessionStorage.getItem('ytc-access-token') : null,
    user: sessionStorage.getItem('ytc-user')? JSON.parse(sessionStorage.getItem('ytc-user')): null,
    loading: false,
};


export const authReducer = (prevState = initialState, action)=>{
    const {type, payLoad} = action;

    switch(type){
        case LOGIN_REQUEST : 
        return {
            ...prevState,
            loading: true
        }
        case LOGIN_SUCCESS : 
        return {
            ...prevState,
            accessToken: payLoad,
            loading: false,
        }
        case LOGIN_FAIL : 
        return {
            ...prevState,
            loading: false,
            accessToken:null,
            error: payLoad
        }
        case LOAD_PROFILE : 
        return {
            ...prevState,
            user: payLoad
        }
        case LOG_OUT :
            return {
                ...prevState,
                accessToken:null,
                user: null
            }
        default: return prevState
    }
}