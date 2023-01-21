import Logo from "./components/Logo";

export default function App() {
   return (
      <div className='h-full container grid place-items-center'>
         <Logo color='#222' size={300} icon='red' />
      </div>
   );
}
