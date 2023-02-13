export type ImageType = {
   images: [
      {
         _id: string;
         prompt: string;
         image: string;
         owner: {
            email: string;
            username: string;
            _id: string;
         };
         created: string;
      }
   ];
   userImages: [
      {
         _id: string;
         prompt: string;
         image: string;
         owner: {
            email: string;
            username: string;
            _id: string;
         };
         created: string;
      }
   ];
};

export type OneImgType = {
   _id: string;
   prompt: string;
   image: string;
   owner: {
      email: string;
      username: string;
      _id: string;
   };
   created: string;
};
