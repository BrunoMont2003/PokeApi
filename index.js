import { getPokemon, getPokemons } from "./api/pokemons.js";
let pokemons = await getPokemons(0);
const { abilities, stats } = await getPokemon("bulbasaur");
