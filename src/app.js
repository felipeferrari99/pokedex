let sprite = document.querySelector("#sprite");
let number = document.querySelector("#number");
let pokemonName = document.querySelector("#pokemonName");
let type = document.querySelector("#type");
let generation = document.querySelector("#generation");
let search = document.querySelector("#search");
let shiny = document.querySelector("#shiny");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");
let input = 0;

function checkInput() {
    if (input != 0) {
        input = parseInt(number.innerText);
    }
}

search.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    input = formData.get('input').toLowerCase();

    getPokemon(input);
});

next.addEventListener('click', () => {
    checkInput()
    if (input < 1025) {
        input = parseInt(input) + 1;
        getPokemon(input);
    }
})

previous.addEventListener('click', () => {
    checkInput()
    if (input > 1) {
        input = parseInt(input) - 1;
        getPokemon(input);
    }
})

function getPokemon(input) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            defaultSprite = data.sprites.front_default;
            shinySprite = data.sprites.front_shiny;
            sprite.src = defaultSprite;
            shiny.innerText = "SHINY";
            shiny.addEventListener("click", () => {
                if (shiny.innerText == "SHINY") {
                    shiny.innerText = "NORMAL";
                    sprite.src = shinySprite;
                } else if (shiny.innerHTML == "NORMAL") {
                    shiny.innerText = "SHINY";
                    sprite.src = defaultSprite;
                }
            });
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
            document.querySelector("#input").value = "";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}