"use strict";
/// <reference path="../../../../types/server/sn_typings_server_scoped/dist/index.d.ts" />
var x_g_inte_site_17;
(function (x_g_inte_site_17) {
    var f;
    x_g_inte_site_17.Site17Util = (function () {
        var site17UtilConstructor = Class.create();
        site17UtilConstructor.isUser = function (target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user';
        };
        site17UtilConstructor.isGroup = function (target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user_group';
        };
        site17UtilConstructor.isVip = function (target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user' && target.vip;
        };
        function getCaller(target) {
            var caller;
            switch ('' + target.sys_class_name) {
                case 'incident':
                    caller = target.caller_id;
                    break;
                case 'change_request_imac':
                    caller = target.move_user;
                    break;
                case 'incident_task':
                    caller = target.incident.caller_id;
                    break;
                case 'sm_order':
                case 'sn_si_incident':
                    caller = ((gs.nil(target.opened_for)) ? target.caller : target.opened_for);
                    break;
                case 'sn_si_task':
                    if (!gs.nil(target.affected_user))
                        caller = target.affected_user;
                    break;
                case 'sm_task':
                    break;
                case 'sc_request':
                    caller = target.requested_for;
                    break;
                case 'sc_req_item':
                case 'sc_task':
                    caller = target.request.requested_for;
                    break;
            }
            if (!gs.nil(caller))
                return caller;
        }
        site17UtilConstructor.getCaller = function (target) {
            if (!gs.nil(target))
                return getCaller(target);
        };
        function isBusinessUnit(target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'business_unit';
        }
        site17UtilConstructor.isBusinessUnit = isBusinessUnit;
        function isDepartment(target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_department';
        }
        site17UtilConstructor.isDepartment = isDepartment;
        function isCompany(target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'core_company';
        }
        site17UtilConstructor.isCompany = isCompany;
        function isLocation(target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_location';
        }
        site17UtilConstructor.isLocation = isLocation;
        function isBuilding(target) {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_building';
        }
        site17UtilConstructor.isBuilding = isBuilding;
        function getBusinessUnit(target) {
            if (x_g_inte_site_17.Site17Util.isUser(target))
                return getBusinessUnit(target.department);
            if (isDepartment(target)) {
                if (gs.nil(target.business_unit))
                    return getBusinessUnit(target.parent);
                return target.business_unit;
            }
        }
        site17UtilConstructor.getBusinessUnit = function (target) {
            if (!gs.nil(target))
                return getBusinessUnit(target);
        };
        function getCompany(target) {
            if (isCompany(target))
                return target;
            if (x_g_inte_site_17.Site17Util.isUser(target)) {
                if (!gs.nil(target.company))
                    return target.company;
                return getCompany(target.department);
            }
            if (isBusinessUnit(target))
                return getCompany(target.parent);
            if (isDepartment(target)) {
                var result = getCompany(target.business_unit);
                if (gs.nil(result))
                    return getCompany(target.parent);
                return result;
            }
        }
        site17UtilConstructor.getCompany = function (target) {
            if (!gs.nil(target))
                return getCompany(target);
        };
        function getLocation(target) {
            if (isLocation(target))
                return target;
            if (x_g_inte_site_17.Site17Util.isUser(target)) {
                if (!gs.nil(target.location))
                    return target.location;
                return getLocation(target.building);
            }
            else if (isBuilding(target)) {
                if (!gs.nil(target.location))
                    return target.location;
            }
        }
        site17UtilConstructor.getLocation = function (target) {
            if (!gs.nil(target))
                return getLocation(target);
        };
        function isDnContainedBy(sourceDN, containerDN) {
            if (sourceDN.length == containerDN.length)
                return sourceDN.toLowerCase() == containerDN.toLowerCase();
            if (sourceDN.length >= (containerDN.length + 1))
                return false;
            return sourceDN.toLowerCase().endsWith(',' + containerDN.toLowerCase());
        }
        site17UtilConstructor.isDnContainedBy = function (sourceDN, containerDN) {
            var s = '' + sourceDN;
            if (s.trim().length == 0)
                return false;
            var c = '' + containerDN;
            return c.trim().length > 0 && isDnContainedBy(s, c);
        };
        site17UtilConstructor.testDistinguishedName = function (value) {
            if (gs.nil(value))
                return false;
            var dn = '' + value;
            if (dn.trim().length == 0)
                return false;
            var re = /^([^=,]+|\\.)+=([^,]+|\\.)*(,([^=,]+|\\.)+=([^,]+|\\.)*)*$/;
            return re.test(dn);
        };
        site17UtilConstructor.getUsersContainerDN = function () {
            return '' + gs.getProperty('x_g_inte_site_17.source_dn_users', '');
        };
        site17UtilConstructor.getGroupsContainerDN = function () {
            return '' + gs.getProperty('x_g_inte_site_17.source_dn_groups', '');
        };
        site17UtilConstructor.includeEmptyUserSource = function () {
            return gs.getProperty('x_g_inte_site_17.source_user_include_empty') == 'true';
        };
        site17UtilConstructor.includeEmptyGroupSource = function () {
            return gs.getProperty('x_g_inte_site_17.source_group_include_empty') == 'true';
        };
        function isUserDN(sourceDN) {
            var containerDN = site17UtilConstructor.getUsersContainerDN();
            if (sourceDN.startsWith('ldap:'))
                sourceDN = sourceDN.substring(5);
            if (containerDN.trim().length == 0)
                return sourceDN.trim().length == 0;
            if (sourceDN.trim().length == 0)
                return site17UtilConstructor.includeEmptyUserSource();
            return isDnContainedBy(sourceDN, containerDN);
        }
        site17UtilConstructor.isUserDN = function (sourceDN) { return isUserDN('' + sourceDN); };
        function isGroupDN(sourceDN) {
            var containerDN = site17UtilConstructor.getGroupsContainerDN();
            if (sourceDN.startsWith('ldap:'))
                sourceDN = sourceDN.substring(5);
            if (containerDN.trim().length == 0)
                return sourceDN.trim().length == 0;
            if (sourceDN.trim().length == 0)
                return site17UtilConstructor.includeEmptyGroupSource();
            return isDnContainedBy(sourceDN, containerDN);
        }
        site17UtilConstructor.isGroupDN = function (sourceDN) { return isGroupDN('' + sourceDN); };
        site17UtilConstructor.isSite17User = function (source) {
            if (gs.nil(source))
                return false;
            var gr;
            if (source instanceof GlideRecord || source instanceof GlideElement) {
                if (('' + source.getTableName()) == 'sys_user')
                    return isUserDN('' + source.source);
                gr = getCaller(source);
                if (gs.nil(gr))
                    return false;
            }
            else {
                gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', '' + source);
                gr.query();
                if (!gr.next())
                    return false;
            }
            return isUserDN('' + gr.source);
        };
        site17UtilConstructor.isSite17Group = function (sys_user_group) {
            if (gs.nil(sys_user_group))
                return false;
            if (sys_user_group instanceof GlideRecord || sys_user_group instanceof GlideElement) {
                if (('' + sys_user_group.getTableName()) != 'sys_user_group')
                    return false;
                return isGroupDN('' + sys_user_group.source);
            }
            var gr = new GlideRecord('sys_user_group');
            gr.addQuery('sys_id', '' + sys_user_group);
            gr.query();
            return gr.next() && isGroupDN('' + gr.source);
        };
        site17UtilConstructor.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
            isDnContainedBy: function (sourceDN, containerDN) { return JSON.stringify(site17UtilConstructor.isDnContainedBy(sourceDN, containerDN)); },
            getUsersContainerDN: function () { return JSON.stringify(site17UtilConstructor.getUsersContainerDN()); },
            getGroupsContainerDN: function () { return JSON.stringify(site17UtilConstructor.getGroupsContainerDN()); },
            includeEmptyUserSource: function () { return JSON.stringify(site17UtilConstructor.includeEmptyUserSource()); },
            includeEmptyGroupSource: function () { return JSON.stringify(site17UtilConstructor.includeEmptyGroupSource()); },
            isUserDN: function (sourceDN) { return JSON.stringify(isUserDN('' + sourceDN)); },
            isGroupDN: function (sourceDN) { return JSON.stringify(isGroupDN('' + sourceDN)); },
            isSite17User: function (sys_id) {
                var gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', '' + sys_id);
                gr.query();
                return JSON.stringify(gr.next() && isUserDN('' + gr.source));
            },
            isSite17Group: function (sys_id) {
                var gr = new GlideRecord('sys_user_group');
                gr.addQuery('sys_id', '' + sys_id);
                gr.query();
                return JSON.stringify(gr.next() && isGroupDN('' + gr.source));
            },
            type: "Site17Util"
        });
        return site17UtilConstructor;
    })();
})(x_g_inte_site_17 || (x_g_inte_site_17 = {}));
