import React from "react";
import { useTranslation } from "react-i18next";
import Text from "@/components/atoms/Text";
import { Creator } from "@/components/propsModel/Creator";
import CreatorCard from "@/components/organisms/CreatorCard";

const creators: Creator[] = [
    {
      name: "Arthur Bergère",
      age: 22,
      github: "https://github.com/arthurbergere",
      avatar: "https://i.pravatar.cc/150?u=arthurbergere",
      roleKey: "about.arthur.role",
      bioKey: "about.arthur.bio",
      favoritePokemonId: 243
    },
    {
      name: "Abdelhakim Elakrouti",
      age: 22,
      github: "https://github.com/ELAKROUTIAbdelhakim",
      avatar: "https://i.pravatar.cc/150?u=hakim",
      roleKey: "about.hakim.role",
      bioKey: "about.hakim.bio",
      favoritePokemonId: 94
    }
  ];
  

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Text variant="h1" size="2xl" bold className="mb-6">{t("about.title")}</Text>
      <Text size="base" color="gray" className="mb-10">{t("about.description")}</Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {creators.map((creator) => (
          <CreatorCard key={creator.name} creator={creator} />
        ))}
      </div>
    </main>
  );
};

export default AboutPage;
