import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {doSignInWithEmailAndPassword } from "../Firebase/auth";
import { useAuth } from "../Context/authContext";
import {getDatabase, push, ref, set} from "firebase/database";
import { database } from "../Firebase/firebase";
import { Timestamp } from "firebase/firestore";


 
const SignIn = () => {

  const {userLogIn} = useAuth()

  // const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const Push = () => {
    const db = getDatabase();
    const userRef = ref(db, "user/" + email.replaceAll('.', '_'));
    set(userRef,{
      email: email,
      password: password,
      timestamp: Date.now()
    }
    );
  };


   const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningIn){
      setIsSigningIn(true)
      try{
     await doSignInWithEmailAndPassword(email, password);
     console.log('User signed in');
     Push();
    }
    catch(error){
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
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

          <button type="submit" disabled={isSigningIn} onClick={SignIn && Push} >Sign In</button>
        </form>
        {/* <p onClick={() => FormHandle('SignUp')}>Don't have an account? </p> */}

        <p>
          <Link to = '/signup'>Don't have an account?</Link>
        </p>

      </div>
     
    );
}
export default SignIn;