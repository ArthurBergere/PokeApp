// src/pages/MonsterListPage.tsx

import React from "react";
import MonsterList from "../components/organisms/MonsterList";
import Text from "../components/atoms/Text";
import { useTranslation } from "react-i18next";

const MonsterListPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="p-6">
            <Text variant="h1" size="2xl" className="text-center text-blue-400 mb-6">
                {t("titles.allPokemon") || "Tous les Pokémon"}
            </Text>

            <MonsterList />
        </div>
    );
};

export default MonsterListPage;