(function executeRule(current, previous /*null when async*/ ) {
    var userGr = new GlideRecord("sys_user");
    userGr.addQuery("sys_id", current.document);
    userGr.query();
    if (userGr.next()) {
        try {
            var gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYsys_user");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", userGr.sys_id);
            gr.query();
            var previousDeleted = gr.next();
            if (previousDeleted) {
                gr.deleteRecord();
                userGr.setValue('photo', null);
                userGr.update();
                gs.info("Deleted current sys_user.photo photo for " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + gr.sys_id);
            }
            gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYlive_profile");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", current.sys_id);
            gr.query();
            if (gr.next()) {
                var contentType = gr.content_type;
                var gAttachment = new GlideSysAttachment();
                var contentStream = gAttachment.getContentStream(gr.sys_id);
                sysId = gAttachment.writeContentStream(userGr, "photo", contentType, contentStream);
                if (!gs.nil(sysId)) {
                    gr = new GlideRecord("sys_attachment");
                    gr.addQuery("sys_id", sysId);
                    gr.query();
                    if (gr.next()) {
                        gr.table_name = "ZZ_YYsys_user";
                        gr.table_sys_id = userGr.sys_id;
                        gr.content_type = contentType;
                        gr.update();
                    } else
                        sysId = null;
                }
                if (gs.nil(sysId)) {
                    gs.error("Failed to update sys_user.photo for profile " + current.name + " (" + current.sys_id + ")");
                    gs.addErrorMessage("Failed to update user photo.");
                } else {
                    gs.info(((previousDeleted) ? "Replaced" : "Added") + " sys_user.photo photo for profile " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                    gs.addInfoMessage("User photo updated.");
                }
            } else
                gs.addInfoMessage("Removed user photo");
        } catch (e) {
            gs.error("Failed to update sys_user.photo for profile " + current.name + " (" + current.sys_id + "): " + e.toString());
            gs.addErrorMessage("Failed to update user photo: " + e.toString());
        }
    } else
        gs.info("Skipped updating user photo: Profile " + current.name + " does not have a corresponding system user.");
})(current, previous);