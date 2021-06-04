const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const storeId = urlParams.get('store');

//Check if user chose a store
window.onload = function(){
getData(`http://localhost:3000/api/get/stores?id=${storeId}`).then(data=>{
  if(Object.keys(data).length > 0){
	console.log("Je zit op de goeie pagina");
  }
  else {
    console.log("Je zit op de foute pagina");
  }
});
}

//Get the number off stars and add it to the variabele starScore so we can use it later for the database
let star = document.querySelectorAll('input[type="radio"]');
let starScore = 0;
for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {			/* source: https://www.youtube.com/watch?v=zDHC4r5eCdY*/
		i = this.value * 2;
		starScore = i;
		console.log(i + " out of 10");
	});
}

//Get the data
async function getData(url){
	let data = await fetch(url);
	return await data.json();
};

document.getElementsByClassName("button-review")[0].addEventListener("click", function(event){
	event.preventDefault();
	let tekst = document.getElementById('review-text');
	//make sure the textfield isn't empty
	if(tekst.value != ""){
	//Store the reservation in the database with the values off the variabeles
	getData(`http://localhost:3000/api/insert/reviews?store_id=${storeId}&customer_id=7&score=${starScore}&description=${tekst.value}`).then(data=>{
		console.log(data);
		alert("Je review is verstuurd.");
		//make the textfield empty
		tekst.value = "";
	});
	}else {
		alert("Je moet een bericht achterlaten!");
	}
})

