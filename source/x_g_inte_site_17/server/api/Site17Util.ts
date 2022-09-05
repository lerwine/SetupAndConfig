/// <reference path="../../../../types/server/sn_typings_server_scoped/dist/index.d.ts" />

namespace x_g_inte_site_17 {
    export interface ISite17Util extends $$snClass.ICustomClassBase<ISite17Util, "Site17Util"> {
        isDnContainedBy(sourceDN: string, containerDN: string): "true" | "false";
        getUsersContainerDN(): string;
        getGroupsContainerDN(): string;
        includeEmptyUserSource(): "true" | "false";
        includeEmptyGroupSource(): "true" | "false";
        isUserDN(sourceDN: string): "true" | "false";
        isGroupDN(sourceDN: string): "true" | "false";
        isSite17User(source: string): "true" | "false";
        isSite17Group(sys_user_group: string): "true" | "false";
    }

    var f: reservation_typeFields;
    
    export interface ISite17UtilPrototype extends $$snClass.ICustomAjaxClassPrototype<ISite17Util, ISite17UtilPrototype, "Site17Util">, ISite17Util {
    }

    export declare type Site17Util = Readonly<ISite17Util>;

    export interface Site17UtilConstructor extends $$snClass.CustomAjaxClassConstructor<ISite17Util, ISite17UtilPrototype, Site17Util> {
        new(request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): Site17Util;
        (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): Site17Util;
        isUser(target: GlideRecord | GlideElementReference): boolean;
        isGroup(target: GlideRecord | GlideElementReference): boolean;
        isVip(target: GlideRecord | GlideElementReference): boolean;
        isBusinessUnit(target: GlideRecord | GlideElementReference): boolean;
        isDepartment(target: GlideRecord | GlideElementReference): boolean;
        isCompany(target: GlideRecord | GlideElementReference): boolean;
        isLocation(target: GlideRecord | GlideElementReference): boolean;
        isBuilding(target: GlideRecord | GlideElementReference): boolean;
        getBusinessUnit(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined;
        getCompany(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined;
        getLocation(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined;
        isLocation(target: GlideRecord | GlideElementReference): boolean;
        getCaller(target: GlideRecord | GlideElementReference): GlideElementReference | undefined;
        testDistinguishedName(value: string): boolean;
        isDnContainedBy(sourceDN: string, containerDN: string): boolean;
        getUsersContainerDN(): string;
        getGroupsContainerDN(): string;
        includeEmptyUserSource(): boolean;
        includeEmptyGroupSource(): boolean;
        isUserDN(sourceDN: string): boolean;
        isGroupDN(sourceDN: string): boolean;
        isSite17User(source: GlideRecord | GlideElementReference | string): boolean;
        isSite17Group(sys_user_group: GlideRecord | GlideElementReference | string): boolean;
    }

    export const Site17Util: Site17UtilConstructor = (function (): Site17UtilConstructor {
        const PROPERTY_NAME_source_dn_users = 'x_g_inte_site_17.source_dn_users';
        const PROPERTY_NAME_source_dn_groups = 'x_g_inte_site_17.source_dn_groups';
        const PROPERTY_NAME_source_user_include_empty = 'x_g_inte_site_17.source_user_include_empty';
        const PROPERTY_NAME_source_group_include_empty = 'x_g_inte_site_17.source_group_include_empty';
        const dnRegex = /^([^=,]+|\\.)+=([^,]+|\\.)*(,([^=,]+|\\.)+=([^,]+|\\.)*)*$/;

        var constructor: Site17UtilConstructor = Class.create();

        constructor.isUser = function(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user';
        };

        constructor.isGroup = function(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user_group';
        };

        constructor.isVip = function(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'sys_user' && (<{ [key: string]: any}>target).vip;
        };

        function getCaller(target: GlideRecord | GlideElementReference): GlideElementReference | undefined {
            var caller: GlideElementReference | undefined;
            
            switch ('' + (<{ [key: string]: any}>target).sys_class_name) {
                case 'incident':
                    caller = (<{ [key: string]: any}>target).caller_id;
                    break;
                case 'change_request_imac':
                    caller = (<{ [key: string]: any}>target).move_user;
                    break;
                case 'incident_task':
                    caller = (<{ [key: string]: any}>target).incident.caller_id;
                    break;
                case 'sm_order':
                case 'sn_si_incident':
                    caller = ((gs.nil((<{ [key: string]: any}>target).opened_for)) ? (<{ [key: string]: any}>target).caller : (<{ [key: string]: any}>target).opened_for);
                    break;
                case 'sn_si_task':
                    
                    if (!gs.nil((<{ [key: string]: any}>target).affected_user))
                        caller = (<{ [key: string]: any}>target).affected_user;
                    break;
                case 'sm_task':
                    break;
                case 'sc_request':
                    caller = (<{ [key: string]: any}>target).requested_for;
                    break;
                case 'sc_req_item':
                case 'sc_task':
                    caller = (<{ [key: string]: any}>target).request.requested_for;
                    break;
            }
            if (!gs.nil(caller))
                return caller;
        }

        constructor.getCaller = function(target: GlideRecord | GlideElementReference): GlideElementReference | undefined {
            if (!gs.nil(target))
                return getCaller(target);
        };

        function isBusinessUnit(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'business_unit';
        }

        constructor.isBusinessUnit = isBusinessUnit;

        function isDepartment(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_department';
        }

        constructor.isDepartment = isDepartment;

        function isCompany(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'core_company';
        }

        constructor.isCompany = isCompany;

        function isLocation(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_location';
        }

        constructor.isLocation = isLocation;

        function isBuilding(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && typeof target === 'object' && target.getTableName && target.getTableName() == 'cmn_building';
        }

        constructor.isBuilding = isBuilding;

        function getBusinessUnit(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
            if (Site17Util.isUser(target))
                return getBusinessUnit((<{ [key: string]: any}>target).department);
            if (isDepartment(target)) {
                if (gs.nil((<{ [key: string]: any}>target).business_unit))
                    return getBusinessUnit((<{ [key: string]: any}>target).parent);
                return (<{ [key: string]: any}>target).business_unit;
            }
        }

        constructor.getBusinessUnit = function(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
            if (!gs.nil(target))
                return getBusinessUnit(target);
        };

        function getCompany(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
            if (isCompany(target)) return target;
            if (Site17Util.isUser(target)) {
                if (!gs.nil((<{ [key: string]: any}>target).company)) return (<{ [key: string]: any}>target).company;
                return getCompany((<{ [key: string]: any}>target).department);
            }
            if (isBusinessUnit(target)) return getCompany((<{ [key: string]: any}>target).parent);
            if (isDepartment(target)) {
                var result = getCompany((<{ [key: string]: any}>target).business_unit);
                if (gs.nil(result)) return getCompany((<{ [key: string]: any}>target).parent);
                return result;
            }
        }

        constructor.getCompany = function(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
            if (!gs.nil(target)) return getCompany(target);
        };

        function getLocation(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
            if (isLocation(target)) return target;
            if (Site17Util.isUser(target)) {
                if (!gs.nil((<{ [key: string]: any}>target).location)) return (<{ [key: string]: any}>target).location;
                return getLocation((<{ [key: string]: any}>target).building);
            } else if (isBuilding(target)) {
                if (!gs.nil((<{ [key: string]: any}>target).location)) return (<{ [key: string]: any}>target).location;
            }
        }

        constructor.getLocation = function(target: GlideRecord | GlideElementReference): GlideRecord | GlideElementReference | undefined {
            if (!gs.nil(target))
                return getLocation(target);
        };

        function isDnContainedBy(sourceDN: string, containerDN: string): boolean {
            if (sourceDN.length == containerDN.length)
                return sourceDN.toLowerCase() == containerDN.toLowerCase();
            if (sourceDN.length >= (containerDN.length + 1)) return false;
            return sourceDN.toLowerCase().endsWith(',' + containerDN.toLowerCase());
        }

        constructor.isDnContainedBy = function(sourceDN: string, containerDN: string): boolean {
            var s = '' + sourceDN;
            if (s.trim().length == 0) return false;
            var c = '' + containerDN;
            return c.trim().length > 0 && isDnContainedBy(s, c);
        };

        constructor.testDistinguishedName = function(value: string): boolean {
            if (gs.nil(value)) return false;
            var dn = '' + value;
            if (dn.trim().length == 0) return false;
            return dnRegex.test(dn);
        };

        constructor.getUsersContainerDN = function() {
            return '' + gs.getProperty(PROPERTY_NAME_source_dn_users, '');
        };

        constructor.getGroupsContainerDN = function() {
            return '' + gs.getProperty(PROPERTY_NAME_source_dn_groups, '');
        };

        constructor.includeEmptyUserSource = function() {
            return gs.getProperty(PROPERTY_NAME_source_user_include_empty) == 'true';
        };

        constructor.includeEmptyGroupSource = function() {
            return gs.getProperty(PROPERTY_NAME_source_group_include_empty) == 'true';
        };

        function isUserDN(sourceDN: string): boolean {
            var containerDN = constructor.getUsersContainerDN();
            if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
            if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
            if (sourceDN.trim().length == 0) return constructor.includeEmptyUserSource();
            return isDnContainedBy(sourceDN, containerDN);
        }

        constructor.isUserDN = function(sourceDN: string): boolean { return isUserDN('' + sourceDN); };

        function isGroupDN(sourceDN: string): boolean {
            var containerDN = constructor.getGroupsContainerDN();
            if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
            if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
            if (sourceDN.trim().length == 0) return constructor.includeEmptyGroupSource();
            return isDnContainedBy(sourceDN, containerDN);
        }

        constructor.isGroupDN = function(sourceDN: string): boolean { return isGroupDN('' + sourceDN); };

        constructor.isSite17User = function(source: GlideRecord | GlideElementReference | string): boolean {
            if (gs.nil(source)) return false;
            var gr: GlideRecord | GlideElementReference | undefined;
            if (source instanceof GlideRecord || source instanceof GlideElement) {
                if (('' + source.getTableName()) == 'sys_user') return isUserDN('' + (<{ [key: string]: any}>source).source);
                gr = getCaller(<GlideElementReference>source);
                if (gs.nil(gr)) return false;
            } else {
                gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', '' + source);
                gr.query();
                if (!gr.next()) return false;
            }
            return isUserDN('' +  (<{ [key: string]: any}>gr).source);
        };

        constructor.isSite17Group = function(sys_user_group: GlideRecord | GlideElementReference | string): boolean {
            if (gs.nil(sys_user_group)) return false;
            if (sys_user_group instanceof GlideRecord || sys_user_group instanceof GlideElement) {
                if (('' + sys_user_group.getTableName()) != 'sys_user_group') return false;
                return isGroupDN('' + (<{ [key: string]: any}>sys_user_group).source);
            }
            var gr: GlideRecord = new GlideRecord('sys_user_group');
            gr.addQuery('sys_id', '' + sys_user_group);
            gr.query();
            return gr.next() && isGroupDN('' + (<{ [key: string]: any}>gr).source);
        };

        constructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, ISite17UtilPrototype>(global.AbstractAjaxProcessor, {
            isDnContainedBy: function(sourceDN: string, containerDN: string): "true"|"false" { return <"true"|"false">JSON.stringify(constructor.isDnContainedBy(sourceDN, containerDN)); },
            
            getUsersContainerDN: function() { return JSON.stringify(constructor.getUsersContainerDN()); },
            
            getGroupsContainerDN: function() { return JSON.stringify(constructor.getGroupsContainerDN()); },
            
            includeEmptyUserSource: function(): "true"|"false" { return <"true"|"false">JSON.stringify(constructor.includeEmptyUserSource()); },
            
            includeEmptyGroupSource: function(): "true"|"false" { return <"true"|"false">JSON.stringify(constructor.includeEmptyGroupSource()); },
            
            isUserDN: function(sourceDN): "true"|"false" { return <"true"|"false">JSON.stringify(isUserDN('' + sourceDN)); },
            
            isGroupDN: function(sourceDN): "true"|"false" { return <"true"|"false">JSON.stringify(isGroupDN('' + sourceDN)); },
            
            isSite17User: function(sys_id): "true"|"false" {
                var gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', '' + sys_id);
                gr.query();
                return <"true"|"false">JSON.stringify(gr.next() && isUserDN('' + (<{ [key: string]: any}>gr).source));
            },
            
            isSite17Group: function(sys_id): "true"|"false" {
                var gr = new GlideRecord('sys_user_group');
                gr.addQuery('sys_id', '' + sys_id);
                gr.query();
                return <"true"|"false">JSON.stringify(gr.next() && isGroupDN('' + (<{ [key: string]: any}>gr).source));
            },

            type: "Site17Util"
        });

        return constructor;
    })();
}