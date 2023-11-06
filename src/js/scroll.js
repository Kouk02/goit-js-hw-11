import { PixabayAPI } from './pixabay-servise.js';
import { renderGallery } from './gallery.js';

const api = new PixabayAPI();
let loading = false;
let maxImagesReached = false;
let totalImages = 0;

const loadNextImages = async () => {
  if (loading || maxImagesReached) return;

  const gallery = document.querySelector('.gallery');
  const lastImage = gallery.lastElementChild;

  if (lastImage) {
    const lastImageRect = lastImage.getBoundingClientRect();
    if (lastImageRect.bottom <= window.innerHeight) {
      loading = true;
      api.page += 1;
      const newImages = await api.fetchPhotos();

      if (newImages.length > 0) {
        totalImages += newImages.length;

        if (totalImages >= 40) {
          maxImagesReached = true;
        }

        renderGallery(newImages, gallery); // Передаємо контейнер для вставки фотографій
      }

      loading = false;
    }
  }
};

window.addEventListener('scroll', loadNextImages);
window.addEventListener('load', loadNextImages);