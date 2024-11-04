import axios from 'axios';
import SlimSelect from 'slim-select';

const catsSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorBlock = document.querySelector('.error');

function fetchBreads() {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(res => res.data)
    .then(data => {
      const cats = data.map(({ id, name }) => {
        return {
          text: name,
          value: id,
          html: name,
        };
      });

      new SlimSelect({
        select: catsSelect,
        settings: {
          placeholderText: 'Select cat to show more info',
        },
        data: cats,
      });

      // catsSelect.innerHTML = data
      //   .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      //   .join('');
    })
    .catch(error => console.log(error));
}

function fetchCatByBreed(breedId) {
  loader.classList.toggle('display-none');

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .then(
      ({
        0: {
          url,
          breeds: {
            0: { description, name, temperament },
          },
        },
      }) => {
        loader.classList.toggle('display-none');

        catInfo.innerHTML = `<img src="${url}" alt="${name}" width="300"><div><h1>${name}</h1><p>${description}</p><p><b>Temperament: </b>${temperament}</p></div>`;
      }
    )
    .catch(error => {
      console.log(error);
      loader.classList.toggle('display-none');
      errorBlock.classList.toggle('display-none');
    });
}

export { fetchBreads, fetchCatByBreed };
