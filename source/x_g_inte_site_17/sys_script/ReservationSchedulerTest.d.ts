declare namespace constructorTest {
    type ReservationTypeShortDescription = 'SInt: 00:01:00; Dur: inc=00:15:00, min=00:15:00, max=01:00:00' | 'SInt: 00:30:00; Dur: inc=00:15:00, min=00:15:00, max=00:45:00' | 'SInt: 01:00:00; Dur: inc=01:00:00, min=01:00:00, max=01:00:00' | 'SInt: 00:15:00; Dur: inc=00:30:00, min=00:30:00, max=02:30:00, inactive=true' | 'SInt: 01:00:00; Dur: inc=00:01:00, min=00:01:00, max=03:12:00' | 'SInt: 01:00:00; Dur: inc=00:15:00, min=00:15:00, max=01:00:00';
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
