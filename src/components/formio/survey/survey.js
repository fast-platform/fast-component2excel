const ParentList = require('../base/baseParentList');

class Survey extends ParentList {
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
        let components = [];
        let questionsArr = thisCompDef.questions;
        let questionsKeyLabel = {};
        for (let index in questionsArr) {
            let q = questionsArr[index];
            let key = q.value;
            let label = q.label;
            questionsKeyLabel[key] = label;
        }
        let topLabels = [];
        topLabels[0] = null;//empty above questions
        let valuesArr = thisCompDef.values;
        let valuesKeyLabel = {};
        for (let index in valuesArr) {
            let q = valuesArr[index];
            let key = q.value;
            let label = q.label;
            valuesKeyLabel[key] = label;
            topLabels.push(label);
        }
        /*
         * no need for row of labels, insteade use tytels row
         */ 

        //let RowOfLabelsClass = thsi.getTypeClass('rowsOfLabels');
        //let rowOfLabelsDef = {};
        //rowOfLabelsDef.components = topLabels;
        //rowOfLabelsDef.key = (key + '_' + 'rowsOfLabels');
        //rowOfLabelsDef.type = 'rowsOfLabels';
        //components[0] = RowOfLabelsClass.getNewInstance(rowOfLabelsDef);
        /*
         * questions rows
         */
        for (let keyQ in questionsKeyLabel) {
            let typeQ = 'surveyQuestion';
            let QuestionClass = this.getTypeClass(typeQ);
            let QuestionsDef = {};
            QuestionsDef.type = typeQ;
            QuestionsDef.key = keyQ;
            QuestionsDef.label = questionsKeyLabel[keyQ];
            QuestionsDef.components = valuesKeyLabel;
            QuestionsDef.defaultValue = thisCompDef.defaultValue;
            let newComp = QuestionClass.getNewInstance(QuestionsDef);
            components.push(newComp);
        }
        objOut.type = type;
        objOut.key = key;
        objOut.defaultValue = thisCompDef.defaultValue;
        //don't use title there are answers labels in top row
        objOut.useTitleUnder = 'label';
        objOut.label = thisCompDef.label;
        objOut.components = components;
        objOut.tytlesArr = topLabels;
        if (objOut.hasTitle) objOut.title = thisCompDef[objOut.useTitleUnder];

        return objOut;
    }
    //it already has space for title, so fill it with answers titles 
    getSheetArrLocal(isExport) {
        let superSheet = super.getSheetArrLocal(isExport);
        let surveyQuestion = this.components[0];

        let answersTitles = [];

        for (let indexAnswers in surveyQuestion.components) {
            answersTitles.push(surveyQuestion.components[indexAnswers].label);
        }
        let headerRow = [];
        let questionPaddingX = this.components[0].positionX;
        if (this.positionX > 0) {
            headerRow[this.positionX - 1 + questionPaddingX] = null;
        }
        headerRow.push(null);//no headers over questions column
        //move answers titles with answer padding
        if (this.components[0].positionX > 0) {
            headerRow[parseInt(this.components[0].positionX)] = null;
        }
        //let first = true;
        for (let indexAns in answersTitles) {
            //yesNo paddingX
            let yesNoPadding = this.components[0].components[0].positionX;
            if (yesNoPadding > 0) {
                for (let i = 0; i < yesNoPadding; i++) {
                    headerRow.push(null);
                }
            }
            headerRow.push(answersTitles[indexAns]);
        }
        let oldHeaderY = 0;
        if (this.positionY > 0 ) {
            oldHeaderY = this.positionY;
        }
        superSheet[oldHeaderY] = headerRow;


        let width = headerRow.length;
        let surveyHeaderLabelRow = [];
        //padding X
        for (let i = 0; i < this.positionX; i++) {
            surveyHeaderLabelRow.push(null);
        }
        surveyHeaderLabelRow.push(this.label);
        let sheetOut = [];
        //sheetOut.push(surveyHeaderLabelRow);
        let needLabel = true;
        for (let i = 0; i < superSheet.length; i++) {
            //skip padding Y, then label
            if (i === this.positionY && needLabel) {
                needLabel = false;
                sheetOut.push(surveyHeaderLabelRow);
            }
            sheetOut.push(superSheet[i]);
        }
        return sheetOut;
    }
    getValToPostLocal(valPost) {
        if (valPost == null) {
            valPost = {};
        }
        let newValToPost = {};
        let rootKey = this.key;
        newValToPost[rootKey] = {};
        for (let index in this.components) {
            let comp = this.components[index];
            let compKey = comp.key;
            let firstHit = false;
            for (let index2 in comp.components) {
                let answer = comp.components[index2];
                let answerKey = answer.key;
                let answerVal = answer.value;
                //only first match
                if (answerVal === true && !firstHit) {
                    newValToPost[rootKey][compKey] = answerKey;
                }
            }
        }
        return newValToPost;
    }
    updateBorder() {
        super.updateBorder();
        //all around border, will be fixed before workbook
        this.styles.border.styleArr = [
            {
                'border':
                    //{
                    //    'left':
                            {
                                'style': "thick",//'thin'
                                'color': {
                                    'rgb': "FFFF0000"
                                }
                            }
                    //}
            }
        ];
        let xStart = this.valueArrX;
        let yStart = this.valueArrY;
        let xEnd = xStart + this.baseWidth - 1;//-1 because valueArr is in first cell
        let yEnd = yStart + this.baseHeight - 1;// +1 we have 2 rows title// -1 if there is title//-1 because valueArr is in first cell 
        this.styles.border.end = this.getCellMapping().convertArrNumbersToName(xEnd, yEnd);
    }
}
module.exports = Survey;