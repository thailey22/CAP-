import { useState } from "react";
 
function SignUp({CiUser, CiLock, CiMail, FormHandle}) {

    const [User, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp(e){
      e.preventDefault();

    if(!User || !password || !email)return;

      console.log(User,email ,password)
      setUser("");
      setEmail("");
      setPassword("");

    }

    return (
      <div className="form-container">
        <h2>SignUp</h2>
        <form onSubmit={handleSignUp}>
        <div className="form-control">
            <input type="text" placeholder="Enter your Name"
             onChange={(e)=> setUser(e.target.value)}
             value={User}
            ></input>
            <CiUser />
          </div>

          <div className="form-control">
            <input type="text" placeholder="Enter your email"
             onChange={(e)=> setEmail(e.target.value)}
             value={email}
            ></input>
            <CiMail />
          </div>

          <div className="form-control">
            <input type="password" placeholder="Password "
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            ></input>
            <CiLock />
          </div>

          <button onClick={handleSignUp}>Sign Up</button>
        </form>
        <p onClick={() => FormHandle('signin')}>Already have an account? </p>

      </div>
     
    );
}
export default SignUp;