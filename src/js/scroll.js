import { PixabayAPI } from './pixabay-servise.js';
import { renderGallery } from './gallery.js';

const api = new PixabayAPI();
let loading = false;
let maxImagesReached = false;
let totalImages = 0;
const gallery = document.querySelector('.gallery'); // Отримуємо контейнер для фотографій

const loadNextImages = async () => {
  if (loading || maxImagesReached) return;

  const lastImage = gallery.lastElementChild;

  if (lastImage) {
    const lastImageRect = lastImage.getBoundingClientRect();
    if (lastImageRect.bottom <= window.innerHeight) {
      loading = true;
      api.page += 1;
      const newImages = await api.fetchPhotos();

      if (newImages.length > 0) {
        renderGallery(newImages, false); // Змінено другий параметр на false
        totalImages += newImages.length;
        if (totalImages >= 40) {
          maxImagesReached = true; // Позначаємо, що всі доступні зображення вже завантажено
        }
      } else {
        maxImagesReached = true; // Позначаємо, що всі доступні зображення вже завантажено
      }

      loading = false;
    }
  }
};

const clearGallery = () => {
  gallery.innerHTML = '';
};

window.addEventListener('scroll', loadNextImages);
window.addEventListener('load', loadNextImages);

// Оновлення галереї при новому пошуку
const searchForm = document.querySelector('.search-form');
const input = searchForm.querySelector('input[type="text"]');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  api.page = 1;
  maxImagesReached = false;
  totalImages = 0;
  clearGallery(); // Очистити галерею перед новим пошуком
  const newImages = await api.fetchPhotos();
  renderGallery(newImages, true);
});