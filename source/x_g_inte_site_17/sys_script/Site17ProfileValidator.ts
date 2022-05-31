/// <reference path="../servicnowCommon.d.ts" />

interface IProfileFieldDefinition {
    /**
     * The table column name.
     *
     * @type {string}
     * @memberof IProfileFieldDefinition
     */
    name: string;

    /**
     * The label for the field.
     *
     * @type {string}
     * @memberof IProfileFieldDefinition
     */
    label: string;

    /**
     * Adjective used for the field for failure messages.
     *
     * @type {string}
     * @memberof IProfileFieldDefinition
     */
    failAdj: string;
}

interface IUserLookupResult {
    /**
     * The profile compliance check result code: 0=Success; 1=User not found; 2=Unexpected exception trying to find user.
     *
     * @type {number}
     * @memberof IUserProfileComplianceResult
     */
    code: number;

    /**
     * The sys_id of the sys_user that was found or the sys_id that was used for the user lookup.
     *
     * @type {(string | undefined)}
     * @memberof IUserLookupResult
     */
    sys_id?: string;

    /**
     * The user_id of the sys_user that was found or the user_id that was used for the user lookup.
     *
     * @type {(string | undefined)}
     * @memberof IUserLookupResult
     */
    user_id?: string;

    /**
     * The sys_user that was found.
     *
     * @type {(GlideRecord | GlideElementReference | undefined)}
     * @memberof IUserLookupResult
     */
    user?: GlideRecord | GlideElementReference;

    /**
     * The user lookup failure message.
     *
     * @type {string}
     * @memberof IUserLookupResult
     */
    message?: string;

    /**
     * Describes the fatal error.
     *
     * @type {(any | undefined)}
     * @memberof IUserProfileComplianceInfo
     */
    fault?: any;
}

interface IComplianceCheckResult {
    /**
     * The label for the field that was checked.
     *
     * @type {string}
     * @memberof IProfileFieldDefinition
     */
    label: string;

    /**
     * Indicates whether the compliance check passed.
     *
     * @type {boolean}
     * @memberof IComplianceCheckResult
     */
    passed: boolean;

    /**
     * The field access failure message.
     *
     * @type {string}
     * @memberof IUserLookupResult
     */
     message?: string;

    /**
     * Describes the fatal error.
     *
     * @type {(any | undefined)}
     * @memberof IUserProfileComplianceInfo
     */
    fault?: any;
}

/**
 * User compliance check information
 *
 * @interface IUserProfileComplianceInfo
 */
interface IUserProfileComplianceInfo {
    /**
     * The number of compliance checks not evaluated due to fatal exception.
     *
     * @type {number}
     * @memberof IUserProfileComplianceInfo
     */
    notChecked: number;
    
    /**
     * The number of evaluated compliance checks that passed.
     *
     * @type {number}
     * @memberof IUserProfileComplianceInfo
     */
    passed: number;
    
    /**
     * The number of evaluated compliance checks that failed.
     *
     * @type {number}
     * @memberof IUserProfileComplianceInfo
     */
    failed: number;

    /**
     * Compliance check results by name.
     *
     * @type {(Record<string, IComplianceCheckResult> | undefined)}
     * @memberof IUserProfileComplianceInfo
     */
    results?: Record<string, IComplianceCheckResult>

    /**
     * Compliance check result message.
     *
     * @type {string}
     * @memberof IUserProfileComplianceInfo
     */
    message: string;

    /**
     * Describes the fatal error.
     *
     * @type {(any | undefined)}
     * @memberof IUserProfileComplianceInfo
     */
    fault?: any;
}

interface IUserProfileComplianceResult extends IUserProfileComplianceInfo {
    /**
     * The profile compliance check result code: 0=Success; 1=User not found; 2=Unexpected exception trying to find user.
     *
     * @type {number}
     * @memberof IUserProfileComplianceResult
     */
    code: number;

    /**
     * The sys_id of the sys_user that was found or the sys_id that was used for the user lookup.
     *
     * @type {(string | undefined)}
     * @memberof IUserLookupResult
     */
    sys_id?: string;

