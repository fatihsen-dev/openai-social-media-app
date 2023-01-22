export type UserType = {
   status: null | boolean;
   user: {
      _id: string;
      username: string;
      email: string;
      avatar: null | string;
      photos: any[];
      token: string;
      joined: string;
   };
};