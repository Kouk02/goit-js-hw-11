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

      // Отримай висоту карточки з галереї
      const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

      // Прокрутку вгору робимо плавно
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }
};

window.addEventListener('scroll', loadNextImages);
window.addEventListener('load', loadNextImages);