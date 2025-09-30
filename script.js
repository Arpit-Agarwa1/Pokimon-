let wrapper = document.querySelector(".wrapper");

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

fetchapi();

function showData(arr) {
  console.log(arr);
}
