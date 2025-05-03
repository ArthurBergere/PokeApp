import "../i18n";
import { useTranslation } from "react-i18next";
import MonsterWelcomeCard from "@/components/molecules/MonsterWelcomeCard";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    return (
      
      <div className="p-6">
        <MonsterWelcomeCard 
          onViewClick={() => navigate('/pokemons')} 
          className="max-w-md mx-auto mt-8"
        />
      </div>
    );
}
export default HomePage;
