import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }){
    const[currentUser,setCurrentUser] = useState();
    const [loading, setLoading] = useState(true); // Aguarda a verificação se há algum usuário logado
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged( user =>{
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe;
    },[])

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    const value = {
        currentUser,
        signup,
        login
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}