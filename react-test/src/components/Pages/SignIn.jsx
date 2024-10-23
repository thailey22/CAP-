import { useId, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {doSignInWithEmailAndPassword} from "../Firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../Context/authContext";
import {getDatabase, push, ref, set, update} from "firebase/database";
import { auth } from "../Firebase/firebase";



 
const SignIn = () => {

  const {userLogIn} = useAuth()

  // const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const Push = () => {
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
    const userRef = ref(db, "user/" + `users/${uid}`);
    set(userRef,{
      email: email.replaceAll('.', '_'),
      password: password,
      timestamp: Date.now(),
      active: true
    }
    );
  };


   const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningIn){
      setIsSigningIn(true)
      try{
     await doSignInWithEmailAndPassword(email, password);
     const db = getDatabase();
    const uid = auth.currentUser?.uid;
    const userRef = ref(db, `user/${uid}`);
    update(userRef,{
      email: email.replaceAll('.', '_'),
      password: password,
      timestamp: Date.now(),
      active: true
    }
    );
     console.log('User signed in');
            
  
    }
    catch(error){
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
  }
  }

  const handelGoogle = async (e) => {
    e.preventDefault(); 
    const provider = new GoogleAuthProvider();
  
    try {
     
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      
      const db = getDatabase();
      const uid = user.uid;
      const userRef = ref(db, `user/${uid}`);
  
      
      update(userRef, {
        displayName: user.displayName,
        email: user.email.replaceAll('.', '_'),
        uid: user.uid,
        timestamp: Date.now(),
        active: true
      });
  
      console.log('Google Sign-In');
    } catch (error) {
      console.error('Google Sign-In error:', error.message);
    }
  }



  
    return (
      <div className="form-container">
       {userLogIn && (<Navigate to={'/home'} replace={true} />)}
        <h2>Login</h2>

        <form onSubmit={onSubmit}>
          <div className="form-control">

            <input type="text" placeholder="Enter your email" 
             value={email} onChange={(e) => { setEmail(e.target.value) }}
            ></input>
          </div>

          <div className="form-control">
      
            <input type="password" placeholder="Password "
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            ></input>
          </div>

          <button type="submit" disabled={isSigningIn} onClick={SignIn} >Sign In</button>
        </form>

        <button type="submit" onClick={handelGoogle}>Sign in with Google
        </button>
       

        <p>
          <Link to = '/signup'>Don't have an account?</Link>
        </p>

      </div>
     
    );
}
export default SignIn;