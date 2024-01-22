const sprite = document.querySelector("#sprite");
const number = document.querySelector("#number");
const pokemonName = document.querySelector("#pokemonName");
const type = document.querySelector("#type");
const generation = document.querySelector("#generation");
const search = document.querySelector("#search");
const shiny = document.querySelector("#shiny");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const errorMessage = document.querySelector("#errorMessage");
let userInput = null;
let defaultSprite;
let shinySprite;

function checkInput() {
    if (userInput != 0) {
        userInput = parseInt(number.innerText);
        if (number.innerText == "") {
        userInput = 0;
        }
    } else if (userInput == 0) {
        userInput = parseInt(number.innerText);
    }
}

search.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    userInput = formData.get('userInput').toLowerCase().trim();
    if (isNaN(userInput)) {
        getPokemon(userInput);
    } else {
        getPokemon(parseInt(userInput));
    }
});

next.addEventListener('click', () => {
    checkInput()
    if (userInput < 1026) {
        userInput = parseInt(userInput) + 1;
        getPokemon(userInput);
    }
})

previous.addEventListener('click', () => {
    checkInput()
    if (userInput > 0) {
        userInput = parseInt(userInput) - 1;
        getPokemon(userInput);
    }
})

shiny.addEventListener("click", () => {
    if (defaultSprite && shinySprite){
        checkInput()
        if (shiny.innerText == "SHINY") {
            shiny.innerText = "NORMAL";
            sprite.src = shinySprite;
        } else if (shiny.innerText == "NORMAL") {
            shiny.innerText = "SHINY";
            sprite.src = defaultSprite;
        }
    }
});

function getPokemon(userInput) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            errorMessage.classList.remove("appearing")
            defaultSprite = data.sprites.front_default;
            shinySprite = data.sprites.front_shiny;
            sprite.src = defaultSprite;
            shiny.innerText = "SHINY";
            pokemonName.innerText = data.name;
            number.innerText = data.id;
            type.innerText = data.types[0].type.name;
            let backgroundColor;

            switch (type.innerText) {
                case "GRASS":
                    backgroundColor = "#7AC74C";
                    break;
                case "FIRE":
                    backgroundColor = "#EE8130";
                    break;
                case "WATER":
                    backgroundColor = "#6390F0";
                    break;
                case "ELECTRIC":
                    backgroundColor = "#F7D02C";
                    break;
                case "NORMAL":
                    backgroundColor = "#A8A77A";
                    break;
                case "ICE":
                    backgroundColor = "#96D9D6";
                    break;
                case "FIGHTING":
                    backgroundColor = "#C22E28";
                    break;
                case "DRAGON":
                    backgroundColor = "#6F35FC";
                    break;
                case "POISON":
                    backgroundColor = "#A33EA1";
                    break;
                case "GROUND":
                    backgroundColor = "#E2BF65";
                    break;
                case "FLYING":
                    backgroundColor = "#A98FF3";
                    break;
                case "PSYCHIC":
                    backgroundColor = "#F95587";
                    break;
                case "BUG":
                    backgroundColor = "#A6B91A";
                    break;
                case "ROCK":
                    backgroundColor = "#B6A136";
                    break;
                case "GHOST":
                    backgroundColor = "#735797";
                    break;
                case "DARK":
                    backgroundColor = "#705746";
                    break;
                case "STEEL":
                    backgroundColor = "#B7B7CE";
                    break;
                case "FAIRY":
                    backgroundColor = "#D685AD";
                    break;
                default:
                    backgroundColor = "";
            }
            type.style.backgroundColor = backgroundColor;

            switch (true) {
                case (0 < data.id && data.id < 152):
                    generation.innerText = "1";
                    break;
                case (data.id < 252):
                    generation.innerText = "2";
                    break;
                case (data.id < 387):
                    generation.innerText = "3";
                    break;
                case (data.id < 494):
                    generation.innerText = "4";
                    break;
                case (data.id < 650):
                    generation.innerText = "5";
                    break;
                case (data.id < 722):
                    generation.innerText = "6";
                    break;
                case (data.id < 810):
                    generation.innerText = "7";
                    break;
                case (data.id < 906):
                    generation.innerText = "8";
                    break;
                default:
                    generation.innerText = "9";
            }        
            document.querySelector("#userInput").value = "";
    })
    .catch(error => {
        document.querySelector("#userInput").value = "";
        errorMessage.classList.add("appearing")
    });
}