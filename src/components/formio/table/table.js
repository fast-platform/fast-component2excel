const BaseParentTable = require('../base/baseParentTable');

class Table extends BaseParentTable {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;
    }
}
module.exports = Table;