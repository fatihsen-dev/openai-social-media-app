import { useState } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

export default function Home() {
   const [page, setPage] = useState("login");
   const [data, setData] = useState({
      title: "Login",
      button: "Login",
   });

   return (
      <>
         <Helmet>
            <title>Home</title>
         </Helmet>
         <div className='text-whit flex flex-col items-start'>
            <Navbar />
            <div className='flex-1 bg-red-500'></div>
         </div>
      </>
   );
}
