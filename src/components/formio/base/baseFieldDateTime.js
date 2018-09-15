const Field = require('./baseField');

class BaseFieldDateTime extends Field {
    constructor(type, key) {
        super(type, key);
        this.positionX = 0;
        this.positionY = 0;

        this.daysDifference = 25569;//taken from excels xml validation field of '01/01/1970';
        this.timeEpochExcel = '1/1/1900';
    }
    getUnixMiliFromExcelsDays(daysIn) {
        return ((daysIn - this.daysDifference) * 86400 * 1000);
    }
    //before post
    fixValue() {
        let daysIn = this.value;
        let fixMili = this.getUnixMiliFromExcelsDays(daysIn);
        let date = new Date(fixMili);
        this.value = this.fixValueLocal(date);
    }
    fixValueLocal(date) {
        console.log('__________________');
        console.log('___ you should override this "fixValueLocal(date)" in your component implementation of ___' + this.constructor.name);
        console.log('__________________');
    }
    /*
     * time converter
     */
    getYear(date) {
        return date.getUTCFullYear();
    }
    getMonth(date) {
        return (date.getUTCMonth() + 1);//cause ZERO based
    }
    getDay(date) {
        return date.getUTCDate();
    }
    getHours(date) {
        // hours should be in 24 format, that's the way it's persisted, but displayed as AM/PM
        return date.getUTCHours();
    }
    getMinutes(date) {
        return date.getUTCMinutes();
    }
}
module.exports = BaseFieldDateTime;