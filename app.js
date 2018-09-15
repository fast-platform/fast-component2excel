'use strict';

const fs = require('fs');

const Main = require('./src/main');

testExport();
testImport();

function testImport() {
    fs.readFile('./w_testData/expWorkBook.xlsx', null, function (err, data) {
        if (err) {
            return console.log(err);
        }

        let workBookPromise =  Main.getImpWorkBookPromiseFromData(data);

        workBookPromise.then(workBook => {

            let formDefFixed = Main.getImpFormDefFixFromBook(workBook);
            Main.saveJsonToFile(formDefFixed, './w_result/imp' + 'FormDefFixed' + '.json');
            //console.log(formDefFixed);


            let formDefWithVal = Main.getImpFormDefWithVal(workBook, formDefFixed);
            Main.saveJsonToFile(formDefWithVal, './w_result/imp' + 'FormDefWithVal' + '.json');
            //console.log(formDefWithVal);


            let formObj = Main.getImpFormObjFromFormJson(formDefWithVal);
            Main.saveJsonToFile(formObj, './w_result/imp' + 'FormObj' + '.json');
            //console.log(formObj);


            //fix 'value' from 'Label' to 'Key'
            let formObjFixed = Main.getImpFormObjFixed(formObj);
            Main.saveJsonToFile(formObj, './w_result/imp' + 'FormObjFixed' + '.json');
            //console.log(formObjFixed);


            let postBody = Main.getImpPostBody(formObjFixed);
            Main.saveJsonToFile(postBody, './w_result/imp' + 'PostBody' + '.json');
            //console.log(postBody);
        });
    });
}

function testExport() {
    fs.readFile('./w_testData/formDef.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.trim();
        let parsed = JSON.parse(data.trim());
        console.log('_____parsed_____');

        let formDefObj = Main.getExpFormDefObj(parsed);
        Main.saveJsonToFile(formDefObj,'./w_result/exp'+'FormDefObj'+'.json');
        //console.log(formDefObj);


        //fix Size
        //set valueXY
        //set validator, no Cell location so far
        let formDefFixed = Main.getExpFormDefFixed(formDefObj);
        Main.saveJsonToFile(formDefFixed, './w_result/exp' + 'FormDefFixed' + '.json');
        //console.log(formDefFixed);

        ////set validator's cell location
        let isExport = true;//set defaultValue;
        let mainSheetArr = Main.getExpMainSheetArr(formDefFixed, isExport, );
        Main.saveJsonToFile(mainSheetArr, './w_result/exp' +'MainSheetArr'+'.json');
        //console.log(mainSheetArr);

        // + 'formDefFixed' sheet
        let workBookPromise = Main.getExpWorkBookPromise(mainSheetArr, formDefFixed);
        //no output, since it's obj
        //console.log(workBook);
        workBookPromise.then(workBook => {
            return Main.saveExpWorkBookFile(workBook, './w_result/expWorkBook.xlsx');
        });
        
    });
}
