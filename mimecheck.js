"use strict";
exports.__esModule = true;
var BinaryType;
(function (BinaryType) {
    BinaryType["PNG"] = "image/png";
    BinaryType["JPEG"] = "image/jpeg";
    BinaryType["GIF"] = "image/gif";
    BinaryType["PDF"] = "application/pdf";
    BinaryType["ZIP"] = "application/zip";
    BinaryType["OTHER"] = "unknown";
})(BinaryType = exports.BinaryType || (exports.BinaryType = {}));
function getBinaryType(signature) {
    switch (signature) {
        case '89504E47':
            return BinaryType.PNG;
        case '47494638':
            return BinaryType.GIF;
        case '25504446':
            return BinaryType.PDF;
        case 'FFD8FFDB':
        case 'FFD8FFE0':
        case 'FFD8FFE1':
            return BinaryType.JPEG;
        case '504B0304':
            return BinaryType.ZIP;
        default:
            return BinaryType.OTHER;
    }
}
exports.getBinaryType = getBinaryType;
function getFileType(file, callback) {
    var fileReader = new FileReader();
    fileReader.onloadend = function (evt) {
        if (evt.target.readyState === FileReader.DONE) {
            var uint = new Uint8Array(evt.target.result);
            var bytes_1 = [];
            uint.forEach(function (byte) {
                bytes_1.push(byte.toString(16));
            });
            var hex = bytes_1.join('').toUpperCase();
            callback({
                name: file.name,
                type: file.type,
                binaryType: getBinaryType(hex),
                hex: hex
            });
        }
    };
    var blob = file.slice(0, 4);
    fileReader.readAsArrayBuffer(blob);
}
exports.getFileType = getFileType;
function getFileTypes(files, next, success) {
    var results = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        getFileType(file, function (result) {
            if (next)
                next(result);
            results.push(result);
            if (success && results.length == files.length) {
                success(results);
            }
        });
    }
}
exports.getFileTypes = getFileTypes;
exports["default"] = {
    BinaryType: BinaryType,
    getFileType: getFileType,
    getFileTypes: getFileTypes,
    getBinaryType: getBinaryType
};
