// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

window.onload=function(){

    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a883250dd940e513eed8e8a316c2cd1d&page=1'
    const HIGH_RATING = 'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=a883250dd940e513eed8e8a316c2cd1d&page=1'
    const R_RATED = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=a883250dd940e513eed8e8a316c2cd1d&page=1'
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
    const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a883250dd940e513eed8e8a316c2cd1d&query="'


    const main = document.getElementById('main')
    const index = document.querySelector('.index')
    const popular = document.querySelector('.not-selected')
    const form = document.getElementById('form')
    const search = document.getElementById('search')
    const rated = document.querySelector('.rated')

    
    // const showcase = document.getElementById('showcase')
    // Get initial moovies
    getMovies(API_URL)

    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()

        showMovies(data.results)
        // displayMovies(data.results)
    }

    // home section
    function showMovies(movies) {
        main.innerHTML = ''
        // showcase.innerHTML = ''

        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie

            const movieEl = document.createElement
            ('div')
            movieEl.classList.add('movie')

            movieEl.innerHTML = ` 
            
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            `
            main.appendChild(movieEl)
        })
    }

    function getClassByRate(vote) {
        if(vote >= 8) {
            return 'green'
        } else if(vote >= 5 ) {
            return 'orange'
        }else{
            return 'red'
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const searchTerm = search.value

        if(searchTerm && searchTerm !== ''){
            if (document.body.scrollTop < 10) {
                window.scrollBy(0, 750);
            }
            getMovies(SEARCH_API + searchTerm)

            search.value = ''
        } else{
            window.location.reload()
        }
    })

    rated.addEventListener('click', () => {
        if (document.body.scrollTop == 0) {
            window.scrollBy(0, 750);
        }

        // window.location.reload()
        getMovies(R_RATED)

        index.classList.remove('selected')
        index.classList.add('not-selected')

        popular.classList.remove('selected')
        popular.classList.add('not-selected')

        rated.classList.remove('not-selected')
        rated.classList.add('selected')

    })

    popular.addEventListener('click', () => {
        window.scrollBy(0, 750);

        getMovies(HIGH_RATING)
        index.classList.remove('selected')
        index.classList.add('not-selected')

        rated.classList.remove('selected')
        rated.classList.add('not-selected')

        popular.classList.add('selected')
    })

    index.addEventListener('click', () => {
        window.scrollBy(0, 0);

        window.location.reload()
        getMovies(API_URL)
        index.classList.remove('not-selected')
        index.classList.add('selected')

    })




    const scrollDown = document.querySelector('.down-arrow')

    scrollDown.addEventListener('click', () => {
        if (document.body.scrollTop < 100) {
            window.scrollBy(0, 750);
        }else{
          return "nothing"
        }
    })
    
}