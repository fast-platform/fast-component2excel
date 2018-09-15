# FAST - Component2excel

A library to generate EXCEL Forms from a Form.io JSON form.
This library will not only take care of generating the Excel file for you, but will also help you importing back the data collected from the Excel file.

# Usage

For now, you can test the library by directly running it from the console

```javascript
node index.js
```

# Description

Excel manipulation is done with 'xlsx-populate', which will limit file format only to 'xlsx' but since it's 'xml' zip it will give us full control over file content
https://www.npmjs.com/package/xlsx-populate

'webpack' compilation will fail due to the presence of 'fs', thus in 'webpack.config.js' update 'config' to "const config = {node: {fs: "empty"}, ...."

every component should be able to:
-export excel
----instantiate itself from FORMIO component definition;
----calculate and save:
--------own 'payload'/('child components' + 'title') size
--------'value' position;
--------styles, and its 'start cell' (upper left cell), and 'end cell' (bottom right cell);
--------support sheet row array which is used in select
--------cell validator if any
----produce sheet array, portion representing space occupied by component;
-import excel
-once form definition is imported from 'formDefFixed' sheet as JSON and populated with values and converted to Component.Class
---convert value from 'label' to 'key'
---produce 'Post Body' entry and place it into final 'Post Body'

every component that has more than one value input field should be broken into children components with a single value field, example 'survey'

component is declared and created through:
src.util.gui.gui.Gui.Class.getTypeClass(type).getNewInstance(thisCompFormioDef);
it already implemented in
Base.Calss.isTypeSupported(type)
Base.Calss.getTypeClass(type)

only left and upper padding are implemented

main layouts structures are 'ParentList' and 'ParentColumns', everything else is derived from them like 'ParentTabel' and 'Survey'

when extending class, and calling super constructor, be sure to replace 'type' field with your class type since 'type field' will be used to cast form definition JSON from JSON to Object.Class during import

example of title position manipulation could be found in 'Survey', 'Survey Question'. If common structure is broken, you'll need to update component's position/size/array

example of complex 'Post Body' is 'Survey'

all the logic is embedded into component itself, so there is no need to complex validation of entire form.
Thus calling single function should propagate to all of it's children, which will handle only component itself and let the parent to assemble children's result.
Only exception is 'style' implementation, since it supposed to be implemented in 'workbook'.

---$ mkdir w_result //where examples from 'app.js' will be saved
---$ mkdir w_testData //where to finde test data for 'app.js'

all 'fish\*.json' have been tested, copy their content into './w_testData/formDef.json'

to import 'exported' xlsx copy it into './w_testData/'

when after building library, and on feeding it with 'formio form definition', retrieved through AJAX, it gives you 'malformed JSON', just 'trim();' it

## excel's file content could be find by unzipping it and go to

    \xl\worksheets\sheet1.xml
    \xl\styles.xml

---

## How to interpret style XML as style JSON:

    <border>
    	<right style="thin">	//xml parameter will become json property
    		<color rgb="FFFF0000" />
        </right>
    </border>

---

    {
    	'border':{
    		'right': {
    	        'style': "thick",
    			'color': {
    		        'rgb': "FFFF0000"
    			}
    		}
    	}
    }

---

## Component example:

## ----OBJECT

    {
    	static getNewInstance(thisCompDef);
    	static getTypeClass(type);

    	getCellMapping();//to convert array number into cellName
    	getValueCellName();//use getCellMapping+valueArrX+valueArrY

    	getTotalSizeX();//sheet array size = (padding + payload)
    	getTotalSizeY();

    	getSheetArrLocal(isExport);//sheet array only for this component, still  need to be fixed in perfect rectangel in getSheetArr(isExport)
    	getSheetArr(isExport);//master function, use it, don't overwrite it, fix rectangle
    	getRectangle(arrOfRows);//don't overwrite it
    	fixRowPositionToTheRight(positionX, arrIn); BaseParentList.Class, shift sheet array position to include padding
    	fixRowPositionToTheRight(positionX, rowChild, rowParent, lastRowXShift);// BaseParentColumns.Class, shift sheet array position to the right if there is brother on the left

    	updateValueXY();//once form object is complete update sheet location of 'value'

    	updateValidator(validatorSheetArr); //populate supportDataSheet, saved in 'type = form' component
    	getBaseValidator();// BaseField.Calss, precompiled validator, to be updated and saved in 'validatorObj'
    	populateSelect(comp);// BaseFieldSelect.Class, populate 'keyLabelSelectOptions'

    	fixValue();//master function, use it, before post, fix 'Label' to 'Key' in 'select', fix excel's time format
    	fixValueLocal(date);// BaseFieldDateTime.Class, filter what part of the date you want to post
    	getYear(date);// BaseFieldDateTime.Class
    	getMonth(date);// BaseFieldDateTime.Class
    	getDay(date);// BaseFieldDateTime.Class
    	getHours(date);// BaseFieldDateTime.Class
    	getMinutes(date);// BaseFieldDateTime.Class

    	updateBorder();//calculate border location
    	updateValueStyle();// BaseField.Calss map style position

    	getValToPost(valPost);//master function, use it, don't overwrite it, sum up all entry
    	getValToPostLocal();//get single entry
    }

