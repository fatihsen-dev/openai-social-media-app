import fs from "fs";

export const base64ToImage = (dir: string, data: string) => {
   const buffer = Buffer.from(data, "base64");
   fs.writeFile(dir, buffer, (err) => {
      err && console.log(err);
   });
};
