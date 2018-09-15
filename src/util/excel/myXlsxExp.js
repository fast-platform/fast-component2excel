
const XlsxPopulate = require('xlsx-populate');

const UtilCellMapping = require('./cellMapping');

class MyXlsxExp {
    static getArrToWorkBook(sheetArr, formDefFixed) {
        return getSheetToBook(sheetArr, formDefFixed);
    }
    static saveWorkBookToFile(book, fileName) {
        return saveBookToFileLocal(book, fileName);
    }
}
module.exports = MyXlsxExp;

function saveBookToFileLocal(workbook, filename) {
    if (process.browser) {
        return workbook.outputAsync()
            .then(function (blob) {
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    // If IE, you must uses a different method.
                    window.navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }
            });
    } else {
        return workbook.toFileAsync(filename);
    }
}
function getSheetToBook(sheetArr, formDefFixed) {
    return XlsxPopulate.fromBlankAsync().then(workbook => {
        workbook.sheet(0).name('FORM');
        //workbook.sheet(0).name(formDefFixed.title);
        //workbook.sheet(formDefFixed.title).cell('A1').value(
        workbook.sheet('FORM').cell('A1').value(
            sheetArr
        );

        workbook.addSheet('formDefFixed').cell('A1').value(JSON.stringify(formDefFixed));

        workbook.addSheet(formDefFixed.supportSheetName).cell('A1').value(formDefFixed.validatorsSheetArr);

        // validator cell by cell
        let cellValidatorPairs = digOutCellValidatorPairs(formDefFixed, null);





        workbook.sheet(0).cell('A1').style({ "fill": "00ceff" });
        workbook.sheet(0).cell('A1').style({ 'bold': true });
        //<border>
        //    <right style="thin">
        //        <color rgb="FFFF0000" />
        //    </right>
        //</border>
        workbook.sheet(0).cell('A1').style(
            {
                'border':
                    {
                        //'right': {
                        'style': "thick",//'thin'
                        'color': {
                            'rgb': "FFFF0000"
                        }
                        //}
                    }
            }
        );






        workbook = updateStyle(workbook, formDefFixed);
        for (let cellName in cellValidatorPairs) {
            let validator = cellValidatorPairs[cellName];
            workbook.sheet(0)
                .cell(cellName)
                .dataValidation(validator);
        }
        return workbook;
    });
}
function digOutCellValidatorPairs(compIn, resultObj) {
    if (resultObj == null) {
        resultObj = {};
    }
    if (compIn.validatorObj != null) {
        let cellName = UtilCellMapping.convertArrNumbersToName(compIn.valueArrX, compIn.valueArrY);
        resultObj[cellName] = compIn.validatorObj;
    }
    if (compIn.components != null) {
        for (let index in compIn.components) {
            resultObj = digOutCellValidatorPairs(compIn.components[index], resultObj);
        }
    }
    return resultObj;
}
function updateStyle(workbook, comp) {
    let stylesObj = comp.styles;
    for (let styleOf in stylesObj) {
        let newStyleDef = stylesObj[styleOf];
        let cellNameStart = newStyleDef.start;
        let cellNameEnd = newStyleDef.end;
        let styleArr = newStyleDef.styleArr;
        for (let indexStyle in styleArr) {
            let singleStyleToUse = styleArr[indexStyle];
            if (styleOf === 'border') {
                let sheetArr = workbook.sheet(0).range(cellNameStart, cellNameEnd).cells(); 
                workbook = updateBorder(workbook, sheetArr, newStyleDef, singleStyleToUse);
            }
            if (styleOf === 'value') {
                workbook = updateValueCellStyle(workbook, newStyleDef, singleStyleToUse);
            }
        }
    }
    /*
     * 
     */
    for (let indexComp in comp.components) {
        workbook = updateStyle(workbook, comp.components[indexComp]);
    }
    return workbook;
}
function updateValueCellStyle(workbook, newStyleDef, singleStyleToUse) {
    let cellNameStart = newStyleDef.start;
    let cellNameEnd = newStyleDef.end;
    workbook.sheet(0).range(cellNameStart, cellNameEnd).style(singleStyleToUse);
    return workbook;
}
function updateBorder(workbook, sheetArr, newStyleDef, singleStyleToUse) {
    let cellNameStart = newStyleDef.start;
    let cellNameEnd = newStyleDef.end;
    let firstRow = null;
    let lastRow = null;
    let firstCol = null;
    let lastCol = null;
    workbook.sheet(0).range(cellNameStart, cellNameEnd).forEach(cell => {
        let rowN = cell.rowNumber();
        let colN = cell.columnNumber();
        if (firstCol == null) {
            firstCol = colN;
            lastCol = firstCol + sheetArr[0].length - 1;
        }
        if (firstRow == null) {
            firstRow = rowN;
            lastRow = sheetArr.length + firstRow -1;
        } 
        let sideStyle = {
            'border': {
                'left': null,
                'right': null,
                'top': null,
                'bottom': null
            }
        };
        //left
        if (colN === firstCol) {
            let useMe = sideStyle;
            useMe.border.left = singleStyleToUse.border;
            cell.style(useMe);
        }
        //top
        if (rowN === firstRow) {
            let useMe = sideStyle;
            useMe.border.top = singleStyleToUse.border;
            cell.style(useMe);
        }
        //right
        if (colN === lastCol) {
            let useMe = sideStyle;
            useMe.border.right = singleStyleToUse.border;
            cell.style(useMe);
        }
        //bottom
        if (rowN === lastRow) {
            let useMe = sideStyle;
            useMe.border.bottom = singleStyleToUse.border;
            cell.style(useMe);
        }
    });
    return workbook;
}