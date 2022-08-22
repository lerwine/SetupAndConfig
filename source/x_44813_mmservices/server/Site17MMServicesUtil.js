"use strict";
/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />
/// <reference path="../../x_g_inte_site_17/sys_script/ReservationScheduler.d.ts" />
// /show_schedule_page.do?sysparm_page_sys_id=gantt_chart&sysparm_timeline_task_id=d530bf907f0000015ce594fd929cf6a4
var Site17MMServicesUtil = (function () {
    var site17MMServicesUtilConstructor = Class.create();
    var privateConstructorData = {};
    function isNil(obj) {
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
    site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = function () {
        var defaultMinLeadTime = parseInt('' + gs.getProperty('x_44813_mmservices.default_min_leadTime_days', ''));
        return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
    };
    site17MMServicesUtilConstructor.getReservationTypeSysId = function () {
        var sysId = gs.getProperty(Site17MMServicesUtil.RESERVATION_TYPE_PROPERTY_NAME);
        if (isNil(sysId))
            return;
        return isNil(sysId) ? undefined : sysId;
    };
    site17MMServicesUtilConstructor.getReservationScheduler = function () {
        var sys_id = Site17MMServicesUtil.getReservationTypeSysId();
        if (isNil(sys_id)) {
            privateConstructorData._scheduler = undefined;
            gs.error('Failure invoking x_44813_mmservices.getReservationScheduler: Property "' + Site17MMServicesUtil.RESERVATION_TYPE_PROPERTY_NAME + '" is empty.');
            return;
        }
        if (typeof privateConstructorData._scheduler !== 'undefined') {
            if (privateConstructorData._scheduler.sys_id == sys_id)
                return privateConstructorData._scheduler;
            privateConstructorData._scheduler = undefined;
        }
        var gr = new GlideRecord(x_g_inte_site_17.ReservationScheduler.TABLE_NAME);
        gr.addQuery('sys_id', sys_id);
        gr.query();
        if (!gr.next()) {
            gs.error('Failure invoking x_44813_mmservices.getReservationScheduler: Reservation Type (' + x_g_inte_site_17.ReservationScheduler.TABLE_NAME +
                ') with sys_id "' + sys_id + '" (specified in setting ' + Site17MMServicesUtil.RESERVATION_TYPE_PROPERTY_NAME + ') was not found.');
            return;
        }
        privateConstructorData._scheduler = new x_g_inte_site_17.ReservationScheduler(gr);
        return privateConstructorData._scheduler;
    };
    site17MMServicesUtilConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        getDefaultMinLeadTimeDays: function () { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },
        type: "Site17MMServicesUtil"
    });
    return site17MMServicesUtilConstructor;
})();
//# sourceMappingURL=Site17MMServicesUtil.js.map