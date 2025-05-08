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
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Text variant="h1" size="2xl">{pokemon.name}</Text>
                <Button variant="secondary" onClick={() => navigate("/pokemons")} className="uppercase">
                    ← {t("actions.back")}
                </Button>
            </div>

            {/* Première ligne : Image & Type/Niveau */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 flex justify-center">
                    <div className="w-full max-w-lg h-80 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-auto h-full object-contain"
                        />
                    </div>
                </div>
                <div className="col-span-1 flex flex-col gap-4 self-start">
                    <InfoBlock title={t("labels.type")!}>
                        <div className="flex flex-wrap gap-2">
                            {pokemon.types.map(type => (
                                <Badge key={type} variant="type" value={type} type={[type]} />
                            ))}
                        </div>
                    </InfoBlock>
                    <InfoBlock title={t("labels.level")!}>{pokemon.stats.hp}</InfoBlock>
                </div>
            </div>

            {/* Deuxième ligne : Evolutions & Capacités */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoBlock title={t("labels.previousEvolution")!} className="self-start">
                    {prevEvo
                        ? <Button variant="primary" onClick={() => navigate(`/pokemons/${prevEvo}`)}>{prevEvo}</Button>
                        : <Text>{t("labels.none")}</Text>
                    }
                </InfoBlock>

                <InfoBlock title={t("labels.nextEvolution")!} className="self-start">
                    {nextEvos.length > 0
                        ? <div className="flex flex-wrap gap-2">
                            {nextEvos.map(name => (
                                <Button key={name} variant="primary" onClick={() => navigate(`/pokemons/${name}`)}>
                                    {name}
                                </Button>
                            ))}
                        </div>
                        : <Text>{t("labels.noFurtherEvolution")}</Text>
                    }
                </InfoBlock>

                <InfoBlock title={t("labels.abilities")!} className="self-start">
                    {translatedAbilities.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {translatedAbilities.map((label) => (
                            <li key={label}>{label}</li>
                          ))}
                        </ul>
                    ) : (
                        <Text>{t("labels.none")}</Text>
                    )}
                </InfoBlock>
            </div>

            {/* Troisième ligne : Faiblesses, Physique, Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoBlock title={t("labels.weaknesses")!} className="self-start">
                    {weaknesses.length > 0
                        ? <div className="flex flex-wrap gap-2">
                            {weaknesses.map(w => (
                                <Badge key={w} variant="type" value={w} type={[w]} />
                            ))}
                        </div>
                        : <Text>{t("labels.none")}</Text>
                    }
                </InfoBlock>

                <InfoBlock title={t("labels.physicalInfo")!} className="self-start">
                    <Text>{`${t("labels.height")} : ${heightM} m`}</Text>
                    <Text>{`${t("labels.weight")} : ${weightKg} kg`}</Text>
                </InfoBlock>

                <InfoBlock title={t("labels.stats")!} className="self-start">
                    <div className="grid grid-cols-2 gap-2">
                        <StatLine label="HP" value={pokemon.stats.hp} />
                        <StatLine label="Attaque" value={pokemon.stats.attack} />
                        <StatLine label="Défense" value={pokemon.stats.defense} />
                        <StatLine label="Vitesse" value={pokemon.stats.speed} />
                        <StatLine label="Att. Spé" value={pokemon.stats.specialAttack} />
                        <StatLine label="Déf. Spé" value={pokemon.stats.specialDefense} />
                    </div>
                </InfoBlock>
            </div>

            {/* Description */}
            <div className="mt-6">
                <InfoBlock title={t("labels.description")!}>
                    <Text>{description}</Text>
                </InfoBlock>
            </div>
        </div>
    );
};

export default MonsterDetailsPage;