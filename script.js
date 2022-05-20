function searchAnime(event) {
    event.preventDefault();

    /*  Creating memory for the form data and then saving the search 'query' inside a variable for use*/
    const form = new FormData(this);
    const query = form.get("search");

    /* This fetches the API using the search query and converts to JSON and does manipulation by calling JSadd() */
    fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`)
    .then(response => response.json())
    .then(JSadd)
    .catch(error => console.warn(error));

    fetch(`https://api.jikan.moe/v4/random/anime`)
    .then(response => response.json())
    .then(function (anime) {
        console.log("RANDOM Anime: ", anime["data"].title);
        console.log("Episodes:", anime["data"].episodes);
        console.log("MAL:", anime["data"].url);
    });
}

function JSadd(data) {
    /* Test case to see all the properties of the JSON object */
    console.log(data["data"][0]);

    /* Accessing the "data" property of the JSON object */
    data["data"].forEach(function(anime) { 
        console.log(anime.title);
        console.log("Episodes:", anime.episodes);
        console.log("MAL:", anime.url);
    });
}

/* Function that waits for a response from the search entry */
function pageLoaded() {
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}

/* waits for the "load" event and searches for the search bar and then waits for the submit entry */
window.addEventListener("load", pageLoaded);