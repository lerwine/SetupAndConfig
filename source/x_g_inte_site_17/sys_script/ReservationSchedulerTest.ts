namespace constructorTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    //  'SInt: 15M; Dur: inc=1M, min=1M, max=1H',
            // 'SInt: 30M; Dur: inc=30M, min=30M, max=30M',
    export declare type ReservationTypeShortDescription = 'SInt: 1M; Dur: inc=1M, min=15M, max=1H55M' |
                                                          'SInt: 30M; Dur: inc=15M, min=15M, max=59M' |
                                                          'SInt: 1H; Dur: inc=1H, min=1H, max=1H' |
                                                          'SInt: 15M; Dur: inc=30M, min=1H30M, max=3H' |
                                                          'SInt: 1H; Dur: inc=1M, min=1M, max=3H12M';

    interface IConstructorParameterSet {
        allowInactive?: boolean;
        timeZone?: string;
        expectedTimeZone: string;
        getExpectedErrorMessage?: { (sys_id: string, ps: IReservationTypeParameterSet): string; }
    }

    export interface IReservationTypeDurationParameters {
        minimum_duration_ms: number;
        maximum_duration_ms: number;
        duration_increment_ms: number;
        start_time_interval_ms: number;
    }
    
    export interface IReservationTypeInputParameters extends IReservationTypeDurationParameters {
        approval_group_empty: boolean;
        inactive: boolean;
    }

    interface IReservationTypeParameterSet {
        test_description: string;
        parameters: IReservationTypeInputParameters;
        expected: IReservationTypeDurationParameters & {
            short_description: ReservationTypeShortDescription;
        };
        constructorParameterSets: IConstructorParameterSet[];
    }

    export interface IReservationTypeOutputItem extends IReservationTypeInputParameters {
        sys_id: string;
    }

    export type IReservationTypeOutput = { [key in ReservationTypeShortDescription]: IReservationTypeOutputItem; };

    export type IConstructorTestOutputs = sn_atf.ITestStepOutputs & {
        defaultTimeZone: string;
        altTimeZone: string;
        types: string;
    };
    (function(outputs: IConstructorTestOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc) {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string | undefined = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id: string | undefined = atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id: string | undefined = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        if (gs.nil(schedule_sys_id) || gs.nil(approval_group_sys_id) || gs.nil(assignment_group_sys_id))
            return;
        var defaultTimeZone: string | undefined;
        try { defaultTimeZone = gs.getSession().getTimeZoneName(); }
        catch (e) {
            defaultTimeZone = '';
            atfHelper.setFailed("Unexpected exception while getting time zone", e);
        }
        if (gs.nil(defaultTimeZone)) {
            atfHelper.setFailed("Could not determine default time zone");
        }
        outputs.defaultTimeZone = defaultTimeZone;
        var altTimeZone: string = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        outputs.altTimeZone = altTimeZone;
        function getExpectedInactiveTypeErrorMessage(sys_id: string, ps: IReservationTypeParameterSet): string {
            return "Reservation Type \"" + ps.expected.short_description + "\" (" + sys_id + ", " + JSON.stringify(ps.parameters) + ") is inactive.";
        }
        var parameterSetArray: IReservationTypeParameterSet[] = [
            {
                test_description: "All values round up to nearest minute",
                parameters: {
                    start_time_interval_ms: 0,  // 0S
                    duration_increment_ms: 1,  // 0.001S
                    minimum_duration_ms: 899999,  // 14M59.999S
                    maximum_duration_ms: 3654321, // 1H54.321S
                    approval_group_empty: false,
                    inactive: false
                },
                expected: {
                    short_description: 'SInt: 1M; Dur: inc=1M, min=15M, max=1H55M',
                    start_time_interval_ms: 60000,  // 1M
                    duration_increment_ms: 60000,  // 1M
                    minimum_duration_ms: 900000,  // 15M
                    maximum_duration_ms: 6900000 // 1H55M
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
                test_description: "Min 1 MS less than 1 Hour",
                parameters: {
                    start_time_interval_ms: 3540000, // 1H
                    duration_increment_ms: 3599999, // 1H
                    minimum_duration_ms: 3599999, // 59M59.999S
                    maximum_duration_ms: 3600000, // 1H
                    approval_group_empty: false,
                    inactive: false
                },
                expected: {
                    short_description: 'SInt: 1H; Dur: inc=1H, min=1H, max=1H',
                    start_time_interval_ms: 3540000, // 1H
                    duration_increment_ms: 3600000, // 1H
                    minimum_duration_ms: 3600000, // 1H
                    maximum_duration_ms: 3600000 // 1H
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
                test_description: "Inactive & Max 1 MS beyond 58 minutes",
                parameters: {
                    start_time_interval_ms: 1800000, // 30M
                    duration_increment_ms: 900000,  // 15M
                    minimum_duration_ms: 60000,  // 1M
                    maximum_duration_ms: 3480001, // 58M0.001S
                    approval_group_empty: false,
                    inactive: true
                },
                expected: {
                    short_description: 'SInt: 30M; Dur: inc=15M, min=15M, max=59M',
                    start_time_interval_ms: 1800000, // 30M
                    duration_increment_ms: 900000,  // 15M
                    minimum_duration_ms: 900000,  // 15M
                    maximum_duration_ms: 3540000 // 59M
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
                test_description: "Min and Max rounds up to nearest 30-minute",
                parameters: {
                    start_time_interval_ms: 900000,  // 15M
                    duration_increment_ms: 1800000, // 30M
                    minimum_duration_ms: 4500000, // 1H15M
                    maximum_duration_ms: 9000001, // 2H30M0.001S
                    approval_group_empty: true,
                    inactive: false
                },
                expected: {
                    short_description: 'SInt: 15M; Dur: inc=30M, min=1H30M, max=3H',
                    start_time_interval_ms: 900000,  // 15M
                    duration_increment_ms: 1800000, // 30M
                    minimum_duration_ms: 5400000, // 1H30M
                    maximum_duration_ms: 10800000 // 3H
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
                test_description: "No values rounded",
                parameters: {
                    start_time_interval_ms: 3600000, // 1H
                    duration_increment_ms: 60000,  // 1M
                    minimum_duration_ms: 60000,  // 1M
                    maximum_duration_ms: 11520000,  // 3H12M
                    approval_group_empty: true,
                    inactive: false
                },
                expected: {
                    short_description: 'SInt: 1H; Dur: inc=1M, min=1M, max=3H12M',
                    start_time_interval_ms: 3600000, // 1H
                    duration_increment_ms: 60000,  // 1M
                    minimum_duration_ms: 60000,  // 1M
                    maximum_duration_ms: 11520000  // 3H12M
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
        var outputItems: IReservationTypeOutput = <IReservationTypeOutput>{};
        for (var parameterSet of parameterSetArray) {
            var gr = new GlideRecord('x_g_inte_site_17_reservation_type');
            try {
                gr.setValue('short_description', parameterSet.expected.short_description);
                gr.setValue('schedule', schedule_sys_id);
                gr.setValue('assignment_group', assignment_group_sys_id);
                if (!parameterSet.parameters.approval_group_empty)
                    gr.setValue('approval_group', approval_group_sys_id);
                gr.setValue('duration_increment',  new GlideDuration(parameterSet.parameters.duration_increment_ms));
                gr.setValue('minimum_duration', new GlideDuration(parameterSet.parameters.minimum_duration_ms));
                gr.setValue('maximum_duration', new GlideDuration(parameterSet.parameters.maximum_duration_ms));
                gr.setValue('start_time_interval', new GlideDuration(parameterSet.parameters.start_time_interval_ms));
                if (gs.nil(gr.insert())) throw new Error('Failed to create test reservation type (' + JSON.stringify(parameterSet.parameters) + ')');
            } catch (e) {
                atfHelper.setFailed('Unable to insert test Reservation Type (' + JSON.stringify(parameterSet.parameters) + ')', e);
            }
            outputItems[parameterSet.expected.short_description] = {
                minimum_duration_ms: parameterSet.expected.minimum_duration_ms,
                maximum_duration_ms: parameterSet.expected.maximum_duration_ms,
                duration_increment_ms: parameterSet.expected.duration_increment_ms,
                start_time_interval_ms: parameterSet.expected.start_time_interval_ms,
                approval_group_empty: parameterSet.parameters.approval_group_empty,
                inactive: parameterSet.parameters.inactive,
                sys_id: '' + gr.sys_id
            };
            var rs: x_g_inte_site_17.ReservationScheduler;
            for (var cps of parameterSet.constructorParameterSets) {
                var cDesc = JSON.stringify(cps);
                try {
                    if (gs.nil(cps.timeZone)) {
                        if (gs.nil(cps.allowInactive))
                            rs = new x_g_inte_site_17.ReservationScheduler(<x_g_inte_site_17.reservationTypeGlideRecord>gr);
                        else
                            rs = new x_g_inte_site_17.ReservationScheduler(<x_g_inte_site_17.reservationTypeGlideRecord>gr, cps.allowInactive);
                    } else
                        rs = new x_g_inte_site_17.ReservationScheduler(<x_g_inte_site_17.reservationTypeGlideRecord>gr, cps.allowInactive, cps.timeZone);
                } catch (e) {
                    if (gs.nil(cps.getExpectedErrorMessage)) {
                        atfHelper.setFailed('Unable to create instance of ReservationScheduler for ' + parameterSet.test_description, e) + ' of ' + cDesc;
                        return;
                    }
                    assertEqual({
                        name: 'Error Message from ' + parameterSet.test_description + ' of ' + cDesc,
                        shouldBe: cps.getExpectedErrorMessage('' + gr.sys_id, parameterSet),
                        value: (<Error>e).message
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
                    shouldBe: parameterSet.expected.short_description,
                    value: rs.timeZone
                });
                assertEqual({
                    name: 'short_description not nil for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: false,
                    value: gs.nil(rs.short_description)
                });
                assertEqual({
                    name: 'short_description value for ' + parameterSet.test_description + ' of ' + cDesc,
                    shouldBe: parameterSet.expected.short_description,
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
                if (parameterSet.parameters.approval_group_empty)
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
                    shouldBe: new GlideDuration(parameterSet.expected.duration_increment_ms),
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
                    shouldBe: new GlideDuration(parameterSet.expected.minimum_duration_ms),
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
                    shouldBe: new GlideDuration(parameterSet.expected.maximum_duration_ms),
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
                    shouldBe: new GlideDuration(parameterSet.expected.start_time_interval_ms),
                    value: rs.start_time_interval
                });
            }
        }
        outputs.types = JSON.stringify(outputItems);
    })(<IConstructorTestOutputs>outputs, steps, stepResult, assertEqual);
}

namespace normalizationFunctionsTest {
    declare var outputs: sn_atf.ITestStepOutputs;
    declare function steps(sys_id: string): sn_atf.ITestStepOutputs;
    declare var stepResult: sn_atf.ITestStepResult;
    declare function assertEqual(assertion: sn_atf.ITestAssertion): void;
    
    interface IReservationTypeParameterSet {
        short_description: constructorTest.ReservationTypeShortDescription;
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
        durations: (IInputAndExpected<GlideDuration, GlideDuration> & { returns: number; })[];
        startDates: (IInputAndExpected<GlideDateTime, GlideDateTime> & { offset: number; returns: number })[];
    }

    interface ITestParameterSet {
        durations: (IInputAndExpected<GlideDuration, GlideDuration> & { test_description: string; returns: number })[];
        startDates: (IInputAndExpected<GlideDateTime, GlideDateTime> & { test_description: string; offset: number; returns: number })[];
    }

    type TestParameters = { [key in constructorTest.ReservationTypeShortDescription]: ITestParameterSet; };

    (function (outputs: sn_atf.ITestStepOutputs, steps: sn_atf.ITestStepsFunc, stepResult: sn_atf.ITestStepResult, assertEqual: sn_atf.IAssertEqualFunc) {
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var group_sys_id: string = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        var constructorOutputs: constructorTest.IConstructorTestOutputs = <constructorTest.IConstructorTestOutputs>steps('c1cc9ada97411110d87839000153afcd');
        if (gs.nil(schedule_sys_id) || gs.nil(group_sys_id) || gs.nil(constructorOutputs))
            return;
        var outputItems: constructorTest.IReservationTypeOutput = JSON.parse(constructorOutputs.types);
        var testParameters: TestParameters = {
            'SInt: 1M; Dur: inc=1M, min=15M, max=1H55M': { // { start_time_interval_ms: 60000, duration_increment_ms: 60000, minimum_duration_ms: 900000, maximum_duration_ms: 6900000 }
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration(0), expected: new GlideDuration(900000), returns: 900000 },
                    { test_description: "[0.001S]=15M (+14M59.999S)", input: new GlideDuration(1), expected: new GlideDuration(900000), returns: 899999 },
                    { test_description: "[1M]=15M (+14M)", input: new GlideDuration(60000), expected: new GlideDuration(900000), returns: 840000 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration(450000), expected: new GlideDuration(900000), returns: 450000 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration(900000), expected: new GlideDuration(900000), returns: 0 },
                    { test_description: "[15M0.001S]=16M (+59.999S)", input: new GlideDuration(900001), expected: new GlideDuration(960000), returns: 59999 },
                    { test_description: "[15M59.999S]=16M (+0.001S)", input: new GlideDuration(959999), expected: new GlideDuration(960000), returns: 1 },
                    { test_description: "[16M]=16M (+0S)", input: new GlideDuration(960000), expected: new GlideDuration(960000), returns: 0 },
                    { test_description: "[1H54M0.001S]=1H55M (+59.999S)", input: new GlideDuration(6840001), expected: new GlideDuration(6900000), returns: 59999 },
                    { test_description: "[1H54M]=1H54M (+0S)", input: new GlideDuration(6840000), expected: new GlideDuration(6840000), returns: 0 },
                    { test_description: "[1H54M59.999S]=1H55M (+0.001S)", input: new GlideDuration(6899999), expected: new GlideDuration(6900000), returns: 1 },
                    { test_description: "[1H55M]=1H55M (+0S)", input: new GlideDuration(6900000), expected: new GlideDuration(6900000), returns: 0 },
                    { test_description: "[1H55M0.001S]=1H55M (no round up)", input: new GlideDuration(6900001), expected: new GlideDuration(6900000), returns: 0 },
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00.000]=2022-08-02 00:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:00.001]=2022-08-02 00:01:00.000 (+59.999S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 59999 },
                    { test_description: "[2022-08-02 00:00:30.000]=2022-08-02 00:01:00.000 (+30S)", input: new GlideDateTime('2022-08-02 00:00:30'), offset: 0, expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 30000 },
                    { test_description: "[2022-08-02 00:00:59.999]=2022-08-02 00:01:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 00:00:59'), offset: 999, expected: new GlideDateTime('2022-08-02 00:01:00'), returns: 1 },
                    { test_description: "[2022-08-02 14:59:59.999]=2022-08-02 15:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 14:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 15:01:00.000]=2022-08-02 15:01:00.000 (+0S)", input: new GlideDateTime('2022-08-02 15:01:00'), offset: 0, expected: new GlideDateTime('2022-08-02 15:01:00'), returns: 0 },
                    { test_description: "[2022-08-02 15:01:00.001]=2022-08-02 15:02:00.000 (+59.999S)", input: new GlideDateTime('2022-08-02 15:01:00'), offset: 1, expected: new GlideDateTime('2022-08-02 15:02:00'), returns: 59999 },
                    { test_description: "[2022-08-02 23:59:00.000]=2022-08-02 23:59:00.000 (+0S)", input: new GlideDateTime('2022-08-02 23:59:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:59:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:59:00.001]=2022-08-03 00:00:00.000 (+59.999S)", input: new GlideDateTime('2022-08-02 23:59:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 59999 },
                    { test_description: "[2022-08-02 23:59:59.999]=2022-08-03 00:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 23:59:59'), offset: 999, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1 },
                ]
            },
            'SInt: 1H; Dur: inc=1M, min=1M, max=3H12M': { // { start_time_interval_ms: 3600000, duration_increment_ms: 60000, minimum_duration_ms: 60000, maximum_duration_ms: 11520000 }
                durations: [
                    { test_description: "[0S]=1M (+1M)", input: new GlideDuration(0), expected: new GlideDuration(60000), returns: 60000 },
                    { test_description: "[0.001S]=1M (+59.999S)", input: new GlideDuration(1), expected: new GlideDuration(60000), returns: 59999 },
                    { test_description: "[1H]=1H (+0S)", input: new GlideDuration(3600000), expected: new GlideDuration(3600000), returns: 0 },
                    { test_description: "[1M]=1M (+0S)", input: new GlideDuration(60000), expected: new GlideDuration(60000), returns: 0 },
                    { test_description: "[30S]=1M (+30S)", input: new GlideDuration(30000), expected: new GlideDuration(60000), returns: 30000 },
                    { test_description: "[1M0.001S]=2M (+59.999S)", input: new GlideDuration(60001), expected: new GlideDuration(120000), returns: 59999 },
                    { test_description: "[1M59.999S]=2M (+0.001S)", input: new GlideDuration(119999), expected: new GlideDuration(120000), returns: 1 },
                    { test_description: "[2M]=2M (+0S)", input: new GlideDuration(120000), expected: new GlideDuration(120000), returns: 0 },
                    { test_description: "[3H11M0.001S]=3H12M (+59.999S)", input: new GlideDuration(11460001), expected: new GlideDuration(11520000), returns: 59999 },
                    { test_description: "[3H11M]=3H11M (+0S)", input: new GlideDuration(11460000), expected: new GlideDuration(11460000), returns: 0 },
                    { test_description: "[3H11M59.999S]=3H12M (+0.001S)", input: new GlideDuration(11519999), expected: new GlideDuration(11520000), returns: 1 },
                    { test_description: "[3H12M]=3H12M (+0S)", input: new GlideDuration(11520000), expected: new GlideDuration(11520000), returns: 0 },
                    { test_description: "[3H12M0.001S]=3H12M (no round up)", input: new GlideDuration(11520001), expected: new GlideDuration(11520000), returns: 0 },
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00.000]=2022-08-02 00:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:00.001]=2022-08-02 01:00:00.000 (+59M59.999S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 3599999 },
                    { test_description: "[2022-08-02 00:30:00.000]=2022-08-02 01:00:00.000 (+30M)", input: new GlideDateTime('2022-08-02 00:30:00'), offset: 0, expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1800000 },
                    { test_description: "[2022-08-02 00:59:59.999]=2022-08-02 01:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 00:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 14:59:59.999]=2022-08-02 15:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 14:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 16:00:00.000]=2022-08-02 16:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 16:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 16:00:00.001]=2022-08-02 17:00:00.000 (+59M59.999S)", input: new GlideDateTime('2022-08-02 16:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 17:00:00'), returns: 3599999 },
                    { test_description: "[2022-08-02 23:00:00.000]=2022-08-02 23:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 23:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:00:00.001]=2022-08-03 00:00:00.000 (+59M59.999S)", input: new GlideDateTime('2022-08-02 23:00:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 3599999 },
                    { test_description: "[2022-08-02 23:59:59.999]=2022-08-03 00:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 23:59:59'), offset: 999, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1 },
                ]
            },
            "SInt: 1H; Dur: inc=1H, min=1H, max=1H": { // { start_time_interval_ms: 3600000, duration_increment_ms: 3600000, minimum_duration_ms: 3600000, maximum_duration_ms: 3600000 }
                durations: [
                    { test_description: "[0S]=1H (+1H)", input: new GlideDuration(0), expected: new GlideDuration(3600000), returns: 3600000 },
                    { test_description: "[0.001S]=1H (+59M59.999S)", input: new GlideDuration(1), expected: new GlideDuration(3600000), returns: 3599999 },
                    { test_description: "[1H]=1H (+0S)", input: new GlideDuration(3600000), expected: new GlideDuration(3600000), returns: 0 },
                    { test_description: "[30M]=1H (+30M)", input: new GlideDuration(1800000), expected: new GlideDuration(3600000), returns: 1800000 },
                    { test_description: "[1H0.001S]=1H (no round up)", input: new GlideDuration(3600001), expected: new GlideDuration(3600000), returns: 0 },
                    { test_description: "[1H59M59.999S]=1H (no round up)", input: new GlideDuration(7199999), expected: new GlideDuration(3600000), returns: 0 },
                    { test_description: "[2H]=1H (no round up)", input: new GlideDuration(7200000), expected: new GlideDuration(3600000), returns: 0 },
                    { test_description: "[59M59.999S]=1H (+0.001S)", input: new GlideDuration(3599999), expected: new GlideDuration(3600000), returns: 1 },
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00.000]=2022-08-02 00:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:00.001]=2022-08-02 01:00:00.000 (+59M59.999S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 3599999 },
                    { test_description: "[2022-08-02 00:30:00.000]=2022-08-02 01:00:00.000 (+30M)", input: new GlideDateTime('2022-08-02 00:30:00'), offset: 0, expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1800000 },
                    { test_description: "[2022-08-02 00:59:59.999]=2022-08-02 01:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 00:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 01:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 14:59:59.999]=2022-08-02 15:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 14:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 16:00:00.000]=2022-08-02 16:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 16:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 16:00:00.001]=2022-08-02 17:00:00.000 (+59M59.999S)", input: new GlideDateTime('2022-08-02 16:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 17:00:00'), returns: 3599999 },
                    { test_description: "[2022-08-02 23:00:00.000]=2022-08-02 23:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 23:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:00:00.001]=2022-08-03 00:00:00.000 (+59M59.999S)", input: new GlideDateTime('2022-08-02 23:00:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 3599999 },
                    { test_description: "[2022-08-02 23:59:59.999]=2022-08-03 00:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 23:59:59'), offset: 999, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1 },
                ]
            },
            "SInt: 15M; Dur: inc=30M, min=1H30M, max=3H": { // { start_time_interval_ms: 900000, duration_increment_ms: 1800000, minimum_duration_ms: 5400000, maximum_duration_ms: 10800000 }
                durations: [
                    { test_description: "[0S]=1H30M (+1H30M)", input: new GlideDuration(0), expected: new GlideDuration(5400000), returns: 5400000 },
                    { test_description: "[0.001S]=1H30M (+1H29M59.999S)", input: new GlideDuration(1), expected: new GlideDuration(5400000), returns: 5399999 },
                    { test_description: "[15M]=1H30M (+1H15M)", input: new GlideDuration(900000), expected: new GlideDuration(5400000), returns: 4500000 },
                    { test_description: "[30M]=1H30M (+1H)", input: new GlideDuration(1800000), expected: new GlideDuration(5400000), returns: 3600000 },
                    { test_description: "[45M]=1H30M (+45M)", input: new GlideDuration(2700000), expected: new GlideDuration(5400000), returns: 2700000 },
                    { test_description: "[1H30M]=1H30M (+0S)", input: new GlideDuration(5400000), expected: new GlideDuration(5400000), returns: 0 },
                    { test_description: "[1H30M0.001S]=2H (+29M59.999S)", input: new GlideDuration(5400001), expected: new GlideDuration(7200000), returns: 1799999 },
                    { test_description: "[1H59M59.999S]=2H (+0.001S)", input: new GlideDuration(7199999), expected: new GlideDuration(7200000), returns: 1 },
                    { test_description: "[2H]=2H (+0S)", input: new GlideDuration(7200000), expected: new GlideDuration(7200000), returns: 0 },
                    { test_description: "[2H30M0.001S]=3H (+29M59.999S)", input: new GlideDuration(9000001), expected: new GlideDuration(10800000), returns: 1799999 },
                    { test_description: "[2H30M]=2H30M (+0S)", input: new GlideDuration(9000000), expected: new GlideDuration(9000000), returns: 0 },
                    { test_description: "[2H59M59.999S]=3H (+0.001S)", input: new GlideDuration(10799999), expected: new GlideDuration(10800000), returns: 1 },
                    { test_description: "[3H]=3H (+0S)", input: new GlideDuration(10800000), expected: new GlideDuration(10800000), returns: 0 },
                    { test_description: "[3H0.001S]=3H (no round up)", input: new GlideDuration(10800001), expected: new GlideDuration(10800000), returns: 0 },
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00.000]=2022-08-02 00:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:00.001]=2022-08-02 00:15:00.000 (+14M59.999S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 899999 },
                    { test_description: "[2022-08-02 00:07:30.000]=2022-08-02 00:15:00.000 (+7M30S)", input: new GlideDateTime('2022-08-02 00:07:30'), offset: 0, expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 450000 },
                    { test_description: "[2022-08-02 00:14:59.999]=2022-08-02 00:15:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 00:14:59'), offset: 999, expected: new GlideDateTime('2022-08-02 00:15:00'), returns: 1 },
                    { test_description: "[2022-08-02 14:59:59.999]=2022-08-02 15:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 14:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 15:15:00.000]=2022-08-02 15:15:00.000 (+0S)", input: new GlideDateTime('2022-08-02 15:15:00'), offset: 0, expected: new GlideDateTime('2022-08-02 15:15:00'), returns: 0 },
                    { test_description: "[2022-08-02 15:15:00.001]=2022-08-02 15:30:00.000 (+14M59.999S)", input: new GlideDateTime('2022-08-02 15:15:00'), offset: 1, expected: new GlideDateTime('2022-08-02 15:30:00'), returns: 899999 },
                    { test_description: "[2022-08-02 23:45:00.000]=2022-08-02 23:45:00.000 (+0S)", input: new GlideDateTime('2022-08-02 23:45:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:45:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:45:00.001]=2022-08-03 00:00:00.000 (+14M59.999S)", input: new GlideDateTime('2022-08-02 23:45:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 899999 },
                    { test_description: "[2022-08-02 23:59:59.999]=2022-08-03 00:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 23:59:59'), offset: 999, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1 },
                ]
            },
            "SInt: 30M; Dur: inc=15M, min=15M, max=59M": { // { start_time_interval_ms: 1800000, duration_increment_ms: 900000, minimum_duration_ms: 900000, maximum_duration_ms: 3540000 }
                durations: [
                    { test_description: "[0S]=15M (+15M)", input: new GlideDuration(0), expected: new GlideDuration(900000), returns: 900000 },
                    { test_description: "[0.001S]=15M (+14M59.999S)", input: new GlideDuration(1), expected: new GlideDuration(900000), returns: 899999 },
                    { test_description: "[30M]=30M (+0S)", input: new GlideDuration(1800000), expected: new GlideDuration(1800000), returns: 0 },
                    { test_description: "[15M]=15M (+0S)", input: new GlideDuration(900000), expected: new GlideDuration(900000), returns: 0 },
                    { test_description: "[7M30S]=15M (+7M30S)", input: new GlideDuration(450000), expected: new GlideDuration(900000), returns: 450000 },
                    { test_description: "[15M0.001S]=30M (+14M59.999S)", input: new GlideDuration(900001), expected: new GlideDuration(1800000), returns: 899999 },
                    { test_description: "[29M59.999S]=30M (+0.001S)", input: new GlideDuration(1799999), expected: new GlideDuration(1800000), returns: 1 },
                    { test_description: "[44M0.001S]=45M (+59.999S)", input: new GlideDuration(2640001), expected: new GlideDuration(2700000), returns: 59999 },
                    { test_description: "[44M]=45M (+1M)", input: new GlideDuration(2640000), expected: new GlideDuration(2700000), returns: 60000 },
                    { test_description: "[58M59.999S]=1H (+1M0.001S)", input: new GlideDuration(3539999), expected: new GlideDuration(3600000), returns: 60001 },
                    { test_description: "[59M]=1H (+1M)", input: new GlideDuration(3540000), expected: new GlideDuration(3600000), returns: 60000 },
                    { test_description: "[59M0.001S]=59M (no round up)", input: new GlideDuration(3540001), expected: new GlideDuration(3540000), returns: 0 },
                ],
                startDates: [
                    { test_description: "[2022-08-02 00:00:00.000]=2022-08-02 00:00:00.000 (+0S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:00:00'), returns: 0 },
                    { test_description: "[2022-08-02 00:00:00.001]=2022-08-02 00:30:00.000 (+29M59.999S)", input: new GlideDateTime('2022-08-02 00:00:00'), offset: 1, expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 1799999 },
                    { test_description: "[2022-08-02 00:15:00.000]=2022-08-02 00:30:00.000 (+15M)", input: new GlideDateTime('2022-08-02 00:15:00'), offset: 0, expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 900000 },
                    { test_description: "[2022-08-02 00:29:59.999]=2022-08-02 00:30:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 00:29:59'), offset: 999, expected: new GlideDateTime('2022-08-02 00:30:00'), returns: 1 },
                    { test_description: "[2022-08-02 14:59:59.999]=2022-08-02 15:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 14:59:59'), offset: 999, expected: new GlideDateTime('2022-08-02 15:00:00'), returns: 1 },
                    { test_description: "[2022-08-02 15:30:00.000]=2022-08-02 15:30:00.000 (+0S)", input: new GlideDateTime('2022-08-02 15:30:00'), offset: 0, expected: new GlideDateTime('2022-08-02 15:30:00'), returns: 0 },
                    { test_description: "[2022-08-02 15:30:00.001]=2022-08-02 16:00:00.000 (+29M59.999S)", input: new GlideDateTime('2022-08-02 15:30:00'), offset: 1, expected: new GlideDateTime('2022-08-02 16:00:00'), returns: 1799999 },
                    { test_description: "[2022-08-02 23:30:00.000]=2022-08-02 23:30:00.000 (+0S)", input: new GlideDateTime('2022-08-02 23:30:00'), offset: 0, expected: new GlideDateTime('2022-08-02 23:30:00'), returns: 0 },
                    { test_description: "[2022-08-02 23:30:00.001]=2022-08-03 00:00:00.000 (+29M59.999S)", input: new GlideDateTime('2022-08-02 23:30:00'), offset: 1, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1799999 },
                    { test_description: "[2022-08-02 23:59:59.999]=2022-08-03 00:00:00.000 (+0.001S)", input: new GlideDateTime('2022-08-02 23:59:59'), offset: 999, expected: new GlideDateTime('2022-08-03 00:00:00'), returns: 1 },
                ]
            }
        };
        for (var short_description in testParameters) {
            var parameterSet: ITestParameterSet = testParameters[<constructorTest.ReservationTypeShortDescription>short_description];
            var reservationType: constructorTest.IReservationTypeOutputItem = outputItems[<constructorTest.ReservationTypeShortDescription>short_description];
            var constructorSignature: string = 'new ReservationScheduler("' + reservationType.sys_id + '" /* ' + short_description + ' */)';
            var rs: x_g_inte_site_17.ReservationScheduler;
            try { rs = new x_g_inte_site_17.ReservationScheduler(reservationType.sys_id); }
            catch (e) {
                atfHelper.setFailed("Unexpected exception while initializing " + constructorSignature, e);
                return;
            }
            var value: number;
            var msg: string;
            for (var durationParam of parameterSet.durations) {
                var target = new GlideDuration(durationParam.input);
                try { value = rs.normalizeDuration(target); }
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
            for (var dateParam of parameterSet.startDates) {
                var input = new GlideDateTime(dateParam.input);
                if (dateParam.offset > 0) input.add(dateParam.offset);
                try { value = rs.normalizeStartDate(input); }
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
        var atfHelper: x_g_inte_site_17.AtfHelper = new x_g_inte_site_17.AtfHelper(steps, stepResult);
        var schedule_sys_id: string | undefined = atfHelper.getRecordIdFromStep('8b4ed58697051110d87839000153afae');
        var approval_group_sys_id: string | undefined = atfHelper.getRecordIdFromStep('cf4c1e1a97411110d87839000153aff6');
        var assignment_group_sys_id: string | undefined = atfHelper.getRecordIdFromStep('f70fd5c697051110d87839000153af81');
        if (gs.nil(schedule_sys_id) || gs.nil(approval_group_sys_id) || gs.nil(assignment_group_sys_id))
            return;
        var defaultTimeZone: string | undefined;
        try { defaultTimeZone = gs.getSession().getTimeZoneName(); }
        catch (e) {
            defaultTimeZone = '';
            atfHelper.setFailed("Unexpected exception while getting time zone", e);
        }
        if (gs.nil(defaultTimeZone)) {
            atfHelper.setFailed("Could not determine default time zone");
        }
        var altTimeZone: string = (defaultTimeZone == 'US/Pacific') ? 'US/Eastern' : 'US/Pacific';
        var gdt = new GlideDateTime();
        var altTzOffset = new GlideDateTime(new GlideScheduleDateTime(gdt).convertTimeZone(defaultTimeZone, altTimeZone)).getNumericValue() - gdt.getNumericValue();

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