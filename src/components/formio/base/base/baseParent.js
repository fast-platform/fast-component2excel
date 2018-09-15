const BaseComponent = require('./base');

class BaseParent extends BaseComponent {
    constructor(typeIn, keyIn) {
        super(typeIn, keyIn);
        this.title = null;//table don't have 'title'
        this.components = null;//Arr
        this.hasTitle = false;
        this.useTitleUnder = 'title';
        //this.tytlesArr = null;//row goes right under title row, thus 2 rows before payload

        this.styles.border.styleArr = [
            //{
            //    'border':
            //        {
            //            'style': "thick",//'thin'
            //            'color': {
            //                'rgb': "FFFF0000"
            //            }
            //        }
            //}
            /*
             * 
             */
            //{
            //    'border':
            //        //{
            //        //    'left':
            //        {
            //            'style': "thick",//'thin'
            //            'color': {
            //                'rgb': "FFFF0000"
            //            }
            //        }
            //    //}
            //}
        ];

    }
    static getNewInstance(thisCompDef) {
        let objOut = null;
        let type = thisCompDef.type;
        let key = thisCompDef.key;
        let ThisClass = this.getTypeClass(type);
        objOut = new ThisClass(type, key);
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
    //valid for 'panel'
    updateBorder() {
        //payload coord in parent
        let xStart = this.valueArrX;
        let yStart = this.valueArrY;
        this.styles.border.start = this.getCellMapping().convertArrNumbersToName(xStart, yStart);
        let xEnd = xStart + this.baseWidth - 1;//-1 because valueArr is in first cell
        /*
         * 
         * 
         * 
         * 
         * 
         */
        let yEnd = yStart + this.baseHeight - 2;// -1 if there is title//-1 because valueArr is in first cell 
        /*
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         */ 
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
    updateValidator(validatorSheetArr) {
        for (let index in this.components) {
            validatorSheetArr = this.components[index].updateValidator(validatorSheetArr);
        }
        return validatorSheetArr;
    }
    fixValue() {
        for (let index in this.components) {
            this.components[index].fixValue();
        }
    }
}
module.exports = BaseParent;