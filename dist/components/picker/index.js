'use strict';

var _pickers = require('./pickers');

var _pickers2 = _interopRequireDefault(_pickers);

var _timePicker = require('../timepicker/timePicker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _datePicker = require('../timepicker/datePicker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _dateperiodpicker = require('../timepicker/dateperiodpicker');

var _dateperiodpicker2 = _interopRequireDefault(_dateperiodpicker);

var _daterangepicker = require('../timepicker/daterangepicker');

var _daterangepicker2 = _interopRequireDefault(_daterangepicker);

var _timedefaultpicker = require('../timepicker/timedefaultpicker');

var _timedefaultpicker2 = _interopRequireDefault(_timedefaultpicker);

var _datetimepicker = require('../timepicker/datetimepicker');

var _datetimepicker2 = _interopRequireDefault(_datetimepicker);

var _timeGroupPicker = require('../timepicker/timeGroupPicker');

var _timeGroupPicker2 = _interopRequireDefault(_timeGroupPicker);

var _carNumberPicker = require('../timepicker/carNumberPicker');

var _carNumberPicker2 = _interopRequireDefault(_carNumberPicker);

var _timePeriodPicker = require('../timepicker/timePeriodPicker');

var _timePeriodPicker2 = _interopRequireDefault(_timePeriodPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    TimePicker: _timePicker2.default,
    ColumnPicker: _pickers2.default,
    DatePicker: _datePicker2.default,
    TimeGroupPicker: _timeGroupPicker2.default,
    DatePickerV2: _dateperiodpicker2.default,
    DatePickerInstall: _dateperiodpicker2.default,
    DatePickerNow: _timedefaultpicker2.default,
    DataPickerBefore: _daterangepicker2.default,
    Pickers: _pickers2.default,
    CarNumberPicker: _carNumberPicker2.default,
    TimeSectionPicker: _datetimepicker2.default,
    DatePeriodPicker: _dateperiodpicker2.default,
    DateRangePicker: _daterangepicker2.default,
    TimeDefaultPicker: _timedefaultpicker2.default,
    DateTimePicker: _datetimepicker2.default,
    TimePeriodPicker: _timePeriodPicker2.default
};
/* 以下名称不建议使用 */