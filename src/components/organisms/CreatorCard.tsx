import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-md">
      <img
        src={creator.avatar}
        alt={creator.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <Text variant="h3" size="xl" bold>{creator.name}</Text>
      <Text size="base" color="gray">
        {t(creator.roleKey)} · {creator.age} ans
      </Text>
      <Text size="sm" color="secondary" italic className="mt-2">
        {t(creator.bioKey)}
      </Text>
      <a
        href={creator.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4"
      >
        <Button variant="outline">
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </Button>
      </a>
    </div>
  );
};

export default CreatorCard;
