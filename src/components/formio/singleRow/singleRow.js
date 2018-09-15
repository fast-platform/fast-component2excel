const ParentColumns = require('../base/baseParentColumns');

//padding could be fixed in  'getNewInstance'
class SingleRow extends ParentColumns {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;
    }
    static getNewInstance(thisCompDef) {
        let compDefToFeed = {};
        compDefToFeed['columns'] = thisCompDef;
        compDefToFeed.type = 'singleRow';
        let newSingleRow = super.getNewInstance(compDefToFeed);
        //fix column padding
        for (let index in newSingleRow.components) {
            newSingleRow.components[index].positionX = 0;
            newSingleRow.components[index].positionY = 0;
        }












        //console.log(newSingleRow);








        return newSingleRow;
    }
    //remove title row
    getTotalSizeY() {
        let maxHeight = 0;
        for (let index in this.components) {
            let compY = this.components[index].getTotalSizeY();
            if (maxHeight < compY) {
                maxHeight = compY;
            }
        }
        this.baseHeight = maxHeight;//removed
        return (this.positionY + this.baseHeight);
    }
    //remove title row
    getSheetArrLocal(isExport) {
        let superArr = super.getSheetArrLocal(isExport);
        let arrOut = [];
        for (let index in superArr) {
            if (index > 0) {
                arrOut.push(superArr[index]);
            }
        }
        return arrOut;
    }
    updateValueXY(parentPayloadX, parentPayloadY) {
        this.valueArrX = parentPayloadX + this.positionX;
        this.valueArrY = parentPayloadY + this.positionY;//fix nontitle in a row
        let lastComponentRowEndAtX = 0;
        for (let index in this.components) {
            let baseWidthToUse = this.components[index].baseWidth;
            if (baseWidthToUse == null || baseWidthToUse === 0) {
                /*
                 * TODO
                 * 
                 * will blow if col more then 1
                 */ 
                baseWidthToUse = 1;
            }
            this.components[index].updateValueXY(this.valueArrX + lastComponentRowEndAtX, this.valueArrY);
            //fix list structure
            lastComponentRowEndAtX = lastComponentRowEndAtX + baseWidthToUse + this.components[index].positionX;
        }
    }
}
module.exports = SingleRow;