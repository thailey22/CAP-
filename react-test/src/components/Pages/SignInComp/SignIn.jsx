import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../Firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../../Context/authContext";
import { getDatabase, ref, update } from "firebase/database";
import { auth } from "../../Firebase/firebase";

const SignIn = () => {
  const { userLogIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to push user data to Firebase Realtime Database on sign-in
  const updateUserData = (user) => {
    const db = getDatabase();
    const uid = user.uid;
    const userRef = ref(db, `user/${uid}`);
    
    update(userRef, {
      email: user.email.replaceAll('.', '_'),
      timestamp: Date.now(),
      active: true
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Clear any previous errors

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        
        // Update user data after successful sign-in
        updateUserData(auth.currentUser);
        console.log("User signed in");
      } catch (error) {
        // Firebase error handling
        switch (error.code) {
          case "ERROR_USER_NOT_FOUND":
            setErrorMessage("No user found with this email.");
            break;
          case "ERROR_WRONG_PASSWORD":
            setErrorMessage("Incorrect password.");
            break;
          default:
            setErrorMessage("An unexpected error occurred. Please try again.");
            break;
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Update user data on Google Sign-In
      updateUserData(user);
      console.log("Google Sign-In successful");
    } catch (error) {
      setErrorMessage("Google Sign-In failed. Please try again.");
      console.error("Google Sign-In error:", error.message);
    }
  };

  return (
    <div className="form-container">
      {userLogIn && <Navigate to="/home" replace={true} />}
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <span className="error-message">{errorMessage}</span>}

        <button type="submit" disabled={isSigningIn}>
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <button onClick={handleGoogleSignIn}>Sign in with Google</button>

      <p>
        <Link to="/signup">Don't have an account?</Link>
      </p>
    </div>
  );
};

export default SignIn;
