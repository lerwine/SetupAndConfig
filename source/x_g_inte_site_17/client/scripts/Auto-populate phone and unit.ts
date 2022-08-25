/// <reference path="../../../../types/client/sn_typings_client_scoped/dist/index.d.ts" />

namespace Auto_populate_phone_and_unit {
    // Auto-fills "Contact Phone" and "Unit/Section" form fields from user profile.
    function onGetCurrentUserPhoneAndOrg(response: XMLHttpRequest): void {
        var ec: HTMLCollectionOf<Element>;
        var element: Element | null | undefined;
        if (typeof response.responseXML === 'undefined' || response.responseXML === null || typeof (ec = response.responseXML.getElementsByTagName("result")) === 'undefined' ||
                ec === null || ec.length == 0 || typeof (element = ec.item(0)) === 'undefined' || element === null)
            return;
        var s = element.getAttribute('org');
        if (typeof s === 'string' && (s = s.trim()).length > 0)
            g_form.setValue('unit_or_org', s);
        s = element.getAttribute('phone');
        if (typeof s === 'string' && (s = s.trim()).length > 0)
            g_form.setValue('contact_phone_number', s);
    }
    var ga = new GlideAjax('x_g_inte_site_17.ProfileValidator');
    ga.addParam('sysparm_name', 'getCurrentUserPhoneAndOrg');
    ga.getXML(onGetCurrentUserPhoneAndOrg);
}