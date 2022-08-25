namespace Prevent_Past_Needed_By {
    function onSubmit(): boolean {
        if (!g_form.isNewRecord())
            return true;
        g_form.hideFieldMsg('needed_by', true);
        var s = g_form.getValue('needed_by');
        if (typeof s === 'undefined' || s === null || s == '')
            return true;
        function asDayStart(v: Date) {
            return new Date(v.getFullYear(), v.getMonth(), v.getDate(), 0, 0, 0, 0);
        }
        if (asDayStart(new Date(s)) >= asDayStart(new Date()))
            return true;
        g_form.showFieldMsg('needed_by', '"Needed By" cannot be in the past.', 'error');
        return false;
    }
}