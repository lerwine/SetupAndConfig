/// <reference path="../../../../types/client/sn_typings_client_scoped/dist/index.d.ts" />

namespace Auto_populate_phone {
    // Auto-fills "Contact Phone" form field from user profile.
    function onGetCurrentUserPhone(response: XMLHttpRequest): void {
        var phone: string | null | undefined;
        if (typeof response.responseXML !== 'undefined' && response.responseXML !== null &&
                typeof (phone = response.responseXML.documentElement.getAttribute('answer')) !== 'undefined' &&
                phone !== null && (phone = phone.trim()).length > 0)
            g_form.setValue('contact_phone_number', phone);
    }
    var ga = new GlideAjax('x_g_inte_site_17.ProfileValidator');
    ga.addParam('sysparm_name', 'getUserPhone');
    ga.getXML(onGetCurrentUserPhone);
}