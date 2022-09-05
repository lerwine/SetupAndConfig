/// <reference path="../../sn_typings_server_scoped/dist/index.d.ts" />
declare namespace x_g_inte_site_17 {
    interface ISite17Util extends $$snClass.ICustomClassBase<ISite17Util, "Site17Util"> {
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
    interface ISite17UtilPrototype extends $$snClass.ICustomAjaxClassPrototype<ISite17Util, ISite17UtilPrototype, "Site17Util">, ISite17Util {
    }
    type Site17Util = Readonly<ISite17Util>;
    interface Site17UtilConstructor extends $$snClass.CustomAjaxClassConstructor<ISite17Util, ISite17UtilPrototype, Site17Util> {
        new (request?: GlideServletRequest, responseXML?: XMLDocument2, gc?: GlideController): Site17Util;
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
    const Site17Util: Site17UtilConstructor;
}
