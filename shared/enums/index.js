"use strict";
exports.__esModule = true;
exports.Type = exports.Gender = exports.FrequencyType = void 0;
var FrequencyType;
(function (FrequencyType) {
    FrequencyType["Daily"] = "Daily";
    FrequencyType["Weekly"] = "Weekly";
    FrequencyType["Monthly"] = "Monthly";
    FrequencyType["Yearly"] = "Yearly";
})(FrequencyType = exports.FrequencyType || (exports.FrequencyType = {}));
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
var Type;
(function (Type) {
    Type[Type["adult"] = 0] = "adult";
    Type[Type["child"] = 1] = "child";
})(Type = exports.Type || (exports.Type = {}));