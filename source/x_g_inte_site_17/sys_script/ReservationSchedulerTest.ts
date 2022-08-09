namespace constructorTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;

    interface IConstructorParameterSet {
        allowInactive?: boolean;
        timeZone?: string;
        expectedTimeZone: string;
        getExpectedErrorMessage?: { (sys_id: string, short_description: string, pv: IReservationTypeInputParameters): string; }
    }

    interface IReservationTypeParameterValues {
        short_description: string;
        minimum_duration_ms: number;
        maximum_duration_ms: number;
        duration_increment_ms: number;
        start_time_interval_ms: number;
    }
    
    interface IReservationTypeInputParameters extends IReservationTypeParameterValues {
        approval_group_empty: boolean;
        inactive: boolean;
    }

    interface IReservationTypeParameterSet {
        parameters: IReservationTypeInputParameters
        expected: IReservationTypeParameterValues;
        constructorParameterSets: IConstructorParameterSet[];
    }

    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc) {
        var schedule_sys_id: string;
        var approval_group_sys_id: string;
        var assignment_group_sys_id: string;
        try {
            var testResult = steps('8b4ed58697051110d87839000153afae');
            if (gs.nil(testResult)) throw new Error("Could not find step results with Sys ID '8b4ed58697051110d87839000153afae'");
            schedule_sys_id = <string>testResult.sys_id;
            if (gs.nil(schedule_sys_id)) throw new Error("Schedule Sys ID not present in results from step with Sys ID '8b4ed58697051110d87839000153afae'");
            testResult = steps('cf4c1e1a97411110d87839000153aff6');
            if (gs.nil(testResult)) throw new Error("Could not find step results with Sys ID 'cf4c1e1a97411110d87839000153aff6'");
            approval_group_sys_id = <string>testResult.sys_id;
            if (gs.nil(approval_group_sys_id)) throw new Error("Approval Group Sys ID not present in results from step with Sys ID '8b4ed58697051110d87839000153afae'");
            testResult = steps('f70fd5c697051110d87839000153af81');
            if (gs.nil(testResult)) throw new Error("Could not find step results with Sys ID 'f70fd5c697051110d87839000153af81'");
            assignment_group_sys_id = <string>testResult.sys_id;
            if (gs.nil(assignment_group_sys_id)) throw new Error("Assignment Group Sys ID not present in results from step with Sys ID '8b4ed58697051110d87839000153afae'");
        } catch (e) {
            AtfHelper.setFailed(stepResult, "Unable to get data from previous steps", e);
            return;
        }
        var defaultTimeZone: string;
        try { defaultTimeZone = gs.getSession().getTimeZoneName(); }
        catch (e) {
            AtfHelper.setFailed(stepResult, "Unexpected exception while getting time zone", e);
            return;
        }
        if (gs.nil(defaultTimeZone)) {
            AtfHelper.setFailed(stepResult, "Could not determine default time zone");
            return;
        }
        var altTimeZone: string = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        var gdt = new GlideDateTime();
        var altTzOffset = new GlideDateTime(new GlideScheduleDateTime(gdt).convertTimeZone(defaultTimeZone, altTimeZone)).getNumericValue() - gdt.getNumericValue();
        function getExpectedInactiveTypeErrorMessage(sys_id: string, short_description: string, pv: IReservationTypeInputParameters): string {
            return "Reservation Type \"" + short_description + "\" (" + sys_id + ") is inactive."
        }
        var parameterSetArray: IReservationTypeParameterSet[] = [
            {
                parameters: {
                    short_description: 'Reservation Type #1',
                    minimum_duration_ms: 60000, // 1 Minute
                    maximum_duration_ms: 3600000, // 1 Hour
                    duration_increment_ms: 900000, // 15 Minutes
                    start_time_interval_ms: 1800000, // 30 minutes
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
                    minimum_duration_ms: 60000, // 1 minute
                    maximum_duration_ms: 3600000, // 1 Hour
                    duration_increment_ms: 359999, // 1 Hour minus 1 ms
                    start_time_interval_ms: 3600000, // 1 Hour
                    approval_group_empty: false,
                    inactive: true,
                },
                expected: {
                    short_description: 'Reservation Type #2',
                    minimum_duration_ms: 3600000, // 1 Hour
                    maximum_duration_ms: 3600000, // 1 Hour
                    duration_increment_ms: 3600000, // 1 Hour
                    start_time_interval_ms: 3600000, // 1 Hour
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
                    minimum_duration_ms: 1260000, // 1 Hour, 15 minutes
                    maximum_duration_ms: 10800000, // 3 Hours
                    duration_increment_ms: 1800000, // 30 minutes
                    start_time_interval_ms: 8400001, // 14 Minutes plus one second
                    approval_group_empty: true,
                    inactive: false
                },
                expected: {
                    short_description: 'Reservation Type #3',
                    minimum_duration_ms: 2160000, // Round up to 1:30 IAW duration increment
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
                    minimum_duration_ms: 900000, // 15 Minutes
                    maximum_duration_ms: 11520000, // 3 Hours, 12 minutes
                    duration_increment_ms: 60000, // 1 Minute
                    start_time_interval_ms: 3600000, // 1 Hour
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
        for (var parameterSet of parameterSetArray) {
            var gr = new GlideRecord('x_g_inte_site_17_reservation_type');
            try {
                gr.setValue('short_description', parameterSet.parameters.short_description);
                gr.setValue('schedule', schedule_sys_id);
                gr.setValue('assignment_group', assignment_group_sys_id);
                if (!parameterSet.parameters.approval_group_empty)
                    gr.setValue('approval_group', approval_group_sys_id);
                gr.setValue('duration_increment',  new GlideDuration(parameterSet.parameters.duration_increment_ms));
                gr.setValue('minimum_duration', new GlideDuration(parameterSet.parameters.minimum_duration_ms));
                gr.setValue('maximum_duration', new GlideDuration(parameterSet.parameters.maximum_duration_ms));
                gr.setValue('start_time_interval', new GlideDuration(parameterSet.parameters.start_time_interval_ms));
                if (gs.nil(gr.insert())) throw new Error("Failed to create test reservation type \"" + parameterSet.parameters.short_description + "\"");
            } catch (e) {
                AtfHelper.setFailed(stepResult, "Unable to insert test Reservation Type", e);
                return;
            }
            var rs: ReservationScheduler;
            try { rs = new ReservationScheduler(<reservationTypeGlideRecord>gr); } catch (e) {
                AtfHelper.setFailed(stepResult, "Unable to create instance of ReservationScheduler", e);
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
            rs.assignment_group
        }
    })(outputs, steps, stepResult, assertEqual);
}

namespace normalizationFunctionsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    
    interface IReservationTypeParameterSet {
        short_description: string;
        minimum_duration: GlideDuration;
        maximum_duration: GlideDuration;
        duration_increment: GlideDuration;
        start_time_interval: GlideDuration;
    }

    interface ITestAppointmentTime {
        name: string;
        start: GlideTime;
        duration: GlideDuration;
    }
    
    interface ITestScheduleEntry extends ITestAppointmentTime {
        all_day: boolean;
        start_offset: GlideDuration;
        end_offset: GlideDuration;
        show_as: string;
    }
    interface IScheduleDefinitionParameterSet {
        name: string;
        time_zone?: string;
        reservationTypes: IReservationTypeParameterSet[];
        entries: ITestScheduleEntry[];
    }

    interface IInputAndExpected<T, U> {
        input: T;
        expected: U;
    }
    
    interface INormalizationFunctionsParameterSet extends IReservationTypeParameterSet {
        durations: (IInputAndExpected<GlideDuration, GlideDuration> & { returns: number })[];
        startDates: (IInputAndExpected<GlideDateTime, GlideDateTime> & { offset: number; returns: number })[];
    }

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc) {
        var schedule_sys_id = '' + steps('8b4ed58697051110d87839000153afae').sys_id;
        var group_sys_id = '' + steps('f70fd5c697051110d87839000153af81').sys_id;
        
        for (var reservationType of <INormalizationFunctionsParameterSet[]>[
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
                    { input: new GlideDuration(1800000), expected: new GlideDuration(1800000), returns: 0},
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
        ]) {
            var rs: ReservationScheduler;
            var gr: GlideRecord | undefined;
            try {
                gr = new GlideRecord('x_g_inte_site_17_reservation_type');
                gr.setValue('short_description', reservationType.short_description);
                gr.setValue('schedule', schedule_sys_id);
                gr.setValue('assignment_group', group_sys_id);
                gr.setValue('duration_increment', reservationType.duration_increment);
                gr.setValue('minimum_duration', reservationType.minimum_duration);
                gr.setValue('maximum_duration', reservationType.maximum_duration);
                gr.setValue('start_time_interval', reservationType.start_time_interval);
                if (gs.nil(gr.insert()))
                    gr = undefined;
            } catch (e) {
                AtfHelper.setFailed(stepResult, "Unexpected exception while adding test reservation type \"" + reservationType.short_description + "\"", e);
                return;
            }
            if (gs.nil(gr)) {
                AtfHelper.setFailed(stepResult, "Failed to add test reservation type \"" + reservationType.short_description + "\"");
                return;
            }
            try { rs = new ReservationScheduler(<reservationTypeGlideRecord>gr); }
            catch (e) {
                AtfHelper.setFailed(stepResult, "Unexpected exception while initializing ReservationScheduler from type \"" + reservationType.short_description + "\"", e);
                return;
            }
            var value: number;
            var msg: string;
            for (var durationParam of reservationType.durations) {
                var target = new GlideDuration(durationParam.input);
                msg = 'normalizeDuration(' + durationParam.input.getNumericValue + ' /* + ' + durationParam.input.getDisplayValue() + '; Reservation Type ' + reservationType.short_description + ' */)';
                try { value = rs.normalizeDuration(target); }
                catch (e) {
                    AtfHelper.setFailed(stepResult, "Unexpected exception while testing ReservationScheduler." + msg, e);
                    return;
                }
                assertEqual({
                    name: 'return value of ' + msg,
                    shouldBe: durationParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new duration after ' + msg,
                    shouldBe: durationParam.expected,
                    value: target
                });
            }
            for (var dateParam of reservationType.startDates) {
                var input = new GlideDateTime(dateParam.input);
                if (dateParam.offset > 0) input.add(dateParam.offset);
                msg = 'normalizeStartDate("' + dateParam.input.getDisplayValue() + '" + ' + dateParam.offset + ') /* Reservation Type ' + reservationType.short_description + '*/';
                try { value = rs.normalizeStartDate(input); }
                catch (e) {
                    AtfHelper.setFailed(stepResult, "Unexpected exception while testing ReservationScheduler." + msg, e);
                    return;
                }
                assertEqual({
                    name: 'return value of ' + msg,
                    shouldBe: dateParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new date/time after ' + msg,
                    shouldBe: dateParam.expected,
                    value: input
                });
            }
        }
    })(outputs, steps, stepResult, assertEqual);
}

namespace getAvailabilitiesInRangeTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    
    interface IReservationTypeParameterSet {
        short_description: string;
        minimum_duration: GlideDuration;
        maximum_duration: GlideDuration;
        duration_increment: GlideDuration;
        start_time_interval: GlideDuration;
    }
    interface ITestAppointmentTime {
        name: string;
        start: GlideTime;
        duration: GlideDuration;
    }
    
    interface ITestScheduleEntry extends ITestAppointmentTime {
        all_day: boolean;
        start_offset: GlideDuration;
        end_offset: GlideDuration;
        show_as: string;
    }
    interface IScheduleDefinitionParameterSet {
        name: string;
        time_zone?: string;
        reservationTypes: IReservationTypeParameterSet[];
        entries: ITestScheduleEntry[];
    }

    interface IInputAndExpected<T, U> {
        input: T;
        expected: U;
    }
    
    interface INormalizationFunctionsParameterSet extends IReservationTypeParameterSet {
        durations: (IInputAndExpected<GlideDuration, GlideDuration> & { returns: number })[];
        startDates: (IInputAndExpected<GlideDateTime, GlideDateTime> & { offset: number; returns: number })[];
    }

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc) {
        var schedule_sys_id = '' + steps('8b4ed58697051110d87839000153afae').sys_id;

        // Create "zero" date/time to tomorrow at 00:00
        var dhz: GlideDateTime = new GlideDateTime();
        dhz.setDisplayValue(dhz.getDate().getDisplayValue() + ' 00:00:00');
        dhz.addDaysLocalTime(1);

        var appointmentTimes: ITestAppointmentTime[] = [
            { name: 'First Appointment', start: new GlideTime(60300000) /* 11:45 */, duration: new GlideDuration('00:15:00') },   // 11:45 - 12:00
            { name: 'Second Appointment', start: new GlideTime(61200000) /* 12:00 */, duration: new GlideDuration('00:15:00') },  // 12:00 - 12:15
            { name: 'Third Appointment', start: new GlideTime(63900000) /* 12:45:00 */, duration: new GlideDuration('00:45:00') } // 12:45 - 13:30
        ];
        for (var a of appointmentTimes) {
            // TODO: Do tests
        }
    })(outputs, steps, stepResult, assertEqual);
}