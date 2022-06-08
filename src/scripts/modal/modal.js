import { findCardId } from '../fetch.js';
import { refs } from '../refs.js';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.movieGallery.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
    console.log(e.target.dataset.id)
  findCardId(e.target.dataset.id)
      .then(movie => {        
      if (e.target.nodeName !== 'IMG') return;
      const markup = `<img class="gallery__image" src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="${movie.title}" loading="lazy" width="500" />  <div class="modal-close-btn">Close</div>`;
      const modal = basicLightbox.create(markup);

      modal.show();

      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', closeModal);

      window.addEventListener('keydown', closeModalHandler);

      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
        }
        }
        function closeModal(e) {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
      }      
      
    })
    .then(data => {})
    .catch(error => {
      console.log('oops!');
    });
}