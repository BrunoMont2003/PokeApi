import fetch from "node-fetch";

export async function getPokemons(pos) {
  const URI = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
  const response = await fetch(URI + pos);
  const pokemons = await response.json();
  return pokemons;
}

export async function getPokemon(name) {
  const URI = "https://pokeapi.co/api/v2/pokemon/" + name;
  const response = await fetch(URI);
  const { abilities, stats } = await response.json();
  let myAbilities = [];
  let myStats = [];
  abilities.forEach(({ ability }) => {
    myAbilities.push(ability.name);
  });

  stats.forEach(({ stat, base_stat }) => {
    let stat_name = stat.name;
    myStats.push({ stat_name, base_stat });
  });

  return {
    abilities: myAbilities,
    stats: myStats,
  };
}
