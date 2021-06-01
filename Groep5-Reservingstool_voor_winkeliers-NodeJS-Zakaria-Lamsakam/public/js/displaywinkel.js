/**
 * Author: Craig Zoetardt
 */
const postCodeInput = document.getElementById("input-post-code");
const nameInput = document.getElementById("input-name");
const storesDiv = document.getElementById("stores");

async function loadStores() {
    let stores = await getData("http://localhost:3000/api/get/stores?order_by_desc=RAND()");

    if(nameInput.value.length > 0){
        stores = stores.filter(store => {
            return store.name.toLowerCase().includes(nameInput.value.toLowerCase());
        })
    }
    if(postCodeInput.value.length > 0){
        stores = stores.filter(store => {
            return postCodeInput.value.includes(store.post_code);
        })
    }

    storesDiv.innerHTML = "";
    for (store of stores) {
        let winkeldiv = document.createElement("div");
        let naamwinkel = document.createElement("h2");
        let fotowinkel = document.createElement("img");
        let winkelomschrijving = document.createElement("p");
        let leesmeerbutoon = document.createElement("button");
        let leesmeerlink = document.createElement("a");

        winkeldiv.classList.add("winkel");
        naamwinkel.innerText = store.name;
        fotowinkel.src = "../img/Horseshoe-Bend-Winter-800px-20190218-IMG_3389.jpg";
        fotowinkel.classList.add("winkelaflb");
        winkelomschrijving.innerText = store.description;
        leesmeerlink.innerText = "Lees meer";
        leesmeerlink.href = "http://localhost:3000/store?id=" + store.id;

        storesDiv.appendChild(winkeldiv);
        winkeldiv.appendChild(naamwinkel);
        winkeldiv.appendChild(fotowinkel);
        winkeldiv.appendChild(winkelomschrijving);
        winkeldiv.appendChild(leesmeerbutoon);
        leesmeerbutoon.appendChild(leesmeerlink);
    }
}

loadStores();

nameInput.addEventListener('keyup', loadStores);
postCodeInput.addEventListener('keyup', loadStores);


async function getData(url) {
    let data = await fetch(url);
    return await data.json();
};