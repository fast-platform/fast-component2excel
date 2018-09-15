const BaseParentList = require('./baseParentList');

// 'table' is a list of rows
class BaseParentTable extends BaseParentList {
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = thisCompDef.type;
        let key = thisCompDef.key;
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
        let components = [];
        let rowsArrIn = thisCompDef.rows;
        for (let index in rowsArrIn) {
            let row = rowsArrIn[index];
            let type = 'singleRow';
            if (this.isTypeSupported(type)) {
                let newComp = { 'key': 'you are not suppose to see it' };
                let CompClass = this.getTypeClass(type);
                newComp = CompClass.getNewInstance(row);
                components.push(newComp);
            }
        }
        objOut.components = components;
        if (objOut.hasTitle) objOut.title = thisCompDef[objOut.useTitleUnder];
        return objOut
    }
}
module.exports = BaseParentTable;