declare namespace constructorTest {
    type ReservationTypeShortDescription = 'SInt: 1M; Dur: inc=1M, min=15M, max=1H55M' | 'SInt: 30M; Dur: inc=15M, min=15M, max=59M' | 'SInt: 1H; Dur: inc=1H, min=1H, max=1H' | 'SInt: 15M; Dur: inc=30M, min=1H30M, max=3H' | 'SInt: 1H; Dur: inc=1M, min=1M, max=3H12M';
    interface IReservationTypeDurationParameters {
        minimum_duration_ms: number;
        maximum_duration_ms: number;
        duration_increment_ms: number;
        start_time_interval_ms: number;
    }
    interface IReservationTypeInputParameters extends IReservationTypeDurationParameters {
        approval_group_empty: boolean;
        inactive: boolean;
    }
    interface IReservationTypeOutputItem extends IReservationTypeInputParameters {
        sys_id: string;
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
