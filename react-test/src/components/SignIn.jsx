import { useState } from "react";


 
function SignIn({CiUser, CiLock, FormHandle}) {

  const [User, setUser] = useState('');
  const [password, setPassword] = useState('');

    function handleSignIn(e){

      if(!User || !password || !email)return;

      e.preventDefault();
      console.log(User,password)
      setUser("");
      setPassword("");

    }

  
    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="form-control">
          <CiUser />
            <input type="text" placeholder="Enter your email" 
            onChange={(e)=> setUser(e.target.value)}
            value={User}
            ></input>
          </div>

          <div className="form-control">
          <CiLock/>
            <input type="password" placeholder="Password "
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            ></input>
          </div>

          <button onClick={handleSignIn}>Sign In</button>
        </form>
        <p onClick={() => FormHandle('SignUp')}>Don't have an account? </p>

      </div>
     
    );
}
export default SignIn;