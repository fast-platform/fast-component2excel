const Gui = require('../gui/gui');

const BaseParentList = require('../../components/formio/base/baseParentList');
const BaseFieled = require('../../components/formio/base/baseField');
const FormClass = require('../../components/formio/form/form');

class FormDefToObj {
    static convert(formDefIn) {
        let formDefObjOut = FormClass.getNewInstance(formDefIn);
        return formDefObjOut;
    }
}
module.exports = FormDefToObj;