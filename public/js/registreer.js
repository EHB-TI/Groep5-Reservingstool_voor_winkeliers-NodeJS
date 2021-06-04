document.getElementById("date-picker").min = new Date().toISOString().split("T")[0];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const storeId = urlParams.get('store');

//Check if user chose a store
getData(`http://localhost:3000/api/get/stores?id=${storeId}`).then(data=>{
  if(Object.keys(data).length > 0){
    console.log("Je zit op de goeie pagina");
  }
  else {
    console.log("Je zit op de foute pagina");
  }
});
//Get the data
async function getData(url){
  let data = await fetch(url);
    return await data.json();
};

async function Reserveer(){
  //Check if user is logged in
  let user = await getUser();
  if(user.auth == false){
    alert("Je moet eerst ingelogd zijn!")
    window.location.href = "../login/";
  }
  else {
    //Get the values off the input field and check if they are empty
    let date = document.getElementById("date-picker").value;
  let getHour = document.getElementById("uren").value;
  let getMinute = document.getElementById("minuten").value;
  if(date == "" ||getHour == "" || getMinute == ""){
    alert("Je moet alles invullen voor je kan registreren!");
  }
  else {
    //Store the reservation in the database with the values off the variabeles
    getData(`http://localhost:3000/api/insert/reservations?store_id=${storeId}&customer_id=${user.id}&date=${date}%20${getHour}:${getMinute}:00`).then(data=>{
    console.log(data);
    alert(`Je plaats is gereserveerd voor: ${date} ${getHour}:${getMinute}.`)
  });}
  }
}



