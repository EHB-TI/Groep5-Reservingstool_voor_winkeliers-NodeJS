
document.getElementById("date-picker").min = new Date().toISOString().split("T")[0];

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

async function getData(url){
  let data = await fetch(url);
    return await data.json();
};

function Reserveer(){
  let date = document.getElementById("date-picker").value;
  let getHour = document.getElementById("uren").value;
  let getMinute = document.getElementById("minuten").value;
  if(date == "" ||getHour == "" || getMinute == ""){
    alert("Je moet alles invullen voor je kan registreren!");
  }
  else {
    getData(`http://localhost:3000/api/insert/reservations?store_id=${storeId}&customer_id=1&date=${date}%20${getHour}:${getMinute}:00`).then(data=>{
    console.log(data);
    alert(`Je plaats is gereserveerd voor: ${date} ${getHour}:${getMinute}.`)
  });}
}



