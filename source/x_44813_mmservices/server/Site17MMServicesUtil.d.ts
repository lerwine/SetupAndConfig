/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />
/// <reference path="../../x_g_inte_site_17/sys_script/ReservationScheduler.d.ts" />
/// <reference types="sn_typings_server_scoped" />
/// <reference types="sn_typings_server_scoped" />
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
}
interface ISite17MMServicesUtilPrototype extends $$snClass.ICustomAjaxClassPrototype<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, "Site17MMServicesUtil">, ISite17MMServicesUtilBase {
}
declare type Site17MMServicesUtil = Readonly<ISite17MMServicesUtilBase>;
interface IPrivateConstructorData {
    _scheduler?: x_g_inte_site_17.ReservationScheduler;
}
interface Site17MMServicesUtilConstructor extends $$snClass.CustomAjaxClassConstructor<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, Site17MMServicesUtil> {
    DATE_PATTERN: RegExp;
    TIME_PATTERN: RegExp;
    LINE_BREAK_PATTERN: RegExp;
    TIME_RANGE_PATTERN: RegExp;
    SCHEDULE_SYS_ID: string;
    RESERVATION_TYPE_PROPERTY_NAME: 'x_44813_mmservices.resevation_type';
    getDefaultMinLeadTimeDays(): number;
    getReservationTypeSysId(): string | undefined;
    getReservationScheduler(): x_g_inte_site_17.ReservationScheduler | undefined;
}
declare const Site17MMServicesUtil: Site17MMServicesUtilConstructor;
