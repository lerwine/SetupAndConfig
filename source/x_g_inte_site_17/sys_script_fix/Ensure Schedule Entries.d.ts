declare type RepeatType = "yearly" | "monthly" | "weekdays" | "daily";
declare type YearlyType = "doy" | "float";
declare type ScheduleType = "include" | "exclude";
declare type FloatDayType = "1" | "2" | "3" | "4" | "5" | "6" | "7";
declare type FloatWeekType = "1" | "2" | "3" | "4" | "last";
declare type MonthType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
interface IChildScheduleDefinition {
    sys_id: string;
    type: ScheduleType;
}
interface IEntryDefinition {
    name: string;
    start_date_time: string;
    end_date_time: string;
    all_day: boolean;
    repeat_type: RepeatType;
    type?: ScheduleType;
    yearly_type?: YearlyType;
    float_day?: FloatDayType;
    float_week?: FloatWeekType;
    month?: MonthType;
    notes?: string;
}
interface IScheduleDefinition {
    sys_id: string;
    is_holiday: boolean;
    entries: IEntryDefinition[];
    child_schedules: IChildScheduleDefinition[];
}
declare var schedules: IScheduleDefinition[];
