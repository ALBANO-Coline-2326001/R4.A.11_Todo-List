import './assets/css/App.css';

import { TodoWrapper } from './components/tache/TodoWrapper';
import Header from "./components/commun/Header";
import Footer from "./components/commun/Footer";
import Filtre from "./components/commun/Filtre";
//import data from './assets/json/data.json'
import { TodoProvider } from "./components/contexts/TodoContext"; // Import du contexte

function App() {

  return (
      <TodoProvider>
          <div className="App">
              {/*JSON.stringify(data)*/}
              <Header />
              <Filtre />
              <TodoWrapper/>
              <Footer nom="Coline"  />
          </div>
      </TodoProvider>


  );
}

export default App;
