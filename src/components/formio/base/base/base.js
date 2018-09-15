
const Gui = require('../../../../util/gui/gui');
const CellMapping = require('../../../../util/excel/cellMapping');

class BaseComponent {
    constructor(typeIn, keyIn) {
        
        this.key = keyIn;
        this.type = typeIn;

        //sheet array, value in Field and PayLoad in Parent
        this.valueArrX = null;
        this.valueArrY = null;

        this.tooltip = null;

        this.positionX = 0;
        this.positionY = 0;
        this.baseWidth = 1;//payload + title
        this.baseHeight = 1;//payload + title

        this.supportSheetName = 'supportDataSheet';

        this.styles = {
            'border': {
                'start': null,
                'end': null,
                'styleArr': []
            },
            'value': {
                'start': null,
                'end': null,
                'styleArr': []
            }
        };
    }
    static getNewInstance(thisCompDef) {
        console.log('__________________');
        console.log('___ you should override this "getNewInstance(thisCompDef)" in your component implementation of ___' + this.constructor.name);
        console.log('__________________');
    }
    static getTypeClass(type) {
        return Gui.getTypeClass(type);
    }
    static isTypeSupported(type) {
        return Gui.isTypeSupported(type);
    }
    getCellMapping() {
        return CellMapping;
    }
    getTotalSizeX() {
        console.log('__________________');
        console.log('___ you should override this "getTotalSizeX()" in your component implementation of ___' + this.constructor.name);
        console.log('__________________');
    }
    getTotalSizeY() {
        console.log('__________________');
        console.log('___ you should override this "getTotalSizeY()" in your component implementation of ___' + this.constructor.name);
        console.log('__________________');
    }
    //master function, fix rectangle, don't overwrite it
    getSheetArr(isExport) {
        if (isExport == null) {
            console.log('__________________');
            console.log('___ when you override this " getSheetArr(isExport)" in your component implementation of ___' + this.constructor.name);
            console.log('___ "isExport" is required __');
            console.log('__________________');
        }
        let sheetArr = this.getSheetArrLocal(isExport);
        sheetArr = this. getRectangle(sheetArr);
        return sheetArr;
    }
    getSheetArrLocal(isExport) {
        console.log('__________________');
        console.log('___ you should override this "getSheetArr()" in your component implementation of ___' + this.constructor.name);
        console.log('__________________');
    }
    getRectangle(arrOfRows) {
        let maxXIndex = 0;
        for (let index in arrOfRows) {
            let row = arrOfRows[index];
            if (maxXIndex < (row.length - 1)) {
                maxXIndex = row.length - 1;
            }
        }
        for (let index in arrOfRows) {
            let row = arrOfRows[index];
            if (maxXIndex > (row.length - 1)) {
                arrOfRows[index][maxXIndex] = null;
            }
        }
        return arrOfRows;
    }
    updateValueXY() {
        console.log('__________________');
        console.log('___ you should override this "updateValueXY()" in your component implementation of ___' + this.constructor.name);
        console.log('__________________');
    }
    updateValidator(validatorSheetArr) {
        return validatorSheetArr;
    }
    //before post
    //empty function if there is nothing to fix
    fixValue() {
        //fix 'Label' to 'Key' in 'select'
    }
    //empty function if there is no border
    updateBorder() {

    }
    //use_call this one
    //override only LOCAL version
    //check duplicates
    getValToPost(valPost) {
        if (valPost == null) {
            valPost = {};
        }
        let newEntry = this.getValToPostLocal();
        for (let keyNew in newEntry) {
            for (let keyOld in valPost) {
                if (keyOld === keyNew) {
                    console.log('__________________');
                    console.log('___ you have duplicate key in valPost of ___' + this.constructor.name);
                    console.log('___ old val ' + valPost[keyOld] + ' will be replaced with ' + newEntry[keyOld] + ' ___');
                    console.log('__________________'); 
                }
            }
        }
        for (let keyNew in newEntry) {
            valPost[keyNew] = newEntry[keyNew];
        }
        return valPost;
    }
    getValToPostLocal() {
        let newEntry = {};
        if (this.value != null) {
            newEntry[this.key] = this.value;
        }
        if (this.components != null) {
            for (let index in this.components) {
                newEntry = this.components[index].getValToPost(newEntry);
            }
        }
        return newEntry;
    }
}
module.exports = BaseComponent;