    /**
     * The user_id of the sys_user that was found or the user_id that was used for the user lookup.
     *
     * @type {(string | undefined)}
     * @memberof IUserLookupResult
     */
     user_id?: string;
}

interface IUserNotificationsResult {
    /**
     * The profile compliance check result code: 0=Success; 1=User not found; 2=Unexpected exception trying to find user.
     *
     * @type {number}
     * @memberof IUserProfileComplianceResult
     */
    code: number;

    /**
     * The sys_id of the sys_user that was found or the sys_id that was used for the user lookup.
     *
     * @type {(string | undefined)}
     * @memberof IUserLookupResult
     */
    sys_id?: string;
    
    /**
     * The user_id of the sys_user that was found or the user_id that was used for the user lookup.
     *
     * @type {(string | undefined)}
     * @memberof IUserLookupResult
     */
     user_id?: string;

     /**
      * Profile compliance check information.
      *
      * @type {IUserProfileComplianceInfo}
      * @memberof IUserNotificationsResult
      */
     profileCompliance: IUserProfileComplianceInfo;
}

interface IProfileValidatorBase extends $$snClass.ICustomClassBase<IProfileValidatorBase, "ProfileValidator"> {
    /**
     * Gets compliance check information for the user indicated by the 'sysparm_user_id' parameter.
     *
     * @returns {string} A JSON string containing an {@link IUserProfileComplianceResult} object that describes the result of the compliance check.
     * @memberof IProfileValidatorPrototype
     */
    getUserProfileCompliance(): string;

    /**
     * Gets compliance check notifications for the user indicated by the 'sysparm_user_id' parameter.
     *
     * @returns {string} A JSON string containing an {@link IUserNotificationsResult} object that contains the compliance notification information.
     * @memberof IProfileValidatorPrototype
     */
    getUserNotifications(): string;
}

interface IProfileValidatorPrototype extends $$snClass.ICustomClassPrototype0<IProfileValidatorBase, IProfileValidatorPrototype, "ProfileValidator">, IProfileValidatorBase {
}

interface IProfileValidator extends Readonly<IProfileValidatorBase> { }

interface ProfileValidatorConstructor extends $$snClass.CustomClassConstructor0<IProfileValidatorBase, IProfileValidatorPrototype, IProfileValidator> {
    /**
     * Indicates whether the user lookup result represents a fatal error.
     *
     * @param {IUserLookupResult} result The user lookup result object
     * @returns {boolean} true if the user lookup result indicates a fatal error; otherwise, false.
     * @memberof ProfileValidatorConstructor
     */
    isUserLookupFault(result: IUserLookupResult): boolean;

    /**
     * Attempts to get a related user or look up a user.
     *
     * @param {(GlideRecord | GlideElementReference | string)} user - The object referring to a user, a sys_id for a user or a user name (user_id).
     * @returns {IUserLookupResult} An object that represents the result of detecting the associated user or looking up the user.
     * @memberof ProfileValidatorConstructor
     */
    getUserLookupResult(user: GlideRecord | GlideElementReference | string): IUserLookupResult;

    /**
     * Does a compliance check for the specified sys_user.
     *
     * @param {(GlideRecord | GlideElementReference)} sys_user - The user to validate.
     * @returns {IUserProfileComplianceInfo} An object that describes the compliance check result.
     * @memberof ProfileValidatorConstructor
     */
    checkUserProfileCompliance(sys_user: GlideRecord | GlideElementReference): IUserProfileComplianceInfo;

    /**
     * Gets compliance check information for the specified user.
     *
     * @param {(GlideRecord | GlideElementReference | string)} user - The object referring to a user, a sys_id for a user or a user name (user_id).
     * @returns {IUserProfileComplianceResult} An object that describes the result of the compliance check.
     * @memberof ProfileValidatorConstructor
     */
    getUserProfileCompliance(user: GlideRecord | GlideElementReference | string): IUserProfileComplianceResult;

