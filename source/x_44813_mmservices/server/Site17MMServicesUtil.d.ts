/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />
interface IAvailabilityRange {
    start: GlideTime;
    end: GlideTime;
}
interface IAjaxAvailabilityRange {
    start: string;
    end: string;
}
interface ISite17MMServicesUtilBase extends $$snClass.ICustomClassBase<ISite17MMServicesUtilBase, "Site17MMServicesUtil"> {
    getDefaultMinLeadTimeDays(): number;
    getDailyHours(): void;
}
interface ISite17MMServicesUtilPrototype extends $$snClass.ICustomClassPrototype0<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, "Site17MMServicesUtil">, ISite17MMServicesUtilBase {
}
declare type Site17MMServicesUtil = Readonly<ISite17MMServicesUtilBase>;
interface Site17MMServicesUtilConstructor extends $$snClass.CustomClassConstructor0<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, Site17MMServicesUtil> {
    DATE_PATTERN: RegExp;
    TIME_PATTERN: RegExp;
    LINE_BREAK_PATTERN: RegExp;
    TIME_RANGE_PATTERN: RegExp;
    SCHEDULE_SYS_ID: string;
    getDefaultMinLeadTimeDays(): number;
    getDailyHours(): IAvailabilityRange[];
}
declare const Site17MMServicesUtil: Site17MMServicesUtilConstructor;
