declare namespace constructorTest {
    type ReservationTypeShortDescription = 'SInc: 1M; DInc: 15M; Min: 15M; Max: 1H' | 'SInc: 30M; DInc: 15M; Min: 15M; Max: 45M' | 'SInc: 1H; DInc: 1H; Min: 1H; Max: 1H; Appr: true' | 'SInc: 15M; DInc: 30M; Min: 30M; Max: 2H30M; Inactive: true' | 'SInc: 1H; DInc: 1M; Min: 1M; Max: 3H12M' | 'SInc: 1H; DInc: 15M; Min: 15M; Max: 1H';
    interface IReservationTypeDurationParameters {
        minimum_duration: GlideDuration;
        maximum_duration: GlideDuration;
        duration_increment: GlideDuration;
        start_time_interval: GlideDuration;
    }
    interface IReservationTypeInputParameters extends IReservationTypeDurationParameters {
        approval_group_empty: boolean;
        inactive: boolean;
    }
    interface IReservationTypeOutputItem {
        sys_id: string;
        minimum_duration: string;
        maximum_duration: string;
        duration_increment: string;
        start_time_interval: string;
        approval_group_empty: boolean;
        inactive: boolean;
    }
    type IReservationTypeOutput = {
        [key in ReservationTypeShortDescription]: IReservationTypeOutputItem;
    };
    type IConstructorTestOutputs = sn_atf.ITestStepOutputs & {
        defaultTimeZone: string;
        altTimeZone: string;
        types: string;
    };
}
declare namespace normalizationFunctionsTest {
}
declare namespace getAvailabilitiesInRangeTest {
}
