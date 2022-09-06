/// <reference path="../../../../types/server/sn_typings_server_scoped/dist/index.d.ts" />

namespace x_g_inte_site_17 {
    /**
     * Base interface for the Site17Util API
     * @export
     * @interface ISite17Util
     * @extends {$$snClass.ICustomClassBase<ISite17Util, "Site17Util">}
     */
    export interface ISite17Util extends $$snClass.ICustomClassBase<ISite17Util, "Site17Util"> {
        /**
         * Determines whether a specified DistinguishedName is contained within another.
         * @return {("true" | "false")} "true" if the source DN is contained within the container DN; otherwise, "false".
         * @memberof ISite17Util
         * @description This is intended to be invoked by a client script.
         * AJAX Parameter names: "sys_parm_target_dn"=The DistinguishedName to check;
         * "sys_parm_container_dn"=The parent DistinguishedName.
         */
        isDnContainedBy(): "true" | "false";
        
        /**
         * Gets the LDAP Distinguished Name of the container for all Site 17 users.
         * @return {string} The value of the "x_g_inte_site_17.source_dn_users" system property or empty if the property is not defined.
         * @memberof ISite17Util
         */
        getUsersContainerDN(): string;
        
        /**
         * Gets the LDAP Distinguished Name of the container for all Site 17 groups.
         * @return {string} The value of the "x_g_inte_site_17.source_dn_groups" system property or empty if the property is not defined.
         * @memberof ISite17Util
         */
        getGroupsContainerDN(): string;

        /**
         * Gets a value indicating whether the user records with an empty Source property are considered Site 17 users.
         * @return {("true" | "false")} "true" if the "x_g_inte_site_17.source_user_include_empty" system property is set to "true"; otherwise, "false".
         * @memberof ISite17Util
         */
        includeEmptyUserSource(): "true" | "false";

        /**
         * Gets a value indicating whether the group records with an empty Source property are considered Site 17 groups.
         * @return {("true" | "false")} "true" if the "x_g_inte_site_17.source_group_include_empty" system property is set to "true"; otherwise, "false".
         * @memberof ISite17Util
         */
        includeEmptyGroupSource(): "true" | "false";

        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 user.
         * @return {("true" | "false")} "true" if the given DN is for a Site 17 user; otherwise, "false".
         * @memberof ISite17Util
         * @description This is intended to be invoked by a client script.
         * AJAX Parameter name: "sys_parm_target_dn"=The DistinguishedName to check.
         */
        isUserDN(): "true" | "false";
        
        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 group.
         * @return {("true" | "false")} "true" if the given DN is for a Site 17 group; otherwise, "false".
         * @memberof ISite17Util
         * @description This is intended to be invoked by a client script.
         * AJAX Parameter name: "sys_parm_target_dn"=The DistinguishedName to check.
         */
        isGroupDN(): "true" | "false";

        /**
         * Tests whether the given glide record or element is to be considered a Site 17 user.
         * @return {("true" | "false")} "true" if the given glide record element is for a Site 17 user; otherwise, "false".
         * @memberof ISite17Util
         * @description This is intended to be invoked by a client script.
         * AJAX Parameter name: "sys_parm_user_id"=The SysID of a User (sys_user) record.
         */
        isSite17User(): "true" | "false";
        
        /**
         * Tests whether the given glide record or element is to be considered a Site 17 group.
         * @return {("true" | "false")} "true" if the given glide record element is for a Site 17 group; otherwise, "false".
         * @memberof ISite17Util
         * @description This is intended to be invoked by a client script.
         * AJAX Parameter name: "sys_parm_user_group_id"=The SysID of a Group (sys_user_group) record.
         */
        isSite17Group(): "true" | "false";
    }

    /**
     * Defines the prototype for the Site17Util API.
     * @export
     * @interface ISite17UtilPrototype
     * @extends {$$snClass.ICustomAjaxClassPrototype<ISite17Util, ISite17UtilPrototype, "Site17Util">}
     * @extends {ISite17Util}
     */
    export interface ISite17UtilPrototype extends $$snClass.ICustomAjaxClassPrototype<ISite17Util, ISite17UtilPrototype, "Site17Util">, ISite17Util { }

    /**
     * Defines a constructed Site17Util API instance.
     * @typedef {Readonly<ISite17Util>} Site17Util;
     */
    export declare type Site17Util = Readonly<ISite17Util>;

    /**
     * Defines the constructor for the Site17Util API
     * @export
     * @interface Site17UtilConstructor
     * @extends {$$snClass.CustomAjaxClassConstructor<ISite17Util, ISite17UtilPrototype, Site17Util>}
     */
    export interface Site17UtilConstructor extends $$snClass.CustomAjaxClassConstructor<ISite17Util, ISite17UtilPrototype, Site17Util> {
        new(request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): Site17Util;
        (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): Site17Util;
        
        /**
         * Tests whether the record or element represents a User record (sys_user).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a User record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isUser(target: GlideRecord | GlideElementReference): target is sys_userElement | sys_userGlideRecord;

        /**
         * Tests whether the record or element represents a Group record (sys_user_group).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Group record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isGroup(target: GlideRecord | GlideElementReference): target is sys_user_groupElement | sys_user_groupGlideRecord;

        /**
         * Tests whether the record or element is a VIP user or is associated with a VIP user.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a VIP user or if the user that is the target (ie. caller, requestor) of that record is a VIP user;
         * otherwise, false.
         * @memberof Site17UtilConstructor
         * @description If the target is not itself a sys_user record or element, this checks the properties of the following record types to determine the associated user:
         * Incident Caller (incident.caller_id, incident_task.incident.caller_id),
         * Requested For (sc_request.requested_for, sc_req_item.request.requested_for", "sc_task.request.requested_for),
         * Opened For (sm_order.opened_for, sn_si_incident.opened_for),
         * Move User (change_request_imac.move_user) and
         * Affected User (sm_order.affected_user, sn_si_incident.affected_user, sn_si_task.affected_user).
         */
        isVip(target: GlideRecord | GlideElementReference): boolean;

        /**
         * Tests whether the record or element represents a Business Unit record (business_unit).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Business Unit record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isBusinessUnit(target: GlideRecord | GlideElementReference): target is business_unitElement | business_unitGlideRecord;

        /**
         * Tests whether the record or element represents a Department record (cmn_department).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Department record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isDepartment(target: GlideRecord | GlideElementReference): target is cmn_departmentElement | cmn_departmentGlideRecord;

        /**
         * Tests whether the record or element represents a Company record (core_company).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is Company Group record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isCompany(target: GlideRecord | GlideElementReference): target is core_companyElement | core_companyGlideRecord;

        /**
         * Tests whether the record or element represents a Location record (cmn_location).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Location record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isLocation(target: GlideRecord | GlideElementReference): target is cmn_locationElement | cmn_locationGlideRecord;

        /**
         * Tests whether the record or element represents a Building record (cmn_building).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Building record; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isBuilding(target: GlideRecord | GlideElementReference): target is cmn_buildingGlideRecord | cmn_buildingElement;

        /**
         * Gets the Business Unit record (business_unit) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {(business_unitGlideRecord | undefined)} The Glide record of the associated business unit or undefined if the associated business unit was nil or could not be determined.
         * @memberof Site17UtilConstructor
         * @description This will search the associated fields of many records to determine the associated business unit, if necessary.
         */
        getBusinessUnit(target: GlideRecord | GlideElementReference): business_unitGlideRecord | undefined;

