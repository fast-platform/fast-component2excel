const BaseParentList = require('../base/baseParentList');

class Panel extends BaseParentList {
    constructor(type, key) {
        super(type, key);
        this.positionX = 2;
        this.positionY = 1;
        this.hasTitle = true;
    }
    updateBorder() {
        super.updateBorder();
        //all around border, will be fixed before workbook
        this.styles.border.styleArr = [
            {
                'border':
                    //{
                    //    'left':
                    {
                        'style': "thick",//'thin'
                        'color': {
                            'rgb': "FFFF0000"
                        }
                    }
                //}
            }
        ];
    }
}
module.exports = Panel;