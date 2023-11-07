import { PixabayAPI } from './pixabay-servise.js';
import { renderGallery } from './gallery.js';

const api = new PixabayAPI();
let loading = false;
let maxImagesReached = false;
let totalImages = 0;
let displayedImagesCount = 0; // Змінна для підрахунку відображених картинок
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
        const totalImagesBeforeLoad = totalImages;
        totalImages += newImages.length;

        
        if (totalImages >= 100) {
          maxImagesReached = true;
          window.removeEventListener('scroll', loadNextImages); // Видаляємо обробник подій, щоб зупинити подальше завантаження
        }

        // Підраховуємо кількість відображених картинок
        displayedImagesCount += newImages.length;

        
     if (displayedImagesCount <= 100) {
  renderGallery(newImages, false);
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
  displayedImagesCount = 0; // Скидаємо лічильник при очищенні галереї
};

// Оновлення галереї при новому пошуку
const searchForm = document.querySelector('.search-form');
const input = searchForm.querySelector('input[type="text"]');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  api.page = 1;
  maxImagesReached = false;
  totalImages = 0;
  clearGallery(); // Очистити галерею перед новим пошуком
  displayedImagesCount = 0; // Скидаємо лічильник при новому пошуку
  const newImages = await api.fetchPhotos();
  renderGallery(newImages, true);
});