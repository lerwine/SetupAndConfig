"use strict";
/// <reference path="../types/sn_typings_server_scoped/index.d.ts" />
var Site17MMServicesUtil = (function () {
    var profileValidatorConstructor = Class.create();
    profileValidatorConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
        initialize: function () { },
        getDefaultMinLeadTimeDays: function () { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },
        type: "Site17MMServicesUtil"
    });
    return profileValidatorConstructor;
})();
//# sourceMappingURL=Site17MMServicesUtil.js.map