import { useState } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import HomeSlider from "../components/HomeSlider";
import Logo from "../components/Logo";

export default function Home() {
   return (
      <>
         <Helmet>
            <title>Home</title>
         </Helmet>
         <div className='text-whit h-full flex flex-col items-start'>
            <Navbar />
            <div className='flex-1 flex flex-col gap-12 w-full justify-center items-center'>
               <Logo className='2xl:w-[260px] sm:w-[260px] w-[200px]' size={260} />
               <HomeSlider />
            </div>
         </div>
      </>
   );
}
