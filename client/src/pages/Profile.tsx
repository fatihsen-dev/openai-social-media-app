import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState, useEffect } from "react";
import { BsImage } from "react-icons/bs";
import { createImage, getUserImages, updateImageState } from "../axios";
import { loadUserImages } from "../store/images/imageSlice";
import { OneImgType } from "../store/images/types";

export default function Profile() {
   const dispatch = useDispatch();
   const { userImages } = useSelector((state: RootState) => state.images);
   const [galery, setGalery] = useState<Array<any>>([]);
   const [fetchState, setFetchState] = useState<boolean>(false);
   const [image, setImage] = useState<string>("");
   const [imageId, setImageId] = useState<string>("");
   const [wait, setWait] = useState<boolean>(false);
   const [randomAvatar, setRandomAvatar] = useState<number>();
   const { user } = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      setRandomAvatar(Math.floor(Math.random() * 30) + 1);

      (async () => {
         try {
            const response = await getUserImages(user._id);
            dispatch(loadUserImages({ images: response.data }));
         } catch (error) {
            console.log(error);
         }
      })();
   }, [fetchState]);

   useEffect(() => {
      let smallArray: Array<OneImgType> = [];
      let bigArray: Array<Array<OneImgType>> = [];
      let length = userImages.length;
      let count = 0;

      userImages.forEach((img, i) => {
         if (smallArray.length === 4) {
            bigArray.push(smallArray);
            smallArray = [];
            count += 4;
         }
         smallArray.push(img);
         if (length - count < 4 && length - count === smallArray.length) {
            bigArray.push(smallArray);
            smallArray = [];
         }
      });

      setGalery(bigArray);
   }, [userImages]);

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
            setFetchState(!fetchState);
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
            <div className='flex flex-1 2xl:flex-row xl:flex-row lg:flex-row flex-col overflow-auto '>
               <div className='2xl:p-10 md:p-10 md:pb-6 sm:pb-6 pb-6 p-4'>
                  <div className='bg-dark2 items-center px-10 h-[290px] flex rounded-sm justify-center flex-col gap-5'>
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
               <div className='flex-1 flex flex-col 2xl:gap-10 md:gap-10 gap-6 h-full 2xl:p-10 md:p-10 p-4 2xl:pl-0 xl:pl-0 lg:pl-0 2xl:pt-10 xl:pt-10 lg:pt-10 pt-0 2xl:overflow-auto lg:overflow-auto'>
                  <div className='bg-dark2 rounded-sm p-6 flex items-center gap-6 2xl:flex-row xl:flex-row md:flex-row flex-col'>
                     <div className='2xl:w-60 2xl:h-60 md:w-60 md:h-60 sm:h-80 h-56 w-full bg-[#1D1D1D] rounded-sm flex justify-center items-center'>
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
                        className='w-full flex flex-col 2xl:h-full md:h-full flex-1 gap-5'>
                        <textarea
                           placeholder='Prompt'
                           name='prompt'
                           className='w-full h-52 flex-1 rounded-sm resize-none p-2 py-1 bg-[#1D1D1D] border border-dark'></textarea>
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
                  <div className='flex flex-col items-center gap-3 pb-5'>
                     {galery.length > 1 &&
                        galery.map((ar: Array<OneImgType>, i: number) => (
                           <div className='explore-div-profile' key={i}>
                              {ar.map((item: OneImgType, index: number) => (
                                 <div key={index}>
                                    <img
                                       src={`${import.meta.env.VITE_API_URL}/${
                                          item.image
                                       }`}
                                    />
                                 </div>
                              ))}
                           </div>
                        ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
