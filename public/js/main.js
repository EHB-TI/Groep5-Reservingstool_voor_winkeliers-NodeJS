let star = document.querySelectorAll('input');

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

function register(){
	alert("lol");
}