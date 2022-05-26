/// <reference path="../servicnowCommon.d.ts" />

interface IDistinguishedNameContextBase extends ICustomClassBase<IDistinguishedNameContextBase, "DistinguishedNameContext"> {
    _isGroup: boolean,
    _glideRecord?: GlideRecord,
    _sys_user?: GlideRecord | GlideElementReference,
    getGlideRecord(): GlideRecord | undefined;
    getUser(): GlideRecord | GlideElementReference | undefined;
    isGroup(): boolean;
    isSite17User(): boolean;
    isSite17Group(): boolean;
}

interface IDistinguishedNameContextPrototype extends ICustomClassPrototype1<IDistinguishedNameContextBase, IDistinguishedNameContextPrototype, "DistinguishedNameContext", string | GlideRecord | GlideElementReference>, IDistinguishedNameContextBase {
}

interface IDistinguishedNameContext extends Readonly<IDistinguishedNameContextBase> { }

interface DistinguishedNameContextConstructor extends CustomClassConstructor1<IDistinguishedNameContextBase, IDistinguishedNameContextPrototype, IDistinguishedNameContext, string | GlideRecord | GlideElementReference> {
    new(source: string | GlideRecord | GlideElement): IDistinguishedNameContext;
    (source: string | GlideRecord | GlideElement): IDistinguishedNameContext;
}

const DistinguishedNameContext: DistinguishedNameContextConstructor = (function (): DistinguishedNameContextConstructor {
    var distinguishedNameContextConstructor: DistinguishedNameContextConstructor = Class.create();

    distinguishedNameContextConstructor.prototype = {
        _isGroup: false,

        initialize(source: string | GlideRecord | GlideElementReference): void {
            if (gs.nil(source)) throw new Error("No user or group specified");
            var gr: GlideRecord;
            if (typeof source === 'string') {
                gr = new GlideRecord('sys_user');
                gr.addQuery('sys_id', source);
                gr.query();
                if (!gr.next()) {
                    gr = new GlideRecord('sys_user_group');
                    gr.addQuery('sys_id', source);
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
            if (source instanceof GlideRecord) {
                if ((gr = source).isNewRecord() || !gr.isValidRecord()) throw new Error("Not a valid user or group record");
            } else if (source instanceof GlideElement) {
                gr = (<{ [key: string]: any}>source).getRefRecord();
                if (gs.nil(gr) || gr.isNewRecord() || !gr.isValidRecord()) throw new Error("Not a valid user or group record");
            } else
                throw new Error("Not a valid user or group record");
            switch ('' + gr.getTableName()) {
                case 'sys_user':
                    this._glideRecord = this._sys_user = gr;
                    break;
                case 'sys_user_group':
                    this._isGroup = true;
                    this._glideRecord = gr;
                    break;
                default:
                    this._sys_user = Site17Util.getCaller(gr);
                    if (gs.nil(this._sys_user)) throw new Error("Not a valid user or group record");
                    this._glideRecord = gr;
                    break;
            }
        },

        getGlideRecord: function(): GlideRecord | undefined { return this._glideRecord; },

        getUser: function(): GlideRecord | GlideElementReference | undefined { return this._sys_user; },

        isGroup: function(): boolean { return this._isGroup; },
        
        isSite17User: function(): boolean {
            return !this._isGroup && Site17Util.isUserDN('' + (this._isGroup ? this._glideRecord : this._sys_user).source);
        },
        
        isSite17Group: function(): boolean {
            return this._isGroup && Site17Util.isGroupDN('' + (this._isGroup ? this._glideRecord : this._sys_user).source);
        },

        type: "DistinguishedNameContext"
    };

    return distinguishedNameContextConstructor;
})();