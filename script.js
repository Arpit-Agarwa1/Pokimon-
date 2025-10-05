let wrapper = document.querySelector(".wrapper");
let input = document.querySelector(".input");

fetchapi();
async function fetchapi() {
  try {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    let result = await response.json();
    fetchApiSecond(result.results);
  } catch (error) {
    console.log(error);
  }
}

let namesPokemon = [];

async function fetchApiSecond(arr) {
  for (let i = 0; i < arr.length; i++) {
    try {
      let response = await fetch(arr[i].url);
      let result = await response.json();
      namesPokemon.push(result);

      showData(result);
    } catch (error) {
      console.log(error);
    }
  }
}

function showData(arr) {
  let box = document.createElement("div");

  let flipInner = document.createElement("div");
  flipInner.classList.add("flip-card-inner");
  let flipFront = document.createElement("div");
  flipFront.classList.add("flip-card-front");
  let flipBack = document.createElement("div");
  flipBack.classList.add("flip-card-back");
  box.classList.add("boxes", "flip-card");

  let img = document.createElement("img");

  img.src = arr.sprites.other.dream_world.front_default;
  let para = document.createElement("p");

  box.append(flipInner);
  para.innerText = arr.name;
  flipInner.append(flipFront, flipBack);
  flipFront.append(img, para);
  wrapper.append(box);

  // xxxxxxx
}

input.addEventListener("change", serching);

function serching() {
  let serchItem = input.value;
  wrapper.innerHTML = "";

  for (let i = 0; i < namesPokemon.length; i++) {
    let pokemon = namesPokemon[i];

    if (pokemon.name.includes(serchItem)) {
      showData(pokemon);
    }
  }
}
