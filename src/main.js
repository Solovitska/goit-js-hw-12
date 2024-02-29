import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotoByName } from './js/pixabay-api';
import { displayErrorToast, displayNoResultsToast } from './js/render-functions';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.getElementById('load-more');

const toastSettings = {
  messageColor: '#FFF',
  color: '#EF4040',
  position: 'topRight',
  timeout: 3000,
};

let searchParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
  page: 1,
  per_page: 15, 
};

let currentPage = 1;

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  loader.style.display = 'block';
  const inputValue = e.target.elements.input.value;
  searchParams.q = inputValue;
  searchParams.page = 1;
  currentPage = 1;
  try {
    const images = await getPhotoByName(searchParams);
    createGallery(images);
  } catch (error) {
    displayErrorToast();
  }
  e.target.reset();
});

loadMoreButton.addEventListener('click', async function () {
  loader.style.display = 'block';
  currentPage++;
  searchParams.page = currentPage;
  try {
    const images = await getPhotoByName(searchParams);
    appendGallery(images);
  } catch (error) {
    displayErrorToast();
  }
});

function createGallery(images) {
  if (images.hits.length === 0) {
    displayNoResultsToast();
    clearGallery();
    loadMoreButton.style.display = 'none';
  } else {
    clearGallery();
    appendGallery(images);
    loadMoreButton.style.display = 'block';
  }
  loader.style.display = 'none';
}

function appendGallery(images) {
  loader.style.display = 'block';

  const link = images.hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class='gallery-item'>
  <a class='gallery-link' href='${largeImageURL}'>
    <img class='gallery-image' src='${webformatURL}' alt='${tags}'/>
  </a>
<div class='container-app'>
<p><span>Likes</span> ${likes}</p>
<p><span>Views</span> ${views}</p>
<p><span>Comments</span> ${comments}</p>
<p><span>Downloads</span> ${downloads}</p>
</div>
 </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', link);
  loader.style.display = 'none';

  if (images.totalHits <= searchParams.page * searchParams.per_page) {
    loadMoreButton.style.display = 'none';
    iziToast.show({
      ...toastSettings,
      message: "We're sorry, but you've reached the end of search results.",
      messageSize: '16px',
      messageLineHeight: '24px',
      maxWidth: '432px',
    });
  }

  let lightBox = new SimpleLightbox('.gallery-link');
  lightBox.refresh();
}

function clearGallery() {
  gallery.innerHTML = '';
}