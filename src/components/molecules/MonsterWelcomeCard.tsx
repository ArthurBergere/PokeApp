import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import clsx from "clsx";
import { t } from "i18next";

interface MonsterWelcomeCardProps {
  onViewClick: () => void;
  className?: string;
}

const MonsterWelcomeCard: React.FC<MonsterWelcomeCardProps> = ({
  onViewClick,
  className,
}) => {
  return (
    <div
      className={clsx(
        "w-full bg-gray-900 text-white rounded-2xl  p-8 text-center",
        className
      )}
    >
      <div className="space-y-5">
        <div className="text-center">
          <Text variant="h1" size="6xl" color="white" bold>
            {t("titles.welcome")}
          </Text>
          <Text variant="h1" size="6xl" color="poke" bold>
            PokeApp
          </Text>
        </div>

        <Text variant="p" size="base" color="gray">
          {t("titles.introText")}
        </Text>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={onViewClick}
            className="w-44 text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            {t("actions.ExploreBtn")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonsterWelcomeCard;
