export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery');

  galleryContainer.innerHTML = '';

  images.forEach((image) => {
    const photoCard = createPhotoCard(image);
    galleryContainer.appendChild(photoCard);
  });
}

function createPhotoCard(image) {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');

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