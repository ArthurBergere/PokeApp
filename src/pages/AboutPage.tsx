import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("about.title")}</h1>
      <p>{t("about.description")}</p>
    </main>
  );
};

export default AboutPage;
