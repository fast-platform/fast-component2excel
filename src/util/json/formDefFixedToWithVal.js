
const UtilCellMapping = require('../excel/cellMapping');

class FormDefFixedToWithVal {
    static convert(formDefFixed, sheet) {
        let formWithVal = digCompVal(formDefFixed, sheet);
        return formWithVal;
    }
}
module.exports = FormDefFixedToWithVal;

function digCompVal(compIn, sheet) {
    if (compIn.hasOwnProperty('value')) {
        //fix zero based
        let cellName = UtilCellMapping.convertArrNumbersToName(compIn['valueArrX'], compIn['valueArrY']);
        let val = sheet.cell(cellName).value();
        //compIn['value'] = cellName;//test






        /*
         * TODO parsing if it's a label, cause we need key
         */
        //
        //"selectBoxes": {
        //    "mySelectBoxesLabel1": true,
        //    "mySelectBoxesLabel2": false,
        //    "mySelectBoxesLabel3": true
        //}





        compIn['value'] = val;
    }
    if (compIn.hasOwnProperty('components')) {
        for (let index in compIn['components']) {
            compIn['components'][index] = digCompVal(compIn['components'][index], sheet);
        }
    }
    return compIn;
}