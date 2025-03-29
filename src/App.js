import './assets/css/App.css';

import { TodoWrapper } from './components/tache/TodoWrapper';
import Header from "./components/commun/Header";
import Footer from "./components/commun/Footer";
import Filtre from "./components/commun/FiltreZone";
//import data from './assets/json/data.json'
import { TodoProvider } from "./components/contexts/TodoContext"; // Import du contexte

//Chargement des différents composents de l'application
function App() {
    return (
      <TodoProvider>
          <div className="App">
              <Header />
              <Filtre />
              <TodoWrapper/>
              <Footer nom="Coline"  />
          </div>
      </TodoProvider>

  );
}

export default App;
