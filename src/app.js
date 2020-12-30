var fs = require('fs');
var http = require('http');
var content;
function readTextFile() {
    fs.readFile('./text/exampleFile', function getContent(err, fileContents) {
        content = fileContents.toString();
        console.log(content);
    });
}
var callback = function (response) {
    readTextFile();
    content = '';
    response.on('data', function (chunk) { return content += chunk; });
    response.on('end', function () { return console.log(content); });
};
http.request(callback).end();
