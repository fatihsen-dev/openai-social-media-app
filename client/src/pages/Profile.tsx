import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

export default function Profile() {
   return (
      <>
         <Helmet>
            <title>Profile</title>
         </Helmet>
         <div>
            <Navbar />
            Profile
         </div>
      </>
   );
}
