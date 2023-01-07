import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBCBxRzCnbklxSHZXmUsWViXx1xs1ZjOis",
    authDomain: "no-tube-clone.firebaseapp.com",
    projectId: "no-tube-clone",
    storageBucket: "no-tube-clone.appspot.com",
    messagingSenderId: "197689482268",
    appId: "1:197689482268:web:a14f8ae790c8b53dbe93d9"
  };
firebase.initializeApp(firebaseConfig);
export default firebase.auth();