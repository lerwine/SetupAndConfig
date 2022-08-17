"use strict";
var constructorTest;
(function (constructorTest) {
    // Insert Reservation Schedule
    // {
    //     sys_id: '8b4ed58697051110d87839000153afae',
    //     table: 'cmn_schedule'
    //     fields: {
    //         sys_scope: 'e8149ae51b7681101497a820f54bcbbd',
    //         name: 'Test Schedule'
    //     }
    // }
    // Insert Assignment Group 
    // {
    //     sys_id: 'f70fd5c697051110d87839000153af81',
    //     table: 'sys_user_group'
    //     fields: {
    //         name: 'Test Assignment Group',
    //         type: '1cb8ab9bff500200158bffffffffff62',
    //         roles: 'itil'
    //     }
    // }
    // Insert Approval Group
    // {
    //     sys_id: 'cf4c1e1a97411110d87839000153aff6',
    //     table: 'sys_user_group'
    //     fields: {
    //         name: 'Test Approval group',
    //         type: '1cb8ab9bff500200158bffffffffff62',
    //         roles: 'itil'
    //     }
    // }
    // Create child schedule
    // {
    //     sys_id: '07f5e19897d11110d87839000153af81',
    //     table: 'cmn_schedule'
    //     fields: {
    //         sys_scope: 'e8149ae51b7681101497a820f54bcbbd',
    //         name: 'Test Holiday Schedule'
    //     }
    // }
    // Add child schedule
    // {
    //     sys_id: '5756a15497d11110d87839000153af8a',
    //     table: 'cmn_other_schedule'
    //     fields: {
    //         child_schedule: atfHelper.getRecordIdFromStep('07f5e19897d11110d87839000153af81'),
    //         schedule: atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae'),
    //         type: 'include'
    //     }
    // }
    // sys_id: c1cc9ada97411110d87839000153afcd
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id = atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        if (gs.nil(schedule_sys_id) || gs.nil(approval_group_sys_id) || gs.nil(assignment_group_sys_id))
            return;
        var defaultTimeZone;
        try {
            defaultTimeZone = gs.getSession().getTimeZoneName();
        }
        catch (e) {
            defaultTimeZone = '';
            atfHelper.setFailed("Unexpected exception while getting time zone", e);
        }
        if (gs.nil(defaultTimeZone)) {
            atfHelper.setFailed("Could not determine default time zone");
        }
        outputs.defaultTimeZone = defaultTimeZone;
        var altTimeZone = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        outputs.altTimeZone = altTimeZone;
        function getExpectedInactiveTypeErrorMessage(sys_id, ps) {
            return "Reservation Type \"" + ps.short_description + "\" (" + sys_id + ", " + JSON.stringify(ps.constructorParameterSets) + ") is inactive.";
        }
        var parameterSetArray = [
            {
                test_description: "All values round up",
                step_sys_id: '6e6da91297191110d87839000153afb5',
                // start_time_interval: gs.getDurationDate('0 0:0:0'),
                // duration_increment: gs.getDurationDate('0 0:14:1'),
                // minimum_duration: gs.getDurationDate('0 0:0:1'),
                // maximum_duration: gs.getDurationDate('0 1:0:54')
                short_description: 'SInt: 00:01:00; Dur: inc=00:15:00, min=00:15:00, max=01:00:00',
                start_time_interval: new GlideDuration('0 0:1:0'),
                duration_increment: new GlideDuration('0 0:15:0'),
                minimum_duration: new GlideDuration('0 0:15:0'),
                maximum_duration: new GlideDuration('0 1:0:0'),
                inactive: false,
                approval_group_empty: true,
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
                test_description: "Min 1 MS less than 1 Hour",
                step_sys_id: '2d00fd9297191110d87839000153af3b',
                // start_time_interval: gs.getDurationDate('0 0:59:1'),
                // duration_increment: gs.getDurationDate('0 0:59:59'),
                // minimum_duration: gs.getDurationDate('0 0:59:0'),
                // maximum_duration: gs.getDurationDate('0 1:0:0')
                short_description: 'SInt: 01:00:00; Dur: inc=01:00:00, min=01:00:00, max=01:00:00',
                start_time_interval: new GlideDuration('0 1:0:0'),
                duration_increment: new GlideDuration('0 1:0:0'),
                minimum_duration: new GlideDuration('0 1:0:0'),
                maximum_duration: new GlideDuration('0 1:0:0'),
                inactive: false,
                approval_group_empty: false,
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
                test_description: "Inactive & Max 1 MS beyond 58 minutes",
                step_sys_id: '26c03d1297191110d87839000153afad',
                // start_time_interval: gs.getDurationDate('0 0:30:0'),
                // duration_increment: gs.getDurationDate('0 0:15:0'),
                // minimum_duration: gs.getDurationDate('0 0:1:0'),
                // maximum_duration: gs.getDurationDate('0 0:58:1')
                short_description: 'SInt: 00:30:00; Dur: inc=00:15:00, min=00:15:00, max=00:45:00',
                start_time_interval: new GlideDuration('0 0:30:0'),
                duration_increment: new GlideDuration('0 0:15:0'),
                minimum_duration: new GlideDuration('0 0:15:0'),
                maximum_duration: new GlideDuration('0 0:45:0'),
                inactive: false,
                approval_group_empty: true,
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
                test_description: "Min and Max rounds up to nearest 30-minute",
                step_sys_id: '5071bdd297191110d87839000153afee',
                // start_time_interval: gs.getDurationDate('0 0:15:0'),
                // duration_increment: gs.getDurationDate('0 0:30:0'),
                // minimum_duration: gs.getDurationDate('0 0:15:0'),
                // maximum_duration: gs.getDurationDate('0 2:30:1')
                short_description: 'SInt: 00:15:00; Dur: inc=00:30:00, min=00:30:00, max=02:30:00, inactive=true',
                start_time_interval: new GlideDuration('0 0:15:0'),
                duration_increment: new GlideDuration('0 0:30:0'),
                minimum_duration: new GlideDuration('0 1:30:0'),
                maximum_duration: new GlideDuration('0 2:30:0'),
                inactive: true,
                approval_group_empty: true,
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
                test_description: "No values rounded",
                step_sys_id: 'a122fdd297191110d87839000153af66',
                // start_time_interval: gs.getDurationDate('0 1:0:0'),
                // duration_increment: gs.getDurationDate('0 0:1:0'),
                // minimum_duration: gs.getDurationDate('0 0:1:0'),
                // maximum_duration: gs.getDurationDate('0 3:12:0')
                short_description: 'SInt: 01:00:00; Dur: inc=00:01:00, min=00:01:00, max=03:12:00',
                start_time_interval: new GlideDuration('0 1:0:0'),
                duration_increment: new GlideDuration('0 0:1:0'),
                minimum_duration: new GlideDuration('0 0:1:0'),
                maximum_duration: new GlideDuration('0 3:12:0'),
                inactive: false,
                approval_group_empty: true,
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
                test_description: "Round duration increment up",
                step_sys_id: 'b4f80e5e97191110d87839000153af9e',
                // start_time_interval: gs.getDurationDate('0 1:0:0'),
                // duration_increment: gs.getDurationDate('0 0:14:1'),
                // minimum_duration: gs.getDurationDate('0 0:15:0'),
                // maximum_duration: gs.getDurationDate('0 1:0:0')
                short_description: 'SInt: 01:00:00; Dur: inc=00:15:00, min=00:15:00, max=01:00:00',
                start_time_interval: new GlideDuration('0 1:0:0'),
                duration_increment: new GlideDuration('0 0:15:0'),
                minimum_duration: new GlideDuration('0 0:15:0'),
                maximum_duration: new GlideDuration('0 1:0:0'),
                inactive: false,
                approval_group_empty: true,
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
            }
        ];
        var outputItems = {};
        for (var _i = 0, parameterSetArray_1 = parameterSetArray; _i < parameterSetArray_1.length; _i++) {
            var parameterSet = parameterSetArray_1[_i];
            outputItems[parameterSet.short_description] = {
                minimum_duration: parameterSet.minimum_duration.getDurationValue(),
                maximum_duration: parameterSet.maximum_duration.getDurationValue(),
                duration_increment: parameterSet.duration_increment.getDurationValue(),
                start_time_interval: parameterSet.start_time_interval.getDurationValue(),
                approval_group_empty: parameterSet.approval_group_empty,
                inactive: parameterSet.inactive,
                sys_id: '' + parameterSet.step_sys_id
            };
            var rs;
            for (var _a = 0, _b = parameterSet.constructorParameterSets; _a < _b.length; _a++) {
                var cps = _b[_a];
                var cDesc = JSON.stringify(cps);
                try {
                    if (gs.nil(cps.timeZone)) {
                        if (gs.nil(cps.allowInactive))
                            rs = new x_g_inte_site_17.ReservationScheduler(parameterSet.step_sys_id);
                        else
                            rs = new x_g_inte_site_17.ReservationScheduler(parameterSet.step_sys_id, cps.allowInactive);
                    }
                    else
                        rs = new x_g_inte_site_17.ReservationScheduler(parameterSet.step_sys_id, cps.allowInactive, cps.timeZone);
                }
                catch (e) {
                    if (gs.nil(cps.getExpectedErrorMessage)) {
                        atfHelper.setFailed('Unable to create instance of ReservationScheduler for ' + parameterSet.test_description, e) + ' of ' + cDesc;
                        return;
                    }
                    assertEqual({
                        name: 'Error Message from ' + parameterSet.test_description + ' of ' + cDesc,
                        shouldBe: cps.getExpectedErrorMessage(parameterSet.step_sys_id, parameterSet),
                        value: e.message
                    });
                    continue;
                }
                assertEqual({
                    name: 'timeZone not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.timeZone)
                });
                assertEqual({
                    name: 'short_description value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.short_description,
                    value: rs.timeZone
                });
                assertEqual({
                    name: 'short_description not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.short_description)
                });
                assertEqual({
                    name: 'short_description value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.short_description,
                    value: rs.short_description
                });
                assertEqual({
                    name: 'schedule not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.schedule)
                });
                assertEqual({
                    name: 'assignment_group not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.assignment_group)
                });
                assertEqual({
                    name: 'assignment_group value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: assignment_group_sys_id,
                    value: rs.assignment_group
                });
                if (parameterSet.approval_group_empty)
                    assertEqual({
                        name: 'approval_group nil for ' + parameterSet.test_description + ' of ' + cDesc,
                        shouldBe: true,
                        value: gs.nil(rs.approval_group)
                    });
                else {
                    assertEqual({
                        name: 'approval_group not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                        shouldBe: false,
                        value: gs.nil(rs.approval_group)
                    });
                    assertEqual({
                        name: 'approval_group value for ' + parameterSet.test_description + ' of ' + cDesc,
                        shouldBe: approval_group_sys_id,
                        value: rs.approval_group
                    });
                }
                assertEqual({
                    name: 'duration_increment not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.duration_increment)
                });
                assertEqual({
                    name: 'duration_increment is valid for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: true,
                    value: rs.duration_increment.isValid()
                });
                assertEqual({
                    name: 'duration_increment value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.duration_increment,
                    value: rs.duration_increment
                });
                assertEqual({
                    name: 'minimum_duration not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.minimum_duration)
                });
                assertEqual({
                    name: 'minimum_duration is valid for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: true,
                    value: rs.minimum_duration.isValid()
                });
                assertEqual({
                    name: 'minimum_duration value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.minimum_duration,
                    value: rs.minimum_duration
                });
                assertEqual({
                    name: 'maximum_duration not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.maximum_duration)
                });
                assertEqual({
                    name: 'maximum_duration is valid for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: true,
                    value: rs.maximum_duration.isValid()
                });
                assertEqual({
                    name: 'maximum_duration value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.maximum_duration,
                    value: rs.maximum_duration
                });
                assertEqual({
                    name: 'start_time_interval not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.start_time_interval)
                });
                assertEqual({
                    name: 'start_time_interval is valid for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: true,
                    value: rs.start_time_interval.isValid()
                });
                assertEqual({
                    name: 'start_time_interval value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.start_time_interval,
                    value: rs.start_time_interval
                });
            }
        }
        outputs.types = JSON.stringify(outputItems);
    })(outputs, steps, stepResult, assertEqual);
})(constructorTest || (constructorTest = {}));
var normalizationFunctionsTest;
(function (normalizationFunctionsTest) {
    (function (outputs, steps, stepResult, assertEqual) {
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var group_sys_id = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        var constructorOutputs = steps('c1cc9ada97411110d87839000153afcd');
        if (gs.nil(schedule_sys_id) || gs.nil(group_sys_id) || gs.nil(constructorOutputs))
            return;
        var outputItems = JSON.parse(constructorOutputs.types);
        var testParameters = {
            // step_sys_id: '6e6da91297191110d87839000153afb5',
            // start_time_interval: gs.getDurationDate('0 0:0:0'),
            // duration_increment: gs.getDurationDate('0 0:14:1'),
            // minimum_duration: gs.getDurationDate('0 0:0:1'),
            // maximum_duration: gs.getDurationDate('0 1:0:54')
            'SInt: 00:01:00; Dur: inc=00:15:00, min=00:15:00, max=01:00:00': {
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:15:0'), returns: 900000 },
                    { test_description: "[1S]=15M (+14M59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:15:0'), returns: 899000 },
                    { test_description: "[1M]=15M (+14M)", input: new GlideDuration('0 0:1:0'), expected: new GlideDuration('0 0:15:0'), returns: 840000 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration('0 7:30:0'), expected: new GlideDuration('0 0:15:0'), returns: 450000 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:15:0'), returns: 0 },
                    { test_description: "[15M1S]=30M (+29S)", input: new GlideDuration('0 0:15:1'), expected: new GlideDuration('0 0:30:0'), returns: 29000 },
                    { test_description: "[29M59S]=30M (+1S)", input: new GlideDuration('0 0:29:59'), expected: new GlideDuration('0 0:30:0'), returns: 1000 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 0 },
                    { test_description: "[59M1S]=2H (+59S)", input: new GlideDuration('0 0:59:1'), expected: new GlideDuration('0 1:00:0'), returns: 59000 },
                    { test_description: "[45M]=45M (+0S)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 0:45:0'), returns: 0 },
                    { test_description: "[59M59S]=1H (+1S)", input: new GlideDuration('0 0:59:59'), expected: new GlideDuration('0 1:0:0'), returns: 1000 },
                    { test_description: "[1H1S]=1H (no round up)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[1H15M1S]=1H (no round up)", input: new GlideDuration('0 1:15:1'), expected: new GlideDuration('0 1:0:0'), returns: 0 }
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:01]=2022-08-02 00:01:00 (+59S)", input: new GlideDateTime('2022-08-02 00:00:01'), expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 59000 },
                    { test_description: "[2022-08-02 00:00:30]=2022-08-02 00:01:00 (+30S)", input: new GlideDateTime('2022-08-02 00:00:30'), expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 30000 },
                    { test_description: "[2022-08-02 00:00:59]=2022-08-02 00:01:00 (+1S)", input: new GlideDateTime('2022-08-02 00:00:59'), expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 1000 },
                    { test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)", input: new GlideDateTime('2022-08-02 14:59:59'), expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 15:01:00]=2022-08-02 15:01:00 (+0S)", input: new GlideDateTime('2022-08-02 15:01:00'), expected: new GlideDateTime('2022-08-02 15:01:00'), returns: 0 },
                    { test_description: "[2022-08-02 15:01:01]=2022-08-02 15:02:00 (+59S)", input: new GlideDateTime('2022-08-02 15:01:01'), expected: new GlideDateTime('2022-08-02 15:02:00'), returns: 59000 },
                    { test_description: "[2022-08-02 23:59:00]=2022-08-02 23:59:00 (+0S)", input: new GlideDateTime('2022-08-02 23:59:00'), expected: new GlideDateTime('2022-08-02 23:59:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:59:01]=2022-08-03 00:00:00 (+59S)", input: new GlideDateTime('2022-08-02 23:59:01'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 59000 },
                    { test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)", input: new GlideDateTime('2022-08-02 23:59:59'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1000 }
                ]
            },
            // step_sys_id: 'a122fdd297191110d87839000153af66',
            // start_time_interval: gs.getDurationDate('0 1:0:0'),
            // duration_increment: gs.getDurationDate('0 0:1:0'),
            // minimum_duration: gs.getDurationDate('0 0:1:0'),
            // maximum_duration: gs.getDurationDate('0 3:12:0')'
            'SInt: 01:00:00; Dur: inc=00:01:00, min=00:01:00, max=03:12:00': {
                durations: [
                    { test_description: "[0S]=1M (+1M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:1:0'), returns: 60000 },
                    { test_description: "[1S]=1M (+59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:1:0'), returns: 59000 },
                    { test_description: "[1H]=1H (+0S)", input: new GlideDuration('0 1:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[1M]=1M (+0S)", input: new GlideDuration('0 0:1:0'), expected: new GlideDuration('0 0:1:0'), returns: 0 },
                    { test_description: "[30S]=1M (+30S)", input: new GlideDuration('0 0:0:30'), expected: new GlideDuration('0 0:1:0'), returns: 30000 },
                    { test_description: "[1M1S]=2M (+59S)", input: new GlideDuration('0 0:1:1'), expected: new GlideDuration('0 0:2:0'), returns: 59000 },
                    { test_description: "[1M59S]=2M (+1S)", input: new GlideDuration('0 0:1:59'), expected: new GlideDuration('0 0:2:0'), returns: 1000 },
                    { test_description: "[2M]=2M (+0S)", input: new GlideDuration('0 0:2:0'), expected: new GlideDuration('0 0:2:0'), returns: 0 },
                    { test_description: "[3H11M1S]=3H12M (+59S)", input: new GlideDuration('0 3:11:1'), expected: new GlideDuration('0 3:12:0'), returns: 59000 },
                    { test_description: "[3H11M]=3H11M (+0S)", input: new GlideDuration('0 3:11:0'), expected: new GlideDuration('0 3:11:0'), returns: 0 },
                    { test_description: "[3H11M59S]=3H12M (+1S)", input: new GlideDuration('0 3:11:59'), expected: new GlideDuration('0 3:12:0'), returns: 1000 },
                    { test_description: "[3H12M]=3H12M (+0S)", input: new GlideDuration('0 3:12:0'), expected: new GlideDuration('0 3:12:0'), returns: 0 },
                    { test_description: "[3H12M1S]=3H12M (no round up)", input: new GlideDuration('0 3:12:1'), expected: new GlideDuration('0 3:12:0'), returns: 0 }
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:01]=2022-08-02 01:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 00:00:01'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 00:30:00]=2022-08-02 01:00:00 (+30M)", input: new GlideDateTime('2022-08-02 00:30:00'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1800000 },
                    { test_description: "[2022-08-02 00:59:59]=2022-08-02 01:00:00 (+1S)", input: new GlideDateTime('2022-08-02 00:59:59'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)", input: new GlideDateTime('2022-08-02 14:59:59'), expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 16:00:00]=2022-08-02 16:00:00 (+0S)", input: new GlideDateTime('2022-08-02 16:00:00'), expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 16:00:01]=2022-08-02 17:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 16:00:01'), expected: new GlideDateTime('2022-08-02 17:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 23:00:00]=2022-08-02 23:00:00 (+0S)", input: new GlideDateTime('2022-08-02 23:00:00'), expected: new GlideDateTime('2022-08-02 23:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:00:01]=2022-08-03 00:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 23:00:01'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)", input: new GlideDateTime('2022-08-02 23:59:59'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1000 }
                ]
            },
            // step_sys_id: '2d00fd9297191110d87839000153af3b',
            // start_time_interval: gs.getDurationDate('0 0:59:1'),
            // duration_increment: gs.getDurationDate('0 0:59:59'),
            // minimum_duration: gs.getDurationDate('0 0:59:0'),
            // maximum_duration: gs.getDurationDate('0 1:0:0')
            "SInt: 01:00:00; Dur: inc=01:00:00, min=01:00:00, max=01:00:00": {
                durations: [
                    { test_description: "[0S]=1H (+1H)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 3600000 },
                    { test_description: "[1S]=1H (+59M59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 1:0:0'), returns: 3599000 },
                    { test_description: "[1H]=1H (+0S)", input: new GlideDuration('0 1:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[30M]=1H (+30M)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 1:0:0'), returns: 1800000 },
                    { test_description: "[1H1S]=1H (no round up)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[1H59M59S]=1H (no round up)", input: new GlideDuration('0 1:59:59'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[2H]=1H (no round up)", input: new GlideDuration('0 2:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[59M59S]=1H (+1S)", input: new GlideDuration('0 0:59:59'), expected: new GlideDuration('0 1:0:0'), returns: 1000 }
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:01]=2022-08-02 01:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 00:00:01'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 00:30:00]=2022-08-02 01:00:00 (+30M)", input: new GlideDateTime('2022-08-02 00:30:00'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1800000 },
                    { test_description: "[2022-08-02 00:59:59]=2022-08-02 01:00:00 (+1S)", input: new GlideDateTime('2022-08-02 00:59:59'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)", input: new GlideDateTime('2022-08-02 14:59:59'), expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 16:00:00]=2022-08-02 16:00:00 (+0S)", input: new GlideDateTime('2022-08-02 16:00:00'), expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 16:00:01]=2022-08-02 17:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 16:00:01'), expected: new GlideDateTime('2022-08-02 17:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 23:00:00]=2022-08-02 23:00:00 (+0S)", input: new GlideDateTime('2022-08-02 23:00:00'), expected: new GlideDateTime('2022-08-02 23:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:00:01]=2022-08-03 00:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 23:00:01'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)", input: new GlideDateTime('2022-08-02 23:59:59'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1000 }
                ]
            },
            // step_sys_id: '5071bdd297191110d87839000153afee',
            // start_time_interval: gs.getDurationDate('0 0:15:0'),
            // duration_increment: gs.getDurationDate('0 0:30:0'),
            // minimum_duration: gs.getDurationDate('0 0:15:0'),
            // maximum_duration: gs.getDurationDate('0 2:30:1')
            "SInt: 00:15:00; Dur: inc=00:30:00, min=00:30:00, max=02:30:00, inactive=true": {
                durations: [
                    { test_description: "[0S]=1H30M (+1H30M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 1:30:0'), returns: 5400000 },
                    { test_description: "[1S]=1H30M (+1H29M59)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 1:30:0'), returns: 5399000 },
                    { test_description: "[15M]=1H30M (+1H15M)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 1:30:0'), returns: 4500000 },
                    { test_description: "[30M]=1H30M (+1H)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 1:30:0'), returns: 3600000 },
                    { test_description: "[45M]=1H30M (+45M)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 1:30:0'), returns: 2700000 },
                    { test_description: "[1H30M]=1H30M (+0S)", input: new GlideDuration('0 1:30:0'), expected: new GlideDuration('0 1:30:0'), returns: 0 },
                    { test_description: "[1H30M1S]=2H (+29M59S)", input: new GlideDuration('0 1:30:1'), expected: new GlideDuration('0 2:0:0'), returns: 1799000 },
                    { test_description: "[1H59M59S]=2H (+1S)", input: new GlideDuration('0 1:59:59'), expected: new GlideDuration('0 2:0:0'), returns: 1000 },
                    { test_description: "[2H]=2H (+0S)", input: new GlideDuration('0 2:0:0'), expected: new GlideDuration('0 2:0:0'), returns: 0 },
                    { test_description: "[2H30M]=2H30M (+0S)", input: new GlideDuration('0 2:30:0'), expected: new GlideDuration('0 2:30:0'), returns: 0 },
                    { test_description: "[2H30M1S]=3H (no round up)", input: new GlideDuration('0 2:30:1'), expected: new GlideDuration('0 2:30:0'), returns: 0 },
                    { test_description: "[3H1S]=3H (no round up)", input: new GlideDuration('0 3:0:1'), expected: new GlideDuration('0 2:30:0'), returns: 0 }
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:01]=2022-08-02 00:15:00 (+14M59S)", input: new GlideDateTime('2022-08-02 00:00:01'), expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 899000 },
                    { test_description: "[2022-08-02 00:07:30]=2022-08-02 00:15:00 (+7M30S)", input: new GlideDateTime('2022-08-02 00:07:30'), expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 450000 },
                    { test_description: "[2022-08-02 00:14:59]=2022-08-02 00:15:00 (+1S)", input: new GlideDateTime('2022-08-02 00:14:59'), expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 1000 },
                    { test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)", input: new GlideDateTime('2022-08-02 14:59:59'), expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 15:15:00]=2022-08-02 15:15:00 (+0S)", input: new GlideDateTime('2022-08-02 15:15:00'), expected: new GlideDateTime('2022-08-02 15:15:00'), returns: 0 },
                    { test_description: "[2022-08-02 15:15:01]=2022-08-02 15:30:00 (+14M59S)", input: new GlideDateTime('2022-08-02 15:15:01'), expected: new GlideDateTime('2022-08-02 15:30:00'), returns: 899000 },
                    { test_description: "[2022-08-02 23:45:00]=2022-08-02 23:45:00 (+0S)", input: new GlideDateTime('2022-08-02 23:45:00'), expected: new GlideDateTime('2022-08-02 23:45:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:45:01]=2022-08-03 00:00:00 (+14M59S)", input: new GlideDateTime('2022-08-02 23:45:01'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 899000 },
                    { test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)", input: new GlideDateTime('2022-08-02 23:59:59'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1000 }
                ]
            },
            // step_sys_id: '26c03d1297191110d87839000153afad',
            // start_time_interval: gs.getDurationDate('0 0:30:0'),
            // duration_increment: gs.getDurationDate('0 0:15:0'),
            // minimum_duration: gs.getDurationDate('0 0:1:0'),
            // maximum_duration: gs.getDurationDate('0 0:58:1')'
            "SInt: 00:30:00; Dur: inc=00:15:00, min=00:15:00, max=00:45:00": {
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:15:0'), returns: 900000 },
                    { test_description: "[1S]=15M (+14M59)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:15:0'), returns: 899000 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 0 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:15:0'), returns: 0 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration('0 0:7:30'), expected: new GlideDuration('0 0:15:0'), returns: 450000 },
                    { test_description: "[15M1S]=30M (+14M59S)", input: new GlideDuration('0 0:15:1'), expected: new GlideDuration('0 0:30:0'), returns: 899000 },
                    { test_description: "[29M59S]=30M (+1S)", input: new GlideDuration('0 0:29:59'), expected: new GlideDuration('0 0:30:0'), returns: 1000 },
                    { test_description: "[43M59S]=45M (+1M1S)", input: new GlideDuration('0 0:43:59'), expected: new GlideDuration('0 0:45:0'), returns: 61000 },
                    { test_description: "[44M]=45M (+1M)", input: new GlideDuration('0 0:44:0'), expected: new GlideDuration('0 0:45:0'), returns: 60000 },
                    { test_description: "[44M1S]=45M (+59S)", input: new GlideDuration('0 0:44:1'), expected: new GlideDuration('0 0:45:0'), returns: 59000 },
                    { test_description: "[45M]=45M (+0S)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 0:45:0'), returns: 0 },
                    { test_description: "[45M1S]=45M (no round up)", input: new GlideDuration('0 0:45:1'), expected: new GlideDuration('0 0:45:0'), returns: 0 },
                    { test_description: "[1H1S]=45M (no round up)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 0:45:0'), returns: 0 }
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:01]=2022-08-02 00:30:00 (+29M59S)", input: new GlideDateTime('2022-08-02 00:00:01'), expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 1799000 },
                    { test_description: "[2022-08-02 00:15:00]=2022-08-02 00:30:00 (+15M)", input: new GlideDateTime('2022-08-02 00:15:00'), expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 900000 },
                    { test_description: "[2022-08-02 00:29:59]=2022-08-02 00:30:00 (+1S)", input: new GlideDateTime('2022-08-02 00:29:59'), expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 1000 },
                    { test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)", input: new GlideDateTime('2022-08-02 14:59:59'), expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 15:30:00]=2022-08-02 15:30:00 (+0S)", input: new GlideDateTime('2022-08-02 15:30:00'), expected: new GlideDateTime('2022-08-02 15:30:00'), returns: 0 },
                    { test_description: "[2022-08-02 15:30:01]=2022-08-02 16:00:00 (+29M59S)", input: new GlideDateTime('2022-08-02 15:30:01'), expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 1799000 },
                    { test_description: "[2022-08-02 23:30:00]=2022-08-02 23:30:00 (+0S)", input: new GlideDateTime('2022-08-02 23:30:00'), expected: new GlideDateTime('2022-08-02 23:30:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:30:01]=2022-08-03 00:00:00 (+29M59S)", input: new GlideDateTime('2022-08-02 23:30:01'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1799000 },
                    { test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)", input: new GlideDateTime('2022-08-02 23:59:59'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1000 }
                ]
            },
            // step_sys_id: 'b4f80e5e97191110d87839000153af9e',
            // start_time_interval: gs.getDurationDate('0 1:0:0'),
            // duration_increment: gs.getDurationDate('0 0:14:1'),
            // minimum_duration: gs.getDurationDate('0 0:15:0'),
            // maximum_duration: gs.getDurationDate('0 1:0:0')
            "SInt: 01:00:00; Dur: inc=00:15:00, min=00:15:00, max=01:00:00": {
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:15:0'), returns: 900000 },
                    { test_description: "[1S]=15M (+14M59)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:15:0'), returns: 899000 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 0 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:15:0'), returns: 0 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration('0 0:7:30'), expected: new GlideDuration('0 0:15:0'), returns: 450000 },
                    { test_description: "[15M1S]=30M (+14M59S)", input: new GlideDuration('0 0:15:1'), expected: new GlideDuration('0 0:30:0'), returns: 899000 },
                    { test_description: "[29M59S]=30M (+1S)", input: new GlideDuration('0 0:29:59'), expected: new GlideDuration('0 0:30:0'), returns: 1000 },
                    { test_description: "[44M1S]=45M (+59S)", input: new GlideDuration('0 0:44:1'), expected: new GlideDuration('0 0:45:0'), returns: 59000 },
                    { test_description: "[44M]=45M (+1M)", input: new GlideDuration('0 0:44:0'), expected: new GlideDuration('0 0:45:0'), returns: 60000 },
                    { test_description: "[58M59S]=1H (+1M1S)", input: new GlideDuration('0 0:58:59'), expected: new GlideDuration('0 1:0:0'), returns: 61000 },
                    { test_description: "[59M]=1H (+1M)", input: new GlideDuration('0 0:59:0'), expected: new GlideDuration('0 1:0:0'), returns: 60000 },
                    { test_description: "[59M1S]=59M (no round up)", input: new GlideDuration('0 0:59:1'), expected: new GlideDuration('0 0:59:0'), returns: 0 }
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:01]=2022-08-02 01:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 00:00:01'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 00:30:00]=2022-08-02 01:00:00 (+30M)", input: new GlideDateTime('2022-08-02 00:30:00'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1800000 },
                    { test_description: "[2022-08-02 00:59:59]=2022-08-02 01:00:00 (+1S)", input: new GlideDateTime('2022-08-02 00:59:59'), expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)", input: new GlideDateTime('2022-08-02 14:59:59'), expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1000 },
                    { test_description: "[2022-08-02 16:00:00]=2022-08-02 16:00:00 (+0S)", input: new GlideDateTime('2022-08-02 16:00:00'), expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 16:00:01]=2022-08-02 17:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 16:00:01'), expected: new GlideDateTime('2022-08-02 17:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 23:00:00]=2022-08-02 23:00:00 (+0S)", input: new GlideDateTime('2022-08-02 23:00:00'), expected: new GlideDateTime('2022-08-02 23:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:00:01]=2022-08-03 00:00:00 (+59M59S)", input: new GlideDateTime('2022-08-02 23:00:01'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 3599000 },
                    { test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)", input: new GlideDateTime('2022-08-02 23:59:59'), expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1000 }
                ]
            }
        };
        for (var short_description in testParameters) {
            var parameterSet = testParameters[short_description];
            var reservationType = outputItems[short_description];
            var constructorSignature = 'new ReservationScheduler("' + reservationType.sys_id + '" /* ' + short_description + ' */)';
            var rs;
            try {
                rs = new x_g_inte_site_17.ReservationScheduler(reservationType.sys_id);
            }
            catch (e) {
                atfHelper.setFailed("Unexpected exception while initializing " + constructorSignature, e);
                return;
            }
            var value;
            var msg;
            for (var _i = 0, _a = parameterSet.durations; _i < _a.length; _i++) {
                var durationParam = _a[_i];
                var target = new GlideDuration(durationParam.input);
                try {
                    value = rs.normalizeDuration(target);
                }
                catch (e) {
                    value = NaN;
                    atfHelper.setFailed("Unexpected exception while testing " + durationParam.test_description, e);
                }
                assertEqual({
                    name: 'return value of ' + durationParam.test_description,
                    shouldBe: durationParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new duration after ' + durationParam.test_description,
                    shouldBe: durationParam.expected,
                    value: target
                });
            }
            for (var _b = 0, _c = parameterSet.startDates; _b < _c.length; _b++) {
                var dateParam = _c[_b];
                var input = new GlideDateTime(dateParam.input);
                try {
                    value = rs.normalizeStartDate(input);
                }
                catch (e) {
                    value = NaN;
                    atfHelper.setFailed("Unexpected exception while testing " + dateParam.test_description, e);
                }
                assertEqual({
                    name: 'return value of ' + dateParam.test_description,
                    shouldBe: dateParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new date/time after ' + dateParam.test_description,
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
        var atfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id = atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        var off_hours_sys_id = atfHelper.getRecordIdFromStep('e8f6e19897d11110d87839000153afb8');
        var holiday_sys_id = atfHelper.getRecordIdFromStep('5dda655c97d11110d87839000153afea');
        var appt_sys_id = [
            atfHelper.getRecordIdFromStep('efde69dc97d11110d87839000153af79'),
            atfHelper.getRecordIdFromStep('70efe55097151110d87839000153afed'),
            atfHelper.getRecordIdFromStep('9140795097151110d87839000153af86')
        ];
        if (gs.nil(schedule_sys_id) || gs.nil(approval_group_sys_id) || gs.nil(assignment_group_sys_id) || gs.nil(off_hours_sys_id) || gs.nil(holiday_sys_id) || appt_sys_id.filter(function (value) { return typeof value === 'string'; }).length < 3)
            return;
        var defaultTimeZone;
        try {
            defaultTimeZone = gs.getSession().getTimeZoneName();
        }
        catch (e) {
            atfHelper.setFailed("Unexpected exception while getting time zone", e);
            return;
        }
        if (gs.nil(defaultTimeZone)) {
            atfHelper.setFailed("Could not determine default time zone");
        }
        var altTimeZone = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        var gdt = new GlideDateTime();
        var altTzOffset = new GlideDateTime(new GlideScheduleDateTime(gdt).convertTimeZone(defaultTimeZone, altTimeZone)).getNumericValue() - gdt.getNumericValue();
        var off_hours_start;
        var off_hours_end;
        var holiday_start;
        var holiday_end;
        var existingAppointments = [];
        try {
            // Add off-hours schedule entry recurring daily from today at 16:00 to the following day at 09:00
            // {
            //     sys_id: 'e8f6e19897d11110d87839000153afb8',
            //     table: 'cmn_schedule_span'
            //     fields: {
            //         name: 'Off Hours',
            //         all_day: false,
            //         start_date_time: gs.dateGenerate(gs.daysAgoStart(0).substring(0, 10), "16:00:00"),
            //         end_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "09:00:00")',
            //         repeat_type: 'daily',
            //         show_as: 'busy',
            //         schedule: atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae')
            //     }
            // }
            var gr = new GlideRecord('cmn_schedule_span');
            gr.addQuery('sys_id', off_hours_sys_id); // Off Hours
            gr.query();
            if (!gr.next())
                throw new Error("Record in cmn_schedule_span with sys_id '" + off_hours_sys_id + "' not found.");
            off_hours_start = new GlideDateTime(gr.getValue('start_date_time')).getLocalTime();
            off_hours_end = new GlideDateTime(gr.getValue('end_date_time')).getLocalTime();
            // Add holiday schedule entry for 2 days out
            // {
            //     sys_id: '5dda655c97d11110d87839000153afea',
            //     table: 'cmn_schedule_span'
            //     fields: {
            //         name: 'Party Time',
            //         all_day: true,
            //         start_date_time: gs.dateGenerate(gs.daysAgoStart(-2).substring(0, 10), "start"),
            //         end_date_time: gs.dateGenerate(gs.daysAgoStart(-2).substring(0, 10), "end"),
            //         repeat_type: 'yearly',
            //         show_as: 'busy',
            //         type: 'exclude',
            //         schedule: atfHelper.getRecordIdFromStep('07f5e19897d11110d87839000153af81')
            //     }
            // }
            gr = new GlideRecord('cmn_schedule_span');
            gr.addQuery('sys_id', holiday_sys_id); // Off Hours
            gr.query();
            if (!gr.next())
                throw new Error("Record in cmn_schedule_span with sys_id '" + off_hours_sys_id + "' not found.");
            holiday_start = new GlideDateTime(gr.getValue('start_date_time'));
            holiday_end = new GlideDateTime(gr.getValue('end_date_time'));
            // First Appointment
            // {
            //     sys_id: 'efde69dc97d11110d87839000153af79',
            //     table: 'cmn_schedule_span'
            //     fields: {
            //         name: 'First Appointment',
            //         all_day: false,
            //         start_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "11:45:00"),
            //         end_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "12:00:00"),
            //         show_as: 'busy',
            //         schedule: atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae'),
            //         type: 'appointment'
            //     }
            // }
            // Second appointment
            // {
            //     sys_id: '70efe55097151110d87839000153afed',
            //     table: 'cmn_schedule_span'
            //     fields: {
            //         name: 'Second Appointment',
            //         all_day: false,
            //         start_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "12:00:00"),
            //         end_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "12:15:00"),
            //         show_as: 'busy',
            //         type: 'appointment',
            //         schedule: atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae')
            //     }
            // }
            // Third Appointment
            // {
            //     sys_id: '9140795097151110d87839000153af86',
            //     table: 'cmn_schedule_span'
            //     fields: {
            //         name: 'Third Appointment',
            //         all_day: false,
            //         start_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "12:45:00"),
            //         end_date_time: gs.dateGenerate(gs.daysAgoStart(-1).substring(0, 10), "13:30:00"),
            //         show_as: 'busy',
            //         type: 'appointment',
            //         schedule: atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae')
            //     }
            // }
            existingAppointments = appt_sys_id.map(function (sys_id) {
                gr = new GlideRecord('cmn_schedule_span');
                gr.addQuery('sys_id', sys_id); // Off Hours
                gr.query();
                if (!gr.next())
                    throw new Error("Record in cmn_schedule_span with sys_id '" + sys_id + "' not found.");
                return {
                    start: new GlideDateTime(gr.getValue('start_date_time')),
                    end: new GlideDateTime(gr.getValue('end_date_time'))
                };
            });
        }
        catch (e) {
            atfHelper.setFailed("Unexpected exception time range values from database", e);
            return;
        }
    })(outputs, steps, stepResult, assertEqual);
})(getAvailabilitiesInRangeTest || (getAvailabilitiesInRangeTest = {}));
//# sourceMappingURL=ReservationSchedulerTest.js.map