"use strict";
var constructorTest;
(function (constructorTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        function setFailed(reason, e) {
            if (gs.nil(e))
                stepResult.setOutputMessage(reason);
            else {
                var m = gs.nil(e.message) ? '' : ((typeof e.message === 'string') ? e.message : '' + e.message).trim();
                var name = gs.nil(e.name) ? '' : ((typeof e.name === 'string') ? e.name : '' + e.name).trim();
                var stack = gs.nil(e.stack) ? '' : ((typeof e.stack === 'string') ? e.stack : '' + e.stack).trim();
                if (m.length > 0) {
                    if (name.length > 0) {
                        if (stack.length > 0)
                            stepResult.setOutputMessage("Unexpected " + name + ": " + reason + "\nMessage: " + m + "\nStack trace:\n" + stack);
                        else
                            stepResult.setOutputMessage("Unexpected " + name + ": " + reason + "\nMessage: " + m);
                    }
                    else if (stack.length > 0)
                        stepResult.setOutputMessage("Unexpected error: " + reason + "\nMessage: " + m + "\nStack trace:\n" + stack);
                    else
                        stepResult.setOutputMessage("Unexpected error: " + reason + "\nMessage: " + m);
                }
                else if (name.length > 0)
                    stepResult.setOutputMessage("Unexpected error: " + ((stack.length > 0) ? reason + "\n" + stack : reason));
                else if (stack.length > 0)
                    stepResult.setOutputMessage("Unexpected error: " + reason + "\n" + stack);
                else if ((m = ('' + e).trim()).length > 0)
                    stepResult.setOutputMessage("Unexpected error: " + reason + "\nMessage: " + m);
                else
                    stepResult.setOutputMessage("Unexpected error: " + reason);
            }
            stepResult.setFailed();
        }
        var schedule_sys_id;
        var approval_group_sys_id;
        var assignment_group_sys_id;
        try {
            var testResult = steps('8b4ed58697051110d87839000153afae');
            if (gs.nil(testResult))
                throw new Error("Could not find step results with Sys ID '8b4ed58697051110d87839000153afae'");
            schedule_sys_id = testResult.sys_id;
            if (gs.nil(schedule_sys_id))
                throw new Error("Schedule Sys ID not present in results from step with Sys ID '8b4ed58697051110d87839000153afae'");
            testResult = steps('cf4c1e1a97411110d87839000153aff6');
            if (gs.nil(testResult))
                throw new Error("Could not find step results with Sys ID 'cf4c1e1a97411110d87839000153aff6'");
            approval_group_sys_id = testResult.sys_id;
            if (gs.nil(approval_group_sys_id))
                throw new Error("Approval Group Sys ID not present in results from step with Sys ID '8b4ed58697051110d87839000153afae'");
            testResult = steps('f70fd5c697051110d87839000153af81');
            if (gs.nil(testResult))
                throw new Error("Could not find step results with Sys ID 'f70fd5c697051110d87839000153af81'");
            assignment_group_sys_id = testResult.sys_id;
            if (gs.nil(assignment_group_sys_id))
                throw new Error("Assignment Group Sys ID not present in results from step with Sys ID '8b4ed58697051110d87839000153afae'");
        }
        catch (e) {
            setFailed("Unable to get data from previous steps", e);
            return;
        }
        var defaultTimeZone;
        try {
            defaultTimeZone = gs.getSession().getTimeZoneName();
        }
        catch (e) {
            setFailed("Could not determine default time zone", e);
            return;
        }
        if (gs.nil(defaultTimeZone)) {
            stepResult.setOutputMessage("Could not determine default time zone");
            stepResult.setFailed();
            return;
        }
        var altTimeZone = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        var gdt = new GlideDateTime();
        var altTzOffset = new GlideDateTime(new GlideScheduleDateTime(gdt).convertTimeZone(defaultTimeZone, altTimeZone)).getNumericValue() - gdt.getNumericValue();
        function getExpectedInactiveTypeErrorMessage(sys_id, short_description, pv) {
            return "Reservation Type \"" + short_description + "\" (" + sys_id + ") is inactive.";
        }
        var parameterSetArray = [
            {
                parameters: {
                    short_description: 'Reservation Type #1',
                    minimum_duration_ms: 60000,
                    maximum_duration_ms: 3600000,
                    duration_increment_ms: 900000,
                    start_time_interval_ms: 1800000,
                    approval_group_empty: false,
                    inactive: false
                },
                expected: {
                    short_description: 'Reservation Type #1',
                    minimum_duration_ms: 60000,
                    maximum_duration_ms: 3600000,
                    duration_increment_ms: 900000,
                    start_time_interval_ms: 1800000
                },
                constructorParameterSets: [
                    { expectedTimeZone: defaultTimeZone },
                    { allowInactive: false, expectedTimeZone: defaultTimeZone },
                    { allowInactive: true, expectedTimeZone: defaultTimeZone },
                    { timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { allowInactive: false, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { allowInactive: true, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { timeZone: defaultTimeZone, expectedTimeZone: defaultTimeZone },
                    { timeZone: defaultTimeZone, allowInactive: false, expectedTimeZone: defaultTimeZone },
                    { timeZone: defaultTimeZone, allowInactive: true, expectedTimeZone: defaultTimeZone }
                ]
            },
            {
                parameters: {
                    short_description: 'Reservation Type #2',
                    minimum_duration_ms: 60000,
                    maximum_duration_ms: 3600000,
                    duration_increment_ms: 359999,
                    start_time_interval_ms: 3600000,
                    approval_group_empty: false,
                    inactive: true
                },
                expected: {
                    short_description: 'Reservation Type #2',
                    minimum_duration_ms: 3600000,
                    maximum_duration_ms: 3600000,
                    duration_increment_ms: 3600000,
                    start_time_interval_ms: 3600000
                },
                constructorParameterSets: [
                    { expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: false, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: true, expectedTimeZone: defaultTimeZone },
                    { timeZone: altTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: false, timeZone: altTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: true, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { timeZone: defaultTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { timeZone: defaultTimeZone, allowInactive: false, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { timeZone: defaultTimeZone, allowInactive: true, expectedTimeZone: defaultTimeZone }
                ]
            },
            {
                parameters: {
                    short_description: 'Reservation Type #3',
                    minimum_duration_ms: 1260000,
                    maximum_duration_ms: 10800000,
                    duration_increment_ms: 1800000,
                    start_time_interval_ms: 8400001,
                    approval_group_empty: true,
                    inactive: false
                },
                expected: {
                    short_description: 'Reservation Type #3',
                    minimum_duration_ms: 2160000,
                    maximum_duration_ms: 10800000,
                    duration_increment_ms: 1800000,
                    start_time_interval_ms: 900000
                },
                constructorParameterSets: [
                    { expectedTimeZone: defaultTimeZone },
                    { allowInactive: false, expectedTimeZone: defaultTimeZone },
                    { allowInactive: true, expectedTimeZone: defaultTimeZone },
                    { timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { allowInactive: false, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { allowInactive: true, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { timeZone: defaultTimeZone, expectedTimeZone: defaultTimeZone },
                    { timeZone: defaultTimeZone, allowInactive: false, expectedTimeZone: defaultTimeZone },
                    { timeZone: defaultTimeZone, allowInactive: true, expectedTimeZone: defaultTimeZone }
                ]
            },
            {
                parameters: {
                    short_description: 'Reservation Type #4',
                    minimum_duration_ms: 900000,
                    maximum_duration_ms: 11520000,
                    duration_increment_ms: 60000,
                    start_time_interval_ms: 3600000,
                    approval_group_empty: true,
                    inactive: false
                },
                expected: {
                    short_description: 'Reservation Type #4',
                    minimum_duration_ms: 900000,
                    maximum_duration_ms: 10800000,
                    duration_increment_ms: 60000,
                    start_time_interval_ms: 3600000
                },
                constructorParameterSets: [
                    { expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: false, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: true, expectedTimeZone: defaultTimeZone },
                    { timeZone: altTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: false, timeZone: altTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: true, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { timeZone: defaultTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { timeZone: defaultTimeZone, allowInactive: false, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { timeZone: defaultTimeZone, allowInactive: true, expectedTimeZone: defaultTimeZone }
                ]
            }
        ];
        for (var _i = 0, parameterSetArray_1 = parameterSetArray; _i < parameterSetArray_1.length; _i++) {
            var parameterSet = parameterSetArray_1[_i];
            var gr = new GlideRecord('x_g_inte_site_17_reservation_type');
            try {
                gr.setValue('short_description', parameterSet.parameters.short_description);
                gr.setValue('schedule', schedule_sys_id);
                gr.setValue('assignment_group', assignment_group_sys_id);
                if (!parameterSet.parameters.approval_group_empty)
                    gr.setValue('approval_group', approval_group_sys_id);
                gr.setValue('duration_increment', new GlideDuration(parameterSet.parameters.duration_increment_ms));
                gr.setValue('minimum_duration', new GlideDuration(parameterSet.parameters.minimum_duration_ms));
                gr.setValue('maximum_duration', new GlideDuration(parameterSet.parameters.maximum_duration_ms));
                gr.setValue('start_time_interval', new GlideDuration(parameterSet.parameters.start_time_interval_ms));
                if (gs.nil(gr.insert()))
                    throw new Error("Failed to create test reservation type \"" + parameterSet.parameters.short_description + "\"");
            }
            catch (e) {
                setFailed("Unable to insert test Reservation Type", e);
                return;
            }
            var rs;
            try {
                rs = new ReservationScheduler(gr);
            }
            catch (e) {
                setFailed("Unable to create instance of ReservationScheduler", e);
                return;
            }
            assertEqual({
                name: 'short_description not nil',
                shouldBe: false,
                value: gs.nil(rs.short_description)
            });
            assertEqual({
                name: 'short_description value',
                shouldBe: parameterSet.expected.short_description,
                value: rs.short_description
            });
            assertEqual({
                name: 'schedule not nil',
                shouldBe: false,
                value: gs.nil(rs.schedule)
            });
            assertEqual({
                name: 'assignment_group not nil',
                shouldBe: false,
                value: gs.nil(rs.assignment_group)
            });
            assertEqual({
                name: 'assignment_group value',
                shouldBe: assignment_group_sys_id,
                value: rs.assignment_group
            });
            if (parameterSet.parameters.approval_group_empty)
                assertEqual({
                    name: 'approval_group nil',
                    shouldBe: true,
                    value: gs.nil(rs.approval_group)
                });
            else {
                assertEqual({
                    name: 'approval_group not nil',
                    shouldBe: false,
                    value: gs.nil(rs.approval_group)
                });
                assertEqual({
                    name: 'approval_group value',
                    shouldBe: approval_group_sys_id,
                    value: rs.approval_group
                });
            }
            assertEqual({
                name: 'duration_increment not nil',
                shouldBe: false,
                value: gs.nil(rs.duration_increment)
            });
            assertEqual({
                name: 'duration_increment is valid',
                shouldBe: true,
                value: rs.duration_increment.isValid()
            });
            assertEqual({
                name: 'duration_increment value',
                shouldBe: new GlideDuration(parameterSet.expected.duration_increment_ms),
                value: rs.duration_increment
            });
            assertEqual({
                name: 'minimum_duration not nil',
                shouldBe: false,
                value: gs.nil(rs.minimum_duration)
            });
            assertEqual({
                name: 'minimum_duration is valid',
                shouldBe: true,
                value: rs.minimum_duration.isValid()
            });
            assertEqual({
                name: 'minimum_duration value',
                shouldBe: new GlideDuration(parameterSet.expected.minimum_duration_ms),
                value: rs.minimum_duration
            });
            assertEqual({
                name: 'maximum_duration not nil',
                shouldBe: false,
                value: gs.nil(rs.maximum_duration)
            });
            assertEqual({
                name: 'maximum_duration is valid',
                shouldBe: true,
                value: rs.maximum_duration.isValid()
            });
            assertEqual({
                name: 'maximum_duration value',
                shouldBe: new GlideDuration(parameterSet.expected.maximum_duration_ms),
                value: rs.maximum_duration
            });
            assertEqual({
                name: 'start_time_interval not nil',
                shouldBe: false,
                value: gs.nil(rs.start_time_interval)
            });
            assertEqual({
                name: 'start_time_interval is valid',
                shouldBe: true,
                value: rs.start_time_interval.isValid()
            });
            assertEqual({
                name: 'start_time_interval value',
                shouldBe: new GlideDuration(parameterSet.expected.start_time_interval_ms),
                value: rs.start_time_interval
            });
            rs.assignment_group;
        }
    })(outputs, steps, stepResult, assertEqual);
})(constructorTest || (constructorTest = {}));
var normalizationFunctionsTest;
(function (normalizationFunctionsTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        stepResult.setOutputMessage(JSON.stringify(steps('8b4ed58697051110d87839000153afae')));
        var schedule_sys_id = '' + steps('8b4ed58697051110d87839000153afae').sys_id;
        var group_sys_id = '' + steps('f70fd5c697051110d87839000153af81').sys_id;
        for (var _i = 0, _a = [
            { short_description: 'Start: 1m; Duration: inc=1m, min=15m, max=1h', start_time_interval: new GlideDuration(60000),
                duration_increment: new GlideDuration(60000), minimum_duration: new GlideDuration(900000), maximum_duration: new GlideDuration(3600000),
                durations: [
                    { input: new GlideDuration(0), expected: new GlideDuration(900000), returns: 900000 },
                    { input: new GlideDuration(60000), expected: new GlideDuration(900000), returns: 840000 },
                    { input: new GlideDuration(930000), expected: new GlideDuration(960000), returns: 30000 },
                    { input: new GlideDuration(899999), expected: new GlideDuration(900000), returns: 1 },
                    { input: new GlideDuration(900000), expected: new GlideDuration(900000), returns: 0 },
                    { input: new GlideDuration(900001), expected: new GlideDuration(960000), returns: 59999 },
                    { input: new GlideDuration(960000), expected: new GlideDuration(960000), returns: 0 },
                    { input: new GlideDuration(975000), expected: new GlideDuration(1020000), returns: 45000 },
                    { input: new GlideDuration(3600000), expected: new GlideDuration(3600000), returns: 0 }
                ],
                startDates: [
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 59999 },
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 500, expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 59500 },
                    { input: new GlideDateTime('2022-08-02 00:01:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 15:05:30'), offset: 0, expected: new GlideDateTime('2022-08-02 15:06:00'), returns: 30000 },
                    { input: new GlideDateTime('2022-08-02 15:05:00'), offset: 999, expected: new GlideDateTime('2022-08-02 15:06:00'), returns: 1 },
                    { input: new GlideDateTime('2022-08-02 23:59:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:59:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 23:59:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 59999 }
                ]
            },
            { short_description: 'Start: 15m; Duration: inc=1m, min=1m, max=1h', start_time_interval: new GlideDuration(900000),
                duration_increment: new GlideDuration(60000), minimum_duration: new GlideDuration(60000), maximum_duration: new GlideDuration(3600000),
                durations: [
                    { input: new GlideDuration(0), expected: new GlideDuration(60000), returns: 60000 },
                    { input: new GlideDuration(60000), expected: new GlideDuration(60000), returns: 0 },
                    { input: new GlideDuration(90000), expected: new GlideDuration(120000), returns: 30000 },
                    { input: new GlideDuration(59999), expected: new GlideDuration(60000), returns: 1 },
                    { input: new GlideDuration(60000), expected: new GlideDuration(60000), returns: 0 },
                    { input: new GlideDuration(60001), expected: new GlideDuration(120000), returns: 59999 },
                    { input: new GlideDuration(120000), expected: new GlideDuration(120000), returns: 0 },
                    { input: new GlideDuration(135000), expected: new GlideDuration(180000), returns: 45000 },
                    { input: new GlideDuration(3600000), expected: new GlideDuration(3600000), returns: 0 }
                ],
                startDates: [
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 899999 },
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 500, expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 899500 },
                    { input: new GlideDateTime('2022-08-02 00:15:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 15:05:30'), offset: 0, expected: new GlideDateTime('2022-08-02 15:15:00'), returns: 570000 },
                    { input: new GlideDateTime('2022-08-02 15:14:59'), offset: 999, expected: new GlideDateTime('2022-08-02 15:15:00'), returns: 1 },
                    { input: new GlideDateTime('2022-08-02 23:45:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:45:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 23:45:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 899999 }
                ]
            },
            { short_description: 'Start: 30m; Duration: inc=30m, min=30m, max=30m', start_time_interval: new GlideDuration(1800000),
                duration_increment: new GlideDuration(1800000), minimum_duration: new GlideDuration(1800000), maximum_duration: new GlideDuration(1800000),
                durations: [
                    { input: new GlideDuration(0), expected: new GlideDuration(1800000), returns: 1800000 },
                    { input: new GlideDuration(1800000), expected: new GlideDuration(1800000), returns: 0 },
                    { input: new GlideDuration(2700000), expected: new GlideDuration(3600000), returns: 900000 },
                    { input: new GlideDuration(1799999), expected: new GlideDuration(1800000), returns: 1 },
                    { input: new GlideDuration(1800001), expected: new GlideDuration(3600000), returns: 1799999 },
                    { input: new GlideDuration(3600000), expected: new GlideDuration(3600000), returns: 0 },
                    { input: new GlideDuration(4050000), expected: new GlideDuration(5400000), returns: 1350000 }
                ],
                startDates: [
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 1799999 },
                    { input: new GlideDateTime('2022-08-02 00:00:00'), offset: 500, expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 1799500 },
                    { input: new GlideDateTime('2022-08-02 00:30:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 15:15:00'), offset: 0, expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 2700000 },
                    { input: new GlideDateTime('2022-08-02 15:29:59'), offset: 999, expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 1 },
                    { input: new GlideDateTime('2022-08-02 23:30:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:30:00'), returns: 0 },
                    { input: new GlideDateTime('2022-08-02 23:30:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1799999 }
                ]
            }
        ]; _i < _a.length; _i++) {
            var reservationType = _a[_i];
            var gr = new GlideRecord('x_g_inte_site_17_reservation_type');
            gr.setValue('short_description', reservationType.short_description);
            gr.setValue('schedule', schedule_sys_id);
            gr.setValue('assignment_group', group_sys_id);
            gr.setValue('duration_increment', reservationType.duration_increment);
            gr.setValue('minimum_duration', reservationType.minimum_duration);
            gr.setValue('maximum_duration', reservationType.maximum_duration);
            gr.setValue('start_time_interval', reservationType.start_time_interval);
            if (gs.nil(gr.insert()))
                throw new Error("Failed to create test reservation type \"" + reservationType.short_description + "\"");
            var rs = new ReservationScheduler(gr);
            for (var _b = 0, _c = reservationType.durations; _b < _c.length; _b++) {
                var durationParam = _c[_b];
                var target = new GlideDuration(durationParam.input);
                assertEqual({
                    name: 'return value of normalizeDuration(' + durationParam.input.getNumericValue + ' /* + ' + durationParam.input.getDisplayValue() + '; Reservation Type ' + reservationType.short_description + ' */)',
                    shouldBe: durationParam.returns,
                    value: rs.normalizeDuration(target)
                });
                assertEqual({
                    name: 'new duration after normalizeDuration(' + durationParam.input.getNumericValue + ' /* + ' + durationParam.input.getDisplayValue() + '; Reservation Type ' + reservationType.short_description + ' */)',
                    shouldBe: durationParam.expected,
                    value: target
                });
            }
            for (var _d = 0, _e = reservationType.startDates; _d < _e.length; _d++) {
                var dateParam = _e[_d];
                var input = new GlideDateTime(dateParam.input);
                if (dateParam.offset > 0)
                    input.add(dateParam.offset);
                assertEqual({
                    name: 'return value of normalizeStartDate("' + dateParam.input.getDisplayValue() + '" + ' + dateParam.offset + ') /* Reservation Type ' + reservationType.short_description + '*/',
                    shouldBe: dateParam.returns,
                    value: rs.normalizeStartDate(input)
                });
                assertEqual({
                    name: 'new date/time after normalizeStartDate("' + dateParam.input.getDisplayValue() + '" + ' + dateParam.offset + ') /* Reservation Type ' + reservationType.short_description + '*/',
                    shouldBe: dateParam.expected,
                    value: input
                });
            }
        }
    })(outputs, steps, stepResult, assertEqual);
})(normalizationFunctionsTest || (normalizationFunctionsTest = {}));
var getAvailabilitiesInRangeTest;
(function (getAvailabilitiesInRangeTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        // #region Create appointment schedule
        var scheduleGlideRecord = new GlideRecord('cmn_schedule');
        scheduleGlideRecord.newRecord();
        scheduleGlideRecord.setValue('name', 'Test Appointment Schedule');
        if (gs.nil(scheduleGlideRecord.insert()))
            throw new Error("Failed to create test appointment schedule");
        // #endregion
        // #region Create and add child schedule
        var childScheduleGlideRecord = new GlideRecord('cmn_schedule');
        childScheduleGlideRecord.newRecord();
        childScheduleGlideRecord.setValue('name', 'Test Holiday Schedule');
        if (gs.nil(childScheduleGlideRecord.insert()))
            throw new Error("Failed to create test child schedule");
        var gr = new GlideRecord('cmn_other_schedule');
        gr.newRecord();
        gr.setValue('child_schedule', childScheduleGlideRecord);
        gr.setValue('schedule', scheduleGlideRecord);
        gr.setValue('type', 'include');
        if (gs.nil(gr.insert()))
            throw new Error("Failed to create child schedule relationship");
        // #endregion
        // Create "zero" date/time to today at 00:00
        var dhz = new GlideDateTime();
        dhz.setDisplayValue(dhz.getDate().getDisplayValue() + ' 00:00:00');
        // #region Add recurring entry for off-hours 16:00:00 to 09:00:00 the following day
        gr = new GlideRecord('cmn_schedule_span');
        gr.newRecord();
        gr.setValue('schedule', scheduleGlideRecord);
        gr.setValue('all_day', false);
        gr.setValue('name', 'Off Hours');
        gr.setValue('repeat_type', 'daily');
        gr.setValue('show_as', 'busy');
        var dateTime = new GlideDateTime(dhz);
        dateTime.setDisplayValue(dateTime.getDate().getDisplayValue() + ' 16:00:00');
        gr.setValue('start_date_time', new GlideScheduleDateTime(dateTime).getValue());
        dateTime.addDaysLocalTime(1);
        dateTime.setDisplayValue(dateTime.getDate().getDisplayValue() + ' 09:00:00');
        gr.setValue('end_date_time', new GlideScheduleDateTime(dateTime).getValue());
        if (gs.nil(gr.insert()))
            throw new Error("Failed to create off-hours schedule entry");
        // #endregion
        // #region Add single entry for holiday day after tomorrow from 00:00:00 to 23:59:59
        gr = new GlideRecord('cmn_schedule_span');
        gr.newRecord();
        gr.setValue('schedule', childScheduleGlideRecord);
        gr.setValue('all_day', true);
        gr.setValue('name', 'Party Time');
        gr.setValue('repeat_type', 'yearly');
        gr.setValue('show_as', 'busy');
        gr.setValue('type', 'exclude');
        dateTime.addDaysLocalTime(1);
        dateTime.setDisplayValue(dateTime.getDate().getDisplayValue() + ' 00:00:00');
        gr.setValue('start_date_time', new GlideScheduleDateTime(dateTime).getValue());
        dateTime.setDisplayValue(dateTime.getDate().getDisplayValue() + ' 23:59:59');
        gr.setValue('end_date_time', new GlideScheduleDateTime(dateTime).getValue());
        if (gs.nil(gr.insert()))
            throw new Error("Failed to create holiday schedule entry");
        // #endregion
        // Shift "zero" date to tomorrow
        dhz.setDisplayValue(dhz.getDate().getDisplayValue() + ' 00:00:00');
        dhz.addDaysLocalTime(1);
        // #region Add appointments for tomorrow
        var appointmentTimes = [
            { name: 'First Appointment', start: new GlideTime(60300000) /* 11:45 */, duration: new GlideDuration('00:15:00') },
            { name: 'Second Appointment', start: new GlideTime(61200000) /* 12:00 */, duration: new GlideDuration('00:15:00') },
            { name: 'Third Appointment', start: new GlideTime(63900000) /* 12:45:00 */, duration: new GlideDuration('00:45:00') } // 12:45 - 13:30
        ];
        for (var _i = 0, appointmentTimes_1 = appointmentTimes; _i < appointmentTimes_1.length; _i++) {
            var a = appointmentTimes_1[_i];
            gr = new GlideRecord('cmn_schedule_span');
            gr.newRecord();
            gr.setValue('schedule', scheduleGlideRecord);
            gr.setValue('all_day', false);
            gr.setValue('name', a.name);
            gr.setValue('show_as', 'busy');
            dateTime = new GlideDateTime(dhz);
            dateTime.add(a.start);
            gr.setValue('start_date_time', new GlideScheduleDateTime(dateTime).getValue());
            dateTime.add(a.duration);
            gr.setValue('end_date_time', new GlideScheduleDateTime(dateTime).getValue());
            gr.setValue('type', 'appointment');
            if (gs.nil(gr.insert()))
                throw new Error("Failed to create appointment schedule entry \"" + a.name + "\"");
        }
        // #endregion
        stepResult.setFailed();
    })(outputs, steps, stepResult, assertEqual);
})(getAvailabilitiesInRangeTest || (getAvailabilitiesInRangeTest = {}));
//# sourceMappingURL=ReservationSchedulerTest.js.map