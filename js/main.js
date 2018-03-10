/*Variable for calling all cards*/
let cards = document.querySelectorAll(".card");

/*Array for all cards*/
let cardsArray = [...cards];

/*Variable for calling the card-grid*/
const grid = document.querySelector(".grid");

/*Variable for calling the reload button*/
const reloadGrid = document.querySelector(".reload");

/*Shuffles and displays card-grid on site-load*/
document.body.onload = gridSetup;

/*Shuffles board when reload-button is clicked*/
reloadGrid.addEventListener("click", gridSetup);

/**
* @description: Shuffle function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
* @description: Shuffles cards and sets up Grid
*/
function gridSetup() {
  shuffledCardsArray = shuffle(cardsArray);
  for (i = 0; i < shuffledCardsArray.length; i++) {
    grid.removeChild(cardsArray[i]);
    grid.appendChild(shuffledCardsArray[i]);
  }
}
