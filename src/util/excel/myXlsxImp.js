
const XlsxPopulate = require('xlsx-populate');

class MyXlsxImp {
    static getWorkBookFromData(data) {
        return XlsxPopulate.fromDataAsync(data)
            .then(workbook => {
                return workbook;
            });
    }
}
module.exports = MyXlsxImp;
