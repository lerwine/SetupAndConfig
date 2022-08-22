/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />
/// <reference path="../../x_g_inte_site_17/sys_script/ReservationScheduler.d.ts" />

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
// /show_schedule_page.do?sysparm_page_sys_id=gantt_chart&sysparm_timeline_task_id=d530bf907f0000015ce594fd929cf6a4
const Site17MMServicesUtil: Site17MMServicesUtilConstructor = (function (): Site17MMServicesUtilConstructor {
    var site17MMServicesUtilConstructor: Site17MMServicesUtilConstructor = Class.create();

    function isNil(obj: any | undefined): obj is undefined | null | "" {
        switch (typeof obj) {
            case 'undefined':
                return true;
            case 'number':
                return isNaN(obj) || !isFinite(obj);
            case 'string':
                return obj.trim().length == 0;
            case 'object':
                return obj == null || ('' + obj).trim().length == 0;
            default:
                return false;
        }
    }

    site17MMServicesUtilConstructor.SCHEDULE_SYS_ID = '4882479b2f50511035be56e62799b64c';

    site17MMServicesUtilConstructor.DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-[0-2]\d|3[01]$/;
    
    site17MMServicesUtilConstructor.TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
    
    site17MMServicesUtilConstructor.TIME_RANGE_PATTERN = /^((?:[01]\d|2[0-3]):[0-5]\d)-((?:[01]\d|2[0-3]):[0-5]\d)$/;
    
    site17MMServicesUtilConstructor.RESERVATION_TYPE_PROPERTY_NAME = 'x_44813_mmservices.resevation_type';

    site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = function(): number {
		var defaultMinLeadTime: number = parseInt('' + gs.getProperty('x_44813_mmservices.default_min_leadTime_days', ''));
		return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
	};

    site17MMServicesUtilConstructor.getReservationTypeSysId = function(): string | undefined {
		var sysId: string = gs.getProperty(Site17MMServicesUtil.RESERVATION_TYPE_PROPERTY_NAME);
		return isNil(sysId) ? undefined : sysId;
	};

    
    site17MMServicesUtilConstructor.getReservationScheduler = function(): x_g_inte_site_17.ReservationScheduler | undefined {
        var sys_id = Site17MMServicesUtil.getReservationTypeSysId();
        if (isNil(sys_id)) {
            gs.error('Failure invoking x_44813_mmservices.getReservationScheduler: Property "' + Site17MMServicesUtil.RESERVATION_TYPE_PROPERTY_NAME + '" is empty.');
            return;
        }
        var gr = <x_g_inte_site_17.reservationTypeGlideRecord>new GlideRecord(x_g_inte_site_17.ReservationScheduler.TABLE_NAME);
        gr.addQuery('sys_id', sys_id);
        gr.query();
        if (!gr.next()) {
            gs.error('Failure invoking x_44813_mmservices.getReservationScheduler: Reservation Type (' + x_g_inte_site_17.ReservationScheduler.TABLE_NAME +
                ') with sys_id "' + sys_id + '" (specified in setting ' + Site17MMServicesUtil.RESERVATION_TYPE_PROPERTY_NAME + ') was not found.');
            return;
        }
        return new x_g_inte_site_17.ReservationScheduler(gr);
    }

    site17MMServicesUtilConstructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, ISite17MMServicesUtilPrototype>(global.AbstractAjaxProcessor, {
        getDefaultMinLeadTimeDays: function(): number { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },

        type: "Site17MMServicesUtil"
    });

    return site17MMServicesUtilConstructor;
})();