        /**
         * Gets the Company record (core_company) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {(core_companyGlideRecord | undefined)} The Glide record of the associated company or undefined if the associated company was nil or could not be determined.
         * @memberof Site17UtilConstructor
         * @description This will search the associated fields of many records to determine the associated company, if necessary.
         */
        getCompany(target: GlideRecord | GlideElementReference): core_companyGlideRecord | undefined;

        /**
         * Gets the Location record (cmn_location) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {(cmn_locationGlideRecord | undefined)} The Glide record of the associated location or undefined if the associated location was nil or could not be determined.
         * @memberof Site17UtilConstructor
         * @description This will search the associated fields of many records to determine the associated location, if necessary.
         */
        getLocation(target: GlideRecord | GlideElementReference): cmn_locationGlideRecord | undefined;
        
        /**
         * Gets the User record (sys_user) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The target glide record or referenc element.
         * @return {(sys_userGlideRecord | undefined)} The Glide record of the associated user or undefined if the associated user was nil or could not be determined.
         * @memberof Site17UtilConstructor
         * @description If the target is not itself a sys_user record or element, this checks the properties of the following record types to determine the associated user:
         * Incident Caller (incident.caller_id, incident_task.incident.caller_id),
         * Requested For (sc_request.requested_for, sc_req_item.request.requested_for", "sc_task.request.requested_for),
         * Opened For (sm_order.opened_for, sn_si_incident.opened_for),
         * Move User (change_request_imac.move_user) and
         * Affected User (sm_order.affected_user, sn_si_incident.affected_user, sn_si_task.affected_user).
         */
        getCaller(target: GlideRecord | GlideElementReference): sys_userGlideRecord | undefined;
        
        /**
         * Checks whether a string contains a valid LDAP Distinguished Name.
         * @param {string} value - The target string value.
         * @return {boolean} True if the given string represents a valid LDAP distinguished name; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        testDistinguishedName(value: string): boolean;

        /**
         * Determines whether a specified DistinguishedName is contained within another.
         * @param {string} sourceDN - The DistinguishedName to check.
         * @param {string} containerDN - The parent DistinguishedName.
         * @return {boolean} true if the source DN is contained within the container DN; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isDnContainedBy(sourceDN: string, containerDN: string): boolean;

        /**
         * Gets the LDAP Distinguished Name of the container for all Site 17 users.
         * @return {string} The value of the "x_g_inte_site_17.source_dn_users" system property or empty if the property is not defined.
         * @memberof Site17UtilConstructor
         */
        getUsersContainerDN(): string;
        
        /**
         * Gets the LDAP Distinguished Name of the container for all Site 17 groups.
         * @return {string} The value of the "x_g_inte_site_17.source_dn_groups" system property or empty if the property is not defined.
         * @memberof Site17UtilConstructor
         */
        getGroupsContainerDN(): string;

        /**
         * Gets a value indicating whether the user records with an empty Source property are considered Site 17 users.
         * @return {boolean} True if the "x_g_inte_site_17.source_user_include_empty" system property is set to "true"; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        includeEmptyUserSource(): boolean;
        
        /**
         * Gets a value indicating whether the group records with an empty Source property are considered Site 17 groups.
         * @return {boolean} True if the "x_g_inte_site_17.source_group_include_empty" system property is set to "true"; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        includeEmptyGroupSource(): boolean;

        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 user.
         * @param {string} sourceDN - The LDAP Distinguished Name.
         * @return {boolean} True if the given DN is for a Site 17 user; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isUserDN(sourceDN: string): boolean;
        
        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 group.
         * @param {string} sourceDN - The LDAP Distinguished Name.
         * @return {boolean} True if the given DN is for a Site 17 group; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isGroupDN(sourceDN: string): boolean;

        /**
         * Tests whether the given glide record or element is to be considered a Site 17 user.
         * @param {(GlideRecord | GlideElementReference | string)} source - The glide record or reference element.
         * @return {boolean} True if the given glide record element is for a Site 17 user; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isSite17User(source: GlideRecord | GlideElementReference | string): source is sys_userElement | sys_userGlideRecord;
        
        /**
         * Tests whether the given glide record or element is to be considered a Site 17 group.
         * @param {(GlideRecord | GlideElementReference | string)} source - The glide record or reference element.
         * @return {boolean} True if the given glide record element is for a Site 17 group; otherwise, false.
         * @memberof Site17UtilConstructor
         */
        isSite17Group(source: GlideRecord | GlideElementReference | string): source is sys_user_groupElement | sys_user_groupGlideRecord;

        /**
         * Creates a new iterator which is a filtered result set of a given iterator.
         * @template TYield - The yielded result type for the iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TYield): boolean; }} predicate - Determines whether a value will be yielded in the result iterator.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the predicate function.
         * @return {Iterator<TYield, TReturn, TNext>} The iterator yielding filtered results.
         * @memberof Site17UtilConstructor
         */
        filterIterator<TYield, TReturn = any, TNext = undefined>(source: Iterator<TYield, TReturn, TNext>, predicate: { (value: TYield): boolean; },
            thisArg?: any): Iterator<TYield, TReturn, TNext>;
        
        /**
         * Creates a new iterator which applies a given function before each value is yielded.
         * @template TYield - The yielded result type for the iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TYield): void; }} callbackFn - The function that is applied to each value before it is yielded in the result iterator.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the callback function.
         * @return {Iterator<TYield, TReturn, TNext>} A wrapper for the original iterator.
         * @memberof Site17UtilConstructor
         */
        reiterate<TYield, TReturn = any, TNext = undefined>(source: Iterator<TYield, TReturn, TNext>, callbackFn: { (value: TYield): void; },
            thisArg?: any): Iterator<TYield, TReturn, TNext>;
        
        /**
         * Maps the yielded results of an iterator to another value or type.
         * @template TInput - The yielded result type for the source iterator.
         * @template TYield - The yielded result type for the mapped iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TInput, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TInput): TYield; }} mapper - A function that converts each value from the source iterator as it is yielded.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the mapper function.
         * @return {Iterator<TYield, TReturn, TNext>} The iterator with mapped values.
         * @memberof Site17UtilConstructor
         */
        mapIterator<TInput, TYield, TReturn = any, TNext = undefined>(source: Iterator<TInput, TReturn, TNext>, mapper: { (value: TInput): TYield; },
            thisArg?: any): Iterator<TYield, TReturn, TNext>;
        
        /**
         * Creates an aggregated value from all yielded values of an iterator.
         * @template TInput - The yielded result type for the source iterator.
         * @template TAcc - The type of aggregated value.
         * @param {Iterator<TInput>} source - The source iterator.
         * @param {TAcc} initialValue - The initial aggregated value.
         * @param {{ (acc: TAcc, cur: TInput): TAcc }} reducerFn - The function that calculates the aggregated value for each yielded iterator value.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the reducer function.
         * @return {TAcc} The final aggregated value.
         * @memberof Site17UtilConstructor
         */
        reduceIterator<TInput, TAcc>(source: Iterator<TInput>, initialValue: TAcc, reducerFn: { (acc: TAcc, cur: TInput): TAcc }, thisArg?: any): TAcc;
        
