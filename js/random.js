function randAnime(event) {
    event.preventDefault();

    fetch(`https://api.jikan.moe/v4/random/anime`)
    .then(response => response.json())
    .then(arAdd)
    .catch(error => console.warn(error));
}

function arAdd(data) {
    /* Saving the element we are accessing for presentation of results  */
    const randomResults = document.getElementById('random-results');

    randomResults.innerHTML = 
    `
    <div class="box">
        <div class="card-image">
            <a href = "${data.data.url}" target = "_blank"><img src="${data["data"]["images"]["jpg"]["image_url"]}"></a>
        </div>
        <div class="card-content">
            <a href = "${data.data.url}" target = "_blank"><h3 class="card-title">${data.data.title}</h3></a>
            <a href = "${data.data.url}" target = "_blank"><p>${data.data.episodes} EP</p></a>
        </div>
    </div>
    `
}

/* Function that waits for a response from the button */
function pageLoaded() {
    const form = document.getElementById('random');
    form.addEventListener("click", randAnime);
}

/* waits for the "load" event and searches for the button and waits for a response */
window.addEventListener("load", pageLoaded);