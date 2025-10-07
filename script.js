let fragment = document.createDocumentFragment();
let wrapper = document.querySelector(".wrapper");
let input = document.querySelector(".input");
let baseurl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

window.addEventListener("load", async () => {
  const temp = await fetchapi(baseurl);

  const response = temp.results;
  const promises = [];
  for (let i = 0; i < response.length; i++) {
    // console.log(response);
    promises.push(fetchapi(response[i].url));
  }
  //   console.log(promises);

  const finalData = await Promise.all(promises);
  console.log(finalData);
  namesPokemon = finalData;
  for (let i = 0; i < finalData.length; i++) {
    showData(finalData[i]);
  }
  wrapper.append(fragment);
});

async function fetchapi(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

let namesPokemon = [];

// async function fetchApiSecond(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     try {
//       let response = await fetch(arr[i].url);

//       let result = await response.json();

//       fragment.appendChild(showData(result));
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

function showData(obj) {
  let box = document.createElement("div");

  let flipInner = document.createElement("div");
  flipInner.classList.add("flip-card-inner");
  let flipFront = document.createElement("div");
  flipFront.classList.add("flip-card-front");
  let flipBack = document.createElement("div");
  flipBack.classList.add("flip-card-back");

  flipBack.innerText = obj.id;
  box.classList.add("boxes", "flip-card");

  let img = document.createElement("img");

  img.src = obj.sprites.other.dream_world.front_default;
  let para = document.createElement("p");

  box.append(flipInner);
  para.innerText = obj.name;
  flipInner.append(flipFront, flipBack);
  flipFront.append(img, para);

  fragment.append(box);

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
