import { PixabayAPI } from './js/pixabay-servise.js';
import { renderGallery } from './js/gallery.js';
import './js/scroll.js';

const api = new PixabayAPI();
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const searchQuery = formData.get('searchQuery');

  if (!searchQuery) {
    return;
  }

  api.query = searchQuery;
  api.page = 1;

  const images = await api.fetchPhotos();
  renderGallery(images);
});