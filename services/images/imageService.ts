import { getImagesFromCf } from "./GetImagesFromCf";
import { getImagesFromFs } from "./GetImagesFromFs";

export const ImageService = (locale: string): string[] => {
  let result: string[] = [];
  if (process.env.NODE_ENV === "development") {
    result = getImagesFromFs(locale);
  } else {
    result = getImagesFromCf(locale);
  }
  return result;
};
