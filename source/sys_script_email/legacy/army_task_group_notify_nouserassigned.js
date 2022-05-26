(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template, /* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action, /* Optional GlideRecord */ event) {
    var sys_id = "" + current.sys_id;
    var taskCountsByType = JSON.parse(event.parm2);

    function escHtml(value) {
        return (gs.nil(value)) ? "" : ((typeof value === 'string') ? value : "" + value).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
    }

    function printTableRow(heading) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        template.print('<tr><th scope="row" style="text-align:right">' + escHtml(heading) + ':</th>');
        for (var i = 0; i < value.length; i++)
            template.print('<td>' + escHtml(value[i]) + '</td>');
        template.print('</tr>');
    }
    var totalTaskCount = 0;
    var totalVipCount = 0;
    var oldestCreate = new GlideDateTime();
    var oldestUpdate = new GlideDateTime();
    var n;
    for (n in taskCountsByType) {
        totalTaskCount += taskCountsByType[n].count;
        totalVipCount += taskCountsByType[n].vipCount;
        var d = new GlideDateTime(taskCountsByType[n].oldestCreate);
        if (oldestCreate.compareTo(d) > 0)
            oldestCreate = d;
        d = new GlideDateTime(taskCountsByType[n].oldestUpdate);
        if (oldestUpdate.compareTo(d) > 0)
            oldestUpdate = d;
    }
    template.print('<h2>Summary Open Record Counts for ' + escHtml(current.getDisplayValue()) + '</h2><table>');
    printTableRow('Total Open VIP Records', totalVipCount);
    printTableRow('Total Open Records', totalTaskCount);
    printTableRow('Oldest Open Record', oldestCreate);
    printTableRow('Oldest Record Update', oldestUpdate);
    template.print('</table><h2>Open Record Counts by Type</h2><table><tr><th scope="col">Type</th><th scope="col">VIP</th><th scope="col">Total</th><th scope="col">Oldest Record</th><th scope="col">Oldest Update</th></tr>');
    for (n in taskCountsByType)
        printTableRow(taskCountsByType[n].type, taskCountsByType[n].vipCount, taskCountsByType[n].count, taskCountsByType[n].oldestCreate, taskCountsByType[n].oldestUpdate);
    template.print('</table>');
})(current, template, email, email_action, event);