---

## ----JSON

    {
    	"type": "form", //type used in Gui.Class
    	"valueArrX": 0, //cell position that holds value, or upper left of payload/(title + children)
    	"valueArrY": 1, //cell position that holds value, or upper left of payload/(title + children)
    	"tooltip": null, //parameter from formio, not implemented
    	"positionX": 0, //padding
        "positionY": 0, //padding
        "baseWidth": 3, //payload size
        "baseHeight": 12,//payload size
        "supportSheetName": "supportDataSheet",//used in validator
    	"styles": { //implemented after workbook was created
    		"border": { //what are we going to style, should help to decide what style should override what (child/parent)
                "start": "A2",//upper left
                "end": "C12",//bottom right
                "styleArr": []//styles obj that going to be stack one over another
    	    },
    	    "value": {
    		    "start": null,
                "end": null,
    	        "styleArr": []
    		}
    	},
    	"title": "Fish 3", //formio
    	"hasTitle": true, //title display is optional in formio
    	"useTitleUnder": "title", //refer to fieldName, since some formio components doesn't have title, alternative could be 'label' in 'columns'
    	"validatorsSheetArr": [ //entire support sheet array, every field entry should have 2 rows, 1st keys, 2nd labels
    		[
    			"panelSelectL",//field key
    			"selectL1",//value key
    			"selectL2",//value key
    			"selectL3"//value key
    		],
    		[
    			"Select L",//field label
    			"Select L1",//value label
    			"Select L2",//value label
    			"Select L3"//value label
    		]
    	],
    	"components":  [
                {
                    "key": "panelSelectL",//formio, implemented
                    "type": "select",//formio, implemented
                    "valueArrX": 2,
                    "valueArrY": 10,
                    "tooltip": null,
                    "positionX": 0,
                    "positionY": 0,
                    "baseWidth": 1,
                    "baseHeight": 3,
                    "supportSheetName": "supportDataSheet",
                    "styles": {
                        "border": {
                            "start": null,
                            "end": null,
                            "styleArr": []
                        },
                        "value": {
                            "start": "C11",
                            "end": "C11",
                            "styleArr": [	//styles are stack together
                                {
                                    "fill": "BDD5F3"
                                },
                                {
                                    "border": {	//all around border, could be customised in actual style implementation after workbook creation
                                        "style": "thin",
                                        "color": {
                                            "rgb": "0A5ABD"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "label": "Select L",//formio, implemented
                    "value": null,
                    "description": "Select D",//formio, implemented
                    "defaultValue": "selectL2",//formio, implemented
                    "placeholder": "Select P",//formio
                    "errorLabel": "Select E",//formio, implemented
                    "hidden": false,//formio
                    "validatorObj": {
                        "type": "list",
                        "allowBlank": false,
                        "showInputMessage": false,
                        "prompt": false,
                        "promptTitle": "promptTitle",
                        "showErrorMessage": true,
                        "error": "Select E",	//formio, implemented
                        "errorTitle": "errorTitle",
                        "operator": "String",
                        "formula1": "=supportDataSheet!B2:D2"	//supportDataSheet label location
                    },
                    "isSelect": true,	//true if it require to refer to supportDataSheet, if no then 'false', example >>>>>>"formula1": "\"YES,NO\""<<<<<<<
                    "keyLabelSelectOptions": {	//select 'key-label' pairs, not implemented for "YES,NO"\\why it's not implemented??????????????????????????????????????????????????????????????
                        "selectL1": "Select L1",
                        "selectL2": "Select L2",
                        "selectL3": "Select L3"	//using both 'keyLabelSelectOptions' and 'supportDataSheet' to check if value is present in formio form definition
                    },
                    "selectLabelSheetArrLocationStart": "B2",//upper left supportDataSheet location in 'validatorsSheetArr' of "type": "form" obj
                    "selectLabelSheetArrLocationEnd": "D2"//bottom right supportDataSheet location in 'validatorsSheetArr' of "type": "form" obj
                }
            ]
    }

---
