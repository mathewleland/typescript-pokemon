import React from "react";
import PokemonSearch from "./components/PokemonSearch";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <PokemonSearch trainer="mathew" numberOfPokemon={3} />
    </div>
  );
};

export default App;
