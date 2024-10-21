import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from "../Firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import {getDatabase, push, ref, set, update} from "firebase/database";
import { auth } from "../Firebase/firebase";

 
const SignUp = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();  // Assuming this checks if the user is already logged in

  // Function to push user data to Firebase Realtime Database
  const pushUserData = (email) => {
    const db = getDatabase();
    const uid = auth.currentUser?.uid; // Get the current user's UID
    const userRef = ref(db, `user/${uid}`);

    set(userRef, {
      email: email.replaceAll('.', '_'),
      password: password,
      timestamp: Date.now(),
      active: true
    });
  };

  // Handle form submission for signing up and storing data
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        // Sign in the user
        await doCreateUserWithEmailAndPassword(email, password);
        console.log("User signed in");

        // Push user data to Realtime Database
        pushUserData(email);

       await navigate("/"); // Redirect to home page after successful login
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false);
      }
    }
  };


    return (
      <>
        {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}

      <div className="form-container">
        
        <h2>SignUp</h2>
        
        <form onSubmit={onSubmit}>


          <div className="form-control">
            <input type="text"
              autoComplete='email'
              placeholder="Enter your email"
              required
              value={email} onChange={(e) => { setEmail(e.target.value) }}
            ></input>
        
          </div>

          <div className="form-control">
            <input  type="password"
             autoComplete='current-password'
             placeholder="Enter your password"
              required
              value={password} onChange={(e) => { setPassword(e.target.value) }}
            ></input>
      
          </div>

          <div className="form-control">
            <input type="password"
              autoComplete='current-password'
              placeholder="Confirm your password"
              required
              value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
            ></input>
          </div>

          {errorMessage && (
            <span>{errorMessage}</span>
          )}

          <button type="submit" disabled={isRegistering}>Sign Up</button>
        </form>

      </div>

      </>
    );
}
export default SignUp;