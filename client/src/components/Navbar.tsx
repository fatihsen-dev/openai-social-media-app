import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { FaUserAlt } from "react-icons/fa";
import NavbarLogo from "./NavbarLogo";
import { Menu } from "@headlessui/react";
import { Logout } from "../store/auth/authSlice";

export default function Navbar() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { user, status } = useSelector((state: RootState) => state.auth);

   return (
      <div className='w-full border-b border-light p-3 pb-3.5 px-4 pl-3 flex items-center justify-between'>
         <NavLink className='text-lg text-light' to='/'>
            <Logo className='2xl:flex xl:flex lg:flex hidden' color='#fff' />
            <NavbarLogo className='2xl:hidden xl:hidden lg:hidden' color='#fff' />
         </NavLink>
         <ul className='flex gap-5 font-medium'>
            <NavLink
               className='text-lg text-light transition-colors hover:text-light/70'
               to='/'>
               Home
            </NavLink>
            <NavLink
               className='text-lg text-light  transition-colors hover:text-light/70'
               to='/explore'>
               Explore
            </NavLink>
         </ul>
         {status ? (
            <div className='relative'>
               <Menu>
                  <Menu.Button className='text-lg px-3 py-0.5 rounded-sm bg-[#252525] font-medium cursor-pointer flex items-center gap-3'>
                     <span>{user.username}</span>
                     <FaUserAlt />
                  </Menu.Button>
                  <Menu.Items className='bg-[#252525] gap-1 flex flex-col p-2 rounded-sm absolute right-0 top-10'>
                     <Menu.Item>
                        <span className='px-2 py-1 pr-12 bg-dark/40 w-full text-start rounded-sm transition-colors'>
                           {user.email}
                        </span>
                     </Menu.Item>
                     <Menu.Item>
                        <button
                           className='px-2 py-1 pr-12 hover:bg-darkBlue w-full text-start rounded-sm transition-colors'
                           onClick={() => navigate("/profile")}>
                           Profile
                        </button>
                     </Menu.Item>
                     <Menu.Item>
                        <button
                           onClick={() => {
                              dispatch(Logout());
                              navigate("/");
                           }}
                           className='px-2 py-1 pr-12 hover:bg-orange w-full text-start rounded-sm transition-colors'>
                           Çıkış
                        </button>
                     </Menu.Item>
                  </Menu.Items>
               </Menu>
            </div>
         ) : (
            <ul className='flex gap-3 font-medium'>
               <NavLink
                  state={{ auth: true }}
                  className='bg-orange text-light px-6 py-0.5 rounded-sm'
                  to='/auth'>
                  Login
               </NavLink>
               <NavLink
                  state={{ auth: false }}
                  className='bg-darkBlue text-light px-6 py-0.5 rounded-sm'
                  to='/auth'>
                  Register
               </NavLink>
            </ul>
         )}
      </div>
   );
}
