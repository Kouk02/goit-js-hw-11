// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderGallery(images, container) {
  const galleryContainer = container || document.querySelector('.gallery');

  if (!galleryContainer) {
    console.error('Element with class "gallery" not found in the DOM.');
    return;
  }

  galleryContainer.innerHTML = '';

  let galleryHTML = '';

  for (let i = 0; i < Math.min(images.length, 40); i++) {
    const image = images[i];
    const photoCard = createPhotoCard(image);
    galleryHTML += photoCard.outerHTML;
  }

  galleryContainer.innerHTML = galleryHTML;

  const lightbox = new SimpleLightbox('.photo-card', {
    captionsData: 'alt',
  });
  lightbox.refresh();
}

function createPhotoCard(image) {
  const photoCard = document.createElement('a'); 
  photoCard.href = image.largeImageURL; 
  photoCard.classList.add('photo-card');
  photoCard.setAttribute('data-lightbox', 'gallery'); 

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');
  infoDiv.classList.add('hidden');

  const likes = createInfoItem('Likes', image.likes);
  const views = createInfoItem('Views', image.views);
  const comments = createInfoItem('Comments', image.comments);
  const downloads = createInfoItem('Downloads', image.downloads);

  infoDiv.appendChild(likes);
  infoDiv.appendChild(views);
  infoDiv.appendChild(comments);
  infoDiv.appendChild(downloads);

  photoCard.appendChild(img);
  photoCard.appendChild(infoDiv);

  return photoCard;
}

function createInfoItem(label, value) {
  const infoItem = document.createElement('p');
  infoItem.classList.add('info-item');
  infoItem.innerHTML = `<b>${label}:</b> ${value}`;
  return infoItem;
}