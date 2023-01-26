import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
   return (
      <div className='w-full border-b border-light p-3 pb-3.5 px-4 flex items-center justify-between'>
         <NavLink className='text-lg text-light' to='/'>
            <Logo color='#fff' />
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
      </div>
   );
}
