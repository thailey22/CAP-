import SignIn from "./components/Pages/SignIn"
import SignUp from "./components/Pages/SignUp"
import Home from "./components/Pages/Home";
import Live from "./components/Pages/Live-view";
import Users from "./components/Pages/Users";
import Cars from "./components/Pages/Cars";
import CameraFeed from "./components/Pages/Live-view";
import { AuthProvider } from "./components/Context/authContext";
import { useRoutes } from "react-router-dom";




function App(){
 const routesArray = [

   {
     path: "/signup",
     element: <SignUp />,
   },
   {
     path: "/",
     element: <SignIn />,
   },
   {
     path: "/home",
     element: <Home />,
     
   },
   {
    path: '/Live-view',
    element: <Live />,

   },
   {
    path: "/Users",
    element: <Users />,

   },
   {
    path: "/Cars",
    element: <Cars />,
   },
   {
    path: '/CameraFeed',
    element: <CameraFeed />,

   },

 ];

 let routeElement = useRoutes(routesArray);

 return(
  <AuthProvider>
    <div>{routeElement}</div>
  </AuthProvider>
 )
  // return(
  //   <>
  //   {form === "signin" ? (
  //     <SignIn CiUser={CiUser} CiLock={CiLock} FormHandle={setForm}/>
  //   )
  // : (
  //     <SignUp CiUser={CiUser} CiLock={CiLock} CiMail={CiMail} FormHandle={setForm}/>
  //   )}
  //  </>
  // )
}
export default App