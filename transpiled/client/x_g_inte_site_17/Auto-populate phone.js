"use strict";
var Auto_populate_phone;
(function (Auto_populate_phone) {
    function onGetCurrentUserPhone(response) {
        var phone;
        if (typeof response.responseXML !== 'undefined' && response.responseXML !== null &&
            typeof (phone = response.responseXML.documentElement.getAttribute('answer')) !== 'undefined' &&
            phone !== null && (phone = phone.trim()).length > 0)
            g_form.setValue('contact_phone_number', phone);
    }
    var ga = new GlideAjax('x_g_inte_site_17.ProfileValidator');
    ga.addParam('sysparm_name', 'getUserPhone');
    ga.getXML(onGetCurrentUserPhone);
})(Auto_populate_phone || (Auto_populate_phone = {}));
//# sourceMappingURL=Auto-populate%20phone.js.map