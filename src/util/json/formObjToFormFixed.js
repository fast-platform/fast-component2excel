
class FormObjToFormFixed {
    static convert(formObjIn) {
        let formFixed = getFixedForm(formObjIn);
        formFixed.updateValueXY(0, 0);//(x,y) where we will start to populate sheet array, could be extra padding
        formFixed.validatorsSheetArr = formFixed.updateValidator(null);
        formFixed.updateBorder();
        return formFixed;
    }
}
module.exports = FormObjToFormFixed;

function getFixedForm(formObjIn){
    let x = formObjIn.getTotalSizeX();
    let y = formObjIn.getTotalSizeY();
    return formObjIn;
}