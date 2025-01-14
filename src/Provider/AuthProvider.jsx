
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
// import axios from "axios";
const auth = getAuth(app);

export const AuthProviderContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true);



const  name = 'medical camp';
//create new user
const createUser = (email, password ) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}

//signout user
const signOutUser = () => {
    setLoading(true)
    return signOut(auth);
}

//signIn with email,secret key
const loginUser = (email, password ) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}
//update User Profile info
const updateUserProfile = (updatedData) =>{
    setLoading(true)
    return updateProfile(auth.currentUser, updatedData).finally(() => setLoading(false));
}
//signIn with Google
const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('current user', currentUser);
        setLoading(false);
    });
    return () => {
        return unsubscribe();
    }
}, [])


const authInfo = {
    name,
    user,
    loading,
    setLoading,
    setUser,
    createUser,
    loginUser,
    updateUserProfile,
    signInWithGoogle,
    signOutUser,
}
    return (
        <AuthProviderContext.Provider value={authInfo}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;