const container = document.querySelector('.container');
const seats = document.querySelectorAll ('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieselect = document.getElementById('movie')

populateUI();

let ticketPrice = +movieselect.value; /* here we get the value (number/price) of the movie */ /* we add the (+) to turn the value from stringe wich is the defult into a num so we can add the total later */ /* we use let so the num can be changed */


//save selcted movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

/* update total and count*/
function updateSelectedCount () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //copy selected seats into arr
  //map throught the arr
  //return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //saving the value in the local storge
  localStorage.setItem('selectedseats', JSON.stringify(seatsIndex)) //seatsIndex is an arr so we used JSON.stringify so we can use it 

  const selectedSeatsCount = selectedSeats.length;
  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice; //the price
}

//dont work?? fixed the s was small leter
//re uplod the info from local storge
function populateUI() {
  const selectedseats = JSON.parse(localStorage.getItem('selectedseats'));
  //used JSON.parse to return the rapper into an arr

  //to check if the storage is empty or not
  if (selectedseats !== null && selectedseats.length > 0){
    seats.forEach((seat, index) => {
      if (selectedseats.indexOf(index) > -1) { // "index > -1" means that it exsist in the array if it dosnt then it index is -1
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !==null) {
    movieselect.selectedIndex = selectedMovieIndex; //here we set the index
  }

}

/* movie select event */
movieselect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value); //here we fetch the index
  updateSelectedCount();
});


/*selecting the seat */
/* function (=>) its the same and e stand for event */
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');


      updateSelectedCount (); /* call this fun to update the seatnumber and total price */
  }
});

// Initial count and total set
//this will call it autmaticly after we get the info from the storage
updateSelectedCount();
