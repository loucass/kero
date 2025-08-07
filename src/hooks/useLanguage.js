import { useContext } from "react";
import LanguageContext from "../contexts/language";

const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
