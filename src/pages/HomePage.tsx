import "../i18n";
import { useTranslation } from "react-i18next";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import FeatureCard from "@/components/molecules/FeatureCard";
import { FaSearch, FaEye, FaProjectDiagram } from "react-icons/fa";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-24 pb-16 px-4 sm:px-8 lg:px-16">
        <Text
          variant="h1"
          size="4xl"
          color="primary"
          bold
          className="sm:text-5xl lg:text-6xl tracking-wider leading-tight max-w-4xl"
        >
          {t("home.hero.title")}
        </Text>
        <Text
          variant="p"
          size="lg"
          color="gray"
          className="mt-4 max-w-2xl text-base sm:text-lg"
        >
          {t(
            "home.hero.subtitle"
          )}
        </Text>
        <Button
          variant="secondary"
          className="mt-8 px-6 py-3 text-base sm:text-lg"
          onClick={() => (window.location.href = "/pokemons")}
        >
          {t("home.hero.cta")}
        </Button>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-8 lg:px-16 pb-20">
        <Text
          variant="h2"
          size="2xl"
          color="white"
          bold
          className="text-center mb-12"
        >
          {t("home.features.title")}
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={FaSearch}
            title={t("home.features.search.title")}
            description={t(
              "home.features.search.desc"
            )}
            linkText={t("home.features.search.link")}
            onClick={() => (window.location.href = "/pokemons")}
          />
          <FeatureCard
            icon={FaEye}
            title={t("home.features.detail.title")}
            description={t(
              "home.features.detail.desc"
            )}
            linkText={t("home.features.detail.link")}
            onClick={() => (window.location.href = "/pokemons/bulbasaur")}
          />
          <FeatureCard
            icon={FaProjectDiagram}
            title={t("home.features.evolution.title")}
            description={t(
              "home.features.evolution.desc"
            )}
            linkText={t("home.features.evolution.link")}
            onClick={() => (window.location.href = "/pokemon/1/evolution")}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
