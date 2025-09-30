let wrapper = document.querySelector(".wrapper");

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

async function fetchApiSecond(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);

    try {
      let response = await fetch(arr[i].url);
      let result = await response.json();
      showData(result);
    } catch (error) {
      console.log(error);
    }
  }
}

function showData(arr) {
  console.log(arr);

  let box = document.createElement("div");
  box.classList.add("boxes");

  let img = document.createElement("img");

  img.src = arr.sprites.front_default;
  let para = document.createElement("p");

  para.innerText = arr.name;
  box.append(img, para);
  wrapper.append(box);
}
