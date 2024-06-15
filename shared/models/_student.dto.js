"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Group = exports.CreateGroups = exports.AssignTeacherInfo = exports.CreateStudentDto = void 0;
var _user_dto_1 = require("./_user.dto");
var CreateStudentDto = /** @class */ (function (_super) {
    __extends(CreateStudentDto, _super);
    function CreateStudentDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateStudentDto;
}(_user_dto_1.CreateUserDto));
exports.CreateStudentDto = CreateStudentDto;
var AssignTeacherInfo = /** @class */ (function () {
    function AssignTeacherInfo() {
    }
    return AssignTeacherInfo;
}());
exports.AssignTeacherInfo = AssignTeacherInfo;
var CreateGroups = /** @class */ (function () {
    function CreateGroups() {
    }
    return CreateGroups;
}());
exports.CreateGroups = CreateGroups;
var Group = /** @class */ (function () {
    function Group() {
    }
    return Group;
}());
exports.Group = Group;
