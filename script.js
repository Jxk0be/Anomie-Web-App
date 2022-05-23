function searchAnime(event) {
    event.preventDefault();

    /*  Creating memory for the form data and then saving the search 'query' inside a variable for use*/
    const form = new FormData(this);
    const query = form.get("search");

    /* This fetches the API using the search query and converts to JSON and does manipulation by calling JSadd() */
    fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`)
    .then(response => response.json())
    .then(sbAdd)
    .catch(error => console.warn(error));

    fetch(`https://api.jikan.moe/v4/random/anime`)
    .then(response => response.json())
    .then(function (anime) {
        console.log(anime["data"]);
        console.log("RANDOM Anime: ", anime["data"].title);
        console.log("Episodes:", anime["data"].episodes);
        console.log("MAL:", anime["data"].url);
    });



    /* This is the logic for getting the top anime and fitlering */
    let type = "movie";
    let filter = "finished";
    let page = 1;
    let limit = 10;

    fetch(`https://api.jikan.moe/v4/top/anime?type=${type}&filter=${filter}&page=${page}`)
    .then(response => response.json())
    .then(data => data["data"].forEach(anime => console.log(anime.title)))
    .catch(error => console.warn(error));
}


/*
        <div class="box">
            <div class="card-image">
                <img src="${an["images"]["webp"]["image_url"]}">
            </div>
            <div class="card-content">
                <h4 class="card-title">${an.title}</h4>
            </div>
            <div class="card-action">
                <a href="${an.url}" target="_blank">MAL Link</a>
            </div>
        </div>
*/

function sbAdd(data) {
    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.data.map(an => {
        return `    
        <div class="box">
            <div class="card-image">
                <a href = "${an.url}" target = "_blank"><img src="${an["images"]["webp"]["image_url"]}"></a>
            </div>
            <div class="card-content">
                <h4 class="card-title">${an.title}</h4>
            </div>
        </div>
    `}).join("");
}

/* Function that waits for a response from the search entry */
function pageLoaded() {
    const form = document.getElementById('search-bar');
    form.addEventListener("submit", searchAnime);
}

/* waits for the "load" event and searches for the search bar and then waits for the submit entry */
window.addEventListener("load", pageLoaded);