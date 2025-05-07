import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../components/atoms/Image"; // adapte selon ton arborescence
import { Sparkles, ArrowLeft } from "lucide-react";
import Button from "@/components/atoms/Button";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
    const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center p-4">
      <Image
        src="notfound" 
        alt="Page not found"
        size="large"
        className="mb-8"
      />
      <h1 className="text-5xl font-bold mb-2">{t("notFound.title")}</h1>
      <p className="text-lg text-gray-400 mb-6">
        {t("notFound.description")}
      </p>
      <Button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition"
      >
        <ArrowLeft className="w-5 h-5" />
        {t("notFound.button")}
      </Button>
      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <div>{t("notFound.tip")}</div>
      </div>
    </div>
  );
};

export default NotFoundPage;
