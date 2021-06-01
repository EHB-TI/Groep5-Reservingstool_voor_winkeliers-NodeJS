window.onload = () => {
    const DAYS_OF_WEEK = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const storeId = urlParams.get('store');

    const titleH1 = document.getElementById("store-title");
    const descriptionP = document.getElementById("store-description");
    const phoneSpan = document.getElementById("store-phone");
    const addressSpan = document.getElementById("store-address");
    const openingsHoursUl = document.getElementById("store-openingshours");
    const specialClosuresUl = document.getElementById("store-special-closures");

    getData(`../api/get/stores?id=${storeId}`).then(async (result) => {
        titleH1.innerText = result[0].name;
        descriptionP.innerText = result[0].description;
        phoneSpan.innerText = result[0].phone_number;
        addressSpan.innerText = result[0].adress;
        document.title = result[0].name;

        const openingshours = await getData(`../api/get/opening_hours?store_id=${storeId}`);
        for(openingshour of openingshours){
            let li = document.createElement("li");

            li.innerText = DAYS_OF_WEEK[openingshour.week_day] + " " + openingshour.begin_hour + " tot " + openingshour.end_hour;
            
            openingsHoursUl.appendChild(li);
        }

        const specialClosures = await getData(`../api/get/special_closures?store_id=${storeId}`);
        for(specialClosure of specialClosures){
            let li = document.createElement("li");

            li.innerText = specialClosure.date + ": " + specialClosure.reason;
            
            specialClosuresUl.appendChild(li);
        }
    });

    async function getData(url) {
        let data = await fetch(url);
        return await data.json();
    };
}
