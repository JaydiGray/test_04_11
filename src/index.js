import axios from 'axios';
import SlimSelect from 'slim-select';
import { fetchBreads, fetchCatByBreed } from './cat-api';

const API_KEY =
  'live_eRlT4qxsxlCghMPKIf8xtLg5u2Say1aFRWd21d3736zvtkV4XPXO9PUHzEmh229R';
axios.defaults.headers.common['x-api-key'] = API_KEY;
const catsSelect = document.querySelector('.breed-select');

fetchBreads();

catsSelect.addEventListener('change', onChange);

function onChange(e) {
  const cat = e.target.value;
  fetchCatByBreed(cat);
}
