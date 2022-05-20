function searchAnime(event) {
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    console.log(query);

    fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`)
    .then(response => response.json())
    .then(JSadd)
    .catch(error => console.warn(error));
}

function JSadd(data) {
    /* Accessing the "Data" property of the JSON object */
    data["data"].forEach(anime => console.log(anime));
}

/* Function that waits for a response from the search entry */
function pageLoaded() {
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}

window.addEventListener("load", pageLoaded);