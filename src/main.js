//const XlsxPopulate = require('xlsx-populate');
const UtilFormDefToObj = require('./util/json/formDefToObj');
const UtilFormObjToFormFixed = require('./util/json/formObjToFormFixed');
const UtilFormDefFixedToWithVal = require('./util/json/formDefFixedToWithVal');
const UtilFormJsonToFormObj = require('./util/json/formJsonToFormObj');
const UtilFormObjToPost = require('./util/json/formObjToPost'); 
const UtilJsonToFile = require('./util/utilJsonToFile'); 
const UtilFormObjToSheet = require('./util/excel/formToSheet');
const UtilWorkBookToSheet = require('./util/excel/workBookToSheet');
const MyXlsxExp = require('./util/excel/myXlsxExp');
const MyXlsxImp = require('./util/excel/myXlsxImp');

class Main {

    static saveJsonToFile(jsonIn, filename) {
        //will blow lib compilation
        /*
         * TODO
         */
        /*
         * in 'webpack.config.js' -> "const config = {node: {fs: "empty"},"
         */
        UtilJsonToFile.convert(jsonIn, filename);
    }
    /*
     * export
     */ 
    static getExpFormDefObj(formDefJson) {
        let formDefObj = UtilFormDefToObj.convert(formDefJson);
        return formDefObj;
    }
    static getExpFormDefFixed(formDefObj) {
        let formDefFixed = UtilFormObjToFormFixed.convert(formDefObj);
        return formDefFixed;
    }
    static getExpMainSheetArr(formDefObj, isExport) {
        let mainSheetArr = UtilFormObjToSheet.convert(formDefObj, isExport);
        return mainSheetArr;
    }
    static getExpWorkBookPromise(mainSheetArr, formDefFixed) {
        let workBookPromise = MyXlsxExp.getArrToWorkBook(mainSheetArr, formDefFixed);
        return workBookPromise;
    }
    static saveExpWorkBookFile(workBook, fileName) {
        return MyXlsxExp.saveWorkBookToFile(workBook, fileName);
    }
    /*
     * import
     */
    static getImpWorkBookPromiseFromData(data) {
        return MyXlsxImp.getWorkBookFromData(data);
    }
    static getImpFormDefFixFromBook(workBook) {
        let sheet = UtilWorkBookToSheet.convert(workBook, 'formDefFixed');
        let formDefFixed = JSON.parse(sheet.cell('A1').value());
        return formDefFixed;
    }
    static getImpFormDefWithVal(workBook, formDefFixed) {
        let sheet = UtilWorkBookToSheet.convert(workBook, 0);
        let formDefWithVal = UtilFormDefFixedToWithVal.convert(formDefFixed, sheet);
        return formDefWithVal;
    }
    static getImpFormObjFromFormJson(formDefWithVal) {
        return UtilFormJsonToFormObj.convert(formDefWithVal);
    }
    static getImpFormObjFixed(formObj) {
        formObj.fixValue();
        return formObj;
    }
    static getImpPostBody(formDefWithVal) {
        return UtilFormObjToPost.convert(formDefWithVal);
    }
}
module.exports = Main