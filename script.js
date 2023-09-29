const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value;   // Added + sign to convert the type from string to number 

container.addEventListener('click', (e) => {
    console.log(e.target);
});

