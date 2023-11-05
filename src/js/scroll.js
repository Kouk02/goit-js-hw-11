import { PixabayAPI } from './pixabay-servise';
import { renderGallery } from './gallery';

const api = new PixabayAPI();

const loadNextImages = async () => {
  const gallery = document.querySelector('.gallery');
  const lastImage = gallery.lastElementChild;

  if (lastImage) {
    const lastImageRect = lastImage.getBoundingClientRect();
    window.scrollBy({
      top: lastImageRect.height * 2, // Прокручуємо вгору на висоту останнього зображення, помножену на 2
      behavior: 'smooth',
    });
  }
};

const gallery = document.querySelector('.gallery');
const lastImage = gallery.lastElementChild;

if (lastImage) {
  const lastImageRect = lastImage.getBoundingClientRect();
  if (lastImageRect.bottom <= window.innerHeight) {
    api.page += 1;
    const newImages = await api.fetchPhotos();
    renderGallery(newImages);

    const lastImageRect = lastImage.getBoundingClientRect();
    window.scrollBy({
      top: lastImageRect.height * 0.5, // Прокручуємо вгору на половину висоти останнього зображення
      behavior: 'smooth',
    });
  }
}

window.addEventListener('scroll', loadNextImages);
window.addEventListener('load', loadNextImages);