
class WorkBookToSheet {
    static convert(workBook, sheetName) {
        return workBook.sheet(sheetName);
    }
}
module.exports = WorkBookToSheet;