/// <reference path="../../sn_typings_server_scoped/dist/index.d.ts" />
/// <reference path="../../x_g_inte_site_17/api/ReservationScheduler.d.ts" />
/// <reference path="../../x_g_inte_site_17/api/ReservationSchedulerAjax.d.ts" />
/// <reference path="../../x_g_inte_site_17/table/index.d.ts" />
declare namespace x_44813_mmservices {
    interface IAvailabilityRange {
        start: GlideTime;
        end: GlideTime;
    }
    interface IAjaxAvailabilityRange {
        start: string;
        end: string;
    }
    interface ISite17MMServicesUtil extends $$snClass.ICustomClassBase<ISite17MMServicesUtil, "Site17MMServicesUtil"> {
        /**
         * Gets the number of days the default minimum lead time for appointments.
         * @memberof ISite17MMServicesUtilBase
         */
        getDefaultMinLeadTimeDays(): void;
        /**
         * Gets the next available time slot.
         * @memberof ISite17MMServicesUtilBase
         * @description
         * The 'availability' element will contain an attribute named 'success' which will contain the value 'true' if an availability was returned; otherwise, it will contain 'false'.
         * If the 'success' attribute of the 'availability' element is 'true', then the 'startDateTime' will contain the start date and time of the next
         * availability.
         * The 'durationMinutes' attribute indicates the number of contiguous minutes that are open for appointments. This attrbute may be missing
         * if no 'sys_parm_to' parameter was provided all future times are open for appointments.
         *
         * Parameters are:
         * sys_parm_from: The date and time to start from.
         * sys_parm_to: The optional end date and time to search within.
         * sys_parm_duration: The optional minimum appointments duration in minutes.
         * sys_parm_include: The optional list of comma-separated result inclusions.
         *
         * Values for result inclusions are:
         * approval_group: If there is an approval group, the sys_id will be contained in the 'approval_group' attribute of the 'scheduler_type' element.
         * assignment_group: The sys_id of the assignment group will be contained in the 'assignment_group' attribute of the 'scheduler_type' element.
         * duration_increment: The number of minutes for duration increments will be contained in the 'duration_increment' attribute of the 'scheduler_type' element.
         * minimum_duration: The minimum number of minutes for durations will be contained in the 'minimum_duration' attribute of the 'scheduler_type' element.
         * maximum_duration: The maximum number of minutes for durations will be contained in the 'maximum_duration' attribute of the 'scheduler_type' element.
         * start_time_interval: The number of minutes for start time intervals will be contained in the 'start_time_interval' attribute of the 'scheduler_type' element.
         * default_min_lead_time: The number of days the default minimum lead time for appointments.
         */
        getNextAvailableTimeSlot(): void;
        /**
         * Gets the appointment availabilities within a given date and time range.
         * @memberof ISite17MMServicesUtilBase
         * @description
         * The 'availabilities' element will contain an attribute named 'length' which will indicate the number of availabilities found.
         * Child elements named 'availability' contain the individual date/time ranges open for reservation.
         * Each child element has a 'startDateTime' attribute that contains the start date and time, and a 'durationMinutes' attribute that
         * indicates the number of contiguous minutes that are open for reservation.
         *
         * Parameters are:
         * sys_parm_from: The date and time to start from.
         * sys_parm_to: The end date and time to search within.
         * sys_parm_duration: The optional minimum reservation duration in minutes.
         * sys_parm_include: The optional list of comma-separated result inclusions.
         *
         * Values for result inclusions are:
         * approval_group: If there is an approval group, the sys_id will be contained in the 'approval_group' attribute of the 'scheduler_type' element.
         * assignment_group: The sys_id of the assignment group will be contained in the 'assignment_group' attribute of the 'scheduler_type' element.
         * duration_increment: The number of minutes for duration increments will be contained in the 'duration_increment' attribute of the 'scheduler_type' element.
         * minimum_duration: The minimum number of minutes for durations will be contained in the 'minimum_duration' attribute of the 'scheduler_type' element.
         * maximum_duration: The maximum number of minutes for durations will be contained in the 'maximum_duration' attribute of the 'scheduler_type' element.
         * start_time_interval: The number of minutes for start time intervals will be contained in the 'start_time_interval' attribute of the 'scheduler_type' element.
         * default_min_lead_time: The number of days the default minimum lead time for appointments.
         */
        getAvailabilitiesInRange(): void;
    }
    interface ISite17MMServicesUtilPrototype extends $$snClass.ICustomAjaxClassPrototype<ISite17MMServicesUtil, ISite17MMServicesUtilPrototype, "Site17MMServicesUtil">, ISite17MMServicesUtil {
    }
    type Site17MMServicesUtil = Readonly<ISite17MMServicesUtil>;
    interface ISite17MMServicesUtilConstructorPrivate {
        _scheduler?: x_g_inte_site_17.ReservationScheduler;
    }
    interface Site17MMServicesUtilConstructor extends $$snClass.CustomAjaxClassConstructor<ISite17MMServicesUtil, ISite17MMServicesUtilPrototype, Site17MMServicesUtil> {
        /**
         * Gets the number of days the default minimum lead time for appointments.
         * @return {number} The number of days the default minimum lead time for appointments.
         * @memberof Site17MMServicesUtilConstructor
         * @description This value is stored in the 'x_44813_mmservices.default_min_leadTime_days' system property, with a default value of 3.
         */
        getDefaultMinLeadTimeDays(): number;
        /**
         * Gets the SysId of the associated 'Reservation Type' record.
         * @return {(string | undefined)} The SysId of the associated record in the 'Reservation Type' table (x_g_inte_site_17_reservation_type).
         * @memberof Site17MMServicesUtilConstructor
         * @description This value is stored within the 'x_44813_mmservices.reservation_type' system property.
         */
        getReservationTypeSysId(): string | undefined;
        /**
         * Gets the ReservationScheduler instance associated with this app.
         * @return {x_g_inte_site_17.ReservationScheduler} The ReservationScheduler instance associated with this app.
         * @memberof Site17MMServicesUtilConstructor
         */
        getReservationScheduler(): x_g_inte_site_17.ReservationScheduler;
    }
    const Site17MMServicesUtil: Site17MMServicesUtilConstructor;
}
