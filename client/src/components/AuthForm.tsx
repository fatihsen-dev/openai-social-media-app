import Logo from "./Logo";

export default function AuthForm({
   auth,
   onSubmit,
   btnSubmit,
   setAuth,
   setBtnSubmit,
}: {
   auth: boolean;
   btnSubmit: boolean;
   onSubmit: any;
   setAuth: any;
   setBtnSubmit: any;
}) {
   return (
      <form className='auth-form flex flex-col items-center relative' onSubmit={onSubmit}>
         <Logo className={` transition-all ${!auth ? "mb-12" : "-mb-4"}`} size={190} />
         <input
            placeholder='USERNAME'
            className={`login-input-username transition-transform ${
               !auth ? "-translate-y-2" : "translate-y-20"
            }`}
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
               onClick={() => (auth ? setAuth(false) : setBtnSubmit(false))}
               type={`${!btnSubmit ? "submit" : "button"}`}
               className={`bg-darkBlue disabled:bg-darkBlue/60 hover:bg-darkBlue/90 transition-all py-1 rounded ${
                  auth ? "flex-[0.6]" : "flex-1"
               }`}>
               Register
            </button>
            <button
               onClick={() => (!auth ? setAuth(true) : setBtnSubmit(true))}
               type={`${btnSubmit ? "submit" : "button"}`}
               className={`bg-orange disabled:bg-orange/60 hover:bg-orange/80 transition-all py-1 rounded ${
                  auth ? "flex-1" : "flex-[0.6]"
               }`}>
               Login
            </button>
         </div>
      </form>
   );
}
