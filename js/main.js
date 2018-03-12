/*Variable for calling all cards*/
let cards = document.querySelectorAll(".card");

/*Array for all cards*/
let cardsArray = [...cards];

/*Variable for calling the card-grid*/
const grid = document.querySelector(".grid");

/*Variable for calling the reload button*/
const reloadGrid = document.querySelector(".reload");

/*Variable for calling moves variable*/
let moves = parseInt(document.querySelector(".moves").innerHTML, 10);

/*Empty array to store open cards*/
let openCards = [];

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
* @description: Shuffles cards, sets up Grid, adds event listeners
*/
function gridSetup() {
  shuffledCardsArray = shuffle(cardsArray);
  for (i = 0; i < shuffledCardsArray.length; i++) {
    grid.removeChild(cardsArray[i]);
    grid.appendChild(shuffledCardsArray[i]);
    shuffledCardsArray[i].addEventListener("click", displayCard);
  }
}





/**
* @description: Function for displayed card
*/
function displayCard() {
  if (this.classList.contains("match")) {
    return;
  } else {
  //added classen zur geklickten card für anzeigen
  this.classList.add("open", "show");
  //holt die i-classe aus dem geklickten card-element und speichert in variable iTag
  let iTags = this.getElementsByTagName("i");
  //holt das erste element aus der HTMLcollection iTag, speichert es in variable x
  let x = iTags[0];
  //speichert die classen-namen aus x als string in iTagClass
  let iTagClass = x.className;
  //if-abfrage start, wenn openCards-array leer, iTagClass-string rein
  if (openCards.length === 0) {
   openCards.push(iTagClass);
  //wenn schon classe drin, dann neue if abfrage
  } else {
    moves += 1;
    document.querySelector(".moves").innerHTML = moves;
    //checkt ob openCards-array den gleichen i-class-namen hat
    if (openCards.includes(iTagClass)) {
      //falls ja sucht er sich alle elemente im grid mit dem i-class-namen
      let jens = [...grid.getElementsByClassName(iTagClass)];
      //for loop der durch die elemente in jens loopt und an das parent-elemnt
      //die classe match hängt
      for (let x of jens) {
        x.parentElement.classList.add("match");
        x.parentElement.classList.remove("open", "show");
        x.parentElement.onclick = "";
        openCards.length = 0;
      } }

      else {

setTimeout(function(){
          let jens = [...grid.getElementsByClassName("open", "show")];
          for (let y of jens) {
            y.classList.remove("open", "show");
            openCards.length = 0;
          }}, 1000);
        }
      }
    }
}


/*
* timer einrichten, ab 1. click, endet, wenn alle gematched
* darauf aufbauend sterne-rating nimmt ab nach x-zahl clicks
* final message wenn alle gematched sind mit sterne, moves + zeit
* reload funktion anpassen (alles auf null auch gematched)
* sonderfall: idioten-click auf offene, gematchd karte (nix darf passieren)
*/
