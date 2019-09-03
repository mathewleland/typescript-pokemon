import React, { Component } from "react";
import Trainer from "../interfaces/Trainer.interface";

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export default class PokemonSearch extends Component<Trainer, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: Trainer) {
    super(props);
    this.state = {
      error: false,
      pokemon: {
        name: "",
        numberOfAbilities: 0,
        baseExperience: 0,
        imageUrl: ""
      }
    };
    this.pokemonRef = React.createRef();
  }

  searchPokemon = () => {
    const searchValue = this.pokemonRef.current.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
      .then(res => {
        if (res.status !== 200) {
          this.setState({ error: true });
          throw Error("no pokemon named that");
          return;
        }
        return res.json();
      })
      .then(res => {
        this.setState({
          error: false,
          pokemon: {
            name: res.name,
            numberOfAbilities: res.abilities.length,
            baseExperience: res.base_experience,
            imageUrl: res.sprites.front_default
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderResult = (): JSX.Element => {
    const { pokemon } = this.state;
    const { name, numberOfAbilities, baseExperience, imageUrl } = pokemon;
    return (
      <div
        style={{
          border: "1px solid black",
          width: 300,
          height: 300,
          margin: "10px auto"
        }}
      >
        <h5>{name}</h5>
        <img src={imageUrl} alt="pokemon" />
        <p>BaseExp: {baseExperience} </p>
        <p>Number of abilities: {numberOfAbilities}</p>
      </div>
    );
  };

  render() {
    const { trainer, numberOfPokemon } = this.props;
    const { name } = this.state.pokemon;
    return (
      <div>
        <h1>Look up a pokemon's stats</h1>
        <p>
          {" "}
          Current Trainer: {trainer} has {numberOfPokemon} pokemon!
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.searchPokemon}>Search</button>
        {!!name.length && this.renderResult()}
      </div>
    );
  }
}