    /**
     * Gets compliance check notifications for the specified user.
     *
     * @param {(GlideRecord | GlideElementReference | string)} user - The object referring to a user, a sys_id for a user or a user name (user_id).
     * @returns {IUserNotificationsResult} An object that contains the compliance notification information.
     * @memberof ProfileValidatorConstructor
     */
    getUserNotifications(user: GlideRecord | GlideElementReference | string): IUserNotificationsResult;
}

const ProfileValidator: ProfileValidatorConstructor = (function (): ProfileValidatorConstructor {
    var profileValidatorConstructor: ProfileValidatorConstructor = Class.create();

    var SYSID_RE: RegExp = /^[\da-f]{32}$/i;
    var PROFILE_FIELDS: IProfileFieldDefinition[] = [
        { name: 'building', label: 'Building', failAdj: "selected" },
        { name: 'department', label: 'Department', failAdj: "selected" },
        { name: 'u_red_phone', label: 'Red Phone', failAdj: "empty" }
    ];

    profileValidatorConstructor.isUserLookupFault = function(result: IUserLookupResult): boolean {
        return typeof result === 'object' && null != result && result.code !== 0;
    };

    profileValidatorConstructor.getUserLookupResult = function(user: GlideRecord | GlideElementReference | string): IUserLookupResult {
        var user_id, sys_id;
        if (typeof user === 'object') {
            if (user != null) {
                if (user instanceof GlideRecord || user instanceof GlideElement) {
                    return { code: 0, sys_id: ('' + user.sys_id), user_id: ('' + (<{ [key: string]: any}>user).user_id), user: user };
                }
                if (user instanceof GlideUser)
                    sys_id = user_id = '' + user.getID();
                else
                    user_id = ('' + user).trim();
            } else
                sys_id = user_id = '' + gs.getUserID();
        } else if (typeof user === 'undefined' || (user_id = ('' + user).trim()).length == 0)
            sys_id = user_id = '' + gs.getUserID();
        try {
            var gr = new GlideRecord('sys_user');
            if (typeof sys_id === 'string') {
                gr.addQuery('sys_id', sys_id);
                gr.query();
                if (gr.next())
                    return { code: 0, sys_id: sys_id, user_id: user_id, user: gr };
            } else {
                if (SYSID_RE.test(user_id)) {
                    gr.addQuery('sys_id', user_id.toLowerCase());
                    gr.query();
                    if (gr.next())
                        return { code: 0, sys_id: sys_id, user_id: user_id, user: gr };
                    // In the off-chance that someone has a user_name that matches the pattern of a sys_id
                    gr = new GlideRecord('sys_user');
                }
                gr.addQuery('user_name', user_id);
                gr.query();
                if (gr.next())
                    return { code: 0, sys_id: '' + gr.sys_id, user_id: user_id, user: gr };
            }
        } catch (e) {
            return { code: 2, user_id: user_id, sys_id: sys_id, message: 'Unexpected exception while looking up user record', fault: e };
        }
        if (typeof sys_id === 'string')
            return { code: 1, user_id: user_id, sys_id: sys_id, message: 'User with sys_id "' + sys_id + '" not found' };
        if (SYSID_RE.test(user_id))
            return { code: 1, user_id: user_id, sys_id: user_id.toLowerCase(), message: 'User with sys_id or user_name "' + user_id + '" not found' };
        return { code: 1, user_id: user_id, message: 'User with user_name "' + user_id + '" not found' };
    };

    profileValidatorConstructor.checkUserProfileCompliance = function(sys_user: GlideRecord | GlideElementReference): IUserProfileComplianceInfo {
        var result: IUserProfileComplianceInfo = <IUserProfileComplianceInfo>{
            notChecked: 0,
            results: {}
        };
        var failed = PROFILE_FIELDS.filter(function(value) {
            try {
                if (gs.nil(sys_user[value.name])) {
                    result.results[value.name] = { label: value.label, passed: false };
                    return true;
                }
                result.results[value.name] = { label: value.label, passed: true };
            } catch (e) {
                result.notChecked++;
                result.results[value.name] = {
                    label: value.label,
                    message: 'Unexpected exception accessing field',
                    fault: e,
                    passed: false
                };
            }
            return false;
        });
        result.passed = PROFILE_FIELDS.length - ((result.failed = failed.length) + result.notChecked);
        if (failed.length == 0) {
            if (result.notChecked == 0)
                result.message = "All compliance checks passed";
            else if (result.passed > 0)
                result.message = (result.notChecked == 1) ? "One compliance check was inconclusive due to unexpected error; all other compliance checks passed." :
                result.notChecked + " compliance checks were inconclusive due to unexpected errors; all other compliance checks passed.";
            else
                result.message = "All compliance checks were inconclusive due to unexpected errors.";
        } else {
            var last = failed.pop();
            if (result.notChecked == 0) {
                if (failed.length == 0)
                    result.message = last.label + " is not " + last.failAdj + ".";
                else
                    result.message = failed.map(function(value) { return value.label; }).join(", ") + " and " + last.label + " are empty.";
            } else if (result.notChecked == 1) {
                if (failed.length == 0)
                    result.message = last.label + " is not " + last.failAdj + "; 1 check failed due to unexpected error.";
                else
                    result.message = failed.map(function(value) { return value.label; }).join(", ") + " and " + last.label + " are empty; 1 check failed due to unexpected error.";
            } else if (failed.length == 0)
                result.message = last.label + " is not " + last.failAdj + "; " + result.notChecked + " checks failed due to unexpected errors.";
            else
                result.message = failed.map(function(value) { return value.label; }).join(", ") + " and " + last.label + " are empty; " + result.notChecked + " checks failed due to unexpected errors.";
        }
        return result;
    };

    profileValidatorConstructor.getUserProfileCompliance = function(user: GlideRecord | GlideElementReference | string): IUserProfileComplianceResult {
        var getUserResponse: IUserLookupResult = profileValidatorConstructor.getUserLookupResult(user);
        if (profileValidatorConstructor.isUserLookupFault(getUserResponse))
            return {
                code: getUserResponse.code,
                user_id: getUserResponse.user_id,
                sys_id: getUserResponse.sys_id,
                message: getUserResponse.message,
                fault: getUserResponse.fault,
                passed: 0,
                failed: 0,
                notChecked: PROFILE_FIELDS.length
            };
        var result = <IUserProfileComplianceResult>profileValidatorConstructor.checkUserProfileCompliance(getUserResponse.user);
        result.code = 0;
        result.user_id = getUserResponse.user_id;
        result.sys_id = getUserResponse.sys_id;
        return result;
    };

    profileValidatorConstructor.getUserNotifications = function(user: GlideRecord | GlideElementReference | string): IUserNotificationsResult {
        var getUserResponse: IUserLookupResult = profileValidatorConstructor.getUserLookupResult(user);
        if (profileValidatorConstructor.isUserLookupFault(getUserResponse))
            return {
                code: getUserResponse.code,
                user_id: getUserResponse.user_id,
                sys_id: getUserResponse.sys_id,
                profileCompliance: {
                    message: getUserResponse.message,
                    passed: 0,
                    failed: 0,
                    notChecked: PROFILE_FIELDS.length,
                    fault: getUserResponse.fault
                }
            };
        return {
            code: 0,
            user_id: getUserResponse.user_id,
            sys_id: getUserResponse.sys_id,
            profileCompliance: profileValidatorConstructor.checkUserProfileCompliance(getUserResponse.user)
        };
    };

    profileValidatorConstructor.prototype = Object.extendsObject<IGlideAjax, IProfileValidatorPrototype>(global.AbstractAjaxProcessor, {
        initialize: function() { },

        getUserProfileCompliance: function(): string {
            var response = profileValidatorConstructor.getUserProfileCompliance(this.getParameter('sysparm_user_id'));
            if (profileValidatorConstructor.isUserLookupFault(response))
                this.setError(response);
            else
                return JSON.stringify(response);
        },
        
        getUserNotifications: function(): string {
            var response = profileValidatorConstructor.getUserNotifications(this.getParameter('sysparm_user_id'));
            if (profileValidatorConstructor.isUserLookupFault(response))
                this.setError(response);
            else
                return JSON.stringify(response);
        },

        type: "ProfileValidator"
    });

    return profileValidatorConstructor;
})();