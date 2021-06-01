const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const storeId = urlParams.get('store');

getData(`http://localhost:3000/api/get/stores?id=${storeId}`).then(data=>{
  if(Object.keys(data).length > 0){
    alert("xd");
  }
  else {
    alert("wow");
  }
});


let star = document.querySelectorAll('input[type="radio"]');
let starScore = 0;
for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value * 2;
		starScore = i;
		console.log(i + " out of 10");
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
	let tekst = document.getElementById('review-text');
	if(tekst.value != ""){
	getData(`http://localhost:3000/api/insert/reviews?store_id=${storeId}&customer_id=7&score=${starScore}&description=${tekst.value}`).then(data=>{
		console.log(data);
		alert("Je review is verstuurd.");
		tekst.value = "";
	});
	}else {
		alert("Je moet een bericht achterlaten!");
	}
})

