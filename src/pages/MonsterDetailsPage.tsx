import React, { useEffect, useState } from "react";
import { getAbilityData, AbilityData } from "@/services/pokeApi";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePokemonDetail } from "@/hooks/usePokemon";
import {
    getPokemonSpecies,
    PokemonSpecies,
    getEvolutionChain,
    EvolutionChain,
    getTypeRelations,
    TypeDamageRelations,
} from "@/services/pokeApi";
import Image from "@/components/atoms/Image";
import Text from "@/components/atoms/Text";
import Badge from "@/components/atoms/Badge";
import StatLine from "@/components/atoms/StatLine";
import Button from "@/components/atoms/Button";
import InfoBlock from "@/components/molecules/InfoBlock";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import EvolutionsList from "@/components/molecules/EvolutionList";

const MonsterDetailsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { pokemon, loading, error } = usePokemonDetail(id || "");
    const [description, setDescription] = useState<string>("");
    const [prevEvo, setPrevEvo] = useState<string | null>(null);
    const [nextEvos, setNextEvos] = useState<string[]>([]);
    const [weaknesses, setWeaknesses] = useState<string[]>([]);
    const [translatedAbilities, setTranslatedAbilities] = useState<string[]>([]);
    useEffect(() => {
        if (!pokemon) return;
        Promise.all(
          pokemon.abilities.map(ab =>
            getAbilityData(ab).then((data: AbilityData) => {
              const nameEntry = data.names.find(n => n.language.name === i18n.language);
              return nameEntry ? nameEntry.name : ab;
            })
          )
        )
        .then(setTranslatedAbilities)
        .catch(() => setTranslatedAbilities(pokemon.abilities));
    }, [pokemon, i18n.language]);

    // 1) Description & évolutions
    useEffect(() => {
        if (!id) return;
        getPokemonSpecies(id)
            .then((data: PokemonSpecies) => {
                // description
                const lang = i18n.language;
                const entry = data.flavor_text_entries.find(e => e.language.name === lang);
                setDescription(
                    entry
                        ? entry.flavor_text.replace(/\n|\f/g, " ")
                        : t("labels.noDescription")
                );
                setPrevEvo(data.evolves_from_species?.name ?? null);
                return getEvolutionChain(data.evolution_chain.url);
            })
            .then((chainData: EvolutionChain) => {
                function traverse(node: EvolutionChain['chain'], parent: string | null) {
                    if (node.species.name === id) {
                        setPrevEvo(parent);
                        setNextEvos(node.evolves_to.map(c => c.species.name));
                    } else {
                        node.evolves_to.forEach(child => traverse(child, node.species.name));
                    }
                }
                traverse(chainData.chain, null);
            })
            .catch(() => {
                setPrevEvo(null);
                setNextEvos([]);
            });
    }, [id, i18n.language, t]);

    // 2) Faiblesses nettes (double_damage_from – half_damage_from)
    useEffect(() => {
        if (!pokemon) return;
        Promise.all(
            pokemon.types.map(type =>
                getTypeRelations(type).then((rel: TypeDamageRelations) => ({
                    double: rel.damage_relations.double_damage_from.map(d => d.name),
                    half:   rel.damage_relations.half_damage_from.map(d => d.name),
                }))
            )
        )
            .then(results => {
                const allDouble = results.flatMap(r => r.double);
                const allHalf   = results.flatMap(r => r.half);
                const net = Array.from(new Set(allDouble.filter(t => !allHalf.includes(t))));
                setWeaknesses(net);
            })
            .catch(() => setWeaknesses([]));
    }, [pokemon]);

    if (loading) return <Text>{t("loading")}</Text>;
    if (error || !pokemon) return <Text color="danger">{t("errors.notFound")}</Text>;

    // Conversion unités
    const heightM = (pokemon.height / 10).toFixed(1);
    const weightKg = (pokemon.weight / 10).toFixed(1);

   return (
  <div className="px-4 py-8 max-w-6xl mx-auto space-y-12">
    {/* Header */}
    <div className="flex items-center justify-between">
      <Text variant="h1" size="2xl" className="font-bold capitalize">{pokemon.name}</Text>
        <Button
        variant="secondary"
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-xl shadow-sm bg-gray-800 hover:bg-gray-700 transition"
        onClick={() => navigate("/pokemons")}
        >
        <ArrowLeft className="w-4 h-4" />
        {t("actions.back")}
        </Button>
    </div>

    {/* Image centrée + type/stats */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Image principale avec motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-3xl shadow-xl p-6 flex justify-center items-center"
      >
          <div className="w-full max-w-lg h-80 bg-gray-900 rounded-2xl shadow-md flex items-center justify-center">
            <Image src={pokemon.image}  className="w-auto h-full object-contain" />
        </div>
      </motion.div>

      {/* Infos types / niveau */}
      <div className="flex flex-col gap-6 justify-center">
        <InfoBlock title={t("labels.type")}>
          <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                <Badge key={type} variant="type" value={type} type={[type]} />
                ))}
            </div>
        </InfoBlock>
        <InfoBlock title={t("labels.level")}>
          <Text className="text-lg font-semibold">{pokemon.stats.hp}</Text>
        </InfoBlock>
        <InfoBlock title={t("labels.physicalInfo")}>
          <Text>{t("labels.height")} : {heightM} m</Text>
          <Text>{t("labels.weight")} : {weightKg} kg</Text>
        </InfoBlock>
      </div>
    </div>

    {/* Stats détaillées */}
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-inner">
      <InfoBlock title={t("labels.stats")}>
        <div className="grid grid-cols-2 gap-4">
          <StatLine label="HP" value={pokemon.stats.hp} />
          <StatLine label="Attaque" value={pokemon.stats.attack} />
          <StatLine label="Défense" value={pokemon.stats.defense} />
          <StatLine label="Vitesse" value={pokemon.stats.speed} />
          <StatLine label="Att. Spé" value={pokemon.stats.specialAttack} />
          <StatLine label="Déf. Spé" value={pokemon.stats.specialDefense} />
        </div>
      </InfoBlock>
    </div>

    {/* Évolutions et Capacités */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoBlock title={t("labels.previousEvolution")}>
        {prevEvo ? (
          <Button onClick={() => navigate(`/pokemons/${prevEvo}`)}>{prevEvo}</Button>
        ) : (
          <Text>{t("labels.none")}</Text>
        )}
      </InfoBlock>

      <InfoBlock title={t("labels.nextEvolution")}>
        {nextEvos.length > 0 ? (
            
          <EvolutionsList list={nextEvos} onClick={(name) => navigate(`/pokemons/${name}`)} />
        ) : (
          <Text>{t("labels.noFurtherEvolution")}</Text>
        )}
      </InfoBlock>

      <InfoBlock title={t("labels.abilities")}>
        {translatedAbilities.length > 0 ? (
          <ul className="list-disc list-inside text-sm">
            {translatedAbilities.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        ) : (
          <Text>{t("labels.none")}</Text>
        )}
      </InfoBlock>
    </div>

    {/* Faiblesses */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoBlock title={t("labels.weaknesses")}>
        {weaknesses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {weaknesses.map((w) => (
              <Badge key={w} variant="type" value={w} type={[w]} />
            ))}
          </div>
        ) : (
          <Text>{t("labels.none")}</Text>
        )}
      </InfoBlock>

      {/* Description */}
      <InfoBlock title={t("labels.description")}>
        <Text className="leading-relaxed text-sm">{description}</Text>
      </InfoBlock>
    </div>
  </div>
);
}

export default MonsterDetailsPage;