import { useState } from "react";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { CiUser,CiLock, CiMail} from "react-icons/ci";



function App(){
  const [form, setForm] = useState('signin');
  return(
    <>
    {form === "signin" ? (
      <SignIn CiUser={CiUser} CiLock={CiLock} FormHandle={setForm}/>
    )
  : (
      <SignUp CiUser={CiUser} CiLock={CiLock} CiMail={CiMail} FormHandle={setForm}/>
    )}
   </>
  )
}
export default App