import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getImages } from "../axios";
import { loadImages } from "../store/images/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { OneImgType } from "../store/images/types";

export default function Explore() {
   const [galery, setGalery] = useState<Array<any>>([]);
   const dispatch = useDispatch();
   const { images } = useSelector((state: RootState) => state.images);

   useEffect(() => {
      (async () => {
         try {
            const images = await getImages();
            dispatch(loadImages({ images: images.data }));
         } catch (err) {
            console.log(err);
         }
      })();
   }, []);

   useEffect(() => {
      let smallArray: Array<OneImgType> = [];
      let bigArray: Array<Array<OneImgType>> = [];
      let length = images.length;
      let count = 0;

      images.forEach((img, i) => {
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
   }, [images]);

   return (
      <>
         <Helmet>
            <title>Explore</title>
         </Helmet>
         <div className='h-full flex flex-col'>
            <Navbar />
            <div className='flex-1 overflow-auto'>
               <div className='font-medium 2xl:text-6xl lg:text-6xl md:text-5xl text-4xl text-center 2xl:py-40 lg:py-40 py-20'>
                  <span className='explore-text-linear font-bold'>Explore</span> Yourself
               </div>
               <div className='flex flex-col items-center gap-3 pb-5'>
                  {galery.length > 1 &&
                     galery.map((ar: Array<OneImgType>, i: number) => (
                        <div className='explore-div' key={i}>
                           {ar.map((item: OneImgType, index: number) => (
                              <div key={index}>
                                 <img
                                    src={`${import.meta.env.VITE_API_URL}/${item.image}`}
                                 />
                              </div>
                           ))}
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
}
