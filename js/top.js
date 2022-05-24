function randomizeAnime(event) {
    event.preventDefault();

    /* TODO: THIS WILL HAVE TO INTERACT AND LISTEN FOR YOUR BUTTON TO BE PRESSED */
    //const form = new FormData(this);
    //const query = form.get("search");

    /* This is the logic for getting the top anime and fitlering */
    let type = "tv";
    let filter = "finished";
    let page = 1;
    let limit = 25;

    fetch(`https://api.jikan.moe/v4/top/anime?type=${type}&filter=${filter}&page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(arAdd)
    .catch(error => console.warn(error));
}

function arAdd(data) {
    const randomResults = document.getElementById('random-results');

    randomResults.innerHTML = data.data.map(an => {
        return `    
        <div class="box">
            <div class="card-image">
                <a href = "${an.url}" target = "_blank"><img src="${an["images"]["jpg"]["image_url"]}"></a>
            </div>
            <div class="card-content">
                <a href = "${an.url}" target = "_blank"><h3 class="card-title">${an.title}</h3></a>
                <a href = "${an.url}" target = "_blank"><p>${an.episodes} EP</p></a>
            </div>
        </div>
    `}).join("");
}

/* Function that waits for a response from the button */
function pageLoaded() {
    const form = document.getElementById('random-button');
    form.addEventListener("submit", randomizeAnime);
}

/* waits for the "load" event and searches for the button and waits for a response */
window.addEventListener("load", pageLoaded);