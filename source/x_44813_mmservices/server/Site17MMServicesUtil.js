"use strict";
/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />
// /show_schedule_page.do?sysparm_page_sys_id=gantt_chart&sysparm_timeline_task_id=d530bf907f0000015ce594fd929cf6a4
var Site17MMServicesUtil = (function () {
    var site17MMServicesUtilConstructor = Class.create();
    site17MMServicesUtilConstructor.SCHEDULE_SYS_ID = '4882479b2f50511035be56e62799b64c';
    site17MMServicesUtilConstructor.DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-[0-2]\d|3[01]$/;
    site17MMServicesUtilConstructor.TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
    site17MMServicesUtilConstructor.TIME_RANGE_PATTERN = /^((?:[01]\d|2[0-3]):[0-5]\d)-((?:[01]\d|2[0-3]):[0-5]\d)$/;
    site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = function () {
        var defaultMinLeadTime = parseInt('' + gs.getProperty('x_44813_mmservices.default_min_leadTime_days', ''));
        return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
    };
    site17MMServicesUtilConstructor.getDailyHours = function () {
        var setting = gs.getProperty('x_44813_mmservices.studio_hours', '');
        return setting.split(/[\r\n]+/).map(function (line) {
            if (line.length > 0) {
                var r = site17MMServicesUtilConstructor.TIME_RANGE_PATTERN.exec(setting);
                if (typeof r === 'object' && r !== null) {
                    var a = { start: new GlideTime(), end: new GlideTime() };
                    a.start.setDisplayValue(r[1] + ":00");
                    a.end.setDisplayValue(r[2] + ":00");
                    return a;
                }
            }
        }).filter(function (value) { return typeof value !== 'undefined'; });
    };
    site17MMServicesUtilConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        initialize: function () { },
        getDefaultMinLeadTimeDays: function () { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },
        getDailyHours: function () {
            var dailyHours = site17MMServicesUtilConstructor.getDailyHours();
            return JSON.stringify(dailyHours.map(function (r) { return { start: r.start.getDisplayValue(), end: r.end.getDisplayValue() }; }));
        },
        type: "Site17MMServicesUtil"
    });
    return site17MMServicesUtilConstructor;
})();
//# sourceMappingURL=Site17MMServicesUtil.js.map