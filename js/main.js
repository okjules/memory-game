/*Variable for calling all cards*/
let cards = document.querySelectorAll('.card');

/*Array for all cards*/
let cardsArray = [...cards];

let matchCountdown = cardsArray.length

/*Variable for calling the card-grid*/
const grid = document.querySelector('.grid');

/*Variable for calling the reload button*/
const reload = document.querySelector('.reload');

/*Variable for calling the moves counter*/
let moves = parseInt(document.querySelector('.moves').innerHTML, 10);

/*Empty array to store open cards in*/
let openCards = [];

/*Shuffles and displays card-grid on site-load*/
document.body.onload = gridSetup;

/*Resets game when reload-button is clicked*/
reload.addEventListener('click', resetGame);

/**
* @description: Shuffles cards, sets up Grid, adds event listeners to all cards
*/
function gridSetup() {
  shuffledCardsArray = shuffle(cardsArray);
  for (i = 0; i < shuffledCardsArray.length; i++) {
    grid.removeChild(cardsArray[i]);
    grid.appendChild(shuffledCardsArray[i]);
    shuffledCardsArray[i].addEventListener('click', displayCard);
  }
}

/**
* @description: Shuffle cards function from http://stackoverflow.com/a/2450976
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
* @description: Function for displaying card and matching it
*/
function displayCard() {
  if (this.classList.contains('match')) {
    return;
  } else {
      this.classList.add('open', 'show');
      let iTags = this.getElementsByTagName('i');
      let firstITag = iTags[0];
      let iTagClass = firstITag.className;
//Check if a card is already open or not
      if (openCards.length === 0) {
        openCards.push(iTagClass);
//Adds moves and removes stars
      } else {
        increaseMoves();

        if (moves >= 10) {
          starRating();
        }
//Check if second card matches first
        if (openCards.includes(iTagClass)) {
          cardsMatch(iTagClass);
            if (matchCountdown === 0) {
              winningGame();
            }
        }
//Runs if the two open cards don't match
        else {
          cardsDontMatch();
        }
      }
  }
}

/**
* @description: Function for two cards that match
*/
function cardsMatch(iTagClass) {
  let matchCards = [...grid.getElementsByClassName(iTagClass)];
  for (let matchCard of matchCards) {
    matchCard.parentElement.classList.add('match');
    matchCard.parentElement.classList.remove('open', 'show');
    matchCard.parentElement.onclick = '';
    openCards.length = 0;
  }
  matchCountdown -= 2;
}

/**
* @description: Function for two cards that don't match
*/
function cardsDontMatch() {
  setTimeout(function(){
    let noMatchCards = [...grid.getElementsByClassName('open', 'show')];
    for (let noMatchCard of noMatchCards) {
      noMatchCard.classList.remove('open', 'show');
      openCards.length = 0;
    }
  }, 600);
}

/**
* @description: Function for increasing moves
*/

function increaseMoves() {
  moves += 1;
  document.querySelector('.moves').innerHTML = moves;
}


/**
* @description: Function for removing stars
*/

function starRating() {
  if (moves >= 9 && moves <= 18) {
    let lastStar = document.getElementById('star-last');
    lastStar.style.fontSize = '0';
  } else {
    let middleStar = document.getElementById('star-middle');
    middleStar.style.fontSize = '0';
  }
}

/**
* @description: Function for winner overlay
*/
function winningGame() {
  function on() {
      document.getElementById('winner-overlay').style.display = "block";
  }
  on ();
}


/**
* @description: Function for resetting the whole Game
*/

function resetGame() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
  let lastStar = document.getElementById('star-last');
  lastStar.style.fontSize = 'initial';
  let middleStar = document.getElementById('star-middle');
  middleStar.style.fontSize = 'initial';
  reloadGrid();
  gridSetup();
}


/**
* @description: Function for resetting the card-grid
*/
function reloadGrid() {
  let allMatchedCards = [...grid.getElementsByClassName('match')];
  for (let allMatchedCard of allMatchedCards) {
    allMatchedCard.classList.remove('match');
  }
  let allOpenCards = [...grid.getElementsByClassName('open', 'show')];
  for (let allOpenCard of allOpenCards) {
    allOpenCard.classList.remove('open', 'show');
    openCards.length = 0;
  }
}
