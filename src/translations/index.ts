import en from "./en";
import np from "./np";

export const translations = {
  en,
  np,
};

export type Language = keyof typeof translations;

export default translations;