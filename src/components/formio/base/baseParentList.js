const BaseParent = require('./base/baseParent');

class BaseParentList extends BaseParent {
    getTotalSizeX() {
        let maxWidth = 0;
        for (let index in this.components) {
            let compX = this.components[index].getTotalSizeX();
            if (maxWidth < compX) {
                maxWidth = compX;
            }
        }
        this.baseWidth = maxWidth;
        return (this.positionX + this.baseWidth);
    }
    getTotalSizeY() {
        let heightSum = 0;
        for (let index in this.components) {
            let compY = this.components[index].getTotalSizeY();
            heightSum = heightSum + compY;
        }
        this.baseHeight = heightSum+1;//fix +1 title
        return (this.positionY + this.baseHeight);
    }
    getSheetArrLocal(isExport) {
        let sheetArr = []
        //padding Y
        if (this.positionY > 0) {
            //sheetArr[this.positionY - 1] = [];
            for (let i = 0; i < this.positionY; i++) {
                sheetArr[i] = [];
            }
        }
        let headerArr = [];
        headerArr[0] = this.title;
        //hix header max, to render all column in sheet
        if (this.baseWidth > 1) {
            headerArr[this.baseWidth - 1] = null
        }
        headerArr = this.fixRowPositionToTheRight(this.positionX, headerArr);
        sheetArr.push(headerArr);
        let compsArr = this['components'];
        for (let index in compsArr) {
            let comp = compsArr[index];
            let compSheetArr = comp.getSheetArrLocal(isExport);
            for (let indexChild in compSheetArr) {
                let row = this.fixRowPositionToTheRight(this.positionX, compSheetArr[indexChild]);
                sheetArr.push(row);
            }
        }
        return sheetArr;
    }
    updateValueXY(parentPayloadX, parentPayloadY) {
        this.valueArrX = parentPayloadX + this.positionX;
        this.valueArrY = parentPayloadY + this.positionY + 1;//in parent it's under title + (padding/position)
        let lastComponentRowArrLength = 0;
        for (let index in this.components) {
            this.components[index].updateValueXY(this.valueArrX, (this.valueArrY + lastComponentRowArrLength));
            //fix list structure
            lastComponentRowArrLength = lastComponentRowArrLength + this.components[index].baseHeight + this.components[index].positionY;
        }
    }
    fixRowPositionToTheRight(positionX, arrIn) {
        if (positionX > 0) {
            let arrOut = [];
            for (let index in arrIn) {
                let newIndex = parseInt(index) + positionX;
                arrOut[newIndex] = arrIn[index];
            }
            return arrOut;
        }
        return arrIn;
    }
}
module.exports = BaseParentList;

///*
// * TODO
// * 
// * there is 'title', only present in 'Panel'
// */ 
//function getChildMaxWidth(thisComp) {
//    let compArr = thisComp.components;

//    let maxWidth = 0;

//    for (let index in compArr) {
//        let comp = compArr[index];
//        let compX = comp.getTotalSizeX();
//        if (maxWidth < compX) {
//            maxWidth = compX;
//        }
//    }
//    return maxWidth;
//}