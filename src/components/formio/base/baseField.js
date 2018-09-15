const BaseComponent = require('./base/base');

class BaseField extends BaseComponent {
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);


        this.baseHeight = 3;//label, field, description

        this.label = null
        this.value = null;
        this.description = null;

        this.defaultValue = null;
        this.placeholder = null
        
        this.errorLabel = null;
        this.hidden = null;

        this.validatorObj = null;

        this.styles.value.styleArr = [
            {
                "fill": "BDD5F3"
            },
            {
                'border': {
                    'style': 'thin',
                    'color': {
                        'rgb': "0A5ABD"
                    }
                }
            }
        ];

    }
    getTotalSizeX() {
        return (this.positionX + this.baseWidth);
    }
    getTotalSizeY() {
        return (this.positionY + this.baseHeight);
    }
    getValueCellName() {
        return this.getCellMapping().convertArrNumbersToName(this.valueArrX, this.valueArrY);
    }
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = thisCompDef.type;
        let key = thisCompDef.key;
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
        objOut.defaultValue = (isNaN(parseInt(thisCompDef['defaultValue']))) ? thisCompDef['defaultValue'] : (parseInt(thisCompDef['defaultValue'])) ;
        objOut.placeholder = thisCompDef['placeholder'];
        objOut.label = thisCompDef['label'];
        objOut.errorLabel = thisCompDef['errorLabel'];
        objOut.description = thisCompDef['description'];
        objOut.hidden = thisCompDef['hidden'];
        if (objOut.isSelect) {
            objOut.populateSelect(thisCompDef);
        }
        return objOut
    }
    getSheetArrLocal(isExport) {
        let sheetArr = [];
        let labelArr = [];
        labelArr[this.positionX] = this.label;
        let fieldArr = [];
        fieldArr[this.positionX] = this.value;
        let defaultFieldArr = [];
        defaultFieldArr[this.positionX] = this.defaultValue;
        let descriptionArr = [];
        descriptionArr[this.positionX] = this.description;
        for (let i = 0; i < this.positionY; i++) {
            sheetArr[i] = []; //fix 'for index in null'
        }
        sheetArr[this.positionY] = labelArr;
        if (isExport === true) {
            sheetArr[this.positionY + 1] = defaultFieldArr;// 'this.defaultValue'
        } else {
            sheetArr[this.positionY + 1] = fieldArr;// 'this.value'
        }
        sheetArr[this.positionY + 2] = descriptionArr;
        return sheetArr;
    }
    //+ set style location
    updateValueXY(parentPayloadX, parentPayloadY) {
        this.valueArrX = this.positionX + parentPayloadX;
        /*
         * TODO check 'this.value' position in your BaseField implementations, should be in 2nd row
         */ 
        this.valueArrY = this.positionY + parentPayloadY + 1;// +1 since 'this.value' is in 2nd row in TextFields
        /*
         * 
         */
        this.updateValueStyle();

    }
    updateValueStyle() {
        this.styles.value.start = this.getValueCellName();
        this.styles.value.end = this.getValueCellName();
    }
    //to be used in 'updateValidator(validatorSheetArr)'
    getBaseValidator() {
        return {
            type: 'custom',//'list',
            allowBlank: false,
            showInputMessage: false,
            prompt: false,
            promptTitle: 'promptTitle',
            showErrorMessage: true,// showErrorMessage: false,
            error: this.errorLabel,//'String',
            errorTitle: 'errorTitle',
            operator: 'String',
            formula1: '$A:$A'//'=Sheet2!Cell1:Cell2'//'$A:$A'//,//Required
            //formula2: 'String'// TODO ___ what is this for ??????????????????????????????????????????????????????????????????????????
        };
    }
}
module.exports = BaseField;