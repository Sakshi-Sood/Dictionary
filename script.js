const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

window.onload = () => {
  inpWord.focus();
};

inpWord.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  let inpWordValue = inpWord.value;
  (async () => {
    try {
      const res = await fetch(`${url}${inpWordValue}`);
      const data = await res.json();
      console.log(data);
      result.innerHTML = `
        <div class="word">
            <h3>${inpWordValue}</h3>
            <button onClick="playSound()">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic ? "/" + data[0].phonetic : ""}</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || " "}
        </p>`;

      const phonetics = data[0].phonetics.find((p) => p.audio);
      if (phonetics && phonetics.audio) {
        const audioSrc = phonetics.audio;
        sound.setAttribute(
          "src",
          audioSrc.startsWith("http") ? audioSrc : `https:${audioSrc}`
        );
      }
    } catch (error) {
      result.innerHTML = `
        <h3 class="error">Sorry we couldn't find the word</h3>
        <p class="error-para">Please check your spelling or try another word</p>
      `;
    }
  })();
});

const playSound = () => {
  sound.play();
};
