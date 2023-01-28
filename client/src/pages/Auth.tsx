import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Auth() {
   const location = useLocation();
   const [auth, setAuth] = useState<boolean>(true);

   useEffect(() => {
      setAuth(location.state.auth);
   }, []);

   return (
      <div className='h-full flex justify-center items-center flex-col'>
         {auth ? <LoginForm setAuth={setAuth} /> : <RegisterForm setAuth={setAuth} />}
      </div>
   );
}
