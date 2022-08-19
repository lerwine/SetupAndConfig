namespace constructorTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    //  'SInt: 15M; Dur: inc=1M, min=1M, max=1H',
            // 'SInt: 30M; Dur: inc=30M, min=30M, max=30M',
    export declare type ReservationTypeShortDescription = 'SInc: 1M; DInc: 15M; Min: 15M; Max: 1H' |
                                                          'SInc: 30M; DInc: 15M; Min: 15M; Max: 45M' |
                                                          'SInc: 1H; DInc: 1H; Min: 1H; Max: 1H; Appr: true' |
                                                          'SInc: 15M; DInc: 30M; Min: 30M; Max: 2H30M; Inactive: true' |
                                                          'SInc: 1H; DInc: 1M; Min: 1M; Max: 3H12M' |
                                                          'SInc: 1H; DInc: 15M; Min: 15M; Max: 1H';

    interface IConstructorParameterSet {
        allowInactive?: boolean;
        timeZone?: string;
        expectedTimeZone: string;
        getExpectedErrorMessage?: { (sys_id: string, ps: IReservationTypeParameterSet): string; }
    }

    export interface IReservationTypeDurationParameters {
        minimum_duration: GlideDuration;
        maximum_duration: GlideDuration;
        duration_increment: GlideDuration;
        start_time_interval: GlideDuration;
    }
    
    export interface IReservationTypeInputParameters extends IReservationTypeDurationParameters {
        approval_group_empty: boolean;
        inactive: boolean;
    }

    interface IReservationTypeParameterSet extends IReservationTypeDurationParameters {
        test_description: string;
        step_sys_id: string;
        short_description: ReservationTypeShortDescription;
        approval_group_empty: boolean,
        inactive: boolean,
        constructorParameterSets: IConstructorParameterSet[];
    }

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
    (function(outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string= <string>atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id: string = <string>atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id: string = <string> atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        if (x_g_inte_site_17.AtfHelper.anyNil(schedule_sys_id, approval_group_sys_id, assignment_group_sys_id))
            return false;
        var defaultTimeZone: string | undefined;
        try { defaultTimeZone = gs.getSession().getTimeZoneName(); }
        catch (e) {
            defaultTimeZone = '';
            atfHelper.setFailed("Unexpected exception while getting time zone", e);
            return false;
        }
        if (x_g_inte_site_17.AtfHelper.isNil(defaultTimeZone)) {
            stepResult.setOutputMessage("Could not determine default time zone");
            return false;
        }
        outputs.defaultTimeZone = defaultTimeZone;
        var altTimeZone: string = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        outputs.altTimeZone = altTimeZone;
        function getExpectedInactiveTypeErrorMessage(sys_id: string, ps: IReservationTypeParameterSet): string {
            return "Reservation Type \"" + ps.short_description + "\" (" + sys_id + ") is inactive.";
        }
        var parameterSetArray: IReservationTypeParameterSet[] = [
            {
                test_description: 'All values round up',
                step_sys_id: '6e6da91297191110d87839000153afb5',
                // start_time_interval: gs.getDurationDate('0 0:0:0'), // 0S
                // duration_increment: gs.getDurationDate('0 0:14:1'), // 14M1S
                // minimum_duration: gs.getDurationDate('0 0:0:1'), // 1S
                // maximum_duration: gs.getDurationDate('0 1:0:54') // 1H54S
                short_description: 'SInc: 1M; DInc: 15M; Min: 15M; Max: 1H',
                start_time_interval: new GlideDuration('0 0:1:0'), // 1M
                duration_increment: new GlideDuration('0 0:15:0'), // 15M
                minimum_duration: new GlideDuration('0 0:15:0'), // 15M
                maximum_duration: new GlideDuration('0 1:0:0'), // 1H
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
                test_description: 'All values round to 1 hour',
                step_sys_id: '2d00fd9297191110d87839000153af3b',
                // start_time_interval: gs.getDurationDate('0 0:59:1'), // 59M1S
                // duration_increment: gs.getDurationDate('0 0:59:59'), // 59M59S
                // minimum_duration: gs.getDurationDate('0 0:59:0'), // 59M
                // maximum_duration: gs.getDurationDate('0 1:0:0') // 1H
                short_description: 'SInc: 1H; DInc: 1H; Min: 1H; Max: 1H; Appr: true',
                start_time_interval: new GlideDuration('0 1:0:0'), // 1H
                duration_increment: new GlideDuration('0 1:0:0'), // 1H
                minimum_duration: new GlideDuration('0 1:0:0'), // 1H
                maximum_duration: new GlideDuration('0 1:0:0'), // 1H
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
                test_description: 'Max 1 second beyond 58 minutes',
                step_sys_id: '26c03d1297191110d87839000153afad',
                // start_time_interval: gs.getDurationDate('0 0:30:0'), // 30M
                // duration_increment: gs.getDurationDate('0 0:15:0'), // 15M
                // minimum_duration: gs.getDurationDate('0 0:1:0'), // 1M
                // maximum_duration: gs.getDurationDate('0 0:58:1') // 58M1S
                short_description: 'SInc: 30M; DInc: 15M; Min: 15M; Max: 45M',
                start_time_interval: new GlideDuration('0 0:30:0'), // 30M
                duration_increment: new GlideDuration('0 0:15:0'), // 15M
                minimum_duration: new GlideDuration('0 0:15:0'), // 15M
                maximum_duration: new GlideDuration('0 0:45:0'), // 45M
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
                test_description: 'Inactive, Min round up, and max round down',
                step_sys_id: '5071bdd297191110d87839000153afee',
                // start_time_interval: gs.getDurationDate('0 0:15:0'), // 15M
                // duration_increment: gs.getDurationDate('0 0:30:0'), // 30M
                // minimum_duration: gs.getDurationDate('0 0:15:0'), // 15M
                // maximum_duration: gs.getDurationDate('0 2:30:1') // 2H30M1S
                short_description: 'SInc: 15M; DInc: 30M; Min: 30M; Max: 2H30M; Inactive: true',
                start_time_interval: new GlideDuration('0 0:15:0'), // 15M
                duration_increment: new GlideDuration('0 0:30:0'), // 30M
                minimum_duration: new GlideDuration('0 0:30:0'), // 30M
                maximum_duration: new GlideDuration('0 2:30:0'), // 2H30M
                inactive: true,
                approval_group_empty: true,
                constructorParameterSets: [
                    { expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: false, expectedTimeZone: defaultTimeZone , getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage},
                    { allowInactive: true, expectedTimeZone: defaultTimeZone },
                    { timeZone: altTimeZone, expectedTimeZone: altTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: false, timeZone: altTimeZone, expectedTimeZone: altTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { allowInactive: true, timeZone: altTimeZone, expectedTimeZone: altTimeZone },
                    { timeZone: defaultTimeZone, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { timeZone: defaultTimeZone, allowInactive: false, expectedTimeZone: defaultTimeZone, getExpectedErrorMessage: getExpectedInactiveTypeErrorMessage },
                    { timeZone: defaultTimeZone, allowInactive: true, expectedTimeZone: defaultTimeZone }
                ]
            },
            {
                test_description: 'No values rounded',
                step_sys_id: 'a122fdd297191110d87839000153af66',
                // start_time_interval: gs.getDurationDate('0 1:0:0'), // 1H
                // duration_increment: gs.getDurationDate('0 0:1:0'), // 1M
                // minimum_duration: gs.getDurationDate('0 0:1:0'), // 1M
                // maximum_duration: gs.getDurationDate('0 3:12:0') // 3H12M
                short_description: 'SInc: 1H; DInc: 1M; Min: 1M; Max: 3H12M',
                start_time_interval: new GlideDuration('0 1:0:0'), // 1H
                duration_increment: new GlideDuration('0 0:1:0'), // 1M
                minimum_duration: new GlideDuration('0 0:1:0'), // 1M
                maximum_duration: new GlideDuration('0 3:12:0'), // 3H12M
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
                test_description: 'Round duration increment up',
                step_sys_id: 'b4f80e5e97191110d87839000153af9e',
                // start_time_interval: gs.getDurationDate('0 1:0:0'), // 1H
                // duration_increment: gs.getDurationDate('0 0:14:1'), // 14M1S
                // minimum_duration: gs.getDurationDate('0 0:15:0'), // 15M
                // maximum_duration: gs.getDurationDate('0 1:0:0') // 1H
                short_description: 'SInc: 1H; DInc: 15M; Min: 15M; Max: 1H',
                start_time_interval: new GlideDuration('0 1:0:0'), // 1H
                duration_increment: new GlideDuration('0 0:15:0'), // 15M
                minimum_duration: new GlideDuration('0 0:15:0'), // 15M
                maximum_duration: new GlideDuration('0 1:0:0'), // 1H
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
        ];
        for (var parameterSet of parameterSetArray) {
            var sys_id: string | undefined = atfHelper.getRecordIdFromStep(parameterSet.step_sys_id);
            if (typeof sys_id === 'undefined')
                return false;
            var rs: x_g_inte_site_17.ReservationScheduler;
            for (var cps of parameterSet.constructorParameterSets) {
                var cDesc: string;
                if (x_g_inte_site_17.AtfHelper.isNil(cps.timeZone)) {
                    if (x_g_inte_site_17.AtfHelper.isNil(cps.allowInactive))
                        cDesc = 'new x_g_inte_site_17.ReservationScheduler("' + sys_id + '") // ' + parameterSet.short_description;
                    else
                        cDesc = 'new x_g_inte_site_17.ReservationScheduler("' + sys_id + '", ' + cps.allowInactive + ') // ' + parameterSet.short_description;
                } else
                    cDesc = 'new x_g_inte_site_17.ReservationScheduler("' + sys_id + '", ' + cps.allowInactive + ', "' + cps.timeZone + '") // ' + parameterSet.short_description;
                try {
                    if (x_g_inte_site_17.AtfHelper.isNil(cps.timeZone)) {
                        if (x_g_inte_site_17.AtfHelper.isNil(cps.allowInactive))
                            rs = new x_g_inte_site_17.ReservationScheduler(sys_id);
                        else
                            rs = new x_g_inte_site_17.ReservationScheduler(sys_id, cps.allowInactive);
                    } else
                        rs = new x_g_inte_site_17.ReservationScheduler(sys_id, cps.allowInactive, cps.timeZone);
                } catch (e) {
                    if (x_g_inte_site_17.AtfHelper.isNil(cps.getExpectedErrorMessage)) {
                        atfHelper.setFailed('Unable to create instance of ReservationScheduler for ' + parameterSet.test_description, e) + ' with ' + cDesc;
                        return false;
                    }
                    assertEqual({
                        name: 'Error Message from ' + parameterSet.test_description + ' with ' + cDesc,
                        shouldbe: cps.getExpectedErrorMessage(sys_id, parameterSet),
                        value: (<Error>e).message
                    });
                    continue;
                }
                assertEqual({
                    name: 'timeZone not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.timeZone)
                });
                assertEqual({
                    name: 'timeZone value for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: cps.expectedTimeZone,
                    value: rs.timeZone
                });
                assertEqual({
                    name: 'short_description not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.short_description)
                });
                assertEqual({
                    name: 'short_description value for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: parameterSet.short_description,
                    value: rs.short_description
                });
                assertEqual({
                    name: 'schedule not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.schedule)
                });
                assertEqual({
                    name: 'assignment_group not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.assignment_group)
                });
                assertEqual({
                    name: 'assignment_group value for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: assignment_group_sys_id,
                    value: rs.assignment_group
                });
                if (parameterSet.approval_group_empty)
                    assertEqual({
                        name: 'approval_group nil for ' + parameterSet.test_description + ' with ' + cDesc,
                        shouldbe: true,
                        value: x_g_inte_site_17.AtfHelper.isNil(rs.approval_group)
                    });
                else {
                    assertEqual({
                        name: 'approval_group not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                        shouldbe: false,
                        value: x_g_inte_site_17.AtfHelper.isNil(rs.approval_group)
                    });
                    assertEqual({
                        name: 'approval_group value for ' + parameterSet.test_description + ' with ' + cDesc,
                        shouldbe: approval_group_sys_id,
                        value: rs.approval_group
                    });
                }
                assertEqual({
                    name: 'duration_increment not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.duration_increment)
                });
                if (!rs.duration_increment.isValid()) {
                    stepResult.setOutputMessage("duration_increment is not valid for " + parameterSet.test_description + ' with ' + cDesc +
                        '; message=' + rs.duration_increment.getErrorMsg() + '; value = ' + rs.duration_increment.getValue());
                    stepResult.setFailed();
                    return false;
                }
                assertEqual({
                    name: 'duration_increment value for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: parameterSet.duration_increment,
                    value: rs.duration_increment
                });
                assertEqual({
                    name: 'minimum_duration not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.minimum_duration)
                });
                if (!rs.minimum_duration.isValid()) {
                    stepResult.setOutputMessage("minimum_duration is not valid for " + parameterSet.test_description + ' with ' + cDesc +
                        '; message=' + rs.minimum_duration.getErrorMsg() + '; value = ' + rs.minimum_duration.getValue());
                    stepResult.setFailed();
                    return false;
                }
                assertEqual({
                    name: 'maximum_duration not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.maximum_duration)
                });
                if (!rs.maximum_duration.isValid()) {
                    stepResult.setOutputMessage("maximum_duration is not valid for " + parameterSet.test_description + ' with ' + cDesc +
                        '; message=' + rs.maximum_duration.getErrorMsg() + '; value = ' + rs.maximum_duration.getValue());
                    stepResult.setFailed();
                    return false;
                }
                assertEqual({
                    name: 'maximum_duration value for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: parameterSet.maximum_duration,
                    value: rs.maximum_duration
                });
                assertEqual({
                    name: 'start_time_interval not nil for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: false,
                    value: x_g_inte_site_17.AtfHelper.isNil(rs.start_time_interval)
                });
                if (!rs.start_time_interval.isValid()) {
                    stepResult.setOutputMessage("start_time_interval is not valid for " + parameterSet.test_description + ' with ' + cDesc +
                        '; message=' + rs.start_time_interval.getErrorMsg() + '; value = ' + rs.start_time_interval.getValue());
                    stepResult.setFailed();
                    return false;
                }
                assertEqual({
                    name: 'start_time_interval value for ' + parameterSet.test_description + ' with ' + cDesc,
                    shouldbe: parameterSet.start_time_interval,
                    value: rs.start_time_interval
                });
            }
        }
        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace normalizationFunctionsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    
    interface IInputAndExpected<T, U> {
        input: T;
        expected: U;
    }
    
    interface ITestParameterSet {
        short_description: constructorTest.ReservationTypeShortDescription;
        test_description: string;
        step_sys_id: string;
        durations: (IInputAndExpected<GlideDuration, GlideDuration> & { test_description: string; returns: number })[];
        startDates: (IInputAndExpected<GlideDateTime, GlideDateTime> & { test_description: string; returns: number })[];
    }

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string | undefined = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var group_sys_id: string | undefined = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        if (x_g_inte_site_17.AtfHelper.isNil(schedule_sys_id) || x_g_inte_site_17.AtfHelper.isNil(group_sys_id))
            return false;
        var testParameters: ITestParameterSet[] = [
            {
                // start_time_interval: gs.getDurationDate('0 0:0:0'),
                // duration_increment: gs.getDurationDate('0 0:14:1'),
                // minimum_duration: gs.getDurationDate('0 0:0:1'),
                // maximum_duration: gs.getDurationDate('0 1:0:54')
                test_description: 'TODO: Set Description',
                short_description: 'SInc: 1M; DInc: 15M; Min: 15M; Max: 1H',
                step_sys_id: '6e6da91297191110d87839000153afb5',
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
            {
                // start_time_interval: gs.getDurationDate('0 1:0:0'),
                // duration_increment: gs.getDurationDate('0 0:1:0'),
                // minimum_duration: gs.getDurationDate('0 0:1:0'),
                // maximum_duration: gs.getDurationDate('0 3:12:0')'
                test_description: 'TODO: Set Description',
                short_description: 'SInc: 1H; DInc: 1M; Min: 1M; Max: 3H12M',
                step_sys_id: 'a122fdd297191110d87839000153af66',
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
            {
                // start_time_interval: gs.getDurationDate('0 0:59:1'),
                // duration_increment: gs.getDurationDate('0 0:59:59'),
                // minimum_duration: gs.getDurationDate('0 0:59:0'),
                // maximum_duration: gs.getDurationDate('0 1:0:0')
                test_description: 'TODO: Set Description',
                short_description: 'SInc: 1H; DInc: 1H; Min: 1H; Max: 1H; Appr: true',
                step_sys_id: '2d00fd9297191110d87839000153af3b',
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
            {
                // start_time_interval: gs.getDurationDate('0 0:15:0'),
                // duration_increment: gs.getDurationDate('0 0:30:0'),
                // minimum_duration: gs.getDurationDate('0 0:15:0'),
                // maximum_duration: gs.getDurationDate('0 2:30:1')
                test_description: 'TODO: Set Description',
                short_description: 'SInc: 15M; DInc: 30M; Min: 30M; Max: 2H30M; Inactive: true',
                step_sys_id: '5071bdd297191110d87839000153afee',
                durations: [
                    { test_description: "[0S]=30M (+30M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:30:0'), returns: 1800000 },
                    { test_description: "[1S]=30M (+29M59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:30:0'), returns: 1799000 },
                    { test_description: "[15M]=30M (+15M)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:30:0'), returns: 900000 },
                    { test_description: "[30M]=30M (+1H)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 3600000 },
                    { test_description: "[45M]=1H (+15M)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 1:0:0'), returns: 900000 },
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
            {
                // start_time_interval: gs.getDurationDate('0 0:30:0'),
                // duration_increment: gs.getDurationDate('0 0:15:0'),
                // minimum_duration: gs.getDurationDate('0 0:1:0'),
                // maximum_duration: gs.getDurationDate('0 0:58:1')'
                test_description: 'TODO: Set Description',
                short_description: 'SInc: 30M; DInc: 15M; Min: 15M; Max: 45M',
                step_sys_id: '26c03d1297191110d87839000153afad',
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:15:0'), returns: 900000 },
                    { test_description: "[1S]=15M (+14M59)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:15:0'), returns: 899000 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:15:0'), returns: 0 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration('0 0:7:30'), expected: new GlideDuration('0 0:15:0'), returns: 450000 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 0 },
                    { test_description: "[29M59S]=30M (+1S)", input: new GlideDuration('0 0:29:59'), expected: new GlideDuration('0 0:30:0'), returns: 1000 },
                    { test_description: "[45M]=45M (+0S)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 0:45:0'), returns: 0 },
                    { test_description: "[44M1S]=45M (+59S)", input: new GlideDuration('0 0:44:1'), expected: new GlideDuration('0 0:45:0'), returns: 59000 },
                    { test_description: "[44M]=45M (+1M)", input: new GlideDuration('0 0:44:0'), expected: new GlideDuration('0 0:45:0'), returns: 60000 },
                    { test_description: "[43M59S]=45M (+1M1S)", input: new GlideDuration('0 0:43:59'), expected: new GlideDuration('0 0:45:0'), returns: 61000 },
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
            {
                // start_time_interval: gs.getDurationDate('0 1:0:0'),
                // duration_increment: gs.getDurationDate('0 0:14:1'),
                // minimum_duration: gs.getDurationDate('0 0:15:0'),
                // maximum_duration: gs.getDurationDate('0 1:0:0')
                test_description: 'TODO: Set Description',
                short_description: 'SInc: 1H; DInc: 15M; Min: 15M; Max: 1H',
                step_sys_id: 'b4f80e5e97191110d87839000153af9e',
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
                    { test_description: "[1H]=1H (no round up)", input: new GlideDuration('0 1:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[1H1S]=1H (no round up)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 1:0:0'), returns: 0 }
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
        ];
        for (var parameterSet of testParameters) {
            var sys_id: string | undefined = atfHelper.getRecordIdFromStep(parameterSet.step_sys_id);
            if (typeof sys_id === 'undefined')
                return false;
            var constructorSignature: string = 'new ReservationScheduler("' + sys_id + '" /* ' + parameterSet.short_description + ' */)';
            var rs: x_g_inte_site_17.ReservationScheduler;
            try { rs = new x_g_inte_site_17.ReservationScheduler(sys_id, true); }
            catch (e) {
                atfHelper.setFailed("Unexpected exception while initializing " + constructorSignature, e);
                return false;
            }
            var value: number;
            for (var durationParam of parameterSet.durations) {
                var msg: string = durationParam.test_description + ' with ' + constructorSignature;
                var target = new GlideDuration(durationParam.input);
                try { value = rs.normalizeDuration(target); }
                catch (e) {
                    value = NaN;
                    atfHelper.setFailed("Unexpected exception while testing " + msg, e);
                    return false;
                }
                assertEqual({
                    name: 'return value of ' + msg,
                    shouldbe: durationParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new duration after ' + msg,
                    shouldbe: durationParam.expected,
                    value: target
                });
            }
            for (var dateParam of parameterSet.startDates) {
                var msg: string = dateParam.test_description + ' with ' + constructorSignature;
                var input = new GlideDateTime(dateParam.input);
                try { value = rs.normalizeStartDate(input); }
                catch (e) {
                    value = NaN;
                    atfHelper.setFailed("Unexpected exception while testing " + msg, e);
                    return false;
                }
                assertEqual({
                    name: 'return value of ' + msg,
                    shouldbe: dateParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new date/time after ' + msg,
                    shouldbe: dateParam.expected,
                    value: input
                });
            }
        }
        return true;
    })(outputs, steps, stepResult, assertEqual);
}

namespace getAvailabilitiesInRangeTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    
    interface IDateRange {
        start: GlideDateTime;
        end: GlideDateTime;
    }

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string = <string>atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id: string = <string>atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id: string = <string>atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        var off_hours_sys_id: string = <string>atfHelper.getRecordIdFromStep('e8f6e19897d11110d87839000153afb8');
        var holiday_sys_id: string = <string>atfHelper.getRecordIdFromStep('5dda655c97d11110d87839000153afea');
        if (x_g_inte_site_17.AtfHelper.anyNil(schedule_sys_id, approval_group_sys_id, assignment_group_sys_id, off_hours_sys_id, holiday_sys_id))
            return false;
        var appt_sys_id: string[] = [];
        var sys_id: string | undefined = atfHelper.getRecordIdFromStep('efde69dc97d11110d87839000153af79');
        if (typeof sys_id === 'undefined') return false;
        appt_sys_id.push(sys_id);
        sys_id = atfHelper.getRecordIdFromStep('70efe55097151110d87839000153afed');
        if (typeof sys_id === 'undefined') return false;
        appt_sys_id.push(sys_id);
        sys_id = atfHelper.getRecordIdFromStep('9140795097151110d87839000153af86');
        if (typeof sys_id === 'undefined') return false;
        appt_sys_id.push(sys_id);
        var defaultTimeZone: string | undefined;
        try { defaultTimeZone = gs.getSession().getTimeZoneName(); }
        catch (e) {
            atfHelper.setFailed("Unexpected exception while getting time zone", e);
            return false;
        }
        if (x_g_inte_site_17.AtfHelper.isNil(defaultTimeZone)) {
            stepResult.setOutputMessage("Could not determine default time zone");
            return false;
        }
        var altTimeZone: string = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        var gdt = new GlideDateTime();
        var altTzOffset = new GlideDateTime(new GlideScheduleDateTime(gdt).convertTimeZone(defaultTimeZone, altTimeZone)).getNumericValue() - gdt.getNumericValue();

        var off_hours_start: GlideTime;
        var off_hours_end: GlideTime;
        var holiday_start: GlideDateTime;
        var holiday_end: GlideDateTime;
        var existingAppointments: IDateRange[] = [];
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
            var gr: GlideRecord = new GlideRecord('cmn_schedule_span');
            gr.addQuery('sys_id', off_hours_sys_id); // Off Hours
            gr.query();
            if (!gr.next()) throw new Error("Record in cmn_schedule_span with sys_id '" + off_hours_sys_id + "' not found.");
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
            if (!gr.next()) throw new Error("Record in cmn_schedule_span with sys_id '" + off_hours_sys_id + "' not found.");
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
            existingAppointments = appt_sys_id.map(function(sys_id: string): IDateRange {
                gr = new GlideRecord('cmn_schedule_span');
                gr.addQuery('sys_id', sys_id); // Off Hours
                gr.query();
                if (!gr.next()) throw new Error("Record in cmn_schedule_span with sys_id '" + sys_id + "' not found.");
                return {
                    start: new GlideDateTime(gr.getValue('start_date_time')),
                    end: new GlideDateTime(gr.getValue('end_date_time'))
                };
            });
        } catch (e) {
            atfHelper.setFailed("Unexpected exception time range values from database", e);
            return false;
        }
        return true;
    })(outputs, steps, stepResult, assertEqual);
}