/// <reference path="../../../../../types/server/index.d.ts" />

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
        var schedule_sys_id: string = <string>atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id: string = <string>atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id: string = <string>atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        if (x_g_inte_site_17.AtfHelper.areAnyNil(schedule_sys_id, approval_group_sys_id, assignment_group_sys_id))
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
        var altTimeZone: string = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
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
            if (x_g_inte_site_17.AtfHelper.isNil(sys_id))
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
        step_sys_id: string;
        short_description: constructorTest.ReservationTypeShortDescription;
        durations: (IInputAndExpected<GlideDuration, GlideDuration> & { test_description: string; returns: number })[];
        startDates: (IInputAndExpected<GlideDateTime, GlideDateTime> & { test_description: string; returns: number })[];
    }

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string = <string>atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        if (x_g_inte_site_17.AtfHelper.isNil(schedule_sys_id))
            return false;
        var testParameters: ITestParameterSet[] = [
            {
                short_description: 'SInc: 1M; DInc: 15M; Min: 15M; Max: 1H',
                step_sys_id: '6e6da91297191110d87839000153afb5',
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:15:0'), returns: 900000 },
                    { test_description: "[1S]=15M (+14M59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:15:0'), returns: 899000 },
                    { test_description: "[1M]=15M (+14M)", input: new GlideDuration('0 0:1:0'), expected: new GlideDuration('0 0:15:0'), returns: 840000 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration('0 0:7:30'), expected: new GlideDuration('0 0:15:0'), returns: 450000 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:15:0'), returns: 0 },
                    { test_description: "[15M1S]=30M (+14M29S)", input: new GlideDuration('0 0:15:1'), expected: new GlideDuration('0 0:30:0'), returns: 899000 },
                    { test_description: "[29M59S]=30M (+1S)", input: new GlideDuration('0 0:29:59'), expected: new GlideDuration('0 0:30:0'), returns: 1000 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 0 },
                    { test_description: "[59M1S]=2H (+59S)", input: new GlideDuration('0 0:59:1'), expected: new GlideDuration('0 1:00:0'), returns: 59000 },
                    { test_description: "[45M]=45M (+0S)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 0:45:0'), returns: 0 },
                    { test_description: "[59M59S]=1H (+1S)", input: new GlideDuration('0 0:59:59'), expected: new GlideDuration('0 1:0:0'), returns: 1000 },
                    { test_description: "[1H1S]=1H (-1S)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 1:0:0'), returns: -1000 },
                    { test_description: "[1H15M1S]=1H (-15M1S)", input: new GlideDuration('0 1:15:1'), expected: new GlideDuration('0 1:0:0'), returns: -901000 }
                ],
                startDates: [
                    {
                        test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 00:00:01]=2022-08-02 00:01:00 (+59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:01:00')),
                        returns: 59000
                    },
                    {
                        test_description: "[2022-08-02 00:00:30]=2022-08-02 00:01:00 (+30S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:30')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:01:00')),
                        returns: 30000
                    },
                    {
                        test_description: "[2022-08-02 00:00:59]=2022-08-02 00:01:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:01:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '14:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 15:01:00]=2022-08-02 15:01:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '15:01:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:01:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 15:01:01]=2022-08-02 15:02:00 (+59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '15:01:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:02:00')),
                        returns: 59000
                    },
                    {
                        test_description: "[2022-08-02 23:59:00]=2022-08-02 23:59:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 23:59:01]=2022-08-03 00:00:00 (+59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 59000
                    },
                    {
                        test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1000
                    }
                ]
            },
            {
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
                    { test_description: "[3H12M1S]=3H12M (-1S)", input: new GlideDuration('0 3:12:1'), expected: new GlideDuration('0 3:12:0'), returns: -1000 }
                ],
                startDates: [
                    {
                        test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 00:00:01]=2022-08-02 01:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 00:30:00]=2022-08-02 01:00:00 (+30M)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:30:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 1800000
                    },
                    {
                        test_description: "[2022-08-02 00:59:59]=2022-08-02 01:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '14:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 16:00:00]=2022-08-02 16:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 16:00:01]=2022-08-02 17:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '17:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 23:00:00]=2022-08-02 23:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 23:00:01]=2022-08-03 00:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1000
                    }
                ]
            },
            {
                short_description: 'SInc: 1H; DInc: 1H; Min: 1H; Max: 1H; Appr: true',
                step_sys_id: '2d00fd9297191110d87839000153af3b',
                durations: [
                    { test_description: "[0S]=1H (+1H)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 3600000 },
                    { test_description: "[1S]=1H (+59M59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 1:0:0'), returns: 3599000 },
                    { test_description: "[1H]=1H (+0S)", input: new GlideDuration('0 1:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[30M]=1H (+30M)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 1:0:0'), returns: 1800000 },
                    { test_description: "[59M59S]=1H (+1S)", input: new GlideDuration('0 0:59:59'), expected: new GlideDuration('0 1:0:0'), returns: 1000 },
                    { test_description: "[1H1S]=1H (-1S)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 1:0:0'), returns: -1000 },
                    { test_description: "[1H59M59S]=1H (-59M59S)", input: new GlideDuration('0 1:59:59'), expected: new GlideDuration('0 1:0:0'), returns: -3599000 },
                    { test_description: "[2H]=1H (-1H)", input: new GlideDuration('0 2:0:0'), expected: new GlideDuration('0 1:0:0'), returns: -3600000 }
                ],
                startDates: [
                    {
                        test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 00:00:01]=2022-08-02 01:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 00:30:00]=2022-08-02 01:00:00 (+30M)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:30:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 1800000
                    },
                    {
                        test_description: "[2022-08-02 00:59:59]=2022-08-02 01:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '14:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 16:00:00]=2022-08-02 16:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 16:00:01]=2022-08-02 17:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '17:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 23:00:00]=2022-08-02 23:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 23:00:01]=2022-08-03 00:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1000
                    }
                ]
            },
            {
                short_description: 'SInc: 15M; DInc: 30M; Min: 30M; Max: 2H30M; Inactive: true',
                step_sys_id: '5071bdd297191110d87839000153afee',
                durations: [
                    { test_description: "[0S]=30M (+30M)", input: new GlideDuration('0 0:0:0'), expected: new GlideDuration('0 0:30:0'), returns: 1800000 },
                    { test_description: "[1S]=30M (+29M59S)", input: new GlideDuration('0 0:0:1'), expected: new GlideDuration('0 0:30:0'), returns: 1799000 },
                    { test_description: "[15M]=30M (+15M)", input: new GlideDuration('0 0:15:0'), expected: new GlideDuration('0 0:30:0'), returns: 900000 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration('0 0:30:0'), expected: new GlideDuration('0 0:30:0'), returns: 0 },
                    { test_description: "[45M]=1H (+15M)", input: new GlideDuration('0 0:45:0'), expected: new GlideDuration('0 1:0:0'), returns: 900000 },
                    { test_description: "[1H30M]=1H30M (+0S)", input: new GlideDuration('0 1:30:0'), expected: new GlideDuration('0 1:30:0'), returns: 0 },
                    { test_description: "[1H30M1S]=2H (+29M59S)", input: new GlideDuration('0 1:30:1'), expected: new GlideDuration('0 2:0:0'), returns: 1799000 },
                    { test_description: "[1H59M59S]=2H (+1S)", input: new GlideDuration('0 1:59:59'), expected: new GlideDuration('0 2:0:0'), returns: 1000 },
                    { test_description: "[2H]=2H (+0S)", input: new GlideDuration('0 2:0:0'), expected: new GlideDuration('0 2:0:0'), returns: 0 },
                    { test_description: "[2H30M]=2H30M (+0S)", input: new GlideDuration('0 2:30:0'), expected: new GlideDuration('0 2:30:0'), returns: 0 },
                    { test_description: "[2H30M1S]=2H30M (-1S)", input: new GlideDuration('0 2:30:1'), expected: new GlideDuration('0 2:30:0'), returns: -1000 },
                    { test_description: "[3H1S]=2H30M (-30M1S)", input: new GlideDuration('0 3:0:1'), expected: new GlideDuration('0 2:30:0'), returns: -1801000 }
                ],
                startDates: [
                    {
                        test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 00:00:01]=2022-08-02 00:15:00 (+14M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:15:00')),
                        returns: 899000
                    },
                    {
                        test_description: "[2022-08-02 00:07:30]=2022-08-02 00:15:00 (+7M30S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:07:30')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:15:00')),
                        returns: 450000
                    },
                    {
                        test_description: "[2022-08-02 00:14:59]=2022-08-02 00:15:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:14:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:15:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '14:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 15:15:00]=2022-08-02 15:15:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '15:15:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:15:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 15:15:01]=2022-08-02 15:30:00 (+14M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '15:15:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:30:00')),
                        returns: 899000
                    },
                    {
                        test_description: "[2022-08-02 23:45:00]=2022-08-02 23:45:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:45:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '23:45:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 23:45:01]=2022-08-03 00:00:00 (+14M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:45:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 899000
                    },
                    {
                        test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1000
                    }
                ]
            },
            {
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
                    { test_description: "[45M1S]=45M (-1S)", input: new GlideDuration('0 0:45:1'), expected: new GlideDuration('0 0:45:0'), returns: -1000 },
                    { test_description: "[1H1S]=45M (-15M1s)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 0:45:0'), returns: -901000 }
                ],
                startDates: [
                    {
                        test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 00:00:01]=2022-08-02 00:30:00 (+29M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:30:00')),
                        returns: 1799000
                    },
                    {
                        test_description: "[2022-08-02 00:15:00]=2022-08-02 00:30:00 (+15M)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:15:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:30:00')),
                        returns: 900000
                    },
                    {
                        test_description: "[2022-08-02 00:29:59]=2022-08-02 00:30:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:29:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:30:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '14:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 15:30:00]=2022-08-02 15:30:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '15:30:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:30:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 15:30:01]=2022-08-02 16:00:00 (+29M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '15:30:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        returns: 1799000
                    },
                    {
                        test_description: "[2022-08-02 23:30:00]=2022-08-02 23:30:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:30:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '23:30:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 23:30:01]=2022-08-03 00:00:00 (+29M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:30:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1799000
                    },
                    {
                        test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1000
                    }
                ]
            },
            {
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
                    { test_description: "[1H]=1H (+0S)", input: new GlideDuration('0 1:0:0'), expected: new GlideDuration('0 1:0:0'), returns: 0 },
                    { test_description: "[1H1S]=1H (-1S)", input: new GlideDuration('0 1:0:1'), expected: new GlideDuration('0 1:0:0'), returns: -1000 }
                ],
                startDates: [
                    {
                        test_description: "[2022-08-02 00:00:00]=2022-08-02 00:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 00:00:01]=2022-08-02 01:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 00:30:00]=2022-08-02 01:00:00 (+30M)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:30:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 1800000
                    },
                    {
                        test_description: "[2022-08-02 00:59:59]=2022-08-02 01:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '00:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '01:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 14:59:59]=2022-08-02 15:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '14:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '15:00:00')),
                        returns: 1000
                    },
                    {
                        test_description: "[2022-08-02 16:00:00]=2022-08-02 16:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 16:00:01]=2022-08-02 17:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '16:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '17:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 23:00:00]=2022-08-02 23:00:00 (+0S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:00')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:00')),
                        returns: 0
                    },
                    {
                        test_description: "[2022-08-02 23:00:01]=2022-08-03 00:00:00 (+59M59S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:00:01')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 3599000
                    },
                    {
                        test_description: "[2022-08-02 23:59:59]=2022-08-03 00:00:00 (+1S)",
                        input:    new GlideDateTime(gs.dateGenerate('2022-08-02', '23:59:59')),
                        expected: new GlideDateTime(gs.dateGenerate('2022-08-03', '00:00:00')),
                        returns: 1000
                    }
                ]
            }
        ];
        for (var parameterSet of testParameters) {
            var sys_id: string | undefined = atfHelper.getRecordIdFromStep(parameterSet.step_sys_id);
            if (x_g_inte_site_17.AtfHelper.isNil(sys_id))
                return false;
            var constructorSignature: string = 'new ReservationScheduler("' + sys_id + '" /* ' + parameterSet.short_description + ' */, true)';
            var rs: x_g_inte_site_17.ReservationScheduler;
            try { rs = new x_g_inte_site_17.ReservationScheduler(sys_id, true); }
            catch (e) {
                atfHelper.setFailed("Unexpected exception while initializing " + constructorSignature, e);
                return false;
            }
            var value: number;
            var desc: string;
            for (var durationParam of parameterSet.durations) {
                desc = durationParam.test_description + ' with ' + constructorSignature;
                var target = new GlideDuration(durationParam.input);
                try { value = rs.normalizeDuration(target); }
                catch (e) {
                    value = NaN;
                    atfHelper.setFailed("Unexpected exception while testing " + desc, e);
                    return false;
                }
                assertEqual({
                    name: 'return value of ' + desc,
                    shouldbe: durationParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new duration after ' + desc,
                    shouldbe: durationParam.expected,
                    value: target
                });
            }
            for (var dateParam of parameterSet.startDates) {
                desc = dateParam.test_description + ' with ' + constructorSignature;
                var input = new GlideDateTime(dateParam.input);
                try { value = rs.normalizeStartDate(input); }
                catch (e) {
                    atfHelper.setFailed("Unexpected exception while testing " + desc, e);
                    return false;
                }
                assertEqual({
                    name: 'return value of ' + desc,
                    shouldbe: dateParam.returns,
                    value: value
                });
                assertEqual({
                    name: 'new date/time after ' + desc,
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

    interface IAvailabilitiesInRangeParameterSet {
        test_description: string;
        fromDateTime: GlideDateTime;
        toDateTime: GlideDateTime;
        minimumDuration?: GlideDuration;
        expected: x_g_inte_site_17.ITimeSpan[];
    }

    interface ITestParameterSet {
        step_sys_id: string;
        short_description: constructorTest.ReservationTypeShortDescription;
        parameterSets: IAvailabilitiesInRangeParameterSet[];
    }

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc): boolean {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string = <string>atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        if (x_g_inte_site_17.AtfHelper.isNil(schedule_sys_id))
            return false;
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

        var day1 = gs.daysAgoStart(-1).substring(0, 10);
        var day2 = gs.daysAgoStart(-2).substring(0, 10);
        var day3 = gs.daysAgoStart(-3).substring(0, 10);

        var entry_sys_id = <string>atfHelper.getRecordIdFromStep('e8f6e19897d11110d87839000153afb8');
        var gr = new GlideRecord('cmn_schedule_span');
        gr.addQuery('sys_id', entry_sys_id);
        gr.query();
        assertEqual({
            name: 'Schedule entry e8f6e19897d11110d87839000153afb8 exists',
            shouldbe: true,
            value: gr.next()
        });
        assertEqual({
            name: 'Start date for schedule entry e8f6e19897d11110d87839000153afb8',
            shouldbe: new GlideDateTime(gs.dateGenerate(gs.daysAgoStart(0).substring(0, 10), "16:00:00")).getDisplayValue(),
            value: (<any>gr).start_date_time.getDisplayValue()
        });
        
        var testParameters: ITestParameterSet[] = [
            {
                short_description: 'SInc: 1M; DInc: 15M; Min: 15M; Max: 1H',
                step_sys_id: '6e6da91297191110d87839000153afb5',
                parameterSets: [
                    {
                        test_description: 'day1@start to day3@end; minDur: undefined',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")), // day1, 12:15-12:45
                                duration: new GlideDuration('0 0:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-16:00
                                duration: new GlideDuration('0 2:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day3@end; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")), // day1, 12:15-12:45
                                duration: new GlideDuration('0 0:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-16:00
                                duration: new GlideDuration('0 2:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day3@end; minDur: 45M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:45:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-16:00
                                duration: new GlideDuration('0 2:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day1@end; minDur: undefined',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "end")),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")), // day1, 12:15-12:45
                                duration: new GlideDuration('0 0:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-16:00
                                duration: new GlideDuration('0 2:30:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day1@end; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "end")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")), // day1, 12:15-12:45
                                duration: new GlideDuration('0 0:30:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-16:00
                                duration: new GlideDuration('0 2:30:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day1@09:14:59; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "09:14:59")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: []
                    }, 
                    {
                        test_description: 'day1@start to day1@09:15:59; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "09:15:59")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 0:15:59')
                            }
                        ]
                    }, 
                    {
                        test_description: 'day1@start to day1@09:15:59; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "09:15:59")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: []
                    }, 
                    {
                        test_description: 'day1@12:00:00 to day1@13:45:59; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "12:00:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "13:45:59")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")), // day1, 12:15-12:45
                                duration: new GlideDuration('0 0:30:0')
                            }
                        ]
                    }, 
                    {
                        test_description: 'day1@12:15:00 to day1@13:45:59; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "13:45:59")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "12:15:00")), // day1, 12:15-12:45
                                duration: new GlideDuration('0 0:30:0')
                            }
                        ]
                    }, 
                    {
                        test_description: 'day1@12:15:01 to day1@13:45:59; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "12:15:01")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "13:45:59")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: []
                    }, 
                    {
                        test_description: 'day1@12:30:00 to day1@13:45:59; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "12:30:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "13:45:59")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: []
                    }, 
                    {
                        test_description: 'day1@12:30:00 to day1@14:00:00; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "12:30:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-14:00
                                duration: new GlideDuration('0 0:30:0')
                            }
                        ]
                    }, 
                    {
                        test_description: 'day1@12:30:00 to day1@end; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "12:30:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day1, "end")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "13:30:00")), // day1, 13:30-16:00
                                duration: new GlideDuration('0 2:30:0')
                            }
                        ]
                    }, 
                    {
                        test_description: 'day2@start to day2@end; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day2, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day2, "end")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: []
                    },
                    {
                        test_description: 'day3@start to day3@end; minDur: undefined',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day3, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day3@start to day3@end; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day3, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    }
                ]
            },
            {
                short_description: 'SInc: 1H; DInc: 1M; Min: 1M; Max: 3H12M',
                step_sys_id: 'a122fdd297191110d87839000153af66',
                parameterSets: [
                    {
                        test_description: 'day1@start to day3@end; minDur: undefined',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")), // day1, 14:00-16:00
                                duration: new GlideDuration('0 2:00:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day3@end; minDur: 0S',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:0:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")), // day1, 14:00-16:00
                                duration: new GlideDuration('0 2:00:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day3@end; minDur: 30M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:30:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")), // day1, 14:00-16:00
                                duration: new GlideDuration('0 2:00:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@start to day3@end; minDur: 45M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:45:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "09:00:00")), // day1, 09:00-11:45
                                duration: new GlideDuration('0 2:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")), // day1, 14:00-16:00
                                duration: new GlideDuration('0 2:00:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@09:30:00 to day3@end; minDur: 45M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "09:30:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:45:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "10:00:00")), // day1, 10:00-11:45
                                duration: new GlideDuration('0 1:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")), // day1, 14:00-16:00
                                duration: new GlideDuration('0 2:00:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day1@11:00:00 to day3@end; minDur: 45M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day1, "11:00:00")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day3, "end")),
                        minimumDuration: new GlideDuration('0 0:45:0'),
                        expected: [
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "11:00:00")), // day1, 11:00-11:45
                                duration: new GlideDuration('0 0:45:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day1, "14:00:00")), // day1, 14:00-16:00
                                duration: new GlideDuration('0 2:00:0')
                            },
                            {
                                start: new GlideDateTime(gs.dateGenerate(day3, "09:00:00")), // day3, 09:00-16:00
                                duration: new GlideDuration('0 7:0:0')
                            }
                        ]
                    },
                    {
                        test_description: 'day2@start to day2@end; minDur: 45M',
                        fromDateTime: new GlideDateTime(gs.dateGenerate(day2, "start")),
                        toDateTime: new GlideDateTime(gs.dateGenerate(day2, "end")),
                        minimumDuration: new GlideDuration('0 0:45:0'),
                        expected: []
                    }
                ]
            },
            {
                short_description: 'SInc: 1H; DInc: 1H; Min: 1H; Max: 1H; Appr: true',
                step_sys_id: '2d00fd9297191110d87839000153af3b',
                parameterSets: [
                    // TODO: Add parameter sets
                    // gs.dateGenerate(gs.daysAgoStart(0).substring(0, 10), "16:00:00"), gs.dateGenerate(day1, "09:00:00")
                    // gs.dateGenerate(day1, "11:45:00"), gs.dateGenerate(day1, "12:00:00")
                    // gs.dateGenerate(day1, "12:00:00"), gs.dateGenerate(day1, "12:15:00")
                    // gs.dateGenerate(day1, "12:45:00"), gs.dateGenerate(day1, "13:30:00")
                    // gs.dateGenerate(day2, "start"), gs.dateGenerate(day2, "end")
                ]
            },
            {
                short_description: 'SInc: 15M; DInc: 30M; Min: 30M; Max: 2H30M; Inactive: true',
                step_sys_id: '5071bdd297191110d87839000153afee',
                parameterSets: [
                    // TODO: Add parameter sets
                    // gs.dateGenerate(gs.daysAgoStart(0).substring(0, 10), "16:00:00"), gs.dateGenerate(day1, "09:00:00")
                    // gs.dateGenerate(day1, "11:45:00"), gs.dateGenerate(day1, "12:00:00")
                    // gs.dateGenerate(day1, "12:00:00"), gs.dateGenerate(day1, "12:15:00")
                    // gs.dateGenerate(day1, "12:45:00"), gs.dateGenerate(day1, "13:30:00")
                    // gs.dateGenerate(day2, "start"), gs.dateGenerate(day2, "end")
                ]
            },
            {
                short_description: 'SInc: 30M; DInc: 15M; Min: 15M; Max: 45M',
                step_sys_id: '26c03d1297191110d87839000153afad',
                parameterSets: [
                    // TODO: Add parameter sets
                    // gs.dateGenerate(gs.daysAgoStart(0).substring(0, 10), "16:00:00"), gs.dateGenerate(day1, "09:00:00")
                    // gs.dateGenerate(day1, "11:45:00"), gs.dateGenerate(day1, "12:00:00")
                    // gs.dateGenerate(day1, "12:00:00"), gs.dateGenerate(day1, "12:15:00")
                    // gs.dateGenerate(day1, "12:45:00"), gs.dateGenerate(day1, "13:30:00")
                    // gs.dateGenerate(day2, "start"), gs.dateGenerate(day2, "end")
                ]
            },
            {
                short_description: 'SInc: 1H; DInc: 15M; Min: 15M; Max: 1H',
                step_sys_id: 'b4f80e5e97191110d87839000153af9e',
                parameterSets: [
                    // TODO: Add parameter sets
                    // gs.dateGenerate(gs.daysAgoStart(0).substring(0, 10), "16:00:00"), gs.dateGenerate(day1, "09:00:00")
                    // gs.dateGenerate(day1, "11:45:00"), gs.dateGenerate(day1, "12:00:00")
                    // gs.dateGenerate(day1, "12:00:00"), gs.dateGenerate(day1, "12:15:00")
                    // gs.dateGenerate(day1, "12:45:00"), gs.dateGenerate(day1, "13:30:00")
                    // gs.dateGenerate(day2, "start"), gs.dateGenerate(day2, "end")
                ]
            }
        ];
        for (var schedulerParameters of testParameters) {
            var sys_id: string | undefined = atfHelper.getRecordIdFromStep(schedulerParameters.step_sys_id);
            if (x_g_inte_site_17.AtfHelper.isNil(sys_id))
                return false;
            var constructorSignature: string = 'new ReservationScheduler("' + sys_id + '" /* ' + schedulerParameters.short_description + ' */, true)';
            var rs: x_g_inte_site_17.ReservationScheduler;
            try { rs = new x_g_inte_site_17.ReservationScheduler(sys_id, true); }
            catch (e) {
                atfHelper.setFailed("Unexpected exception while initializing " + constructorSignature, e);
                return false;
            }
            for (var parameterSet of schedulerParameters.parameterSets) {
                var desc = parameterSet.test_description + ' with ' + constructorSignature;
                var actualArray: x_g_inte_site_17.ITimeSpan[];
                stepResult.setOutputMessage(JSON.stringify({
                    fromDateTime: parameterSet.fromDateTime.getValue() + ' (' + parameterSet.fromDateTime.getDisplayValue() + ')',
                    toDateTime: parameterSet.toDateTime.getValue() + ' (' + parameterSet.toDateTime.getDisplayValue() + ')',
                    minimumDuration: (typeof parameterSet.minimumDuration === undefined) ? undefined : (<GlideDuration>parameterSet.minimumDuration).getDurationValue(),
                }));
                try {
                    if (typeof parameterSet.minimumDuration === 'undefined')
                        actualArray = x_g_inte_site_17.Site17Util.iteratorToArray<x_g_inte_site_17.ITimeSpan>(rs.getAvailabilitiesInRange(parameterSet.fromDateTime, parameterSet.toDateTime));
                    else
                        actualArray = x_g_inte_site_17.Site17Util.iteratorToArray<x_g_inte_site_17.ITimeSpan>(rs.getAvailabilitiesInRange(parameterSet.fromDateTime, parameterSet.toDateTime, parameterSet.minimumDuration));
                } catch (e) {
                    atfHelper.setFailed("Unexpected exception while testing " + desc, e);
                    return false;
                }
                stepResult.setOutputMessage(JSON.stringify({
                    fromDateTime: parameterSet.fromDateTime.getValue() + ' (' + parameterSet.fromDateTime.getDisplayValue() + ')',
                    toDateTime: parameterSet.toDateTime.getValue() + ' (' + parameterSet.toDateTime.getDisplayValue() + ')',
                    minimumDuration: (typeof parameterSet.minimumDuration === undefined) ? undefined : (<GlideDuration>parameterSet.minimumDuration).getDurationValue(),
                    expected: parameterSet.expected.map(function(item: x_g_inte_site_17.ITimeSpan): {
                        start: string;
                        duration: string | undefined;
                    } {
                        return {
                            start: item.start.getValue() + ' (' + item.start.getDisplayValue() + ')',
                            duration: (typeof item.duration === 'undefined') ? undefined : item.duration.getDurationValue()
                        };
                    }),
                    actual: actualArray.map(function(item: x_g_inte_site_17.ITimeSpan): {
                        start: string;
                        duration: string | undefined;
                    } {
                        return {
                            start: item.start.getValue() + ' (' + item.start.getDisplayValue() + ')',
                            duration: (typeof item.duration === 'undefined') ? undefined : item.duration.getDurationValue()
                        };
                    })
                }));
                assertEqual({
                    name: 'return value defined for ' + desc,
                    shouldbe: true,
                    value: typeof actualArray !== 'undefined'
                });
                assertEqual({
                    name: 'length of return value for ' + desc,
                    shouldbe: parameterSet.expected.length,
                    value: actualArray.length
                });
                for (var i = 0; i < actualArray.length; i++) {
                    var expectedItem = parameterSet.expected[i];
                    var actualItem = actualArray[i];
                    assertEqual({
                        name: 'element ' + i  + ' defined for ' + desc,
                        shouldbe: true,
                        value: typeof actualItem === 'object' && actualItem !== null
                    });
                    assertEqual({
                        name: 'startDateTime of element ' + i  + ' for ' + desc,
                        shouldbe: expectedItem.start,
                        value: actualItem.start
                    });
                    assertEqual({
                        name: 'duration of element ' + i  + ' for ' + desc,
                        shouldbe: expectedItem.duration,
                        value: actualItem.duration
                    });
                }
            }
        }
        return true;
    })(outputs, steps, stepResult, assertEqual);
}