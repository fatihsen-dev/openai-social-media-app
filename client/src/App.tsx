import { useDispatch, useSelector } from "react-redux/es/exports";
import { Dispatch, RootState } from "./store";
import { Login, Logout } from "./store/auth/authSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { controlRequest } from "./axios";
import { Toast } from "./components/Toast";

export default function App() {
   const dispatch = useDispatch<Dispatch>();
   const navigate = useNavigate();
   const { status } = useSelector((store: RootState) => store.auth);
   useEffect(() => {
      if (localStorage.getItem("token")) {
         (async () => {
            try {
               const { token, _id } = JSON.parse(`${localStorage.getItem("token")}`);

               const response = await controlRequest({ token, _id });
               setTimeout(() => {
                  dispatch(Login({ user: response.data, status: true }));
               }, 1500);
               localStorage.setItem(
                  "token",
                  JSON.stringify({
                     _id: response.data._id,
                     token: response.data.token,
                  })
               );
            } catch (error: any) {
               setTimeout(() => {
                  dispatch(Logout());
               }, 1500);
               navigate("/");
            }
         })();
      } else {
         setTimeout(() => {
            dispatch(Logout());
         }, 1500);
         navigate("/");
      }
   }, []);

   return (
      <div className='bg-dark h-full text-white'>
         {status !== null ? (
            <div className='h-full 2xl:container xl:container bg-dark border border-light text-light relative'>
               <Routes>
                  <Route index element={<Home />} />
                  {status ? <Route path='/profile' element={<Profile />} /> : null}
                  {status === false ? <Route path='/auth' element={<Auth />} /> : null}
                  <Route path='/explore' element={<Explore />} />
                  <Route path='*' element={<NotFound />} />
               </Routes>
               <Toaster position='top-right' reverseOrder={false} />
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
