import { PixabayAPI } from './pixabay-servise.js';
import { renderGallery } from './gallery.js';

const api = new PixabayAPI();

const loadNextImages = async () => {
  const gallery = document.querySelector('.gallery');
  const lastImage = gallery.lastElementChild;

  if (lastImage) {
    const lastImageRect = lastImage.getBoundingClientRect();
    if (lastImageRect.bottom <= window.innerHeight) {
      api.page += 1;
      const newImages = await api.fetchPhotos();
      renderGallery(newImages);

      // Заміни top на 0, щоб прокрутку вгору виконувалася всередині асинхронної функції
      window.scrollBy({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
};

// Видалити зайвий код, оскільки цей фрагмент не виконується в контексті скрипту

window.addEventListener('scroll', loadNextImages);
window.addEventListener('load', loadNextImages);