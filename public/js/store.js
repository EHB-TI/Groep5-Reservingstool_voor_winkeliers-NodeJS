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
    const postCodeSpan = document.getElementById("store-post-code");
    const postBusSpan = document.getElementById("store-post-bus");
    const specialClosuresUl = document.getElementById("store-special-closures");
    const reserveerA = document.getElementById("reserveer");

    reserveerA.href = "../reserveer?store=" + storeId;

    getData(`../api/get/stores?id=${storeId}`).then(async (result) => {
        console.log(result);
        titleH1.innerText = result[0].name;
        descriptionP.innerText = result[0].description;
        phoneSpan.innerText = result[0].phone_number;
        addressSpan.innerText = result[0].adress;
        document.title = result[0].name;
        postCodeSpan.innerText = result[0].post_code;
        postBusSpan.innerText = result[0].postbus;

        const openingshours = await getData(`../api/get/opening_hours?store_id=${storeId}`);
        for(openingshour of openingshours){
            let li = document.createElement("li");

            li.innerText = DAYS_OF_WEEK[openingshour.week_day - 1] + " " + openingshour.begin_hour + " tot " + openingshour.end_hour;
            
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
