"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuickLessonModel = exports.RepeatableEventInfo = exports.EventDto = exports.EventsFilter = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var EventsFilter = /** @class */ (function () {
    function EventsFilter() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], EventsFilter.prototype, "userId");
    __decorate([
        (0, class_validator_1.IsDateString)(),
        (0, class_transformer_1.Type)(function () { return Date; })
    ], EventsFilter.prototype, "dateFrom");
    __decorate([
        (0, class_validator_1.IsDateString)(),
        (0, class_transformer_1.Type)(function () { return Date; })
    ], EventsFilter.prototype, "dateTo");
    return EventsFilter;
}());
exports.EventsFilter = EventsFilter;
var EventDto = /** @class */ (function () {
    function EventDto() {
    }
    __decorate([
        (0, class_validator_1.IsDateString)(),
        (0, class_transformer_1.Type)(function () { return Date; })
    ], EventDto.prototype, "date");
    return EventDto;
}());
exports.EventDto = EventDto;
var RepeatableEventInfo = /** @class */ (function () {
    function RepeatableEventInfo() {
    }
    __decorate([
        (0, class_validator_1.IsDateString)(),
        (0, class_transformer_1.Type)(function () { return Date; })
    ], RepeatableEventInfo.prototype, "repeatUntil");
    return RepeatableEventInfo;
}());
exports.RepeatableEventInfo = RepeatableEventInfo;
var QuickLessonModel = /** @class */ (function () {
    function QuickLessonModel() {
    }
    __decorate([
        (0, class_validator_1.IsDateString)(),
        (0, class_transformer_1.Type)(function () { return Date; })
    ], QuickLessonModel.prototype, "date");
    return QuickLessonModel;
}());
exports.QuickLessonModel = QuickLessonModel;