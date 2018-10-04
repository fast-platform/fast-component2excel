import Converter from './Converter.js';
import axios from 'axios';

const url = 'https://ixjjftxezpoomka.form.io/a';

let json = '';

axios.get(url).then(response => {
  json = response.data;
  Converter.convertJsonToFile(json);
});

export default Converter;
