const BaseParent = require('./base/baseParent');

class BaseParentColumns extends BaseParent {
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = thisCompDef.type;
        let key = thisCompDef.key;
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
        let components = [];
        let columnsArrIn = thisCompDef.columns;
        for (let index in columnsArrIn) {
            let column = columnsArrIn[index];
            let type = 'singleColumn';
            if (this.isTypeSupported(type)) {
                let newComp = { 'key': 'you are not suppose to see it' };
                let CompClass = this.getTypeClass(type);
                newComp = CompClass.getNewInstance(column);
                components.push(newComp);
            }
        }
        objOut.components = components;
        if (objOut.hasTitle) objOut.title = thisCompDef[objOut.useTitleUnder];
        return objOut
    }
    getTotalSizeX() {
        let widthSum = 0;
        for (let index in this.components) {
            let compX = this.components[index].getTotalSizeX();
            widthSum = widthSum + compX;
        }
        this.baseWidth = widthSum;
        return (this.positionX + this.baseWidth);
    }
    getTotalSizeY() {
        let maxHeight = 0;
        for (let index in this.components) {
            let compY = this.components[index].getTotalSizeY();
            if (maxHeight < compY) {
                maxHeight = compY;
            }
        }
        this.baseHeight = maxHeight+1;//fix, there is no 'title', but there is title row space
        return (this.positionY + this.baseHeight); 
    }
    getSheetArrLocal(isExport) {
        let sheetArr = []
        //padding Y
        if (this.positionY > 0) {
            sheetArr[this.positionY - 1] = [];
        }
        /*
         * TODO , no headers in Columns, but there is a 'label' that is not displayed
         */ 
        //let headerArr = [];
        //headerArr[0] = thisComp.title;
        //hix header max, to render all column in sheet
        //headerArr[thisComp.baseWidth - 1] = null
        //headerArr = fixRowPositionToTheRight(thisComp.positionX, headerArr);
        //sheetArr.push(headerArr);
        //
        let colArr = this['components'];
        for (let index in colArr) {
            let col = colArr[index];
            let colSheetArrOfRows = col.getSheetArr(isExport);
            let rowIndex = 0;
            let lastRowXShift = 0;
            for (let indexChildRow in colSheetArrOfRows) {
                if (sheetArr[rowIndex] == null) {
                    sheetArr[rowIndex] = [];
                }
                let rowChild = colSheetArrOfRows[indexChildRow];
                if (lastRowXShift < sheetArr[rowIndex].length) {
                    lastRowXShift = sheetArr[rowIndex].length;
                }
                let newRow = this.fixRowPositionToTheRight(this.positionX, rowChild, sheetArr[rowIndex], lastRowXShift);
                sheetArr[rowIndex] = newRow;
                rowIndex++;
            }
        }
        return sheetArr;
    }
    fixRowPositionToTheRight(positionX, rowChild, rowParent, lastRowXShift) {
        let shiftIndex = 0;
        if (positionX > 0) {
            shiftIndex = positionX;
        }
        if (lastRowXShift !== 0) {
            shiftIndex = shiftIndex + lastRowXShift;
        }
        for (let childIndex in rowChild) {
            childIndex = parseInt(childIndex);
            let childVal = rowChild[childIndex];
            rowParent[(shiftIndex + childIndex)] = childVal;
        }
        return rowParent;
    }
    updateValueXY(parentPayloadX, parentPayloadY) {
        this.valueArrX = parentPayloadX + this.positionX;
        this.valueArrY = parentPayloadY + this.positionY + 1;//in parent it's under title + (padding/position
        let lastComponentRowEndAtX = 0;
        for (let index in this.components) {
            this.components[index].updateValueXY(this.valueArrX + lastComponentRowEndAtX, this.valueArrY);
            //fix list structure
            lastComponentRowEndAtX = lastComponentRowEndAtX + this.components[index].baseWidth + this.components[index].positionX;
        }
    }

}
module.exports = BaseParentColumns;
