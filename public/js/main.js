let star = document.querySelectorAll('input');

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;

		console.log(i + " out of 5");
	});
}

function navigate(){
	window.location.replace = '/views/reserveer.html';
}

document.getElementsByClassName("button-review")[0].addEventListener("click", function(event){
	event.preventDefault();
	window.location.replace("../views/reserveer.html")
  });

function register(){
	alert("lol");
}