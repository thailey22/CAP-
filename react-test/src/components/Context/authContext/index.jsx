import{ onAuthStateChanged, signOut,  } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { auth } from "../../Firebase/firebase";
import { doSignOut } from "../../Firebase/auth";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    
    const [currentUser, setCurrentUser] = useState(null);
    const [userLogIn, setUserLogIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isEmailUser, setIsEmailUser] = useState(false);

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, initializeUser);
        return unSubscribe;
    }, [] ) 

    async function initializeUser(user) {
        if(user){
            setCurrentUser({...user});
           
            const isEmail = user.providerData.some((provider) => provider.providerId ==="password");

            setIsEmailUser(isEmail);

            setUserLogIn(true);
        }

        else{
            setCurrentUser(null);
            setUserLogIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        setCurrentUser,
        isEmailUser,
        userLogIn,
        loading,
        signOut: doSignOut
    }
    
    return(
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    )
}