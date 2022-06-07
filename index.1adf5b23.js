!function(){var e="1e3bd345eb5d29ac0f4521d096bb0e9d";var t={heroSection:document.querySelector(".js-hero__section"),heroContainer:document.querySelector(".js-hero__container"),headerNav:document.querySelector(".js-header-nav"),headerNavLinks:document.querySelectorAll(".js-header-nav__link"),searchInput:document.querySelector(".js-search__wrapp"),libraryButtons:document.querySelector(".js-library__button-wrapp"),movieGallery:document.querySelector(".js-gallery")},n={};function o(e){e.classList.add("header-nav__link--active")}function r(){return t.headerNavLinks.forEach((function(e){e.classList.contains("header-nav__link--active")&&e.classList.remove("header-nav__link--active")}))}n=function e(t,n,o){function r(a,c){if(!n[a]){if(!t[a]){var s=void 0;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};t[a][0].call(u.exports,(function(e){return r(t[a][1][e]||e)}),u,u.exports,e,t,n,o)}return n[a].exports}for(var i=void 0,a=0;a<o.length;a++)r(o[a]);return r}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=e.trim(),!0===t?n.children:n.firstChild},r=function(e,t){var n=e.children;return 1===n.length&&n[0].tagName===t},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};n.visible=i,n.create=function(e,t){var n=function(e,t){var n=o('\n\t\t<div class="basicLightbox '.concat(t.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=n.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var a=r(i,"IMG"),c=r(i,"VIDEO"),s=r(i,"IFRAME");return!0===a&&n.classList.add("basicLightbox--img"),!0===c&&n.classList.add("basicLightbox--video"),!0===s&&n.classList.add("basicLightbox--iframe"),n}(e=function(e){var t="string"==typeof e,n=e instanceof HTMLElement==1;if(!1===t&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===t?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(t)),a=function(e){return!1!==t.onClose(c)&&function(e,t){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),t()}),410),!0}(n,(function(){if("function"==typeof e)return e(c)}))};!0===t.closable&&n.addEventListener("click",(function(e){e.target===n&&a()}));var c={element:function(){return n},visible:function(){return i(n)},show:function(e){return!1!==t.onShow(c)&&function(e,t){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),t()}))}),10),!0}(n,(function(){if("function"==typeof e)return e(c)}))},close:a};return c}},{}]},{},[1])(1),t.movieGallery.addEventListener("click",(function(t){t.preventDefault(),console.log(t.target.dataset.id),(o=t.target.dataset.id,fetch("https://api.themoviedb.org/3/movie/".concat(o,"?api_key=").concat(e,"&language=en-US")).then((function(e){return e.json()}))).then((function(e){if("IMG"===t.target.nodeName){var o='<img class="gallery__image" src="https://image.tmdb.org/t/p/original/'.concat(e.backdrop_path,'" alt="').concat(e.title,'" loading="lazy" width="500" />  <div class="modal-close-btn">Close</div>'),r=n.create(o);r.show(),document.querySelector(".modal-close-btn").addEventListener("click",(function(e){r.close(),window.removeEventListener("keydown",i)})),window.addEventListener("keydown",i)}function i(e){"Escape"===e.code&&(r.close(),window.removeEventListener("keydown",i))}})).then((function(e){})).catch((function(e){console.log("oops!")}));var o})),function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(e,"&page=").concat(t)).then((function(e){return e.json()}))}().then((function(e){console.log(e),function(e){var n=e.reduce((function(e,t){var n=t.original_title,o=t.poster_path,r=t.genre_ids,i=t.id,a=t.release_date;return e+'<li class="gallery__item">\n          <a class="gallery__link">\n            <img class=\'gallery__poster\' src=\'https://image.tmdb.org/t/p/w500/'.concat(o,"' loading=\"lazy\" alt='Poster for film ").concat(n,"' data-id=").concat(i,' />\n          <div class="gallery__movie-details">\n            <p class="movie-details__movie-name">').concat(n,'</p>\n            <p class="movie-details__movie-info">').concat(r," | ").concat(a,"</p>\n          </div>\n          </a>\n        </li>")}),"");t.movieGallery.insertAdjacentHTML("beforeend",n)}(e.results)})),t.headerNav.addEventListener("click",(function(e){e.preventDefault();var n=e.target;if("A"!==n.nodeName)return;n.hasAttribute("data-libraryPage")&&function(e){e.classList.contains("header-nav__link--active")||(console.log("lib"),t.searchInput.classList.add("visually-hidden"),t.heroSection.classList.add("js-library"),t.libraryButtons.classList.remove("visually-hidden"),r(),o(e))}(n);n.hasAttribute("data-homePage")&&function(e){e.classList.contains("header-nav__link--active")||(console.log("home"),r(),o(e),t.heroSection.classList.remove("js-library"),t.libraryButtons.classList.add("visually-hidden"),t.searchInput.classList.remove("visually-hidden"))}(n)}))}();
//# sourceMappingURL=index.1adf5b23.js.map
