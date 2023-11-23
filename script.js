const inputEl = document.getElementById("input");
const meaningContainerEl = document.getElementById("meaning-container");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    meaningContainerEl.style.display = "none";
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    inputEl.innerText = `an error happened, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});