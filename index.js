import { getPokemon, getPokemons } from "./api/pokemons.js";
let pokemons = await getPokemons(0);

const poke_container = document.getElementById("poke_container");

const listStats = (stats) => {
  let list = "";
  stats.map(({ stat_name, base_stat }) => {
    list += `
      <li>
            <span class="font-semibold">${stat_name}:</span>
            <span class="">${base_stat}</span>
      </li>
      `;
  });
  return list;
};
const listAbilities = (abilities) => {
  let list = "";
  abilities.map((ability) => {
    list += `
        <span
        class="px-2 py-1 tracking-widest bg-purple-300  font-semibold text-xs rounded-xl text-black mr-5 mb-2">
                ${ability}
        </span>
        `;
  });
  return list;
};

const showPokemons = async (pokemons) => {
  console.log(pokemons);
  pokemons.map(async ({ name }) => {
    let { abilities, stats, id } = await getPokemon(name);

    poke_container.innerHTML += `
    <div class="bg-slate-200 text-black rounded-lg shadow-md w-90 z-10">
          <h2
            class="text-xl text-center my-3 font-semibold uppercase pokemon-name tracking-widest"
          >
            ${name}
          </h2>
          <div class="grid grid-cols-2 place-items-center">
            <img
              class="w-96"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png"
              alt=${name}
            />
            <ul class="p-5">
                ${listStats(stats)}
              
            </ul>
          </div>
          <div class="px-5 border-t border-slate-500 bg-opacity-10">
            <h4 class="font-semibold tracking-wider text-xs my-3 font-sans">
              Abilities
            </h4>
            <div class="flex flex-wrap my-4">
              
                ${listAbilities(abilities)}
            </div>
          </div>
        </div>
    
    `;
  });
};

await showPokemons(pokemons);
