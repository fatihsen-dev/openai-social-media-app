import { useDispatch } from "react-redux";
import { registerRequest } from "../axios";
import { Login } from "../store/auth/authSlice";
import Logo from "./Logo";
import { Toast } from "./Toast";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setAuth }: { setAuth: any }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSubmit = async (e: any) => {
      e.preventDefault();
      const { mail, password, username } = e.target;

      if (username.value.length === 0)
         return Toast({ message: "Username cannot be left blank" });
      if (username.value.length < 4)
         return Toast({ message: "Username cannot be less than 4" });
      if (username.value.length > 20)
         return Toast({ message: "Username cannot be greater than 20" });

      if (mail.value.length === 0)
         return Toast({ message: "Email cannot be left blank" });
      if (mail.value.length < 4) return Toast({ message: "Email cannot be less than 4" });
      if (mail.value.length > 50)
         return Toast({ message: "Email cannot be greater than 50" });

      if (password.value.length == 0)
         return Toast({ message: "Password cannot be left blank" });
      if (password.value.length < 6)
         return Toast({ message: "Password cannot be less than 6" });
      if (password.value.length > 50)
         return Toast({ message: "Password cannot be greater than 50" });

      try {
         const response = await registerRequest({
            username: username.value,
            email: mail.value,
            password: password.value,
         });
         dispatch(Login({ user: response.data, status: true }));
         localStorage.setItem(
            "token",
            JSON.stringify({ _id: response.data._id, token: response.data.token })
         );
         navigate("/");
      } catch (error: any) {
         Toast({ message: error.response.data.message });
      }
   };

   return (
      <form className='auth-form flex flex-col items-center relative' onSubmit={onSubmit}>
         <Logo size={190} className='mb-10' />
         <input
            placeholder='USERNAME'
            className={`login-input-username transition-transform`}
            type='text'
            name='username'
         />
         <div className='w-full flex gap-6 flex-col z-10 p-4 bg-dark'>
            <input name='mail' placeholder='EMAIL' className='login-input' type='email' />
            <input
               name='password'
               placeholder='PASSWORD'
               className='login-input'
               type='password'
            />
         </div>
         <div className='flex items-center w-full gap-3 font-medium mt-3'>
            <button
               className={`bg-darkBlue disabled:bg-darkBlue/60 hover:bg-darkBlue/90 transition-all py-1 rounded flex-1`}>
               Register
            </button>
            <span
               onClick={() => setAuth(true)}
               className={`bg-orange cursor-pointer text-center disabled:bg-orange/60 hover:bg-orange/80 transition-all py-1 rounded flex-[0.6]`}>
               Login
            </span>
         </div>
      </form>
   );
}
