//Inital setup
  /* Shuffles and displays card-grid on site-load */
  document.body.onload = gridSetup;

//Variables concering the cards
  /* Variable for calling the card-grid */
  const grid = document.querySelector('.grid');

  /* Variable for calling all cards */
  let cards = document.querySelectorAll('.card');

  /* Array for all cards */
  let cardsArray = [...cards];

  /* Array to store open cards in */
  let openCards = [];

  /* Variable for tracking how many cards have been matched */
  let matchCountdown = cardsArray.length;

// Variables concerning the timer
  /* Status of timer on start */
  let timerRunning = false;

  /* Value of timer on start */
  let timerIntervalId = 0;

  /* Variable for calling the initial timer value */
  let initialTimer = parseInt(document.querySelector('#timer').innerHTML, 10);

// Variables concerning the star-rating
  /* Status of star-rating on start */
  let starStatus = 3;

// Variables concerning the moves
  /* Variable for calling the initial moves value */
  let moves = parseInt(document.querySelector('.moves').innerHTML, 10);

// Variables concerning the two reload possibilities
  /* Variable for calling the reload button */
  const reload = document.querySelector('.reload');

  /* Resets game when reload-button is clicked */
  reload.addEventListener('click', resetGame);

  /* Variable for calling the play again-button */
  const startingOver = document.querySelector('#start-over');

  /* Resets game when play again-button is clicked */
  startingOver.addEventListener('click', playAgain);

// Functions
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
* @description: Card shuffle function from http://stackoverflow.com/a/2450976
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
* @description: Function for displaying a card and matching it
*/
function displayCard() {
//Starts timer on first click
  if (timerRunning === false) {
    timer();
    timerRunning = true;
  }
//Turn around the clicked card, does nothing if card is already open and matched
  if (this.classList.contains('match')||this.classList.contains('open')) {
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
//Checks if second, opened card matches the first
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
* @description: Function for timing the game and displaying timer, adapted from here
* https://wiki.selfhtml.org/wiki/JavaScript/Objekte/Date/now
*/
function timer() {
  let startTime = Date.now();
	timerIntervalId = setInterval(function () {
    let elapsedTime = Date.now() - startTime;
		document.getElementById('timer').innerHTML = (elapsedTime / 1000).toFixed(1);
		}, 100);
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
  if (moves >= 9 && moves <= 15) {
    let lastStar = document.getElementById('star-last');
    lastStar.style.fontSize = '0';
    starStatus = 2;
  } else {
    let middleStar = document.getElementById('star-middle');
    middleStar.style.fontSize = '0';
    starStatus = 1;
  }
}

/**
* @description: Function for winner modal, if all cards match
*/
function winningGame() {
  clearInterval(timerIntervalId);
  function on() {
      document.getElementById('winner-overlay').style.display = 'block';
  }
  on();
  document.querySelector('.final-stars').innerHTML = starStatus;
  document.querySelector('.final-moves').innerHTML = moves;
  document.querySelector('.final-time').innerHTML = document.querySelector('#timer').innerHTML;
}

/**
* @description: Function to ran, if play again-button on winner modal is clicked
*/
function playAgain() {
  function off() {
    document.getElementById('winner-overlay').style.display = 'none';
  }
  off();
  resetGame();
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
  matchCountdown = cardsArray.length;
  resetTimer ();
  reloadGrid();
  gridSetup();
}

/**
* @description: Function for resetting the timer
*/
function resetTimer() {
  clearInterval(timerIntervalId);
  timerRunning = false;
  timerIntervalId = 0;
  document.querySelector('#timer').innerHTML = initialTimer;
}

/**
* @description: Function for resetting the cards
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
