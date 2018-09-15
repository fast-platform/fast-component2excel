const Field = require('../base/baseField');

class Number extends Field {
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);

        this.positionX = 0;
        this.positionY = 0;
    }
}
module.exports = Number;