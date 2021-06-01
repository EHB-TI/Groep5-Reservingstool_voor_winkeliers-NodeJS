window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const storeId = urlParams.get('store');

    const titleH1 = document.getElementById("store-title");
    const titleH1 = document.getElementById("store-description");
    const titleH1 = document.getElementById("store-phone");
    const titleH1 = document.getElementById("store-address");
    const titleH1 = document.getElementById("store-address");

    getData(`../api/get/stores?id=${storeId}`).then(result => {
        result
    });

    async function getData(url) {
        let data = await fetch(url);
        return await data.json();
    };
}
