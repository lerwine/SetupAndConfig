(function executeRule(current, previous /*null when async*/ ) {
    var liveProfileGr = new GlideRecord("live_profile");
    liveProfileGr.addQuery("document", current.sys_id);
    liveProfileGr.query();
    if (liveProfileGr.next()) {
        try {
            var gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYlive_profile");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", liveProfileGr.sys_id);
            gr.query();
            var previousDeleted = gr.next();
            if (previousDeleted) {
                gr.deleteRecord();
                liveProfileGr.setValue('photo', null);
                liveProfileGr.update();
                gs.info("Deleted current live_profile.photo photo for " + current.user_name + " (" + current.sys_id + "); sys_attachment.sys_id=" + gr.sys_id);
            }
            gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYsys_user");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", current.sys_id);
            gr.query();
            if (gr.next()) {
                var contentType = gr.content_type;
                var gAttachment = new GlideSysAttachment();
                var contentStream = gAttachment.getContentStream(gr.sys_id);
                sysId = gAttachment.writeContentStream(liveProfileGr, "photo", contentType, contentStream);
                if (!gs.nil(sysId)) {
                    gr = new GlideRecord("sys_attachment");
                    gr.addQuery("sys_id", sysId);
                    gr.query();
                    if (gr.next()) {
                        gr.table_name = "ZZ_YYlive_profile";
                        gr.table_sys_id = liveProfileGr.sys_id;
                        gr.content_type = contentType;
                        gr.update();
                    } else
                        sysId = null;
                }
                if (gs.nil(sysId)) {
                    gs.error("Failed to update live_profile.photo for " + current.user_name + " (" + current.sys_id + ")");
                    gs.addErrorMessage("Failed to update profile photo.");
                } else {
                    gs.info(((previousDeleted) ? "Replaced" : "Added") + " live_profile.photo photo for " + current.user_name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                    gs.addInfoMessage("Profile photo updated.");
                }
            } else
                gs.addInfoMessage("Removed profile photo");
        } catch (e) {
            gs.error("Failed to update live_profile.photo for " + current.user_name + " (" + current.sys_id + "): " + e.toString());
            gs.addErrorMessage("Failed to update profile photo: " + e.toString());
        }
    } else
        gs.info("Skipped updating profile photo: User " + current.user_name + " does not have a live profile.");
})(current, previous);