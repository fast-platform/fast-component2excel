
const fs = require('fs');

class UtilJsonToFile {
    static convert(jsonIn, fileName) {

        if (process.browser) {

            var blob = new Blob([JSON.stringify(jsonIn, null, 4)], { type: 'text/json' });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // If IE, you must uses a different method.
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } else {
            return fs.writeFile(fileName, JSON.stringify(jsonIn, null, 4), function (err) {
                if (err) {
                    return console.log(err);
                }







                /*
                 * TODO
                 */
                console.log('__ saved to _ ' + fileName);









            });
        }
    }
}
module.exports = UtilJsonToFile;