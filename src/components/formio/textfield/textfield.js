const Field = require('../base/baseField');

class TextField extends Field {
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);

        this.baseWidth = 1;

        this.positionX = 0;
        this.positionY = 0;
    }
}
module.exports = TextField;