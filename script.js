const API_KEY = "875a616734372607298d18a95d453a29"
let page = 1;
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function updatePage() {
    getMovies(API_URL())
    currentPage.innerHTML = page
}

function nextPage() {
    if (page >= 1) {
        page += 1
       updatePage()
    }
}

function prevPage() {
    if (page > 1) {
        page -= 1
       updatePage()
    }
}

next.addEventListener("click", () => {
    nextPage()
})

prev.addEventListener("click", () => {
    prevPage()
})

function showMovies(movies) {
    moviesElement.innerHTML = ''
    movies.forEach(movie => {
        const { title, poster_path, overview } = movie
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie")
        movieCard.innerHTML = `
        <img src="${API_IMAGE_URL + poster_path}" alt="html the movie images" />
        <div class="detail">
        <h3>${title}</h3>
        <p>${overview.substring(0, 200)}.....</p>
        </div>
    `
        moviesElement.appendChild(movieCard)
    })
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery = search.value

    if (searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value = ''
    }
})

getMovies(API_URL())

title.addEventListener("click", () => {
    location.reload()
})