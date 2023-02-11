import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState, useEffect } from "react";
import { BsImage } from "react-icons/bs";
import { createImage, updateImageState } from "../axios";

export default function Profile() {
   const [image, setImage] = useState<string>("");
   const [imageId, setImageId] = useState<string>("");
   const [wait, setWait] = useState<boolean>(false);

   const [randomAvatar, setRandomAvatar] = useState<number>();
   const { user } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      setRandomAvatar(Math.floor(Math.random() * 30) + 1);
   }, []);

   const createImageFormHandle = async (e: any) => {
      e.preventDefault();

      setWait(true);

      if (e.target.prompt.value.length > 0) {
         try {
            const response = await createImage({
               owner: user._id,
               prompt: e.target.prompt.value,
            });
            setImage(response.data.image);
            setImageId(response.data._id);
            setWait(false);
         } catch (err) {
            setWait(false);
            console.log(err);
         }
      } else {
         alert("oluşturulamadı");
      }
   };

   const shareHandle = async () => {
      if (imageId) {
         try {
            await updateImageState({ _id: imageId });
            setImageId("");
         } catch (err) {
            console.log(err);
         }
      } else {
         alert("Lütfen önce resim oluşturun");
      }
   };

   return (
      <div className='h-full flex'>
         <Helmet>
            <title>Profile</title>
         </Helmet>
         <div className='h-full w-full flex flex-col'>
            <Navbar />
            <div className='flex flex-1 p-10 gap-10 overflow-auto'>
               <div className='relative w-60'>
                  <div className='bg-dark2 fixed px-10 h-[290px] rounded-sm flex justify-center flex-col gap-5'>
                     <img
                        className='w-36 rounded-full'
                        src={`./images/home/img-${randomAvatar}.png`}
                        alt=''
                     />
                     <div className='flex flex-col text-center'>
                        <span className='text-2xl leading-6 font-medium'>
                           {user.username}
                        </span>
                        <span className='text-lg text-light/50'>{user.email}</span>
                     </div>
                  </div>
               </div>
               <div className='flex-1 flex flex-col gap-10'>
                  <div className='h-[290px] bg-dark2 rounded-sm p-6 flex items-center gap-6'>
                     <div className='w-60 h-60 bg-[#1D1D1D] rounded-sm flex justify-center items-center'>
                        {image ? (
                           <img
                              className='w-full h-full object-cover rounded-sm'
                              src={`${import.meta.env.VITE_API_URL}/${image}`}
                              alt=''
                           />
                        ) : (
                           <BsImage className='text-4xl text-dark2' />
                        )}
                     </div>
                     <form
                        onSubmit={createImageFormHandle}
                        className='h-full flex flex-col flex-1 gap-5'>
                        <textarea
                           placeholder='Prompt'
                           name='prompt'
                           className='w-full rounded-sm resize-none flex-1 p-2 py-1 bg-[#1D1D1D] border border-dark'></textarea>
                        <div className='w-full flex gap-5'>
                           <button
                              disabled={wait}
                              className='disabled:bg-orange/50 disabled:text-white/50 bg-orange rounded-sm hover:bg-orange/80 transition-colors flex-1 py-2 flex items-center justify-center gap-4'>
                              {wait && <span className='loader'></span>}
                              <span>Create</span>
                           </button>
                           <span
                              onClick={shareHandle}
                              className='bg-darkBlue rounded-sm hover:bg-darkBlue/80 transition-colors flex-1 text-center py-2 cursor-pointer'>
                              Share
                           </span>
                        </div>
                     </form>
                  </div>
                  <div className='h-[290px] flex-1'></div>
               </div>
            </div>
         </div>
      </div>
   );
}
