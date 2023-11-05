// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery');

  galleryContainer.innerHTML = '';

  images.forEach((image) => {
    const photoCard = createPhotoCard(image);
    galleryContainer.appendChild(photoCard);
  });
 
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