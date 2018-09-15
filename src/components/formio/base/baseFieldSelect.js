const BaseField = require('./baseField');

const UtilCellMapping = require('../../../util/excel/cellMapping');

class BaseFieldSelect extends BaseField{
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);
        this.isSelect = true;
        this.keyLabelSelectOptions = null;
        this.selectLabelSheetArrLocationStart = null;
        this.selectLabelSheetArrLocationEnd = null;
    }
    populateSelect(comp) {
        let valuesArr = comp['data']['values'];
        let keyLabelPairToSave = {};
        for (let index in valuesArr) {
            let val = valuesArr[index];
            if (typeof val === 'object') {
                let newKey = val['value'];
                let newLabel = val['label']
                keyLabelPairToSave[newKey] = newLabel;
            } else {
                //it's defaultVal Label
            }
        }
        this.keyLabelSelectOptions = keyLabelPairToSave;
    }
    updateValidator(validatorSheetArr) {
        if (validatorSheetArr == null) {
            validatorSheetArr = [];
        }
        let keysRow = [];
        keysRow[0] = this.key;
        let labelsRow = [];
        labelsRow[0] = this.label;
        for (let key in this.keyLabelSelectOptions) {
            keysRow.push(key);
            labelsRow.push(this.keyLabelSelectOptions[key]);
        }
        let lengthX = labelsRow.length;
        validatorSheetArr.push(keysRow);
        validatorSheetArr.push(labelsRow);
        let lengthY = validatorSheetArr.length;
        this.selectLabelSheetArrLocationStart = UtilCellMapping.convertArrNumbersToName(1, (lengthY - 1));//{ 'x': 1, 'y': (lengthY - 1)};
        this.selectLabelSheetArrLocationEnd = UtilCellMapping.convertArrNumbersToName((lengthX - 1), (lengthY - 1));//{ 'x': (lengthX - 1), 'y': (lengthY - 1) };
        let newValidatorObj = this.getBaseValidator();
        newValidatorObj.type = 'list';
        newValidatorObj.formula1 = '='+this.supportSheetName+'!' + this.selectLabelSheetArrLocationStart + ':' + this.selectLabelSheetArrLocationEnd;
        this.validatorObj = newValidatorObj;
        return validatorSheetArr;
    }
    //before post
    fixValue() {
        let hit = false;
        for (let key in this.keyLabelSelectOptions) {
            let label = this.keyLabelSelectOptions[key];
            if (label === this.value) {
                hit = true;
                this.value = key;
            }
        }
        if (!hit) console.log('__ no such label __ ' + this.value +' __ in select list, in absence of key will use label __');
    }
    //replace 'key' with 'label'
    getSheetArrLocal(isExport, validatorsSheetArr, replaceKeyWithLabel) {
        let superArr = super.getSheetArrLocal(isExport);
        if (isExport && replaceKeyWithLabel) {
            //[this.positionY + 1] cause our value is under label
            let key = superArr[this.positionY + 1];
            let label = this.keyLabelSelectOptions[key];
            superArr[this.positionY + 1] = [label];
        }
        return superArr;
    }
}
module.exports = BaseFieldSelect;

 