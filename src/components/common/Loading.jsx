import React, { useContext } from "react";
import LanguageContext from "../../contexts/LanguageContext";

function Loading() {
  const { translate } = useContext(LanguageContext);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-slate-800 dark:border-white"></div>
      <span className="ml-2 text-slate-800 dark:text-white">
        {translate("loading")}
      </span>
    </div>
  );
}

export default Loading;
