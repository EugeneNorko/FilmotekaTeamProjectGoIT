import { findCardId } from '../fetch.js';
import { refs } from '../refs.js';
import { createModalFilmCard } from './modalFilmCard.js';
import addWatched from '../addWatched.js';
import addQueue from '../addQueue.js';
import movieTrailer from './modalTrailer.js';
import { load, save, remove } from '../localStorageApi.js';


import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.movieGallery.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'A') {
    return;
  };
    
  findCardId(e.target.dataset.id)
    .then(movie => {
      //console.log(e.target.nodeName);
      //console.log(movie);            
      const modal = basicLightbox.create(createModalFilmCard({ movie }));      
      modal.show();
      //document.body.style.overflow = 'hidden';
      addWatched();
      addQueue();
      movieTrailer();
      checkToAddToLocalStorage("watched", movie.id);
      checkToAddToLocalStorage("queue", movie.id);

      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', closeModal);

      window.addEventListener('keydown', closeModalHandler);
      //window.addEventListener('click', closeModalBackdrop);

      /* function closeModalBackdrop(e) {        
        if (e.target.nodeName === 'DIV') {
          modal.close();
          document.body.style.overflow = '';
          window.removeEventListener('keydown', closeModalHandler);
        }
        } */

      function closeModalHandler(e) {        
        if (e.code === 'Escape') {
          modal.close();
          //document.body.style.overflow = '';
          window.removeEventListener('keydown', closeModalHandler);
        }
      }
      function closeModal(e) {
        modal.close();
        //document.body.style.overflow = '';
        window.removeEventListener('keydown', closeModalHandler);
      }
    })
    .then(data => {})
    .catch(error => {
      console.log('oops!', error);
    });
}


function checkToAddToLocalStorage(itemName, filmId) {
  const arrayOfIdFilmload = load(itemName);
  const watchedBtnModal = document.querySelector('.btn__watch');
  const queueBtnModal = document.querySelector(".btn__queue");
  if (!arrayOfIdFilmload) {
    return;
  }
  return arrayOfIdFilmload.map(id => {
    let idToNumber = Number(id);
    if (idToNumber === filmId) {
      if (itemName === "watched") {
        watchedBtnModal.textContent = "Added to watched";
        watchedBtnModal.setAttribute('disabled', "disabled");
        watchedBtnModal.classList.add('active');
      }
      if (itemName === "queue") {
        queueBtnModal.textContent = "Added to queue";
        queueBtnModal.setAttribute('disabled', "disabled");
        queueBtnModal.classList.add('active');
      }
    }
  })
}