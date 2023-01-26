import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
   const [page, setPage] = useState("login");
   const [data, setData] = useState({
      title: "Login",
      button: "Login",
   });

   return (
      <div className='text-whit flex flex-col items-start'>
         <Navbar />
         Home
      </div>
   );
}
