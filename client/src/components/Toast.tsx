import { toast } from "react-hot-toast";

export const Toast = ({ message, variant }: { message: string; variant?: "succes" }) => {
   let t: any;
   // t.visible

   toast.custom((t) => (
      <div
         className={`${
            variant === "succes" ? "bg-green-600" : "bg-red-500"
         } text-white px-3 rounded-sm py-1 transition-all`}>
         {message}
      </div>
   ));
};
