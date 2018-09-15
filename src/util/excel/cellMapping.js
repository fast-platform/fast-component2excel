
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class CellMapping {
    static convertArrNumbersToName(col, row) {
        let newCellName = convertArrCol(col) + (row+1);//fix ZERO based row in SheetArr
        return newCellName;
    }
    static convertArrNumberToColumn(colIn) {
        let colOut = convertArrCol(colIn);
        return colOut;
    }
    static getAlphabet() {
        return alphabet;
    }
}
module.exports = CellMapping;
function convertArrCol(colNumb) {
    let alphabetSize = alphabet.length;
    let newColName = 'you\'re not supposed to see it';
    let indexAlphabetCount = 0;//sum of alphabet sizes
    let forLoop = 0;
    for (let i = colNumb; i >= 0; i = i - alphabetSize) {
        if (i > alphabetSize) {
            //not used
            indexAlphabetCount = indexAlphabetCount + alphabetSize;
        } else {
            if (forLoop > 0) {//alphabet excise
                //max 'ZZ'
                // TODO
                newColName = alphabet[forLoop - 1] + alphabet[i];
            } else {
                newColName = alphabet[i];//[i - 1];
            }
        }
        forLoop++;
    }
    return newColName;
}