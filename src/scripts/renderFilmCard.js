import { popularFilm } from './fetch.js'
import { refs } from './refs.js';
import { GENRES } from './genre.js';

getPopularMovieList();

function getPopularMovieList() {
  return popularFilm().then((filmSet) => {
    console.log(filmSet)
    const filmArray = filmSet.results;
    renderMovieCardOnMainPage(filmArray);
  })
};

export function renderMovieCardOnMainPage(filmArray) {
  const markup = filmArray.reduce((html, film) => {
    const { original_title, poster_path, genre_ids, id, release_date } = film;
    const genresArray = getGenresToId(genre_ids);
    const genresText = sliceGenres(genresArray);
        return html +=
        `<li class="gallery__item">
          <a class="gallery__link">
            <img class='gallery__poster' src='https://image.tmdb.org/t/p/w500/${poster_path}' loading="lazy" alt='Poster for film ${original_title}' data-id=${id} />
            <div class="gallery__movie-details">
              <p class="movie-details__movie-name">${original_title}</p>
              <p class="movie-details__movie-info">${genresText} | ${release_date}</p>
            </div>
          </a>
        </li>`
    }, "");
    return refs.movieGallery.insertAdjacentHTML('beforeend', markup);
}

//src="https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"


export function getGenresToId(idArray) {
  return idArray.map(genreId => GENRES[genreId]);
}

function sliceGenres(genreArray) {
  if (genreArray.length > 2) {
    const slicedGenredWordArray = genreArray.slice(0, 2);
    slicedGenredWordArray.push('Other');
    return slicedGenredWordArray.join(", ");
  }
  return genreArray.join(", ")
}