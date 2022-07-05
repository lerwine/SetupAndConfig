"use strict";
/// <reference path="../servicnowCommon.d.ts" />
var LocationApproval = (function () {
    var locationApprovalConstructor = Class.create();
    function getDefaultApprovalGroup(source) {
        var company = Site17Util.getCompany(source);
        var building = source.building;
        var business_unit = Site17Util.getBusinessUnit(source);
        var department = source.department;
        var location = Site17Util.getLocation(source);
        var gr = new GlideRecord('x_g_inte_site_17_location_approvers');
        gr.orderBy('order');
        gr.query();
        while (gr.next()) {
            if (gr.type == 'any') {
                if ((!(gs.nil(gr.company) || gs.nil(company)) && gr.company.sys_id == company.sys_id) ||
                    (!(gs.nil(gr.business_unit) || gs.nil(company)) && gr.business_unit.sys_id == business_unit.sys_id) ||
                    (!(gs.nil(gr.department) || gs.nil(department)) && gr.department.sys_id == department.sys_id) ||
                    (!(gs.nil(gr.building) || gs.nil(building)) && gr.building.sys_id == building.sys_id) ||
                    (!(gs.nil(gr.location) || gs.nil(location)) && gr.company.sys_id == location.sys_id))
                    return gr.approval_group;
            }
            else {
                if ((gs.nil(gr.company) || (!gs.nil(company) && gr.company.sys_id == company.sys_id)) &&
                    (gs.nil(gr.business_unit) || (!gs.nil(business_unit) && gr.business_unit.sys_id == business_unit.sys_id)) &&
                    (gs.nil(gr.department) || (!gs.nil(department) && gr.department.sys_id == department.sys_id)) &&
                    (gs.nil(gr.building) || (!gs.nil(building) && gr.building.sys_id == building.sys_id)) &&
                    (gs.nil(gr.location) || (!gs.nil(location) && gr.location.sys_id == location.sys_id)))
                    return gr.approval_group;
            }
        }
    }
    locationApprovalConstructor.getDefaultApprovalGroup = getDefaultApprovalGroup;
    locationApprovalConstructor.prototype = {
        initialize: function (source) {
            if (gs.nil(source))
                throw new Error("No glide object provided");
            if (source instanceof GlideRecord) {
                if (source.isNewRecord() || !source.isValidRecord())
                    throw new Error("Not a valid task record");
                this._gliderecord = source;
            }
            else {
                this._gliderecord = source.getRefRecord();
                if (gs.nil(this._gliderecord))
                    throw new Error("No glide record referenced");
            }
        },
        getCaller: function () {
            return Site17Util.getCaller(this._gliderecord);
        },
        isVip: function () {
            return Site17Util.isVip(this._gliderecord);
        },
        getDefaultApprovalGroup: function () {
            return getDefaultApprovalGroup(this.getCaller());
        },
        type: "LocationApproval"
    };
    return locationApprovalConstructor;
})();
//# sourceMappingURL=LocationApproval.js.map