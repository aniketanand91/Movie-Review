const API_KEY = 'api_key=865dcbc2d621922b387457b19f646011';
const BASE_URL = 'https://api.themoviedb.org/3';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const mainEl = document.getElementById('main')


const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY

const form = document.getElementById('form')
const search = document.getElementById('search')



function getMovies(url){

    fetch(url).then(res => res.json()).then(data =>{
        console.log(data)
        showMovies(data.results)
    })

}

getMovies(API_URL);


function showMovies(data){
    mainEl.innerHTML = ' ';
    data.forEach(movies => {
        const {title,backdrop_path, vote_average, overview} = movies;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML= `
        <img src="${IMG_URL+backdrop_path}" alt="${title}">
            <div class="movieInfo">
                <h3>${title}</h3>
                <span class="green">Rating : ${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview : </h3>
                ${overview}
            </div>
            `

    
        mainEl.appendChild(movieEl);
    });

}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm){
        getMovies(SEARCH_URL+'&query='+ searchTerm)
    } else{
        getMovies(API_URL)
    }

})