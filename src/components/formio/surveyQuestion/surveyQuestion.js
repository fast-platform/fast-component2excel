
const BaseParentColumns = require('../base/baseParentColumns');

class SurveyQuestion extends BaseParentColumns {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;
    }
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = thisCompDef.type;
        let key = thisCompDef.key;
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
        objOut.defaultValue = thisCompDef.defaultValue;
        objOut.label = thisCompDef['label'];
        let components = [];
        for (let keyV in thisCompDef.components) {
            let type = 'yesNo';
            let yesNoDef = {};
            yesNoDef.type = type;
            yesNoDef.key = keyV;
            yesNoDef.defaultValue = objOut.defaultValue;
            yesNoDef.label = thisCompDef.components[keyV];
            let YesNoClass = this.getTypeClass(type);
            let newCompYesNo = YesNoClass.getNewInstance(yesNoDef);
            components.push(newCompYesNo);
        }
        objOut.components = components;
        return objOut
    }
    //+1 for survey title
    getTotalSizeX() {
        let widthSum = 0;
        for (let index in this.components) {
            let compX = this.components[index].getTotalSizeX();
            widthSum = widthSum + compX;
        }
        this.baseWidth = widthSum + 1;// + title
        return (this.positionX + this.baseWidth);
    }
    //remove title spase
    getTotalSizeY() {
        let maxHeight = 0;
        for (let index in this.components) {
            let compY = this.components[index].getTotalSizeY();
            if (maxHeight < compY) {
                maxHeight = compY;
            }
        }
        this.baseHeight = maxHeight;// + 1;//fix, there is no 'title', but there is title row space
        return (this.positionY + this.baseHeight);
    }
    getSheetArrLocal(isExport) {
        let superSheet = super.getSheetArrLocal(isExport);
        let sheetOut = [];
        for (let superRowIndex in superSheet) {
            //padding Y
            if (this.positionY > 0) {
                for (let i = 0; i < this.positionY; i++) {
                    sheetOut.push([null]);
                }
            }
            let superRow = superSheet[superRowIndex];
            let newRow = [];
            let hitPayload = false;
            for (let superCellIndex in superRow) {
                superCellIndex = parseInt(superCellIndex);
                let supperCell = superRow[superCellIndex];
                /*
                 * 
                 */
                if (this.positionX > 0) {
                    if (superCellIndex < this.positionX) {
                        newRow.push(supperCell);
                    } else {
                        if (!hitPayload) {
                            newRow.push(this.label);//question label
                            newRow[this.positionX] = null;
                        }
                        newRow.push(supperCell);
                        hitPayload = true;
                    }
                } else {
                    if (superCellIndex === 0) {
                        newRow.push(this.label);//question label
                    }
                    newRow.push(supperCell);
                }

                /*
                 * 
                 */ 
            }
            //sheetOut[superRowIndex] = newRow;
            sheetOut.push(newRow);
        }
        return sheetOut;
    }
    /*
     * TODO
     */ 
    updateValueXY(parentPayloadX, parentPayloadY) {
        //console.log('======================================================parentPayloadY=====' + parentPayloadY);
        //console.log('=======================================================this.positionY====' + this.positionY);
        this.valueArrX = parentPayloadX + this.positionX + 1;//+ 1 title question







        this.valueArrY = parentPayloadY + this.positionY +1 ;//in parent it's under title + (padding/position






        let lastComponentRowEndAtX = 0;



        //console.log('===========================================================' + this.valueArrY);
        for (let index in this.components) {



            //console.log('____________________________start______' + this.valueArrY);




            this.components[index].updateValueXY(this.valueArrX + lastComponentRowEndAtX, this.valueArrY);
            //fix list structure
            lastComponentRowEndAtX = lastComponentRowEndAtX + this.components[index].baseWidth + this.components[index].positionX;
            //console.log('____________________________end________' + this.valueArrY);
        }
    }
    updateBorder() {
        //payload coord in parent
        let xStart = this.valueArrX-1 ;//-1 for question title on the left
        let yStart = this.valueArrY;
        this.styles.border.start = this.getCellMapping().convertArrNumbersToName(xStart, yStart);
        let xEnd = xStart + this.baseWidth - 1;//-1 because valueArr is in first cell
        let yEnd = yStart + this.baseHeight - 1;//-1 because valueArr is in first cell 

        this.styles.border.end = this.getCellMapping().convertArrNumbersToName(xEnd, yEnd);




        //console.log(this.type);
        //console.log(this.styles.border);
        //console.log(this.getSheetArr(false));
        //console.log(this.valueArrX + '_x___valArr__Y_' + this.valueArrY);
        //console.log(this.baseWidth + '_x___base__y_' + this.baseHeight);



        /*
         * 
         * 
         */
        for (let index in this.components) {
            this.components[index].updateBorder();
        }
    }
}
module.exports = SurveyQuestion;