import { refs } from './refs.js';
import { findWordKey } from './fetch';
import { resetGallery } from './resetGallery';
import { renderMovieCardOnMainPage } from './renderFilmCard';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';



const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

refs.searchInput.addEventListener("input",debounce(onTexterialInput,DEBOUNCE_DELAY));

function onTexterialInput(e) {

    resetGallery();

    Loading.hourglass({
        backgroundColor: "rgba(0,0,0,0)",   
    });

    let curentCountri = e.target.value.trim();

    if(curentCountri===""){
        Loading.remove();
        return
    };
    
    createListFilms (curentCountri);
}

function createListFilms (e){

    findWordKey(e).then(e=>{

        Loading.remove();

        if(e.results.length<1){
            Notify.failure(`Can't find a movie with this name`);
            return;
        }

        renderMovieCardOnMainPage(e.results);
    })

}

