fetch('https://api.jikan.moe/v4/anime')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.warn(error));