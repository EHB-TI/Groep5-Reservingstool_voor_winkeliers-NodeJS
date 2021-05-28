let star = document.querySelectorAll('input[type="radio"]');

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;

		console.log(i + " out of 5");
	});
}

document.getElementsByClassName("button-review")[0].addEventListener("click", function(event){
	event.preventDefault();
	window.location.replace("../reserveer/reserveer.html")//Is tijdelijk moet naar andere pagina gelinkt worden
  });

function sendDate(){
	let btn = document.querySelectorAll(".reserveer-btn")[0];
	console.log(btn.value);
}

function register(){
	alert("lol");
}

function fetchData(){
  fetch('http://localhost:3000/api/insert/reservation?store_id=2&customer_id=1&date=2021-05-25%2017:14:06')
  .then(response => response.json())
  .then(data => console.log(data));
}