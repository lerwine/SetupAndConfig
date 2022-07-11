/// <reference path="../../types/server/sn_typings_server_scoped/index.d.ts" />

interface ISite17MMServicesUtilBase extends $$snClass.ICustomClassBase<ISite17MMServicesUtilBase, "Site17MMServicesUtil"> {
    getDefaultMinLeadTimeDays(): number;
}

interface ISite17MMServicesUtilPrototype extends $$snClass.ICustomClassPrototype0<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, "Site17MMServicesUtil">, ISite17MMServicesUtilBase {
}

declare type Site17MMServicesUtil = Readonly<ISite17MMServicesUtilBase>;

interface Site17MMServicesUtilConstructor extends $$snClass.CustomClassConstructor0<ISite17MMServicesUtilBase, ISite17MMServicesUtilPrototype, Site17MMServicesUtil> {
    getDefaultMinLeadTimeDays(): number;
}

const Site17MMServicesUtil: Site17MMServicesUtilConstructor = (function (): Site17MMServicesUtilConstructor {
    var site17MMServicesUtilConstructor: Site17MMServicesUtilConstructor = Class.create();
    site17MMServicesUtilConstructor.getDefaultMinLeadTimeDays = function(): number {
		var defaultMinLeadTime: number = parseInt('' + gs.getProperty('x_44813_mmservices.default_min_leadTime_days', ''));
		return isNaN(defaultMinLeadTime) ? 3 : defaultMinLeadTime;
	};
    site17MMServicesUtilConstructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, ISite17MMServicesUtilPrototype>(global.AbstractAjaxProcessor, {
        initialize: function() { },

        getDefaultMinLeadTimeDays(): number { return Site17MMServicesUtil.getDefaultMinLeadTimeDays(); },

        type: "Site17MMServicesUtil"
    });

    return site17MMServicesUtilConstructor;
})();
