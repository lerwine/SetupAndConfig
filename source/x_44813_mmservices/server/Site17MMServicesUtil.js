"use strict";
/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />
var Site17MMServicesUtil = (function () {
    var site17MMServicesUtilConstructor = Class.create();
    site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = function () {
        var defaultMinLeadTime = parseInt('' + gs.getProperty('x_44813_mmservices.default_min_leadTime_days', ''));
        return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
    };
    site17MMServicesUtilConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        initialize: function () { },
        getDefaultMinLeadTimeDays: function () { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },
        type: "Site17MMServicesUtil"
    });
    return site17MMServicesUtilConstructor;
})();
//# sourceMappingURL=Site17MMServicesUtil.js.map