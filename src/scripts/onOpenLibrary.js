import { refs } from './refs.js';

refs.headerNav.addEventListener('click', onChangePage);
refs.logo.addEventListener('click', onChangePage);

function onChangePage(e) {
    e.preventDefault();
    const currentElementClick = e.target;
    console.log(currentElementClick)
    if (currentElementClick.nodeName !== "A") {
        return;
    }

    if (currentElementClick.hasAttribute('data-libraryPage')) {
        onOpenLibraryPage(currentElementClick)
    }
    if (currentElementClick.hasAttribute('data-homePage')) {
         onOpenHomePage(currentElementClick);
    }
}

function onOpenHomePage(currentElementClick) {
    if (!currentElementClick.classList.contains('header-nav__link--active')) {
        deleteActiveLink()
        setActiveLink(refs.homePage)
        refs.heroSection.classList.remove('js-library');
        refs.libraryButtons.classList.add('visually-hidden');
        refs.searchInput.classList.remove('visually-hidden');
        refs.logo.classList.remove('js-library');
        refs.headerNav.classList.remove('js-library');
    }
}

function onOpenLibraryPage(currentElementClick) {
    if (!currentElementClick.classList.contains('header-nav__link--active')) {
        onHideSearchInput();
        refs.heroSection.classList.add('js-library');
        refs.libraryButtons.classList.remove('visually-hidden');
        refs.logo.classList.add('js-library');
        refs.headerNav.classList.add('js-library');
        deleteActiveLink()
        setActiveLink(currentElementClick);
    }
}

function setActiveLink(currentElement) {
    currentElement.classList.add('header-nav__link--active');
}

function deleteActiveLink() {
    return refs.headerNavLinks.forEach(link => {
        if (link.classList.contains('header-nav__link--active')) {
            link.classList.remove('header-nav__link--active');
        }
    })
}

function onHideSearchInput() {
    refs.searchInput.classList.add('visually-hidden');
}

