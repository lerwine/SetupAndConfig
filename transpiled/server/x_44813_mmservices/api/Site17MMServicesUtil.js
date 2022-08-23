"use strict";
/// <reference path="../../../../types/server/sn_typings_server_scoped/dist/index.d.ts" />
/// <reference path="../../../../types/server/x_g_inte_site_17/api/ReservationScheduler.d.ts" />
/// <reference path="../../../../types/server/x_g_inte_site_17/api/ReservationSchedulerAjax.d.ts" />
/// <reference path="../../../../types/server/x_g_inte_site_17/table/index.d.ts" />
var x_44813_mmservices;
(function (x_44813_mmservices) {
    // /show_schedule_page.do?sysparm_page_sys_id=gantt_chart&sysparm_timeline_task_id=d530bf907f0000015ce594fd929cf6a4
    x_44813_mmservices.Site17MMServicesUtil = (function () {
        var schedule_sys_id = '4882479b2f50511035be56e62799b64c';
        var PROPERTY_NAME;
        (function (PROPERTY_NAME) {
            PROPERTY_NAME["default_min_leadTime_days"] = "x_44813_mmservices.default_min_leadTime_days";
            PROPERTY_NAME["reservation_type"] = "x_44813_mmservices.reservation_type";
        })(PROPERTY_NAME || (PROPERTY_NAME = {}));
        var XML_NAME_default_min_lead_time = "default_min_lead_time";
        var DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-[0-2]\d|3[01]$/;
        var TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
        var TIME_RANGE_PATTERN = /^((?:[01]\d|2[0-3]):[0-5]\d)-((?:[01]\d|2[0-3]):[0-5]\d)$/;
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
                    if (obj === null)
                        return true;
                    if (global.JSUtil.instance_of(obj, 'java.lang.String')) {
                        return obj.length == 0 || ('' + obj).trim().length == 0;
                    }
                    return false;
                default:
                    return false;
            }
        }
        function getDefaultMinLeadTimeDays() {
            var defaultMinLeadTime = parseInt('' + gs.getProperty(PROPERTY_NAME.default_min_leadTime_days, ''));
            return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
        }
        function getReservationTypeSysId() {
            var sysId = gs.getProperty(PROPERTY_NAME.reservation_type);
            if (isNil(sysId))
                return;
            return isNil(sysId) ? undefined : sysId;
        }
        function getReservationScheduler() {
            var sys_id = getReservationTypeSysId();
            if (isNil(sys_id)) {
                privateConstructorData._scheduler = undefined;
                throw new Error('Failure invoking x_44813_mmservices.getReservationScheduler: Property "' + PROPERTY_NAME.reservation_type + '" is empty.');
            }
            if (typeof privateConstructorData._scheduler !== 'undefined') {
                if (privateConstructorData._scheduler.sys_id == sys_id)
                    return privateConstructorData._scheduler;
                privateConstructorData._scheduler = undefined;
            }
            var gr = new GlideRecord(x_g_inte_site_17.ReservationScheduler.TABLE_NAME);
            gr.addQuery('sys_id', sys_id);
            gr.query();
            if (!gr.next())
                throw new Error('Failure invoking x_44813_mmservices.getReservationScheduler: Reservation Type (' + x_g_inte_site_17.ReservationScheduler.TABLE_NAME +
                    ') with sys_id "' + sys_id + '" (specified in setting ' + PROPERTY_NAME.reservation_type + ') was not found.');
            privateConstructorData._scheduler = new x_g_inte_site_17.ReservationScheduler(gr);
            return privateConstructorData._scheduler;
        }
        site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = getDefaultMinLeadTimeDays;
        site17MMServicesUtilConstructor.getReservationTypeSysId = getReservationTypeSysId;
        site17MMServicesUtilConstructor.getReservationScheduler = getReservationScheduler;
        site17MMServicesUtilConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
            getDefaultMinLeadTimeDays: function () {
                this.setAnswer(getDefaultMinLeadTimeDays());
            },
            getAvailabilitiesInRange: function () {
                var scheduler;
                try {
                    scheduler = getReservationScheduler();
                }
                catch (e) {
                    this.setError(e);
                    return;
                }
                var include = x_g_inte_site_17.ReservationSchedulerAjax.getAvailabilitiesInRange(this, scheduler);
                if (new global.ArrayUtil().contains(include, XML_NAME_default_min_lead_time)) {
                    var element = this.newItem(XML_NAME_default_min_lead_time);
                    element.setAttribute('value', '' + getDefaultMinLeadTimeDays());
                }
            },
            getNextAvailableTimeSlot: function () {
                var scheduler;
                try {
                    scheduler = getReservationScheduler();
                }
                catch (e) {
                    this.setError(e);
                    return;
                }
                var include = x_g_inte_site_17.ReservationSchedulerAjax.getNextAvailableTimeSlot(this, scheduler);
                if (new global.ArrayUtil().contains(include, XML_NAME_default_min_lead_time)) {
                    var element = this.newItem(XML_NAME_default_min_lead_time);
                    element.setAttribute('value', '' + getDefaultMinLeadTimeDays());
                }
            },
            type: "Site17MMServicesUtil"
        });
        return site17MMServicesUtilConstructor;
    })();
})(x_44813_mmservices || (x_44813_mmservices = {}));
