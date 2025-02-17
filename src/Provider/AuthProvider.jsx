
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import axios from "axios";
const auth = getAuth(app);

export const AuthProviderContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

const [user,setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [darkMode, setDarkMode] = useState(false);
const axiosPublic = useAxiosPublic();

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
        if (currentUser) {
            // get token and store client
            const userInfo = { email: currentUser.email };
            axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
        }
        else {
            localStorage.removeItem('access-token');
            setLoading(false);
        }
        
    });
    return () => {
        return unsubscribe();
    }
}, [axiosPublic])


const authInfo = {
    name,
    user,
    darkMode, 
    setDarkMode,
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