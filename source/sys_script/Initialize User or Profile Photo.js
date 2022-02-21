(function executeRule(current, previous /*null when async*/ ) {
    /*
     * If new Live Profile has a photo, set the associated System User photo likewise.
     * Otherwise, if the associated System User has a photo, set the Live Profile photo.
     */
    var userGr = new GlideRecord("sys_user");
    userGr.addQuery("sys_id", current.document);
    userGr.query();
    if (userGr.next()) {
        try {
            var gr = new GlideRecord("sys_attachment");
            gr.addQuery("table_name", "ZZ_YYlive_profile");
            gr.addQuery("name", "photo");
            gr.addQuery("table_sys_id", current.sys_id);
            gr.query();
            var contentType, gAttchment, contentStream, sysId;
            if (gr.next()) { // Live Profile has photo
                sysId = gr.sys_id;
                contentType = gr.content_type;
                gr = new GlideRecord("sys_attachment");
                gr.addQuery("table_name", "ZZ_YYsys_user");
                gr.addQuery("name", "photo");
                gr.addQuery("table_sys_id", userGr.sys_id);
                gr.query();
                if (gr.next()) {
                    gr.deleteRecord();
                    gs.info("Removed existing photo from user \"" + userGr.user_name + "\" (" + userGr.sys_id + "); sys_attachment.sys_id=" + gr.sys_id);
                }
                gAttachment = new GlideSysAttachment();
                contentStream = gAttachment.getContentStream(sysId);
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
                    gs.error("Failed to user photo from profile " + current.name + " (" + current.sys_id + ")");
                    gs.addErrorMessage("Failed to update user photo.");
                } else {
                    gs.info("Set sys_user.photo photo from profile " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                    gs.addInfoMessage("Profile photo updated.");
                }
            } else { // Live Profile does not have a photo
                gr = new GlideRecord("sys_attachment");
                gr.addQuery("table_name", "ZZ_YYsys_user");
                gr.addQuery("name", "photo");
                gr.addQuery("table_sys_id", userGr.sys_id);
                gr.query();
                if (gr.next()) { // System User has a photo
                    contentType = gr.content_type;
                    gAttachment = new GlideSysAttachment();
                    contentStream = gAttachment.getContentStream(gr.sys_id);
                    sysId = gAttachment.writeContentStream(current, "photo", contentType, contentStream);
                    if (!gs.nil(sysId)) {
                        gr = new GlideRecord("sys_attachment");
                        gr.addQuery("sys_id", sysId);
                        gr.query();
                        if (gr.next()) {
                            gr.table_name = "ZZ_YYlive_profile";
                            gr.table_sys_id = current.sys_id;
                            gr.content_type = contentType;
                            gr.update();
                        } else
                            sysId = null;
                    }
                    if (gs.nil(sysId)) {
                        gs.error("Failed to update photo for profile " + current.name + " (" + current.sys_id + ")");
                        gs.addErrorMessage("Failed to update profile photo.");
                    } else {
                        gs.info("Added live_profile.photo photo for profile " + current.name + " (" + current.sys_id + "); sys_attachment.sys_id=" + sysId);
                        gs.addInfoMessage("Profile photo updated.");
                    }
                }
            }
        } catch (e) {
            gs.error("Failed to update sys_user.photo for profile " + current.name + " (" + current.sys_id + "): " + e.toString());
            gs.addErrorMessage("Failed to update user photo: " + e.toString());
        }
    } else
        gs.info("Skipped updating user photo: Profile " + current.name + " does not have a corresponding system user.");
})(current, previous);