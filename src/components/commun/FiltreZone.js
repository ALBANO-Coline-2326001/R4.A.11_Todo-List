import Recherche from "./Recherche";
import EnCoursEffectuer from "./EnCoursEffectuer";
import Filtre from "./Filtre";


//Affichage des différents filtres possibles
const FiltreZone = () => {
    return (
        <div className="filter-container">
            <Filtre/>
            <Recherche />
            <EnCoursEffectuer  />
        </div>
    );
};

export default FiltreZone;