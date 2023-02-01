export default function HomeSlider() {
   const images = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
   ];

   return (
      <div className='flex flex-col gap-4 2xl:px-0 lg:px-0 px-5'>
         <div className='2xl:w-[700px] md:w-[700px] w-full overflow-hidden'>
            <div className='home-left-animation flex justify-start gap-2'>
               {images.map((el, i) => (
                  <img
                     draggable={false}
                     key={i}
                     className='w-32'
                     src={`./images/home/img-${i + 1}.png`}
                  />
               ))}
            </div>
         </div>
         <div className='2xl:w-[700px] md:w-[700px] w-full overflow-hidden'>
            <div className='home-right-animation flex justify-end gap-2'>
               {images.map((el, i) => (
                  <img
                     draggable={false}
                     key={i}
                     className='w-32'
                     src={`./images/home/img-${i + 1}.png`}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
