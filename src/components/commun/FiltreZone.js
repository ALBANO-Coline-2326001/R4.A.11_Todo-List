import Recherche from "./Recherche";
import EnCoursEffectuer from "./EnCoursEffectuer";
import Filtre from "./Filtre";


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