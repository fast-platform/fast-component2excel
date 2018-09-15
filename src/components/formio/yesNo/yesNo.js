const FieldSelect = require('../base/baseFieldSelect');

class YesNo extends FieldSelect {
    constructor(type,key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;
        this.baseHeight = 1;
        this.baseWidth = 1;

        this.isSelect = false;//we don't need to populate select because it's hardcoded into 'formula'
    }
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = thisCompDef.type;
        let key = thisCompDef.key;
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
        //objOut.defaultValue = (isNaN(parseInt(thisCompDef['defaultValue']))) ? thisCompDef['defaultValue'] : (parseInt(thisCompDef['defaultValue']));
        objOut.label = thisCompDef['label'];
        objOut.defaultValue = thisCompDef.defaultValue;
        /*
         * 
         */ 
        return objOut
    }
    getSheetArrLocal(isExport, validatorsSheetArr) {
        let replaceKeyWithLabel = false;
        let superArr = [];//all rows
        // Y padding
        if (this.positionY > 0) {
            superArr[this.positionY - 1] = null;
        }
        let newRow = [];
        //X padding
        if (this.positionX > 0) {
            newRow[this.positionX - 1] = null;
        }
        //will be replaced dith select
        if (this.key === this.defaultValue) {
            newRow.push('YES');
        } else {
            newRow.push(null);
        }
        let maxWidth = newRow.length;
        superArr.push(newRow);
        return superArr;
    }
    updateValidator(validatorSheetArr) {
        //if (validatorSheetArr == null) {
        //    validatorSheetArr = [];
        //}
        let newValidatorObj = this.getBaseValidator();
        newValidatorObj.type = 'list';
        newValidatorObj.formula1 = '"YES,NO"';
        this.validatorObj = newValidatorObj;
        return validatorSheetArr;
    }
    //before post
    fixValue() {
        if (this.value != null && this.value !== '') {
            let val = this.value.toUpperCase();
            if (val === 'YES') {
                this.value = true;
            } else if (val === 'NO') {
                this.value = false;
            } else {
                console.log('__________________');
                console.log('___ unsupported value _ ' + this.value + ' _ of survey in ___' + this.constructor.name);
                console.log('__________________');
            }
        } else {
            this.value = null;
        }
    }
    updateValueXY(parentPayloadX, parentPayloadY) {
        this.valueArrX = this.positionX + parentPayloadX;
        /*
         * TODO check 'this.value' position in your BaseField implementations, should be in 2nd row
         */
        this.valueArrY = this.positionY + parentPayloadY;





        //console.log(this.label);
        //console.log(this.valueArrX + '___' + this.valueArrY);
        //console.log(this.positionX + '_________' + this.positionY);

        /*
         * 
         */ 

        this.styles.value.start = this.getValueCellName();
        this.styles.value.end = this.getValueCellName();

    }
}
module.exports = YesNo;