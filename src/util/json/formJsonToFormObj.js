
const Gui = require('../gui/gui');

class FormJsonToFormObj {
    static convert(formDefIn) {
        let formObj = null;

        let components = getConvertedChildArr(formDefIn['components']);

        formDefIn['components'] = null;
        let type = formDefIn['type'];
        let FormClass = require('../../components/formio/form/form');


        formObj = Object.assign(new FormClass(), formDefIn);
        formObj['components'] = components;

        return formObj;
    }
}
module.exports = FormJsonToFormObj;
function getConvertedChildArr(compsArr) {
    for (let index in compsArr) {
        let childJson = compsArr[index];
        let type = childJson['type'];
        let ChildClass = Gui.getTypeClass(type);
        if (childJson.hasOwnProperty('components')) {
            childJson['components'] = getConvertedChildArr(childJson['components']);
        }
        compsArr[index] = Object.assign(new ChildClass(), childJson);
    }

    return compsArr;
}