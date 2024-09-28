import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from "../Firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
 
const SignUp = () => {
  const navigate = useNavigate()

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth()

  
   const onSubmit = async (e) => {
    // e.preventDefault()

    // if(!isRegistering){
    //   setIsRegistering(true);
    //   await doCreateUserWithEmailAndPassword(email, password)
    // }
    e.preventDefault();

    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
    }

    try {
        setIsRegistering(true);  // Disable the button while registering
        await doCreateUserWithEmailAndPassword(email, password);  // Sign up the user
        navigate('/home');  // Redirect to home on success
    } catch (error) {
        setErrorMessage(error.message);
    } finally {
        setIsRegistering(false);  // Re-enable the button
    }

    // await SignUp(auth, User, email, password)
    //  .then((userCredential) => {
    //   const user = userCredential.User;
    //   console.log(User,email ,password)
    //   navigate("login");
    //   })

    //   .catch((error)=>{
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error(errorCode, errorMessage);
    //   });

    }

    return (
      <>
        {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}

      <div className="form-container">
        
        <h2>SignUp</h2>
        
        <form onSubmit={onSubmit}>

        {/* <div className="form-control">
            <input type="text" placeholder="Enter your Name"
             onChange={(e)=> setUser(e.target.value)}
             value={User}
            ></input>
          
          </div> */}

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