        /**
         * Gets the first yielded result from an iterator.
         * @template TYield - The yielded result type for the iterator.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TYield): boolean; }} [predicate] - Optional predicate that determines whether to ignore a yielded value.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the predicate function.
         * @return {(TYield | undefined)} The first yielded result that wasn't filered out by the predicate.
         * @memberof Site17UtilConstructor
         */
        firstIterated<TYield>(source: Iterator<TYield>, predicate?: { (value: TYield): boolean; }, thisArg?: any): TYield | undefined;

        /**
         * Gets the first yielded or default result from an iterator.
         * @template TYield - The yielded result type for the iterator.
         * @param {Iterator<TYield>} source - The source iterator.
         * @param {(TYield | { (): TYield; })} ifEmpty - Default value or function that produces the default value if no value was yieled which was not filtered out.
         * @param {{ (value: TYield): boolean; }} [predicate] - Optional predicate that determines whether to ignore a yielded value.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the predicate function.
         * @return {TYield} The first yeilded value that was not filtered out or the default value.
         * @memberof Site17UtilConstructor
         */
        firstIteratedOrDefault<TYield>(source: Iterator<TYield>, ifEmpty: TYield | { (): TYield; }, predicate?: { (value: TYield): boolean; }, thisArg?: any): TYield;

        /**
         * Creates a wrapper iterator that limits the number of iterations from a source iterator.
         * @template TYield - The yielded result type for the mapped iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {number} count - The maximum number of iterations.
         * @return {Iterator<TYield, TReturn, TNext>} - A wrapper iterator with a limited number of iterations.
         * @memberof Site17UtilConstructor
         */
        limitIterator<TYield, TReturn = any, TNext = undefined>(source: Iterator<TYield, TReturn, TNext>, count: number): Iterator<TYield, TReturn, TNext>;
        
        /**
         * Converts the yielded values of an interator to an array.
         * @template TYield - The yielded result type for the iterator.
         * @param {Iterator<TYield>} source - The source iterator.
         * @param {number} [limit] - The optional maximum number of elements (iterations).
         * @return {TYield[]} The yielded values of the iterator.
         * @memberof Site17UtilConstructor
         */
        iteratorToArray<TYield>(source: Iterator<TYield>, limit?: number): TYield[];
    }

