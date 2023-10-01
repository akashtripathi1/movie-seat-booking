const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;   // Added + sign to convert the type from string to number 

// populateUI function call
populateUI();

// local storage function for movie and movie price

function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectMoviePrice', moviePrice);

}

// update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');


    const seatIndex = [...selectedSeats].map( (seat) => [...seats].indexOf(seat));
    // console.log(seatIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;

    ticketPrice = +movieSelect.value;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    // console.log(selectedSeatsCount);
}

// seat click event

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') &&
     !e.target.classList.contains('occupied'))
     {
        e.target.classList.toggle('selected');
        updateSelectedCount();
     }
});
//Get data from local storage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

 
}

// Movie select event listener

movieSelect.addEventListener('change', (e) => {
    // console.log(movieSelect.value);
    ticketPrice = movieSelect.value;
    // console.log(e.target.selectedIndex, e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});


// Initial count and total set
updateSelectedCount();