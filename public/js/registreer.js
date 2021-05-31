
document.getElementById("date-picker").min = new Date().toISOString().split("T")[0];

function sendDate(){
	let btn = document.querySelectorAll(".reserveer-btn")[0];
	console.log(btn.value);
}

function fetchData(){
  let date = document.querySelectorAll(".reserveer-btn")[0].value;
  fetch(`http://localhost:3000/api/insert/reservation?store_id=2&customer_id=1&date=${date}`)
  .then(response => response.json())
  .then(data => console.log(data));
}


async function getData(url){
  let data = await fetch(url);
  return await data.json();
};

function Reserveer(){
  let date = document.getElementById("date-picker").value;
  console.log(date);
  let getHour = document.getElementById("uren").value;
  let getMinute = document.getElementById("minuten").value;
  if(date == "" ||getHour == "" || getMinute == ""){
    alert("Je moet alles invullen voor je kan registreren!");
  }
  else {
    getData(`http://localhost:3000/api/insert/reservations?store_id=2&customer_id=1&date=${date}%20${getHour}:${getMinute}:00`).then(data=>{
    console.log(data);
  });}
}



