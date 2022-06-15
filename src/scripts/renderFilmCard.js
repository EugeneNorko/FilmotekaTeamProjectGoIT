import { popularFilm } from './fetch.js'
import { refs } from './refs.js';
import { GENRES } from './genre.js';
import { getWatchedMovie } from "./addWatched";
import { load, save, remove } from '../scripts/localStorageApi.js';

const cardRefs = {
  delete: null,
}

getPopularMovieList();

export function getPopularMovieList() {
  return popularFilm().then((filmSet) => {
    const filmArray = filmSet.results;
    renderMovieCardOnMainPage(filmArray);
  }).catch(err => console.log(err));
};

export function renderMovieCardOnMainPage(filmArray) {
  // console.log(filmArray);

  const markup = filmArray.reduce((html, film) => {
    const { original_title, poster_path, genre_ids, id, release_date } = film;
    let title = original_title;
    const genresArray = getGenresToId(genre_ids);
    const genresText = sliceGenres(genresArray);
    const slisedDate = sliceDate(release_date);
   
    let isPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    if (!poster_path) {
      isPoster = `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png`;
    }
    if (original_title === "") {
      title = "Title was not found";
    }
     return html +=
        `<li class="gallery__item">
          <a class="gallery__link" href="" data-id=${id}>
            <img class='gallery__poster' src='${isPoster}' loading="lazy" alt='Poster for film ${original_title}'/>
            <div class="gallery__movie-details">
              <p class="movie-details__movie-name">${title}</p>
              <p class="movie-details__movie-info">${genresText} | ${slisedDate}</p>
            </div>
          </a>
        </li>`
  }, "");
    return refs.movieGallery.insertAdjacentHTML('beforeend', markup);
}

//src="https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"

export function renderWatchedMovie(filmObject) {
  let btnclass = null;
  const markup = filmObject.reduce((html, film) => {
    const { original_title, poster_path, genres, id, release_date, vote_average } = film;
    btnclass = `.js-remove-btn-${id}`;
    let title = original_title;
    const genresNameArray = getGenresToName(genres);
    const genresText = sliceGenres(genresNameArray);
    const slisedDate = sliceDate(release_date);
    let isPoster = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    if (!poster_path) {
      isPoster = `https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png`;
    }
    if (original_title === "") {
      title = "Title was not found";
    }
    return html +=
      `<li class="gallery__item">
          <a class="gallery__link" href="" data-id=${id}>
            <img class='gallery__poster' src='${isPoster}' loading="lazy" alt='Poster for film ${original_title}' />
            <div class="gallery__movie-details">
              <p class="movie-details__movie-name">${title}</p>
              <div class="movie-details-wrap">
                <p class="movie-details__movie-info">${genresText} | ${slisedDate}</p>
                <div class="movie-details-rate">${vote_average}</div>
              </div>
            </div>
            
          </a>
          <button type="button" class="remove-btn js-remove-btn-${id}" data-card-id=${id}>
          <svg class="close-icon" width="14" height="14">
            <svg class="close-icon" width="100" height="100">
              <path  stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="2.1333" d="M8.533 8.533l14.933 14.933"></path>
              <path stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="2.1333" d="M8.533 23.467l14.933-14.933"></path>
          </svg>
          </button>
        </li>`}, "");
  refs.movieGallery.insertAdjacentHTML('beforeend', markup);
  
  cardRefs.delete = document.querySelector(btnclass);
  cardRefs.delete.addEventListener('click', removeCard);
}

function removeCard(e) {
  const state = refs.watchedBtn.classList.contains("active");
  let activeLibrary = 'watched';
  if (!state) {
    activeLibrary = 'queue';
  }
    // e.target.getAttribute(data-card-id);
    // console.log('object :>> ', e.currentTarget);
    let localStorageFile = load(activeLibrary);
    // console.log('localStorageFile :>> ', localStorageFile);
    const id = e.currentTarget.getAttribute(`data-card-id`);
    // console.log('id :>> ', id);
    const resalt = localStorageFile.filter(item => item !== id);
    // console.log('resalt :>> ', resalt);
    save(activeLibrary, resalt);
    getWatchedMovie(activeLibrary);
  }

export function getGenresToId(idArray) {
  return idArray.map(genreId => GENRES[genreId]);
}

function getGenresToName(idArray) {  
  return idArray.map(GENRES => GENRES.name);  
}


export function sliceGenres(genreArray) {
  if (genreArray.length < 1) {
    return "Genres was no found";
  }
  if (genreArray.length > 3) {
    const slicedGenredWordArray = genreArray.slice(0, 2);
    slicedGenredWordArray.push('Other');
    return slicedGenredWordArray.join(", ");
  }
  return genreArray.join(", ")
};

function sliceDate(filmDate) {
  if (filmDate === "") {
    return "Unknown date";
  }
  return filmDate.slice(0, 4);
}
