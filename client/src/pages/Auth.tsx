import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { Toast } from "../components/Toast";

export default function Auth() {
   const location = useLocation();
   const [auth, setAuth] = useState<boolean>(true);
   const [btnSubmit, setBtnSubmit] = useState<boolean>(true);

   useEffect(() => {
      setAuth(location.state.auth);
   }, []);

   const onSubmit = (e: any) => {
      e.preventDefault();

      const { username, mail, password } = e.target;
      if (username.value.length === 0 && !btnSubmit) {
         Toast({ message: "Username cannot be blank" });
      } else {
         if (!btnSubmit) {
            if (username.value.length < 4 || username.value.length > 20) {
               Toast({ message: "Username must be greater than 4 and less than 20" });
            }
         } else {
            console.log("dssadsa");
         }
      }
   };

   return (
      <div className='h-full flex justify-center items-center flex-col'>
         <AuthForm
            auth={auth}
            onSubmit={onSubmit}
            setAuth={setAuth}
            btnSubmit={btnSubmit}
            setBtnSubmit={setBtnSubmit}
         />
      </div>
   );
}
