import { PixabayAPI } from './js/pixabay-servise.js';
import { renderGallery } from './js/gallery.js';
import './js/scroll.js';

const api = new PixabayAPI();
const searchForm = document.querySelector('.search-form');
const scrollToTopButton = document.querySelector('.scroll-to-top'); // Отримайте кнопку "Повернутися на верх сторінки"

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

  if (images.length > 0) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Додайте обробник кліку на кнопку "Повернутися на верх сторінки"
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});