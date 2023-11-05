import { PixabayAPI } from './pixabay-servise.js';
import { renderGallery } from './gallery.js';

const api = new PixabayAPI();

const loadNextImages = async () => {
  if (loading) return; // Якщо завантаження вже в процесі, не робимо нічого

  const lastImage = gallery.lastElementChild;

  if (lastImage) {
    const lastImageRect = lastImage.getBoundingClientRect();
    if (lastImageRect.bottom <= window.innerHeight) {
      loading = true; // Позначаємо, що почалося завантаження
      api.page += 1;
      const newImages = await api.fetchPhotos();

      if (newImages.length > 0) { // Перевірка, чи отримано нові зображення
        renderGallery(newImages);
      }

      loading = false; // Позначаємо, що завантаження завершилося
    }
  }
};

window.addEventListener('scroll', loadNextImages);
window.addEventListener('load', loadNextImages);