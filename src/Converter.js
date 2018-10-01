import { getShape } from './util/getShape';

class Converter {
  static convertJsonToFile(json) {
    getShape(json);
  }
};

export default Converter;
