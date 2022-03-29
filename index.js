import { getPokemon, getPokemons } from "./api/pokemons.js";

const poke_container = document.getElementById("poke_container");
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");
const pagination = document.getElementById("pagination");
var pos = 1120;

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
  poke_container.innerHTML = "";
  pokemons.map(async ({ name }) => {
    let { abilities, stats, id, img } = await getPokemon(name);

    poke_container.innerHTML += `
    <div class="bg-slate-200 text-black rounded-lg shadow-md max-w-sm z-10">
          <h2
            class="text-xl text-center mt-3 font-semibold uppercase pokemon-name tracking-widest"
          >
            ${name}
          </h2>
          <h6 class="text-xs mb-3 text-center">#${id}</h6>
          <div class="grid grid-cols-2 place-items-center">
            <img
              src="${img}"
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

const pokemons = await getPokemons(pos);

await showPokemons(pokemons);

btnPrevious.addEventListener("click", async () => {
  if (pos > 0) {
    pos -= 20;
    let pokemons = await getPokemons(pos);
    await showPokemons(pokemons);
  }
});
btnNext.addEventListener("click", async () => {
  if (pos < 1120) {
    pos += 20;
    let pokemons = await getPokemons(pos);
    await showPokemons(pokemons);
  }
});
pagination.addEventListener("click", async ({ target }) => {
  if (
    target.tagName === "BUTTON" &&
    target.getAttribute("data-") !== "static"
  ) {
    let id = target.getAttribute("id");
    let number = id[id.length - 1];
    pos = 20 * (number - 1);
    let pokemons = await getPokemons(pos);
    await showPokemons(pokemons);
  }
});
