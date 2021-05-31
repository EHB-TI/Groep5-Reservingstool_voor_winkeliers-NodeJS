let star = document.querySelectorAll('input[type="radio"]');
let starScore = 0;
for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;
		starScore = i;
		console.log(i + " out of 5");
	});
}

/*document.getElementsByClassName("button-review")[0].addEventListener("click", function(event){
	event.preventDefault();
	window.location.replace("../reserveer/reserveer.html")//Is tijdelijk moet naar andere pagina gelinkt worden
});*/

async function getData(url){
	let data = await fetch(url);
	return await data.json();
};

document.getElementsByClassName("button-review")[0].addEventListener("click", function(event){
	event.preventDefault();
	getData(`http://localhost:3000/api/insert/reviews?store_id=15&customer_id=7&score=5&description=xd`).then(data=>{
		console.log(data);
	})
})