    export const Site17Util: Site17UtilConstructor = (function (): Site17UtilConstructor {
    
        var constructor: Site17UtilConstructor = Class.create();

        // #region Static members

        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 user.
         * @param {string} sourceDN - The LDAP Distinguished Name.
         * @return {boolean} True if the given DN is for a Site 17 user; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isUser = function(target: GlideRecord | GlideElementReference): target is sys_userElement | sys_userGlideRecord {
            return !gs.nil(target) && isUser(target);
        };

        /**
         * Tests whether the record or element represents a Group record (sys_user_group).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Group record; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isGroup = function(target: GlideRecord | GlideElementReference): target is sys_user_groupElement | sys_user_groupGlideRecord {
            return !gs.nil(target) && isGroup(target);
        };

        /**
         * Tests whether the record or element is a VIP user or is associated with a VIP user.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a VIP user or if the user that is the target (ie. caller, requestor) of that record is a VIP user;
         * otherwise, false.
         * @static
         * @memberof Site17Util
         * @description If the target is not itself a sys_user record or element, this checks the properties of the following record types to determine the associated user:
         * Incident Caller (incident.caller_id, incident_task.incident.caller_id),
         * Requested For (sc_request.requested_for, sc_req_item.request.requested_for", "sc_task.request.requested_for),
         * Opened For (sm_order.opened_for, sn_si_incident.opened_for),
         * Move User (change_request_imac.move_user) and
         * Affected User (sm_order.affected_user, sn_si_incident.affected_user, sn_si_task.affected_user).
         */
        constructor.isVip = function(target: GlideRecord | GlideElementReference): boolean {
            return !gs.nil(target) && isVip(target);
        };
        
        /**
         * Gets the User record (sys_user) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The target glide record or referenc element.
         * @return {(sys_userGlideRecord | undefined)} The Glide record of the associated user or undefined if the associated user was nil or could not be determined.
         * @static
         * @memberof Site17Util
         * @description If the target is not itself a sys_user record or element, this checks the properties of the following record types to determine the associated user:
         * Incident Caller (incident.caller_id, incident_task.incident.caller_id),
         * Requested For (sc_request.requested_for, sc_req_item.request.requested_for", "sc_task.request.requested_for),
         * Opened For (sm_order.opened_for, sn_si_incident.opened_for),
         * Move User (change_request_imac.move_user) and
         * Affected User (sm_order.affected_user, sn_si_incident.affected_user, sn_si_task.affected_user).
         */
        constructor.getCaller = function(target: GlideRecord | GlideElementReference): sys_userGlideRecord | undefined {
            if (!gs.nil(target)) {
                var c =  getCaller(target);
                if (typeof c !== 'undefined')
                    return <sys_userGlideRecord>c.getRefRecord();
            }
        };

        /**
         * Tests whether the record or element represents a Business Unit record (business_unit).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Business Unit record; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isBusinessUnit = function(target: GlideRecord | GlideElementReference): target is business_unitElement | business_unitGlideRecord {
            return !gs.nil(target) && isBusinessUnit(target);
        };

        /**
         * Tests whether the record or element represents a Department record (cmn_department).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Department record; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isDepartment = function(target: GlideRecord | GlideElementReference): target is cmn_departmentElement | cmn_departmentGlideRecord {
            return !gs.nil(target) && isDepartment(target);
        };

        /**
         * Tests whether the record or element represents a Company record (core_company).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is Company Group record; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isCompany = function(target: GlideRecord | GlideElementReference): target is core_companyElement | core_companyGlideRecord {
            return !gs.nil(target) && isCompany(target);
        };
        
        /**
         * Tests whether the record or element represents a Location record (cmn_location).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Location record; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isLocation = function(target: GlideRecord | GlideElementReference): target is cmn_locationElement | cmn_locationGlideRecord {
            return !gs.nil(target) && isLocation(target);
        };

        /**
         * Tests whether the record or element represents a Building record (cmn_building).
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {boolean} true if the target record or element is a Building record; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isBuilding = function(target: GlideRecord | GlideElementReference): target is cmn_buildingGlideRecord | cmn_buildingElement {
            return !gs.nil(target) && isBuilding(target);
        };

        /**
         * Gets the Business Unit record (business_unit) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {(business_unitGlideRecord | undefined)} The Glide record of the associated business unit or undefined if the associated business unit was nil or could not be determined.
         * @static
         * @memberof Site17Util
         * @description This will search the associated fields of many records to determine the associated business unit, if necessary.
         */
        constructor.getBusinessUnit = function(target: GlideRecord | GlideElementReference): business_unitGlideRecord | undefined {
            if (!gs.nil(target)) {
                if (isBusinessUnit(target))
                    return (target instanceof GlideRecord) ? target : <business_unitGlideRecord>target.getRefRecord();
                var b = getBusinessUnit(target);
                if (typeof b !== 'undefined')
                    return <business_unitGlideRecord>b.getRefRecord();
            }
        };

        /**
         * Gets the Company record (core_company) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {(core_companyGlideRecord | undefined)} The Glide record of the associated company or undefined if the associated company was nil or could not be determined.
         * @static
         * @memberof Site17Util
         * @description This will search the associated fields of many records to determine the associated company, if necessary.
         */
        constructor.getCompany = function(target: GlideRecord | GlideElementReference): core_companyGlideRecord | undefined {
            if (!gs.nil(target)) {
                if (isCompany(target))
                    return (target instanceof GlideRecord) ? target : <core_companyGlideRecord>target.getRefRecord();
                var c = getCompany(target);
                if (typeof c !== 'undefined')
                    return <core_companyGlideRecord>c.getRefRecord();
            }
        };

        /**
         * Gets the Location record (cmn_location) associated with the target glide record or element.
         * @param {(GlideRecord | GlideElementReference)} target - The glide record or reference element.
         * @return {(cmn_locationGlideRecord | undefined)} The Glide record of the associated location or undefined if the associated location was nil or could not be determined.
         * @static
         * @memberof Site17Util
         * @description This will search the associated fields of many records to determine the associated location, if necessary.
         */
        constructor.getLocation = function(target: GlideRecord | GlideElementReference): cmn_locationGlideRecord | undefined {
            if (!gs.nil(target)) {
                if (isLocation(target))
                    return (target instanceof GlideRecord) ? target : <cmn_locationGlideRecord>target.getRefRecord();
                var l = getLocation(target);
                if (typeof l !== 'undefined')
                    return <cmn_locationGlideRecord>l.getRefRecord();
            }
        };

        /**
         * Determines whether a specified DistinguishedName is contained within another.
         * @param {string} sourceDN - The DistinguishedName to check.
         * @param {string} containerDN - The parent DistinguishedName.
         * @return {boolean} true if the source DN is contained within the container DN; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isDnContainedBy = function(sourceDN: string, containerDN: string): boolean {
            var s = '' + sourceDN;
            if (s.trim().length == 0) return false;
            var c = '' + containerDN;
            return c.trim().length > 0 && isDnContainedBy(s, c);
        };

        /**
         * Checks whether a string contains a valid LDAP Distinguished Name.
         * @param {string} value - The target string value.
         * @return {boolean} True if the given string represents a valid LDAP distinguished name; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.testDistinguishedName = function(value: string): boolean {
            if (gs.nil(value)) return false;
            var dn = '' + value;
            if (dn.trim().length == 0) return false;
            return dnRegex.test(dn);
        };

        /**
         * Gets the LDAP Distinguished Name of the container for all Site 17 users.
         * @return {string} The value of the "x_g_inte_site_17.source_dn_users" system property or empty if the property is not defined.
         * @static
         * @memberof Site17Util
         */
        constructor.getUsersContainerDN = function(): string {
            return '' + gs.getProperty(PROPERTY_NAME_source_dn_users, '');
        };

        /**
         * Gets the LDAP Distinguished Name of the container for all Site 17 groups.
         * @return {string} The value of the "x_g_inte_site_17.source_dn_groups" system property or empty if the property is not defined.
         * @static
         * @memberof Site17Util
         */
        constructor.getGroupsContainerDN = function(): string {
            return '' + gs.getProperty(PROPERTY_NAME_source_dn_groups, '');
        };

        /**
         * Gets a value indicating whether the user records with an empty Source property are considered Site 17 users.
         * @return {boolean} True if the "x_g_inte_site_17.source_user_include_empty" system property is set to "true"; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.includeEmptyUserSource = function(): boolean {
            return gs.getProperty(PROPERTY_NAME_source_user_include_empty) == 'true';
        };

        /**
         * Gets a value indicating whether the group records with an empty Source property are considered Site 17 groups.
         * @return {boolean} True if the "x_g_inte_site_17.source_group_include_empty" system property is set to "true"; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.includeEmptyGroupSource = function(): boolean {
            return gs.getProperty(PROPERTY_NAME_source_group_include_empty) == 'true';
        };

        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 user.
         * @param {string} sourceDN - The LDAP Distinguished Name.
         * @return {boolean} True if the given DN is for a Site 17 user; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isUserDN = function(sourceDN: string): boolean { return isUserDN('' + sourceDN); };

        /**
         * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 group.
         * @param {string} sourceDN - The LDAP Distinguished Name.
         * @return {boolean} True if the given DN is for a Site 17 group; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isGroupDN = function(sourceDN: string): boolean { return isGroupDN('' + sourceDN); };

        /**
         * Tests whether the given glide record or element is to be considered a Site 17 user.
         * @param {(GlideRecord | GlideElementReference | string)} source - The glide record or reference element.
         * @return {boolean} True if the given glide record element is for a Site 17 user; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isSite17User = function(source: GlideRecord | GlideElementReference | string): source is sys_userElement | sys_userGlideRecord {
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

        /**
         * Tests whether the given glide record or element is to be considered a Site 17 group.
         * @param {(GlideRecord | GlideElementReference | string)} source - The glide record or reference element.
         * @return {boolean} True if the given glide record element is for a Site 17 group; otherwise, false.
         * @static
         * @memberof Site17Util
         */
        constructor.isSite17Group = function(source: GlideRecord | GlideElementReference | string): source is sys_user_groupElement | sys_user_groupGlideRecord {
            if (gs.nil(source)) return false;
            if (source instanceof GlideRecord || source instanceof GlideElement) {
                if (('' + source.getTableName()) != 'sys_user_group') return false;
                return isGroupDN('' + (<{ [key: string]: any}>source).source);
            }
            var gr: GlideRecord = new GlideRecord('sys_user_group');
            gr.addQuery('sys_id', '' + source);
            gr.query();
            return gr.next() && isGroupDN('' + (<{ [key: string]: any}>gr).source);
        };

        /**
         * Creates a new iterator which is a filtered result set of a given iterator.
         * @template TYield - The yielded result type for the iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TYield): boolean; }} predicate - Determines whether a value will be yielded in the result iterator.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the predicate function.
         * @return {Iterator<TYield, TReturn, TNext>} The iterator yielding filtered results.
         * @static
         * @memberof Site17Util
         */
        constructor.filterIterator = function<TYield, TReturn = any, TNext = undefined>(source: Iterator<TYield, TReturn, TNext>, predicate: { (value: TYield): boolean; },
                thisArg?: any): Iterator<TYield, TReturn, TNext> {
            var context: { return?: IteratorReturnResult<TReturn>; } = { };
            var iterator: Iterator<TYield, TReturn, TNext>;
            if (typeof thisArg === 'undefined') {
                iterator = {
                    next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                        if (typeof context.return !== 'undefined') return context.return;
                        var result = source.next.apply(source, args);
                        if (result.done) {
                            context.return = result;
                            return result;
                        }
                        while (!predicate((<IteratorYieldResult<TYield>>result).value)) {
                            if ((result = source.next.apply(source, args)).done) {
                                context.return = result;
                                break;
                            }
                        }
                        return result;
                    }
                };
                if (typeof source.return !== 'undefined')
                    iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (typeof source.return === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.return(value);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            if (predicate((<IteratorYieldResult<TYield>>result).value))
                                return result;
                        }
                        if (typeof value !== 'undefined')
                            context.return.value = value;
                        return context.return;
                    };
                if (typeof source.throw !== 'undefined')
                    iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        if (typeof source.throw === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.throw(e);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            if (predicate((<IteratorYieldResult<TYield>>result).value))
                                return result;
                        }
                        return context.return;
                    };
            } else {
                iterator = {
                    next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                        if (typeof context.return !== 'undefined') return context.return;
                        var result = source.next.apply(source, args);
                        if (result.done) {
                            context.return = result;
                            return result;
                        }
                        while (!predicate.call(thisArg, (<IteratorYieldResult<TYield>>result).value)) {
                            if ((result = source.next.apply(source, args)).done) {
                                context.return = result;
                                break;
                            }
                        }
                        return result;
                    }
                };
                if (typeof source.return !== 'undefined')
                    iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (typeof source.return === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.return(value);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            if (predicate.call(thisArg, (<IteratorYieldResult<TYield>>result).value))
                                return result;
                        }
                        if (typeof value !== 'undefined')
                            context.return.value = value;
                        return context.return;
                    };
                if (typeof source.throw !== 'undefined')
                    iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        if (typeof source.throw === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.throw(e);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            if (predicate.call(thisArg, (<IteratorYieldResult<TYield>>result).value))
                                return result;
                        }
                        return context.return;
                    };
            }
            return iterator;
        };

        /**
         * Creates a new iterator which applies a given function before each value is yielded.
         * @template TYield - The yielded result type for the iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TYield): void; }} callbackFn - The function that is applied to each value before it is yielded in the result iterator.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the callback function.
         * @return {Iterator<TYield, TReturn, TNext>} A wrapper for the original iterator.
         * @static
         * @memberof Site17Util
         */
        constructor.reiterate = function<TYield, TReturn = any, TNext = undefined>(source: Iterator<TYield, TReturn, TNext>, callbackFn: { (value: TYield): void; },
                thisArg?: any): Iterator<TYield, TReturn, TNext> {
            var context: { return?: IteratorReturnResult<TReturn>; } = { };
            var iterator: Iterator<TYield, TReturn, TNext>;
            if (typeof thisArg === 'undefined') {
                iterator = {
                    next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                        if (typeof context.return !== 'undefined') return context.return;
                        var result = source.next.apply(source, args);
                        if (result.done) {
                            context.return = result;
                            return result;
                        }
                        callbackFn((<IteratorYieldResult<TYield>>result).value);
                        return result;
                    }
                };
                if (typeof source.return !== 'undefined')
                    iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (typeof source.return === 'undefined') {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            if (typeof value !== 'undefined')
                                context.return.value = value;
                            return context.return;
                        }
                        var result = source.return(value);
                        if (result.done)
                            context.return = result;
                        else {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            callbackFn((<IteratorYieldResult<TYield>>result).value);
                        }
                        return result;
                    };
                if (typeof source.throw !== 'undefined')
                    iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        if (typeof source.throw === 'undefined') {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            return context.return;
                        }
                        var result = source.throw(e);
                        if (result.done)
                            context.return = result;
                        else {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            callbackFn((<IteratorYieldResult<TYield>>result).value);
                        }
                        return result;
                    };
            } else {
                iterator = {
                    next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                        if (typeof context.return !== 'undefined') return context.return;
                        var result = source.next.apply(source, args);
                        if (result.done) {
                            context.return = result;
                            return result;
                        }
                        callbackFn.call(thisArg, (<IteratorYieldResult<TYield>>result).value);
                        return result;
                    }
                };
                if (typeof source.return !== 'undefined')
                    iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (typeof source.return === 'undefined') {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            if (typeof value !== 'undefined')
                                context.return.value = value;
                            return context.return;
                        }
                        var result = source.return(value);
                        if (result.done)
                            context.return = result;
                        else {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            callbackFn.call(thisArg, (<IteratorYieldResult<TYield>>result).value);
                        }
                        return result;
                    };
                if (typeof source.throw !== 'undefined')
                    iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        if (typeof source.throw === 'undefined') {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            return context.return;
                        }
                        var result = source.throw(e);
                        if (result.done)
                            context.return = result;
                        else {
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            callbackFn.call(thisArg, (<IteratorYieldResult<TYield>>result).value);
                        }
                        return result;
                    };
            }
            return iterator;
        };

        /**
         * Maps the yielded results of an iterator to another value or type.
         * @template TInput - The yielded result type for the source iterator.
         * @template TYield - The yielded result type for the mapped iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TInput, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TInput): TYield; }} mapper - A function that converts each value from the source iterator as it is yielded.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the mapper function.
         * @return {Iterator<TYield, TReturn, TNext>} The iterator with mapped values.
         * @static
         * @memberof Site17Util
         */
        constructor.mapIterator = function<TInput, TYield, TReturn = any, TNext = undefined>(source: Iterator<TInput, TReturn, TNext>, mapper: { (value: TInput): TYield; },
                thisArg?: any): Iterator<TYield, TReturn, TNext> {
            var context: { return?: IteratorReturnResult<TReturn>; } = { };
            var iterator: Iterator<TYield, TReturn, TNext>;
            if (typeof thisArg === 'undefined') {
                iterator = {
                    next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                        if (typeof context.return !== 'undefined') return context.return;
                        var result = source.next.apply(source, args);
                        if (result.done) {
                            context.return = result;
                            return result;
                        }
                        return { value: mapper(result.value) };
                    }
                };
                if (typeof source.return !== 'undefined')
                    iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (typeof source.return === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.return(value);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            return { value: mapper(result.value) };
                        }
                        if (typeof value !== 'undefined')
                            context.return.value = value;
                        return context.return;
                    };
                if (typeof source.throw !== 'undefined')
                    iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        if (typeof source.throw === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.throw(e);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            return { value: mapper(result.value) };
                        }
                        return context.return;
                    };
            } else {
                iterator = {
                    next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                        if (typeof context.return !== 'undefined') return context.return;
                        var result = source.next.apply(source, args);
                        if (result.done) {
                            context.return = result;
                            return result;
                        }
                        return { value: mapper.call(thisArg, result.value) };
                    }
                };
                if (typeof source.return !== 'undefined')
                    iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                        if (typeof source.return === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.return(value);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            return { value: mapper.call(thisArg, result.value) };
                        }
                        if (typeof value !== 'undefined')
                            context.return.value = value;
                        return context.return;
                    };
                if (typeof source.throw !== 'undefined')
                    iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                        if (typeof source.throw === 'undefined')
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        else {
                            var result = source.throw(e);
                            if (result.done) {
                                context.return = result;
                                return result;
                            }
                            context.return = <IteratorReturnResult<TReturn>>{ done: true };
                            return { value: mapper.call(thisArg, result.value) };
                        }
                        return context.return;
                    };
            }
            return iterator;
        };

        /**
         * Creates an aggregated value from all yielded values of an iterator.
         * @template TInput - The yielded result type for the source iterator.
         * @template TAcc - The type of aggregated value.
         * @param {Iterator<TInput>} source - The source iterator.
         * @param {TAcc} initialValue - The initial aggregated value.
         * @param {{ (acc: TAcc, cur: TInput): TAcc }} reducerFn - The function that calculates the aggregated value for each yielded iterator value.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the reducer function.
         * @return {TAcc} The final aggregated value.
         * @static
         * @memberof Site17Util
         */
        constructor.reduceIterator = function<TInput, TAcc>(source: Iterator<TInput>, initialValue: TAcc, reducerFn: { (acc: TAcc, cur: TInput): TAcc },
                thisArg?: any): TAcc {
            var result = source.next();
            if (typeof thisArg === 'undefined')
                while (!result.done) {
                    initialValue = reducerFn(initialValue, result.value);
                    result = source.next();
                }
            else
                while (!result.done) {
                    initialValue = reducerFn.call(thisArg, initialValue, result.value);
                    result = source.next();
                }
            return initialValue;
        };

        
        /**
         * Gets the first yielded result from an iterator.
         * @template TYield - The yielded result type for the iterator.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {{ (value: TYield): boolean; }} [predicate] - Optional predicate that determines whether to ignore a yielded value.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the predicate function.
         * @return {(TYield | undefined)} The first yielded result that wasn't filered out by the predicate.
         * @static
         * @memberof Site17Util
         */
        constructor.firstIterated = function<TYield>(source: Iterator<TYield>, predicate?: { (value: TYield): boolean; }, thisArg?: any): TYield | undefined {
            var result = source.next();
            if (typeof predicate === 'undefined') {
                if (!result.done) return result.value;
            } else if (typeof thisArg === 'undefined')
                while (!result.done) {
                    if (predicate(result.value)) return result.value;
                    result = source.next();
                }
            else
                while (!result.done) {
                    if (predicate.call(thisArg, result.value)) return result.value;
                    result = source.next();
                }
        }

        /**
         * Gets the first yielded or default result from an iterator.
         * @template TYield - The yielded result type for the iterator.
         * @param {Iterator<TYield>} source - The source iterator.
         * @param {(TYield | { (): TYield; })} ifEmpty - Default value or function that produces the default value if no value was yieled which was not filtered out.
         * @param {{ (value: TYield): boolean; }} [predicate] - Optional predicate that determines whether to ignore a yielded value.
         * @param {*} [thisArg] - An optional object to which the this keyword can refer in the predicate function.
         * @return {TYield} The first yeilded value that was not filtered out or the default value.
         * @static
         * @memberof Site17Util
         */
        constructor.firstIteratedOrDefault = function<TYield>(source: Iterator<TYield>, ifEmpty: TYield | { (): TYield; }, predicate?: { (value: TYield): boolean; },
                thisArg?: any): TYield {
            var result = source.next();
            if (typeof predicate === 'undefined') {
                if (!result.done) return result.value;
            } else if (typeof thisArg === 'undefined')
                while (!result.done) {
                    if (predicate(result.value)) return result.value;
                    result = source.next();
                }
            else
                while (!result.done) {
                    if (predicate.call(thisArg, result.value)) return result.value;
                    result = source.next();
                }
            if (typeof ifEmpty === "function") return (<{ (): TYield; }>ifEmpty)();
            return ifEmpty;
        };
        
        
        /**
         * Creates a wrapper iterator that limits the number of iterations from a source iterator.
         * @template TYield - The yielded result type for the mapped iterator.
         * @template TReturn - The optional final value type for the iterator.
         * @template TNext - The optional parameter type for obtaining a yielded result.
         * @param {Iterator<TYield, TReturn, TNext>} source - The source iterator.
         * @param {number} count - The maximum number of iterations.
         * @return {Iterator<TYield, TReturn, TNext>} - A wrapper iterator with a limited number of iterations.
         * @static
         * @memberof Site17Util
         */
        constructor.limitIterator = function<TYield, TReturn = any, TNext = undefined>(source: Iterator<TYield, TReturn, TNext>,
                count: number): Iterator<TYield, TReturn, TNext> {
            if (isNaN(count)) count = 0;
            var context: { iterations: number; return?: IteratorReturnResult<TReturn>; } = { iterations: 0 };
            var iterator = <Iterator<TYield, TReturn, TNext>>{
                next: function(...args: [] | [TNext]): IteratorResult<TYield, TReturn> {
                    if (typeof context.return !== 'undefined') return context.return;
                    context.iterations++;
                    if (context.iterations > count) {
                        context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        return context.return;
                    }
                    var result = source.next.apply(source, args);
                    if (result.done) {
                        context.return = result;
                        return result;
                    }
                    return result;
                }
            };
            if (typeof source.return !== 'undefined')
                iterator.return = function(value?: TReturn): IteratorResult<TYield, TReturn> {
                    if (typeof source.return === 'undefined') {
                        context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        if (typeof value !== 'undefined')
                            context.return.value = value;
                        return context.return;
                    }
                    var result = source.return(value);
                    if (result.done)
                        context.return = result;
                    else
                        context.return = <IteratorReturnResult<TReturn>>{ done: true };
                    return result;
                };
            if (typeof source.throw !== 'undefined')
                iterator.throw = function(e?: any): IteratorResult<TYield, TReturn> {
                    if (typeof source.throw === 'undefined') {
                        context.return = <IteratorReturnResult<TReturn>>{ done: true };
                        return context.return;
                    }
                    var result = source.throw(e);
                    if (result.done)
                        context.return = result;
                    else
                        context.return = <IteratorReturnResult<TReturn>>{ done: true };
                    return result;
                };
            return iterator;
        }
        
        /**
         * Converts the yielded values of an interator to an array.
         * @template TYield - The yielded result type for the iterator.
         * @param {Iterator<TYield>} source - The source iterator.
         * @param {number} [limit] - The optional maximum number of elements (iterations).
         * @return {TYield[]} The yielded values of the iterator.
         * @memberof Site17UtilConstructor
         */
        constructor.iteratorToArray = function<TYield>(source: Iterator<TYield>, limit?: number): TYield[] {
            var result = [];
            var yielded = source.next();
            if (typeof limit === 'number' && !isNaN(limit))
                while (result.length < limit && !yielded.done) {
                    result.push(yielded.value);
                    yielded = source.next();
                }
            else
                while (!yielded.done) {
                    result.push(yielded.value);
                    yielded = source.next();
                }
            return result;
        }

        // #endregion
        
        constructor.prototype = Object.extendsObject<IAbstractAjaxProcessor, ISite17UtilPrototype>(global.AbstractAjaxProcessor, {
            /**
             * Determines whether a specified DistinguishedName is contained within another.
             * @return {("true" | "false")} "true" if the source DN is contained within the container DN; otherwise, "false".
             * @memberof ISite17Util
             * @description This is intended to be invoked by a client script.
             * AJAX Parameter names: "sys_parm_target_dn"=The DistinguishedName to check;
             * "sys_parm_container_dn"=The parent DistinguishedName.
             */
            isDnContainedBy: function(this: ISite17UtilPrototype & IAbstractAjaxProcessor): "true"|"false" {
                return <"true"|"false">JSON.stringify(constructor.isDnContainedBy('' + this.getParameter(PARAM_NAME.target_dn),
                    '' + this.getParameter(PARAM_NAME.container_dn)));
            },
        
            /**
             * Gets the LDAP Distinguished Name of the container for all Site 17 users.
             * @return {string} The value of the "x_g_inte_site_17.source_dn_users" system property or empty if the property is not defined.
             * @memberof ISite17Util
             */
            getUsersContainerDN: function() { return constructor.getUsersContainerDN(); },
            
            /**
             * Gets the LDAP Distinguished Name of the container for all Site 17 groups.
             * @return {string} The value of the "x_g_inte_site_17.source_dn_groups" system property or empty if the property is not defined.
             * @memberof ISite17Util
             */
            getGroupsContainerDN: function() { return constructor.getGroupsContainerDN(); },
            
            /**
             * Gets a value indicating whether the user records with an empty Source property are considered Site 17 users.
             * @return {("true" | "false")} "true" if the "x_g_inte_site_17.source_user_include_empty" system property is set to "true"; otherwise, "false".
             * @memberof ISite17Util
             */
            includeEmptyUserSource: function(): "true"|"false" { return <"true"|"false">JSON.stringify(constructor.includeEmptyUserSource()); },
            
            /**
             * Gets a value indicating whether the group records with an empty Source property are considered Site 17 groups.
             * @return {("true" | "false")} "true" if the "x_g_inte_site_17.source_group_include_empty" system property is set to "true"; otherwise, "false".
             * @memberof ISite17Util
             */
            includeEmptyGroupSource: function(): "true"|"false" { return <"true"|"false">JSON.stringify(constructor.includeEmptyGroupSource()); },
            
            /**
             * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 user.
             * @return {("true" | "false")} "true" if the given DN is for a Site 17 user; otherwise, "false".
             * @memberof ISite17Util
             * @description This is intended to be invoked by a client script.
             * AJAX Parameter name: "sys_parm_target_dn"=The DistinguishedName to check.
             */
            isUserDN: function(this: ISite17UtilPrototype & IAbstractAjaxProcessor): "true"|"false" {
                return <"true"|"false">JSON.stringify(isUserDN('' + this.getParameter(PARAM_NAME.target_dn)));
            },
            
            /**
             * Tests whether a given LDAP Distinguished Name is to be considered that of a Site 17 group.
             * @return {("true" | "false")} "true" if the given DN is for a Site 17 group; otherwise, "false".
             * @memberof ISite17Util
             * @description This is intended to be invoked by a client script.
             * AJAX Parameter name: "sys_parm_target_dn"=The DistinguishedName to check.
             */
            isGroupDN: function(this: ISite17UtilPrototype & IAbstractAjaxProcessor): "true"|"false" {
                return <"true"|"false">JSON.stringify(isGroupDN('' + this.getParameter(PARAM_NAME.target_dn)));
            },
            
            /**
             * Tests whether the given glide record or element is to be considered a Site 17 user.
             * @return {("true" | "false")} "true" if the given glide record element is for a Site 17 user; otherwise, "false".
             * @memberof ISite17Util
             * @description This is intended to be invoked by a client script.
             * AJAX Parameter name: "sys_parm_user_id"=The SysID of a User (sys_user) record.
             */
            isSite17User: function(this: ISite17UtilPrototype & IAbstractAjaxProcessor): "true"|"false" {
                var gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', '' + this.getParameter(PARAM_NAME.user_id));
                gr.query();
                return <"true"|"false">JSON.stringify(gr.next() && isUserDN('' + (<{ [key: string]: any}>gr).source));
            },
            
            /**
             * Tests whether the given glide record or element is to be considered a Site 17 group.
             * @return {("true" | "false")} "true" if the given glide record element is for a Site 17 group; otherwise, "false".
             * @memberof ISite17Util
             * @description This is intended to be invoked by a client script.
             * AJAX Parameter name: "sys_parm_user_group_id"=The SysID of a Group (sys_user_group) record.
             */
            isSite17Group: function(this: ISite17UtilPrototype & IAbstractAjaxProcessor): "true"|"false" {
                var gr = new GlideRecord('sys_user_group');
                gr.addQuery('sys_id', '' + this.getParameter(PARAM_NAME.group_id));
                gr.query();
                return <"true"|"false">JSON.stringify(gr.next() && isGroupDN('' + (<{ [key: string]: any}>gr).source));
            },

            type: "Site17Util"
        });

        // #region Private members

        /**
         * Parameter names for GlideAjax calls.
         * @readonly
         * @enum {string}
         */
         enum PARAM_NAME {
            /** Required by {@link ISite17Util#isDnContainedBy}, {@link ISite17Util#isUserDN} and {@link ISite17Util#isGroupDN} to specify the target Distinguished Name. */
            target_dn = 'sys_parm_target_dn',
            
            /** Required by {@link ISite17Util#isDnContainedBy} to specify the container Distinguished Name. */
            container_dn = 'sys_parm_container_dn',
            
            /** Required by {@link ISite17Util#isSite17User} to specify the SysID of the user. */
            user_id = 'sys_parm_user_id',
            
            /** Required by {@link ISite17Util#isSite17Group} to specify the SysID of the group. */
            group_id = 'sys_parm_group_id'
        }

        const PROPERTY_NAME_source_dn_users = 'x_g_inte_site_17.source_dn_users';
        const PROPERTY_NAME_source_dn_groups = 'x_g_inte_site_17.source_dn_groups';
        const PROPERTY_NAME_source_user_include_empty = 'x_g_inte_site_17.source_user_include_empty';
        const PROPERTY_NAME_source_group_include_empty = 'x_g_inte_site_17.source_group_include_empty';
        const dnRegex = /^([^=,]+|\\.)+=([^,]+|\\.)*(,([^=,]+|\\.)+=([^,]+|\\.)*)*$/;
        const TABLE_NAME_sys_user = 'sys_user';
        const TABLE_NAME_sys_user_group = 'sys_user_group';
        const TABLE_NAME_business_unit = 'business_unit';
        const TABLE_NAME_cmn_department = 'cmn_department';
        const TABLE_NAME_core_company = 'core_company';
        const TABLE_NAME_cmn_location = 'cmn_location';
        const TABLE_NAME_cmn_building = 'cmn_building';
        const TABLE_NAME_incident = 'incident';
        const TABLE_NAME_change_request_imac = 'change_request_imac';
        const TABLE_NAME_incident_task = 'incident_task';
        const TABLE_NAME_sm_order = 'sm_order';
        const TABLE_NAME_sn_si_incident = 'sn_si_incident';
        const TABLE_NAME_sn_si_task = 'sn_si_task';
        const TABLE_NAME_sc_request = 'sc_request';
        const TABLE_NAME_sc_req_item = 'sc_req_item';
        const TABLE_NAME_sc_task = 'sc_task';

        function isUser(target: GlideRecord | GlideElementReference): target is sys_userElement | sys_userGlideRecord {
            return target.getTableName() == TABLE_NAME_sys_user;
        }
        
        function isGroup(target: GlideRecord | GlideElementReference): target is sys_user_groupElement | sys_user_groupGlideRecord {
            return target.getTableName() == TABLE_NAME_sys_user_group;
        }

        function getCaller(target: GlideRecord | GlideElementReference): sys_userElement | undefined {
            var caller: sys_userElement;
            
            switch ('' + target.getTableName()) {
                case TABLE_NAME_incident:
                    caller = <sys_userElement>(<incidentFields><any>target).caller_id;
                    break;
                case TABLE_NAME_change_request_imac:
                    caller = <sys_userElement>(<change_request_imacFields><any>target).move_user;
                    break;
                case TABLE_NAME_incident_task:
                    caller = <sys_userElement>(<{ [key: string]: any; }>target).incident.caller_id;
                    break;
                case TABLE_NAME_sm_order:
                case TABLE_NAME_sn_si_incident:
                    caller = <sys_userElement>((gs.nil((<{ [key: string]: any; }>target).opened_for)) ? (<{ [key: string]: any; }>target).caller : (<{ [key: string]: any; }>target).opened_for);
                    break;
                case TABLE_NAME_sn_si_task:
                    caller = <sys_userElement>(<{ [key: string]: any; }>target).affected_user;
                    break;
                case TABLE_NAME_sc_request:
                    caller = <sys_userElement>(<sc_requestFields><any>target).requested_for;
                    break;
                case TABLE_NAME_sc_req_item:
                case TABLE_NAME_sc_task:
                    caller = <sys_userElement>(<sc_requestElement>(<sc_taskFields><any>target).request).requested_for;
                    break;
                default:
                    return;
            }
            if (!caller.nil())
                return caller;
        }

        function isVip(target: GlideRecord | GlideElementReference): boolean {
            if (isUser(target)) return ('' + target.vip) == 'true';
            var c = getCaller(target);
            return typeof c !== 'undefined' && ('' + c.vip) == 'true';
        }
        
        function isBusinessUnit(target: GlideRecord | GlideElementReference): target is business_unitElement | business_unitGlideRecord {
            return target.getTableName() == TABLE_NAME_business_unit;
        }
        
        function isDepartment(target: GlideRecord | GlideElementReference): target is cmn_departmentElement | cmn_departmentGlideRecord {
            return target.getTableName() == TABLE_NAME_cmn_department;
        }
        
        function isCompany(target: GlideRecord | GlideElementReference): target is core_companyElement | core_companyGlideRecord {
            return target.getTableName() == TABLE_NAME_core_company;
        }
        
        function isLocation(target: GlideRecord | GlideElementReference): target is cmn_locationElement | cmn_locationGlideRecord {
            return target.getTableName() == TABLE_NAME_cmn_location;
        }
        
        function isBuilding(target: GlideRecord | GlideElementReference): target is cmn_buildingGlideRecord | cmn_buildingElement {
            return target.getTableName() == TABLE_NAME_cmn_building;
        }
        
        function getBusinessUnitCompany(target: business_unitGlideRecord | business_unitElement): core_companyElement {
            var parent = target;
            do {
                if (!(<core_companyElement>parent.company).nil())
                    return <core_companyElement>parent.company;
            } while (!(parent = <business_unitElement>parent.parent).nil())
            return <core_companyElement>target.company;
        }
        
        function getDepartmentCompany(target: cmn_departmentGlideRecord | cmn_departmentElement): core_companyElement {
            var parent = target;
            do {
                if (!(<core_companyElement>parent.company).nil())
                    return <core_companyElement>parent.company;
            } while (!(parent = <cmn_departmentElement>parent.parent).nil());
            var b = getDepartmentBusinessUnit(target);
            if (!b.nil()) {
                var c = getBusinessUnitCompany(b);
                if (!c.nil()) return c;
            }
            return <core_companyElement>target.company;
        }
        
        function getDepartmentBusinessUnit(target: cmn_departmentGlideRecord | cmn_departmentElement): business_unitElement {
            var parent = target;
            do {
                if (!(<business_unitElement>parent.business_unit).nil())
                    return <business_unitElement>parent.business_unit;
            } while (!(parent = <cmn_departmentElement>parent.parent).nil());
            return <business_unitElement>target.business_unit;
        }
        
        function getBusinessUnit(target: GlideRecord | GlideElementReference): business_unitElement | undefined {
            switch ('' + target.getTableName()) {
                case TABLE_NAME_sys_user:
                    if ((target = <cmn_departmentElement>(<sys_userFields><any>target).department).nil()) return;
                    break;
                case TABLE_NAME_cmn_department:
                    break;
                default:
                    return;
            }
            var b = getDepartmentBusinessUnit(<cmn_departmentElement><any>target);
            if (typeof b !== undefined)
                return b;
        }

        function getCompany(target: GlideRecord | GlideElementReference): core_companyElement | undefined {
            var company: core_companyElement;
            switch ('' + target.getTableName()) {
                case TABLE_NAME_sys_user:
                    if (!(<core_companyElement>(<sys_userElement>target).company).nil()) return <core_companyElement>(<sys_userElement>target).company;
                    var department: cmn_departmentElement = <cmn_departmentElement>(<sys_userElement>target).department;
                    company = getDepartmentCompany(department);
                    break;
                case TABLE_NAME_cmn_department:
                    company = getDepartmentCompany(<cmn_departmentElement>target);
                    break;
                case TABLE_NAME_business_unit:
                    company = getBusinessUnitCompany(<business_unitElement>target);
                    break;
                default:
                    return;
            }
            if (!company.nil()) return company;
        }

        function getLocation(target: GlideRecord | GlideElementReference): cmn_locationElement | undefined {
            switch ('' + target.getTableName()) {
                case TABLE_NAME_sys_user:
                    if (!(<core_companyElement>(<sys_userElement>target).location).nil()) return <cmn_locationElement>(<sys_userElement>target).location;
                    target = <cmn_buildingElement>(<sys_userElement>target).building;
                    break;
                case TABLE_NAME_cmn_building:
                    break;
                default:
                    return;
            }
            if (!((<cmn_buildingElement>target).nil() || (<cmn_locationElement>(<cmn_buildingElement>target).location).nil()))
                return <cmn_locationElement>(<cmn_buildingElement>target).location;
        }

        function isDnContainedBy(sourceDN: string, containerDN: string): boolean {
            if (sourceDN.length == containerDN.length)
                return sourceDN.toLowerCase() == containerDN.toLowerCase();
            if (sourceDN.length >= (containerDN.length + 1)) return false;
            return sourceDN.toLowerCase().endsWith(',' + containerDN.toLowerCase());
        }

        function isUserDN(sourceDN: string): boolean {
            var containerDN = constructor.getUsersContainerDN();
            if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
            if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
            if (sourceDN.trim().length == 0) return constructor.includeEmptyUserSource();
            return isDnContainedBy(sourceDN, containerDN);
        }

        function isGroupDN(sourceDN: string): boolean {
            var containerDN = constructor.getGroupsContainerDN();
            if (sourceDN.startsWith('ldap:')) sourceDN = sourceDN.substring(5);
            if (containerDN.trim().length == 0) return sourceDN.trim().length == 0;
            if (sourceDN.trim().length == 0) return constructor.includeEmptyGroupSource();
            return isDnContainedBy(sourceDN, containerDN);
        }

        // #endregion
        
        return constructor;
    })();
}