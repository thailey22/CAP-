import React from 'react'
import { useAuth } from '../Context/authContext'
import { useNavigate } from 'react-router-dom'
import { Database,get } from 'firebase/database'
import {collection} from 'firebase/firestore'

const Home = () => {
    const { currentUser, signOut } = useAuth()
    const navigate = useNavigate();


    const handleSignOut = () => {
        signOut().then(() => {
            console.log('User signed out');
            navigate("/");
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };



    return (
        <div>
            <div>Hello {currentUser.email ? currentUser.email : currentUser.email}, you are now logged in.</div>
        <button onClick={handleSignOut}>Sign Out</button>
    </div>    
    )
}

export default Home