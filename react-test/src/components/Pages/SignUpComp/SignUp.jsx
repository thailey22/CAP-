import { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { doCreateUserWithEmailAndPassword } from "../../Firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../../Firebase/firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();

  const pushUserData = (email) => {
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
    const userRef = ref(db, `user/${uid}`);

    set(userRef, {
      email: email.replaceAll('.', '_'),
      password: password,
      timestamp: Date.now(),
      active: true
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        pushUserData(email);
        navigate("/");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMessage("Email is already in use.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email format.");
            break;
          case "auth/weak-password":
            setErrorMessage("Password is too weak.");
            break;
          default:
            setErrorMessage("An unexpected error occurred. Please try again.");
            break;
        }
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to="/home" replace />}
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <input
              type="text"
              autoComplete="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && <span className="error">{errorMessage}</span>}
          
          <button type="submit" disabled={isRegistering}>
            {isRegistering ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
