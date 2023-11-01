import axios from "axios";
import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ref = {
  form: document.querySelector('.search-form'),
  gallary: document.querySelector('.gallery'),
  input: document.getElementById('search-query'),
  loadMore: document.querySelector('.load-more')
};

ref.loadMore.addEventListener('click', handlerLoadMore);
ref.form.addEventListener('submit', handlerSearch);

let query = '';
let page = 1;
let totalHits = 0;
ref.loadMore.style.display = 'none';

async function handlerSearch(evt) {
  evt.preventDefault();
  if (!ref.input.value) {
    return;
  }


  if (query === '' || query !== ref.input.value) {
      query = ref.input.value;
      page = 0;
      totalHits = 0;
  }
    page++;

  let response = await fetchImages(page);
  ref.gallary.insertAdjacentHTML('afterbegin', creatMarcup(response.data.hits));
   ref.loadMore.style.display = 'contents';
};

async function fetchImages(p) {
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40367315-3c91d510b26c4724b33f253c9';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: 40,
  })
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log(response);
    return response;
  }
  catch (error) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

function creatMarcup(arr) {
  return arr.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
   <a class="gallery-link" href="${largeImageURL}">
    <div class="photo-card">
      <div class="gallery-item">
          <img class="gallery-item-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
      </div>
    </div>
  </a>

  `).join('')
}

function handlerLoadMore(evt) {


}
