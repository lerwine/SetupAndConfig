"use strict";
var Auto_populate_phone_and_unit;
(function (Auto_populate_phone_and_unit) {
    function onGetCurrentUserPhoneAndOrg(response) {
        var ec;
        var element;
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
})(Auto_populate_phone_and_unit || (Auto_populate_phone_and_unit = {}));
//# sourceMappingURL=Auto-populate%20phone%20and%20unit.js.map