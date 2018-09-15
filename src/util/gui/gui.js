
class Gui {
    static getSupportedTypesObj() {
        return supportedTypes;
    }
    static isTypeSupported(type) {
        for (let supT in supportedTypes) {
            if (type === supT) {
                if (supportedTypes[supT]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }
    static getTypeClass(type) {
        let out = componentsReference[type];
        return out;
    }
}
module.exports = Gui;
//include exclude
//don't put here root 'FormClass'
const supportedTypes = {
    'password': false
    , 'form': true
    , 'textfield': true
    , 'number': true
    , 'panel': true
    , 'select': true
    , 'columns': true
    , 'singleColumn': true
    , 'table' : true
    , 'singleRow': true
    , 'email': true
    , 'datetime': true
    , 'survey': true
    , 'surveyQuestion': true
    , 'yesNo': true
}
const Form = require('../../components/formio/form/form');
const TextField = require('../../components/formio/textfield/textfield');
const Number = require('../../components/formio/number/number');
const Panel = require('../../components/formio/panel/panel');
const Select = require('../../components/formio/select/select');
const Columns = require('../../components/formio/columns/columns');
const SingleColumn = require('../../components/formio/singleColumn/singleColumn');
const Table = require('../../components/formio/table/table');
const SingleRow = require('../../components/formio/singleRow/singleRow');
const Email = require('../../components/formio/email/email');
const Datetime = require('../../components/formio/datetime/datetime'); 
const Survey = require('../../components/formio/survey/survey');
const SurveyQuestion = require('../../components/formio/surveyQuestion/surveyQuestion');
const YesNo = require('../../components/formio/yesNo/yesNo');
const componentsReference = {
    'form': Form
    ,'textfield': TextField
    , 'number': Number
    , 'panel': Panel
    , 'select': Select
    , 'columns': Columns
    , 'singleColumn': SingleColumn
    , 'table': Table
    , 'singleRow': SingleRow
    , 'email': Email
    , 'datetime': Datetime
    , 'survey': Survey
    , 'surveyQuestion': SurveyQuestion
    , 'yesNo': YesNo
}