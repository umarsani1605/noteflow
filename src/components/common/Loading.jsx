import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function Loading() {
  const { t } = useLanguage();

  return (
    <div className="flex h-32 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-slate-800 dark:border-white"></div>
      <span className="ml-2 text-slate-800 dark:text-white">
        {t("loading")}
      </span>
    </div>
  );
}

export default Loading;
