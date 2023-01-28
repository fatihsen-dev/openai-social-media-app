import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

export default function Explore() {
   return (
      <>
         <Helmet>
            <title>Explore</title>
         </Helmet>
         <div>
            <Navbar />
            Explore
         </div>
      </>
   );
}
