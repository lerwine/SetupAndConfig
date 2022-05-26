var Site17DNContext = (function() {
    var site17DNContextConstructor = Class.create();

    site17DNContextConstructor.prototype = {
        _isGroup: false,
        _glideRecord: undefined,
        _sys_user: undefined,

        initialize: function(glideRecord) {
            if (gs.nil(glideRecord)) throw new Error("No user or group specified");
            var gr;
            if (typeof glideRecord === 'string') {
                gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', glideRecord);
                gr.query();
                if (!gr.next()) {
                    gr = new GlideRecord('sys_user_group');
                    gr.addQuery('sys_id', glideRecord);
                    gr.query();
                    if (!gr.next()) throw new Error("Task not found");
                    this._isGroup = true;
                } else {
                    this._sys_user = gr;
                    this._isGroup = false;
                }
                this._glideRecord = gr;
                return;
            }
            if (glideRecord instanceof GlideRecord) {
                if ((gr = glideRecord).isNewRecord() || !gr.isValidRecord()) throw new Error("Not a valid user or group record");
            } else if (glideRecord instanceof GlideElement) {
                gr = glideRecord.getGlideRecord();
                if (gs.nil(gr) || gr.isNewRecord() || !gr.isValidRecord()) throw new Error("Not a valid user or group record");
            } else
                throw new Error("Not a valid user or group record");
            switch ('' + gr.getTableName()) {
                case 'sys_user':
                    this._isGroup = false;
                    this._glideRecord = this._sys_user = gr;
                    break;
                case 'sys_user_group':
                    this._isGroup = true;
                    this._glideRecord = gr;
                    break;
                default:
                    this._sys_user = getCaller(gr);
                    if (gs.nil(this._sys_user)) throw new Error("Not a valid user or group record");
                    this._isGroup = false;
                    this._glideRecord = gr;
                    break;
            }
        },

        /**
         * Gets the target GlideRecord that this object represents.
         *
         * @returns {GlideRecord} The target GlideRecord that this object represents.
         */
        getGlideRecord: function() { return this._glideRecord; },

        /**
         * Gets the user associated with the target GlideRecord.
         *
         * @returns {GlideRecord|undefined} If the associated GlideRecord is a sys_user, the GlideRecord itself is returned;
         *          otherwise, this returns the GlideRecord of the associated sys_user (ie. caller, requested_for, etc)
         *          or undefined if there is no associated user.
         */
        getUser: function() { return this._sys_user; },

        /**
         * Indicates whether the target GlideRecord is a user group.
         *
         * @returns {boolean} true if the target GlideRecord is a sys_user_group; otherwise, false.
         */
        isGroup: function() { return this._isGroup; },

        /**
         * Indicates whether the associated Active Directory user account is contained within the Site 17 users AD container.
         *
         * @returns {boolean} true if the target GlideRecord is a sys_user or has an associated sys_user (ie. caller, requested_for, etc)
         *          and the DN indicated by the source field represents an AD user account that is contained within the DN specified by
         *          the x_g_inte_site_17.source_dn_users system property
         *          -or- the source DN is empty and the x_g_inte_site_17.source_user_include_empty system property is true;
         *          otherwise, false.
         */
        isSite17User: function() {
            return !this._isGroup && Site17DNUtil.isUserDN('' + (this._isGroup ? this._glideRecord : this._sys_user).source);
        },

        /**
         * Indicates whether the associated Active Directory group is contained within the Site 17 groups AD container.
         *
         * @returns {boolean} true if the target GlideRecord is a sys_user_group and the DN indicated by the source field represents an
         *          AD group that is contained within the DN specified by the x_g_inte_site_17.source_dn_groups system property
         *          -or- the source DN is empty and the x_g_inte_site_17.source_group_include_empty system property is true;
         *          otherwise, false.
         */
        isSite17Group: function() {
            return this._isGroup && Site17DNUtil.isGroupDN('' + (this._isGroup ? this._glideRecord : this._sys_user).source);
        },

        type: 'Site17DNContext'
    };
    return site17DNContextConstructor;
});