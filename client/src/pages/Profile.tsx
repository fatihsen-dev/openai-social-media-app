import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState, useEffect } from "react";

export default function Profile() {
   const [randomAvatar, setRandomAvatar] = useState<number>();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      setRandomAvatar(Math.floor(Math.random() * 30) + 1);
   }, []);

   return (
      <div className='h-full flex'>
         <Helmet>
            <title>Profile</title>
         </Helmet>
         <div className='h-full w-full flex flex-col'>
            <Navbar />
            <div className='flex flex-1 p-10 gap-10 overflow-auto'>
               <div className='relative w-60'>
                  <div className='bg-dark2 fixed px-8 h-[290px] rounded-sm flex justify-center flex-col gap-5'>
                     <img
                        className='w-44 rounded-full'
                        src={`./images/home/img-${randomAvatar}.png`}
                        alt=''
                     />
                     <div className='flex flex-col text-center'>
                        <span className='text-2xl leading-6 font-medium'>
                           {user.username}
                        </span>
                        <span className='text-lg text-light/50'>{user.email}</span>
                     </div>
                  </div>
               </div>
               <div className='flex-1 flex flex-col gap-10'>
                  <div className='h-[290px] bg-red-500 rounded-sm'></div>
               </div>
            </div>
         </div>
      </div>
   );
}
