
class FormToSheet {
    static convert(formObj, isExport) {
        let sheetArr = digSheet(formObj, isExport);
        return sheetArr;
    }
}
module.exports = FormToSheet;

function digSheet(formObj, isExport) {
    let sheetArr = [];
    sheetArr = formObj.getSheetArrLocal(isExport);
    return sheetArr;
}
