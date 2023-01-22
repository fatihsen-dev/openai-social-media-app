import { useDispatch, useSelector } from "react-redux/es/exports";
import Logo from "./components/Logo";
import { Dispatch, RootState } from "./store";
import {} from "./store/auth/authSlice";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Player } from "@lottiefiles/react-lottie-player";

export default function App() {
   const dispath = useDispatch<Dispatch>();
   const { status } = useSelector((store: RootState) => store.auth);

   return (
      <div className='bg-dark h-full text-white'>
         {status !== null ? (
            <div className='h-full container bg-dark border'>
               <Routes>
                  <Route index element={<Home />} />
                  {status ? <Route path='/profile' element={<Profile />} /> : null}
                  {status === false ? <Route path='/auth' element={<Auth />} /> : null}
                  <Route path='/explore' element={<Explore />} />
                  <Route path='*' element={<NotFound />} />
               </Routes>
            </div>
         ) : (
            <div className='h-full flex justify-center items-center'>
               <Player
                  autoplay
                  loop
                  src='https://assets7.lottiefiles.com/packages/lf20_3J0owIXaM6.json'
                  style={{ height: "400px", width: "400px" }}></Player>
            </div>
         )}
      </div>
   );
}
