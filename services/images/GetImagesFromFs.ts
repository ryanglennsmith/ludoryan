import fs from "fs";
const path = "./public/.images/";

export const getImagesFromFs = (locale: string): string[] => {
  let result: string[] = [];
  fs.readdirSync(`${path}/${locale}/`).forEach((file) => {
    result.push(file);
  });
  return result;
};
