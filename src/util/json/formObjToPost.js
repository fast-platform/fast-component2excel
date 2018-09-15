

class FormObjToPost {
    static convert(formObj) {
        let postBody = {};
        postBody['data'] = {};

        postBody['data'] = formObj.getValToPost(null);
        //postBody['data'] = digData(formObj, null);

        return postBody;
    }
}
module.exports = FormObjToPost;

function digData(comp, result) {
    if (result == null) {
        result = {};
    }
    if (comp.hasOwnProperty('value')) {
        result[comp['key']] = comp['value'];
    }
    if (comp.hasOwnProperty('components')) {
        for (let index in comp['components']) {
            let compChild = comp['components'][index];
            result = digData(compChild, result);
        }
    }
    return result;
}