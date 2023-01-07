
import firebase from 'firebase/compat/app'
import auth from '../../firebase'
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from '../actionType';

export const login = ()=> async dispatch =>{
    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')
        const res = await auth.signInWithPopup(provider);
        console.log('res',res);

        const accessToken = res.credential.accessToken;
        const profile = {
            name: res.additionalUserInfo.profile.name,
            photoUrl: res.additionalUserInfo.profile.picture
            }
        sessionStorage.setItem('ytc-access-token', accessToken);
        sessionStorage.setItem('ytc-user', JSON.stringify(profile));

        dispatch({
            type : LOGIN_REQUEST
        })

        dispatch({
            type: LOGIN_SUCCESS,
            payLoad: accessToken
        })

        dispatch({
            type: LOAD_PROFILE,
            payLoad: profile,
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payLoad: error.message
        })
    }
}
export const logOut = ()=> async dispatch =>{
    await auth.signOut();

    dispatch({
        type: LOG_OUT,
    })

    sessionStorage.removeItem('ytc-access-token');
    sessionStorage.removeItem('ytc-user');
}