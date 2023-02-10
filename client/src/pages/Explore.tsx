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
               <div className='font-medium text-5xl text-center py-32'>
                  <span className='explore-text-linear font-bold'>Explore</span> Yourself
               </div>
               <div>{/* <pre>{JSON.stringify(galery, null, 5)}</pre> */}</div>
            </div>
         </div>
      </>
   );
}
