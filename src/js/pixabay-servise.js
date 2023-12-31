import axios from 'axios';
import Notiflix from 'notiflix';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '40490359-0df89521cabd6b13b7ee915cb';

  page = 1;
  query = null;
  limit = 40;
  loadedImagesCount = 0;

  async fetchPhotos() {
    try {
this.loadedImagesCount = 0;

      const response = await axios.get(this.#BASE_URL, {
        params: {
          key: this.#API_KEY,
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: this.limit,
        },
      });

      const data = response.data;
      const imagesCount = data.hits.length;

      
      if (imagesCount === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      } else {
        this.loadedImagesCount += imagesCount;

      Notiflix.Notify.success(`Successfully loaded ${this.loadedImagesCount} photos`);
      }

      return data.hits;

    } catch (error) {
      Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
      throw error;
    }
  }
}