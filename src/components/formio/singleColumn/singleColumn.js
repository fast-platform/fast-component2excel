
const BaseParentList = require('../base/baseParentList');

class SingleColumn extends BaseParentList {
    constructor(type, key) {
        super(type, key);
        this.positionX = 1;
        this.positionY = 0;
        //not implemented in GUI
        this.columnWidth = null;
    }
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = 'singleColumn';
        /*
         * TODO
         * 
         * will it blow ??????
         */ 
        let key = null;
        //
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
        objOut.columnWidth = thisCompDef.width;
        let components = [];
        let compArrIn = thisCompDef.components;
        for (let index in compArrIn) {
            let comp = compArrIn[index];
            let type = comp['type'];
            if (this.isTypeSupported(type)) {
                let newComp = { 'key': 'you are not suppose to see it' };
                let CompClass = this.getTypeClass(type);
                newComp = CompClass.getNewInstance(comp);
                components.push(newComp);
            }
        }
        objOut.components = components;
        if (objOut.hasTitle) objOut.title = thisCompDef[objOut.useTitleUnder];
        return objOut
    }
    updateValueXY(parentPayloadX, parentPayloadY) {
        super.updateValueXY(parentPayloadX, parentPayloadY - 1); // -1 fix lack of title in 'SingleColumn'
    }
    getTotalSizeY() {
        let superY = super.getTotalSizeY() - 1; // -1 fix lack of title
        this.baseHeight = superY - this.positionY;
        return superY;
    }
}
module.exports = SingleColumn;