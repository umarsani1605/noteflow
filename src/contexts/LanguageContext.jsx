import { createContext } from "react";

const LanguageContext = createContext("id");

export const LanguageProvider = LanguageContext.Provider;
export default LanguageContext;
