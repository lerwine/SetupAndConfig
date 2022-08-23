/// <reference path="../../../../source/types/server/sn_typings_server_scoped/index.d.ts" />
declare namespace x_g_inte_site_17 {
    interface ILocationApprovalBase extends $$snClass.ICustomClassBase<ILocationApprovalBase, "LocationApproval"> {
        /**
         * Gets the target user of the target record (ie. caller, requested_for).
         *
         * @returns {(GlideRecord | GlideElementReference | undefined)} The {@link GlideRecord} or {@link GlideElementReference} for the target user.
         */
        getCaller(): GlideRecord | GlideElement | undefined;
        /**
         * Indicates whether the target user is a VIP user.
         *
         * @returns {boolean} true if {@link ILocationApprovalBase#getCaller} returns user designated as VIP; otherwise, false.
         */
        isVip(): boolean;
        /**
         * Looks up the default approval group.
         *
         * @returns {(GlideElementReference | undefined)} The{@link GlideElementReference} for the default aproval group.
         */
        getDefaultApprovalGroup(): GlideElementReference | undefined;
    }
    interface ILocationApprovalPrototype extends $$snClass.ICustomClassPrototype1<ILocationApprovalBase, ILocationApprovalPrototype, "LocationApproval", GlideRecord | GlideElementReference>, ILocationApprovalBase {
        /**
         * The target {@link GlideRecord}.
         *
         * @type {GlideRecord}
         * @memberof ILocationApprovalPrototype
         * @private
         */
        _glideRecord?: GlideRecord;
    }
    type LocationApproval = Readonly<ILocationApprovalPrototype>;
    interface LocationApprovalConstructor extends $$snClass.CustomClassConstructor1<ILocationApprovalBase, ILocationApprovalPrototype, LocationApproval, GlideRecord | GlideElementReference> {
        /**
         * Creates a new {@link LocationApproval} instance.
         *
         * @constructor
         * @param {(string | GlideRecord | GlideElementReference)} source - The source object for the approval context.
         * @memberof LocationApprovalConstructor
         * @returns {ILocationApproval} A new {@link LocationApproval} instance.
         */
        new (source: GlideRecord | GlideElementReference): LocationApproval;
        /**
         * Creates a new {@link LocationApproval} instance.
         *
         * @constructor
         * @param {(string | GlideRecord | GlideElementReference)} source - The source object for the approval context.
         * @memberof LocationApprovalConstructor
         * @returns {ILocationApproval} A new {@link LocationApproval} instance.
         */
        (source: GlideRecord | GlideElementReference): LocationApproval;
        /**
         * Looks up the default approval group.
         *
         * @param {(string | GlideRecord | GlideElementReference)} source - The source object for the approval context.
         * @returns {(GlideElementReference | undefined)} The{@link GlideElementReference} for the default aproval group.
         */
        getDefaultApprovalGroup(source: GlideRecord | GlideElementReference): GlideElementReference | undefined;
    }
    const LocationApproval: LocationApprovalConstructor;
}
