/// <reference path="rhino.d.ts" />

/**
 * Neither this namespace, nor types within it are defined in the server-side ServiceNow scripting environment.
 * @summary Utility type definitions for Server-side ServiceNow scripting environment.
 * @namespace $$rhino
 */
declare namespace $$element {
    /**
     * Defines members that are common to both GlideRecord and GlideElement objects
     * @export
     * @interface IDbObject
     */
    export interface IDbObject {
        /**
         * Determines if the user's role permits the creation of new records in this field.
         * @returns {boolean} True if the field can be created, false otherwise.
         */
        canCreate(): boolean;

        /**
         * Indicates whether the user's role permits them to read the associated GlideRecord.
         * @returns {boolean} True if the field can be read, false otherwise.
         */
        canRead(): boolean;

        /**
         * Determines whether the user's role permits them to write to the associated GlideRecord.
         * @returns {boolean} True if the user can write to the field, false otherwise.
         */
        canWrite(): boolean;

        /**
         * Returns the value of the specified attribute from the dictionary.
         * @param {string} attributeName - Attribute name
         * @returns {string} Attribute value.
         */
        getAttribute(attributeName: string): string;

        /**
         * Returns the element's descriptor.=
         * @returns {GlideElementDescriptor} Element's descriptor.
         */
        getED(): GlideElementDescriptor;

        /**
         * Returns the object label.=
         * @returns {string} Object label.
         */
        getLabel(): string;

        /**
         * Returns for Element objects, returns the name of the table on which the field resides; Otherwise, retrieves the name of the table associated with the GlideRecord.=
         * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
         */
        getTableName(): string;
    }

    /**
     * Represents a {@link IGlideElement} for a field with a specific value type.
     * @export
     * @interface IValueSpecific
     * @extends {IGlideElement}
     * @template V The type of value the current field represents.
     * @template E The type of {@link IGlideElement} whose type is equivalant to the current field type.
     * @template S The type of string value that can be compared with the current field value.
     */
    export interface IValueSpecific<V, E extends IGlideElement, S extends string> extends IGlideElement {
        /**
         * Determines if the previous value of the current field matches the specified value.
         *
         * @param {(V | E | $$rhino.Nilable<S>)} o - The value to be compared to the previous value of the current field.
         * @returns {boolean} true if the previous value matches; otherwise, false.
         */
        changesFrom(o: V | E | $$rhino.Nilable<S>): boolean;

        /**
         * Determines if the new value of the current field, after a change, matches the specified object.
         *
         * @param {(V | E | $$rhino.Nilable<S>)} o - The value to be compared to the new value of the current field.
         * @returns {boolean} true if the new value matches; otherwise, false.
         */
        changesTo(o: V | E | $$rhino.Nilable<S>): boolean;

        /**
         * Sets the new value of a the current field.
         *
         * @param {(V | E | $$rhino.Nilable<S>)} obj - The value to be applied to the current field.
         */
        setValue(obj: V | E | $$rhino.Nilable<S>): void;
    }

    /**
     * Utility base type for {@link GlideElement}s for {@link IValueSpecific} fields with a specific string-based value type.
     * @export
     * @class StringBased
     * @extends {Packages.java.lang.String}
     * @implements {IValueSpecific<V, E, S>}
     * @template V The type of value the current field represents.
     * @template E The type of {@link IGlideElement} whose underlying field type is equivalant to the current field type.
     * @template S The type of string or number value that can represent the underlying field field value.
     */
    export class StringBased<V extends string | number, E extends IValueSpecific<V, E, S>, S extends string> extends Packages.java.lang.String implements IValueSpecific<V, E, S> {
        /**
         * Determines if the user's role permits the creation of new records in this field.
         * @returns {boolean} True if the field can be created, false otherwise.
         */
        canCreate(): boolean;

        /**
         * Indicates whether the user's role permits them to read the associated GlideRecord.
         * @returns {boolean} True if the field can be read, false otherwise.
         */
        canRead(): boolean;

        /**
         * Determines whether the user's role permits them to write to the associated GlideRecord.
         * @returns {boolean} True if the user can write to the field, false otherwise.
         */
        canWrite(): boolean;

        /**
         * Determines if the current field has been modified. This functionality is available for all available data types, except Journal fields.
         * @returns {boolean} True if the fields have been changed, false if the field has not.
         */
        changes(): boolean;

        /**
         * Determines if the previous value of the current field matches the specified object.
         * @param {V | E | $$property.Nilable<S>} o - An object value to check against the previous value of the current field.
         * @returns {boolean} True if the previous value matches, false if it does not.
         */
        changesFrom(o: V | E | $$rhino.Nilable<S>): boolean;

        /**
         * Determines if the new value of a field, after a change, matches the specified object.
         * @param {V | E | $$property.Nilable<S>} o - An object value to check against the new value of the current field.
         * @returns {boolean} True if the previous value matches, false if it does not.
         */
        changesTo(o: V | E | $$rhino.Nilable<S>): boolean;

        /**
         * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration field. Does not require the creation of a GlideDateTime object because the duration field is already
         * a GlideDateTime object.
         * @returns {number} Number of milliseconds since January 1, 1970, 00:00:00 GMT.
         */
        dateNumericValue(): number;

        /**
         * Returns the value of the specified attribute from the dictionary.
         * @param {string} attributeName - Attribute name
         * @returns {string} Attribute value.
         */
        getAttribute(attributeName: string): string;

        /**
         * Returns the Boolean value of the specified attribute from the dictionary.
         * @param {string} attributeName - Attribute name
         * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
         */
        getBooleanAttribute(attributeName: string): boolean;

        /**
         * Generates a choice list for a field.
         * @param {string} [dependent] - A dependent value
         * @returns {Array<*>} An array list of choices.
         */
        getChoices(dependent?: string): any[];

        /**
         * Returns the choice label for the current choice.
         * @returns {string} The selected choice's label.
         */
        getChoiceValue(): string;

        /**
         * Returns the clear text value for Password (2 way encrypted) fields in scoped applications.
         * @returns {string} The clear text password.
         */
        getDecryptedValue(): string;

        /**
         * Gets the formatted display value of the field.
         * @param {number} [maxCharacters] - Maximum characters desired
         * @returns {string} The display value of the field.
         */
        getDisplayValue(maxCharacters?: number): string;

        /**
         * Returns the element's descriptor.
         * @returns {GlideElementDescriptor} Element's descriptor.
         */
        getED(): GlideElementDescriptor;

        /**
         * Returns the phone number in international format.
         * @returns {string} The phone number in international format.
         */
        getGlobalDisplayValue(): string;

        /**
         * Returns the HTML value of a field.
         * @param {number} [maxChars] - Maximum number of characters to return.
         * @returns {string} HTML value for the field.
         */
        getHTMLValue(maxChars?: number): string;

        /**
         * Returns either the most recent journal entry or all journal entries.
         * @param {number} mostRecent - If 1, returns the most recent entry. If -1, returns all journal entries.
         * @returns {string} For the most recent entry, returns a string that contains the field label, timestamp, and user display name of the journal entry.For all journal entries,
         * returns the same information for all journal entries ever entered as a single string with each entry delimited by "\n\n".
         */
        getJournalEntry(mostRecent: number): string;

        /**
         * Returns the object label.
         * @returns {string} Object label.
         */
        getLabel(): string;

        /**
         * Returns the name of the field.
         * @returns {string} Field name.
         */
        getName(): string;

        /**
         * Returns the name of the table on which the field resides.
         * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
         */
        getTableName(): string;

        /**
         * Determines if a field is null.
         * @returns {boolean} True if the field is null or an empty string, false if not.
         */
        nil(): boolean;

        /**
         * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
         * @param {number} milliseconds - Number of milliseconds since 1/1/1970
         */
        setDateNumericValue(milliseconds: number): void;

        /**
         * Sets the display value of the field.
         * @param {*} value - The value to set for the field.
         */
        setDisplayValue(value: any): void;

        /**
         * Adds an error message. Available in Fuji patch 3.
         * @param {string} errorMessage - The error message.
         */
        setError(errorMessage: string): void;

        /**
         * Sets the field to the specified phone number.
         * @param {*} phoneNumber - The phone number to set. This can be in either the international or local format.
         * @param {boolean} strict - When true, specifies that the number specified must match the correct format. When false, the system attempts to correct an improperly formatted phone number.
         * @returns {boolean} True if the value was set.
         */
        setPhoneNumber(phoneNumber: any, strict: boolean): boolean;

        /**
         * Sets the value of a field.
         * @param {V | E | $$property.Nilable<S>} value - Object value to set the field to.
         */
        setValue(value: V | E | $$rhino.Nilable<S>): void;
    }

    /**
     * Represents a {@link GlideElement} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElement, S> & GlideElement)} Element<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Element<S extends string> = IValueSpecific<S, GlideElement, S> & GlideElement;

    /**
     * Represents a {@link GlideElementNumeric} with a specific numerical type.
     * @export
     * @typedef {(IValueSpecific<N, GlideElementNumeric, S> & GlideElementNumeric)} Numeric<N, S>
     * @template N - The type of underlying numerical field value.
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Numeric<N extends number, S extends string> = IValueSpecific<N, GlideElementNumeric, S> & GlideElementNumeric;

    /**
     * Represents a {@link GlideElementGlideObject} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementGlideObject, S> & GlideElementGlideObject)} GlideObject<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type GlideObject<S extends string> = IValueSpecific<S, GlideElementGlideObject, S> & GlideElementGlideObject;

    /**
     * Represents a {@link GlideElementSysClassName} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementSysClassName, S> & GlideElementSysClassName)} SysClassName<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type SysClassName<S extends string> = IValueSpecific<S, GlideElementSysClassName, S> & GlideElementSysClassName;

    /**
     * Represents a {@link GlideElementTranslatedField} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementTranslatedField, S> & GlideElementTranslatedField)} TranslatedField<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type TranslatedField<S extends string> = IValueSpecific<S, GlideElementTranslatedField, S> & GlideElementTranslatedField;

    /**
     * Represents a {@link GlideElementConditions} with a specific string type.
     * @typedef {(IValueSpecific<S, GlideElementConditions, S> & GlideElementConditions)} Conditions<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Conditions<S extends string> = IValueSpecific<S, GlideElementConditions, S> & GlideElementConditions;

    /**
     * Represents a {@link GlideElementDocumentation} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementDocumentation, S> & GlideElementDocumentation)} Documentation<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Documentation<S extends string> = IValueSpecific<S, GlideElementDocumentation, S> & GlideElementDocumentation;

    /**
     * Represents a {@link GlideElementScript} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementScript, S> & GlideElementScript)} Script<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Script<S extends string> = IValueSpecific<S, GlideElementScript, S> & GlideElementScript;

    /**
     * Represents a {@link GlideElementUserImage} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementUserImage, S> & GlideElementUserImage)} UserImage<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type UserImage<S extends string> = IValueSpecific<S, GlideElementUserImage, S> & GlideElementUserImage;

    /**
     * Represents a {@link GlideElementPassword2} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementPassword2, S> & GlideElementPassword2)} Password2<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Password2<S extends string> = IValueSpecific<S, GlideElementPassword2, S> & GlideElementPassword2;

    /**
     * Represents a {@link GlideElementCounter} with a specific string type.
     * @export
     * @typedef {(IValueSpecific<S, GlideElementCounter, S> & GlideElementCounter)} Counter<S>
     * @template S - The type of string value that can represent the underlying field field value.
     */
    export type Counter<N extends number, S extends string> = IValueSpecific<N, GlideElementCounter, S> & GlideElementCounter;

    /**
     * Represents a {@link IGlideElement} that references a specific {@link GlideRecord} type.
     * @export
     * @interface IReference
     * @extends {IValueSpecific<R, Reference<P, R>, string>}
     * @template P The properties shared by the {@link IValueSpecific} type and the {@link GlideRecord} type it references.
     * @template R - The type of {@link GlideRecord} being referenced.
     */
    export interface IReference<P extends IGlideTableProperties, R extends P & GlideRecord> extends IValueSpecific<R, Reference<P, R>, string> {
        changesFrom(o: R | Reference<P, R> | $$rhino.Nilable<string>): boolean;

        changesTo(o: R | Reference<P, R> | $$rhino.Nilable<string>): boolean;

        getReferenceTable(): string;

        getRefRecord(): R | null | undefined;

        setValue(obj: R | Reference<P, R> | $$rhino.Nilable<string>): void;
    }

    /**
     * Represents a {@link GlideElementReference} with a specific reference type.
     * @export
     * @typedef {(IReference<P, R> & GlideElementReference & P)} Reference<P, R>
     * @template P - The properties shared by the {@link GlideElementReference} type and the {@link GlideRecord} type it references.
     * @template R - The type of {@link GlideRecord} being referenced.
     */
    export type Reference<P extends IGlideTableProperties, R extends P & GlideRecord> = IReference<P, R> & GlideElementReference & P;
}

/**
 * Utility type definitions for Server-side ServiceNow scripting environment for discrimated unions combining element objects types with their underlying value type.
 * Neither this namespace, nor types within it are defined in the server-side ServiceNow scripting environment.
 * @summary Glide object property combined type definitions.
 * @namespace $$property
 */
declare namespace $$property {
    /**
     * Represents a {@link GlideElementBoolean} field that can be coerced as a {@link $$rhino.BooleanLike} value.
     * @export
     * @typedef {(GlideElementBoolean | $$rhino.BooleanLike)} Boolean
     */
    export type Boolean = GlideElementBoolean | $$rhino.BooleanLike;

    /**
     * Represents a {@link GlideElementBreakdownElement} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementBreakdownElement | $$rhino.String)} BreakdownElement
     */
    export type BreakdownElement = GlideElementBreakdownElement | $$rhino.String;

    /**
     * Represents a {@link GlideElement} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElement | $$rhino.String)} Element
     */
    export type Element = GlideElement | $$rhino.String;

    /**
     * Represents a {@link GlideElementCompressed} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementCompressed | $$rhino.String)} Compressed
     */
    export type Compressed = GlideElementCompressed | $$rhino.String;

    /**
     * Represents a {@link GlideElementConditions} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementConditions | $$rhino.String)} Conditions
     */
    export type Conditions = GlideElementConditions | $$rhino.String;

    /**
     * Represents a {@link GlideElementCounter} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementCounter | $$rhino.NumberLike<number, string>)} Counter
     */
    export type Counter = GlideElementCounter | $$rhino.NumberLike<number, string>;

    /**
     * Represents a {@link GlideElementCurrency} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementCurrency | $$rhino.NumberLike<number, string>)} Currency
     */
    export type Currency = GlideElementCurrency | $$rhino.NumberLike<number, string>;

    /**
     * Represents a {@link GlideElementDataObject} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementDataObject | $$rhino.String)} DataObject
     */
    export type DataObject = GlideElementDataObject | $$rhino.String;

    /**
     * Represents a {@link GlideElementDocumentation} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementDocumentation | $$rhino.String)} Documentation
     */
    export type Documentation = GlideElementDocumentation | $$rhino.String;

    /**
     * Represents a {@link GlideElementDocumentId} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementDocumentId | $$rhino.String)} DocumentId
     */
    export type DocumentId = GlideElementDocumentId | $$rhino.String;

    /**
     * Represents a {@link GlideElementDomainId} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementDomainId | $$rhino.String)} DomainId
     */
    export type DomainId = GlideElementDomainId | $$rhino.String;

    /**
     * Represents a {@link GlideElementFullUTF8} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementFullUTF8 | $$rhino.String)} FullUTF8
     */
    export type FullUTF8 = GlideElementFullUTF8 | $$rhino.String;

    /**
     * Represents a {@link GlideElementGlideObject} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementGlideObject | $$rhino.String)} GlideObject
     */
    export type GlideObject = GlideElementGlideObject | $$rhino.String;

    /**
     * Represents a {@link GlideElementGlideVar} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementGlideVar | $$rhino.String)} GlideVar
     */
    export type GlideVar = GlideElementGlideVar | $$rhino.String;

    /**
     * Represents a {@link GlideElementIcon} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementIcon | $$rhino.String)} Icon
     */
    export type Icon = GlideElementIcon | $$rhino.String;

    /**
     * Represents a {@link GlideElementInternalType} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementInternalType | $$rhino.String)} InternalType
     */
    export type InternalType = GlideElementInternalType | $$rhino.String;

    /**
     * Represents a {@link GlideElementNumeric} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementNumeric | $$rhino.NumberLike<number, string>)} Numeric
     */
    export type Numeric = GlideElementNumeric | $$rhino.NumberLike<number, string>;

    /**
     * Represents a {@link GlideElementPassword} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementPassword | $$rhino.String)} Password
     */
    export type Password = GlideElementPassword | $$rhino.String;

    /**
     * Represents a {@link GlideElementPassword2} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementPassword2 | $$rhino.String)} Password2
     */
    export type Password2 = GlideElementPassword2 | $$rhino.String;

    /**
     * Represents a {@link GlideElementPrice} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementPrice | $$rhino.NumberLike<number, string>)} Price
     */
    export type Price = GlideElementPrice | $$rhino.NumberLike<number, string>;

    /**
     * Represents a {@link GlideElementReference} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementReference | $$rhino.String)} Reference
     */
    export type Reference = GlideElementReference | $$rhino.String;

    /**
     * Represents a {@link GlideElementScript} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementScript | $$rhino.String)} Script
     */
    export type Script = GlideElementScript | $$rhino.String;

    /**
     * Represents a {@link GlideElementShortFieldName} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementShortFieldName | $$rhino.String)} ShortFieldName
     */
    export type ShortFieldName = GlideElementShortFieldName | $$rhino.String;

    /**
     * Represents a {@link GlideElementShortTableName} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementShortTableName | $$rhino.String)} ShortTableName
     */
    export type ShortTableName = GlideElementShortTableName | $$rhino.String;

    /**
     * Represents a {@link GlideElementSourceId} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementSourceId | $$rhino.String)} SourceId
     */
    export type SourceId = GlideElementSourceId | $$rhino.String;

    /**
     * Represents a {@link GlideElementSourceName} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementSourceName | $$rhino.String)} SourceName
     */
    export type SourceName = GlideElementSourceName | $$rhino.String;

    /**
     * Represents a {@link GlideElementSourceTable} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementSourceTable | $$rhino.String)} SourceTable
     */
    export type SourceTable = GlideElementSourceTable | $$rhino.String;

    /**
     * Represents a {@link GlideElementSysClassName} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementSysClassName | $$rhino.String)} SysClassName
     */
    export type SysClassName = GlideElementSysClassName | $$rhino.String;

    /**
     * Represents a {@link GlideElementTranslatedField} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementTranslatedField | $$rhino.String)} TranslatedField
     */
    export type TranslatedField = GlideElementTranslatedField | $$rhino.String;

    /**
     * Represents a {@link GlideElementTranslatedHTML} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementTranslatedHTML | $$rhino.String)} TranslatedHTML
     */
    export type TranslatedHTML = GlideElementTranslatedHTML | $$rhino.String;

    /**
     * Represents a {@link GlideElementTranslatedText} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementTranslatedText | $$rhino.String)} TranslatedText
     */
    export type TranslatedText = GlideElementTranslatedText | $$rhino.String;

    /**
     * Represents a {@link GlideElementURL} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementURL | $$rhino.String)} URL
     */
    export type URL = GlideElementURL | $$rhino.String;

    /**
     * Represents a {@link GlideElementUserImage} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementUserImage | $$rhino.String)} UserImage
     */
    export type UserImage = GlideElementUserImage | $$rhino.String;

    /**
     * Represents a {@link GlideElementVariables} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementVariables | Record<string, any>)} Variables
     */
    export type Variables = GlideElementVariables | Record<string, any>;

    /**
     * Represents a {@link GlideElementWikiText} field that can be coerced as a {@link $$rhino.String} value.
     * @export
     * @typedef {(GlideElementWikiText | $$rhino.String)} WikiText
     */
    export type WikiText = GlideElementWikiText | $$rhino.String;

    export namespace generic {
        /**
         * Represents a {@link GlideElement} field that contains a specific string value type.
         * @typedef {($$element.Element<S> | S)} Element<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type Element<S extends string> = $$element.Element<S> | S;

        /**
         * Represents a {@link GlideElementNumeric} field that contains a specific string value type.
         * @typedef {($$element.Numeric<S> | S)} Numeric<N, S>
         * @template N - The type of underlying field field value.
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type Numeric<N extends number, S extends string> = $$element.Numeric<N, S> | number | S;

        /**
         * Represents a {@link GlideElementGlideObject} field that contains a specific string value type.
         * @typedef {($$element.GlideObject<S> | S)} GlideObject<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type GlideObject<S extends string> = $$element.GlideObject<S> | S;

        /**
         * Represents a {@link GlideElementSysClassName} field that contains a specific string value type.
         * @typedef {($$element.SysClassName<S> | S)} SysClassName<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type SysClassName<S extends string> = $$element.SysClassName<S> | S;

        /**
         * Represents a {@link GlideElementTranslatedField} field that contains a specific string value type.
         * @typedef {($$element.TranslatedField<S> | S)} TranslatedField<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type TranslatedField<S extends string> = $$element.TranslatedField<S> | S;

        /**
         * Represents a {@link GlideElementConditions} field that contains a specific string value type.
         * @typedef {($$element.Conditions<S> | S)} Conditions<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type Conditions<S extends string> = $$element.Conditions<S> | S;

        /**
         * Represents a {@link GlideElementDocumentation} field that contains a specific string value type.
         * @typedef {($$element.Documentation<S> | S)} Documentation<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type Documentation<S extends string> = $$element.Script<S> | S;

        /**
         * Represents a {@link GlideElementScript} field that contains a specific string value type.
         * @typedef {($$element.Script<S> | S)} Script<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type Script<S extends string> = $$element.Script<S> | S;

        /**
         * Represents a {@link GlideElementUserImage} field that contains a specific string value type.
         * @typedef {($$element.UserImage<S> | S)} UserImage<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type UserImage<S extends string> = $$element.UserImage<S> | S;

        /**
         * Represents a {@link GlideElementPassword2} field that contains a specific string value type.
         * @typedef {($$element.Password2<S> | S)} Password2<S>
         * @template S - The type of string value that can represent the underlying field field value.
         */
        export type Password2<S extends string> = $$element.Password2<S> | S;

        /**
         * Represents a {@link GlideElementReference} field that references a specific {@link GlideRecord} type that can be coerced as its underlying value type.
         * @typedef {($$element.Reference<P, R> | P)} Reference<P, R>
         * @template P - The properties shared by the {@link GlideElementReference} type and the {@link GlideRecord} type it references.
         * @template R - The type of {@link GlideRecord} being referenced.
         */
        export type Reference<P extends IGlideTableProperties, R extends P & GlideRecord> = $$element.Reference<P, R> | P;
    }
}

/**
 * The Scoped GlideElement API provides a number of convenient script methods for dealing with fields and their values. Scoped GlideElement methods are available for the fields of the current GlideRecord.
 * @summary Interface representing members common to Glide elements.
 * @interface IGlideElement
 */
declare interface IGlideElement extends $$element.IDbObject {
    /**
     * Determines if the current field has been modified. This functionality is available for all available data types, except Journal fields.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o - An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o - An object value to check against the new value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesTo(o: any): boolean;

    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration field. Does not require the creation of a GlideDateTime object because the duration field is already
     * a GlideDateTime object.
     * @returns {number} Number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    dateNumericValue(): number;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName - Attribute name
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     */
    getBooleanAttribute(attributeName: string): boolean;

    /**
     * Generates a choice list for a field.
     * @param {string} [dependent] - A dependent value
     * @returns {Array<*>} An array list of choices.
     */
    getChoices(dependent?: string): any[];

    /**
     * Returns the choice label for the current choice.
     * @returns {string} The selected choice's label.
     */
    getChoiceValue(): string;

    /**
     * Returns the clear text value for Password (2 way encrypted) fields in scoped applications.
     * @returns {string} The clear text password.
     */
    getDecryptedValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] - Maximum characters desired
     * @returns {string} The display value of the field.
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Returns the phone number in international format.
     * @returns {string} The phone number in international format.
     */
    getGlobalDisplayValue(): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] - Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     */
    getHTMLValue(maxChars?: number): string;

    /**
     * Returns either the most recent journal entry or all journal entries.
     * @param {number} mostRecent - If 1, returns the most recent entry. If -1, returns all journal entries.
     * @returns {string} For the most recent entry, returns a string that contains the field label, timestamp, and user display name of the journal entry.For all journal entries,
     * returns the same information for all journal entries ever entered as a single string with each entry delimited by "\n\n".
     */
    getJournalEntry(mostRecent: number): string;

    /**
     * Returns the name of the field.
     * @returns {string} Field name.
     */
    getName(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds - Number of milliseconds since 1/1/1970
     */
    setDateNumericValue(milliseconds: number): void;

    /**
     * Sets the display value of the field.
     * @param {*} value - The value to set for the field.
     */
    setDisplayValue(value: any): void;

    /**
     * Adds an error message. Available in Fuji patch 3.
     * @param {string} errorMessage - The error message.
     */
    setError(errorMessage: string): void;

    /**
     * Sets the field to the specified phone number.
     * @param {*} phoneNumber - The phone number to set. This can be in either the international or local format.
     * @param {boolean} strict - When true, specifies that the number specified must match the correct format. When false, the system attempts to correct an improperly formatted phone number.
     * @returns {boolean} True if the value was set.
     */
    setPhoneNumber(phoneNumber: any, strict: boolean): boolean;

    /**
     * Sets the value of a field.
     * @param {*} value - Object value to set the field to.
     */
    setValue(value: any): void;
}

declare interface IGlideAjax {
    getParameter(name: string): string;
    setError(error: any): void;
    newItem(name: string): IGlideAjaxXml;
}

declare interface IGlideAjaxXml {
    setAttribute(name: string, value: string): void;
}

declare var gs: GlideSystem;

declare namespace global {
    export var AbstractAjaxProcessor: IGlideAjax;
}

/**
 * Neither this namespace, nor types within it are defined in the server-side ServiceNow scripting environment.
 * @summary Type definitions for Server-side object definitions.
 * @namespace $$snClass
 */
declare namespace $$snClass {
    /**
     * Base interface for custom class definitions
     * @export
     * @interface ICustomClassBase
     * @template B - The base class type.
     * @template N - The name of the custom class type.
     */
    export interface ICustomClassBase<B extends ICustomClassBase<B, N>, N extends string> {
        /**
         * The type name of the class.
         * @type {N}
         */
        type: N;
    }

    //#region Prototype definitions

    /**
     * Prototype for objects whose constructor has no arguments.
     * @interface ICustomClassPrototype0
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype (self-referencing type)
     * @template N - The value of the name property for objects constructed with this prototype.
     */
     export interface ICustomClassPrototype0<
        B extends ICustomClassBase<B, N>,
        P extends B & ICustomClassPrototype0<B, P, N>,
        N extends string
    > extends ICustomClassBase<B, N> {
        /**
         * Called by {@see Class#create} to initialize the newly instantiated object
         * @this {P} The current "this" object.
         */
        initialize(this: P): void;
    }

    /**
     * Prototype for objects whose constructor has one argument.
     * @interface ICustomClassPrototype1
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype (self-referencing type)
     * @template N - The value of the type property for objects constructed with this prototype.
     * @template A - The argument type.
     */
     export interface ICustomClassPrototype1<B extends ICustomClassBase<B, N>, P extends B & ICustomClassPrototype1<B, P, N, A>, N extends string, A> extends ICustomClassBase<B, N> {
        /**
         * Called by {@see Class#create} to initialize the newly instantiated object
         * @this {P} The current "this" object.
         * @param {A} arg - The argument provided to the constructor.
         */
        initialize(this: P, arg: A): void;
    }

    /**
     * Prototype for objects whose constructor has 2 arguments.
     * @interface ICustomClassPrototype2
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype (self-referencing type)
     * @template N - The value of the type property for objects constructed with this prototype.
     * @template A0 - The first argument type.
     * @template A1 - The second argument type.
     */
     export interface ICustomClassPrototype2<B extends ICustomClassBase<B, N>, P extends B & ICustomClassPrototype2<B, P, N, A0, A1>, N extends string, A0, A1> extends ICustomClassBase<B, N> {
        /**
         * Called by {@see Class#create} to initialize the newly instantiated object
         * @this {P} The current "this" object.
         * @param {A0} arg0 - The first argument provided to the constructor.
         * @param {A1} arg1 - The second argument provided to the constructor.
         */
        initialize(this: P, arg0: A0, arg1: A1): void;
    }

    /**
     * Prototype for objects whose constructor has 3 arguments.
     * @interface ICustomClassPrototype3
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype (self-referencing type)
     * @template N - The value of the type property for objects constructed with this prototype.
     * @template A0 - The first argument type.
     * @template A1 - The second argument type.
     * @template A2 - The third argument type.
     */
     export interface ICustomClassPrototype3<B extends ICustomClassBase<B, N>, P extends B & ICustomClassPrototype3<B, P, N, A0, A1, A2>, N extends string, A0, A1, A2> extends ICustomClassBase<B, N> {
        /**
         * Called by {@see Class#create} to initialize the newly instantiated object
         * @this {P} The current "this" object.
         * @param {A0} arg0 - The first argument provided to the constructor.
         * @param {A1} arg1 - The second argument provided to the constructor.
         * @param {A2} arg2 - The third argument provided to the constructor.
         */
        initialize(this: P, arg0: A0, arg1: A1, arg2: A2): void;
    }

    /**
     * Prototype for objects whose constructor has 4 arguments.
     * @interface ICustomClassPrototype4
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype (self-referencing type)
     * @template N - The value of the type property for objects constructed with this prototype.
     * @template A0 - The first argument type.
     * @template A1 - The second argument type.
     * @template A2 - The third argument type.
     * @template A3 - The fourth argument type.
     */
     export interface ICustomClassPrototype4<B extends ICustomClassBase<B, N>, P extends B & ICustomClassPrototype4<B, P, N, A0, A1, A2, A3>, N extends string, A0, A1, A2, A3> extends ICustomClassBase<B, N> {
        /**
         * Called by {@see Class#create} to initialize the newly instantiated object
         * @this {P} The current "this" object.
         * @param {A0} arg0 - The first argument provided to the constructor.
         * @param {A1} arg1 - The second argument provided to the constructor.
         * @param {A2} arg2 - The third argument provided to the constructor.
         * @param {A3} arg3 - The fourth argument provided to the constructor.
         */
        initialize(this: P, arg0: A0, arg1: A1, arg2: A2, arg3: A3): void;
    }

    /**
     * Prototype for objects whose constructor has a variable nubmer of arguments.
     * @interface ICustomClassPrototypeN
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype (self-referencing type)
     * @template N - The value of the type property for objects constructed with this prototype.
     */
     export interface ICustomClassPrototypeN<B extends ICustomClassBase<B, N>, P extends B & ICustomClassPrototypeN<B, P, N>, N extends string> extends ICustomClassBase<B, N> {
        /**
         * Called by {@see Class#create} to initialize the newly instantiated object
         * @this {P} The current "this" object.
         * @param {...any[]} args- The arguments provided to the constructor.
         */
        initialize(this: P, ...args: any[]): void;
    }

    // #endregion

    //#region Constructor definitions

    /**
     * A class constructor that has no arguments.
     * @interface CustomClassConstructor0
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype.
     * @template I - The constructed object type.
     */
     export interface CustomClassConstructor0<B extends ICustomClassBase<B, string>, P extends B & ICustomClassPrototype0<B, P, string>, I extends B> {
        /**
         * Creates an instance of CustomClassConstructor0.
         * @param {A} arg - The constructor argument.
         */
        new(): I;

        /**
         * Creates an instance of CustomClassConstructor0.
         * @param {A} arg - The constructor argument.
         */
        (): I;

        /**
         * The prototype that will be used to create the new object.
         * @type {P}
         */
        prototype: P;
    }

    /**
     * A class constructor that has 1 argument.
     * @interface CustomClassConstructor1
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype.
     * @template I - The constructed object type.
     * @template A - The constructor argument type.
     */
     export interface CustomClassConstructor1<B extends ICustomClassBase<B, string>, P extends B & ICustomClassPrototype1<B, P, string, A>, I extends B, A> {
        /**
         * Creates an instance of CustomClassConstructor1.
         * @param {A} arg - The constructor argument.
         * @returns {I} - The new object instance.
         */
        new(arg: A): I;

        /**
         * Creates an instance of CustomClassConstructor1.
         * @param {A} arg - The constructor argument.
         * @returns {I} - The new object instance.
         */
        (arg: A): I;

        /**
         * The prototype that will be used to create the new object.
         * @type {P}
         */
        prototype: P;
    }

    /**
     * A class constructor that has 2 arguments.
     * @interface CustomClassConstructor2
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype.
     * @template I - The constructed object type.
     * @template A0 - The argument type for the first constructor argument.
     * @template A1 - The argument type for the second constructor argument.
     */
     export interface CustomClassConstructor2<B extends ICustomClassBase<B, string>, P extends B & ICustomClassPrototype2<B, P, string, A0, A1>, I extends B, A0, A1> {
        /**
         * Creates an instance of CustomClassConstructor2.
         * @param {A0} arg0 - The first constructor argument.
         * @param {A1} arg1 - The second constructor argument.
         * @returns {I} - The new object instance.
         */
        new(arg0: A0, arg1: A1): I;

        /**
         * Creates an instance of CustomClassConstructor2.
         * @param {A0} arg0 - The first constructor argument.
         * @param {A1} arg1 - The second constructor argument.
         * @returns {I} - The new object instance.
         */
        (arg0: A0, arg1: A1): I;

        /**
         * The prototype that will be used to create the new object.
         * @type {P}
         */
        prototype: P;
    }

    /**
     * A class constructor that has 3 arguments.
     * @interface CustomClassConstructor3
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype.
     * @template I - The constructed object type.
     * @template A0 - The argument type for the first constructor argument.
     * @template A1 - The argument type for the second constructor argument.
     * @template A2 - The argument type for the third constructor argument.
     */
     export interface CustomClassConstructor3<B extends ICustomClassBase<B, string>, P extends B & ICustomClassPrototype3<B, P, string, A0, A1, A2>, I extends B, A0, A1, A2> {
        /**
         * Creates an instance of CustomClassConstructor3.
         * @param {A0} arg0 - The first constructor argument.
         * @param {A1} arg1 - The second constructor argument.
         * @param {A2} arg2 - The third constructor argument.
         * @returns {I} - The new object instance.
         */
        new(arg0: A0, arg1: A1, arg2: A2): I;

        /**
         * Creates an instance of CustomClassConstructor3.
         * @param {A0} arg0 - The first constructor argument.
         * @param {A1} arg1 - The second constructor argument.
         * @param {A2} arg2 - The third constructor argument.
         * @returns {I} - The new object instance.
         */
        (arg0: A0, arg1: A1, arg2: A2): I;

        /**
         * The prototype that will be used to create the new object.
         * @type {P}
         */
        prototype: P;
    }

    /**
     * A class constructor that has 4 arguments.
     * @interface CustomClassConstructor4
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype.
     * @template I - The constructed object type.
     * @template A0 - The argument type for the first constructor argument.
     * @template A1 - The argument type for the second constructor argument.
     * @template A2 - The argument type for the third constructor argument.
     * @template A3 - The argument type for the fourth constructor argument.
     */
     export interface CustomClassConstructor4<B extends ICustomClassBase<B, string>, P extends B & ICustomClassPrototype4<B, P, string, A0, A1, A2, A3>, I extends B, A0, A1, A2, A3> {
        /**
         * Creates an instance of CustomClassConstructor4.
         * @param {A0} arg0 - The first constructor argument.
         * @param {A1} arg1 - The second constructor argument.
         * @param {A2} arg2 - The third constructor argument.
         * @param {A3} arg3 - The fourth constructor argument.
         * @returns {I} - The new object instance.
         */
        new(arg0: A0, arg1: A1, arg2: A2, arg3: A3): I;

        /**
         * Creates an instance of CustomClassConstructor4.
         * @param {A0} arg0 - The first constructor argument.
         * @param {A1} arg1 - The second constructor argument.
         * @param {A2} arg2 - The third constructor argument.
         * @param {A3} arg3 - The fourth constructor argument.
         * @returns {I} - The new object instance.
         */
        (arg0: A0, arg1: A1, arg2: A2, arg3: A3): I;

        /**
         * The prototype that will be used to create the new object.
         * @type {P}
         */
        prototype: P;
    }

    /**
     * A class constructor that has a variable number arguments.
     * @interface CustomClassConstructorN
     * @template B - The base type shared by the prototype and the object instance.
     * @template P - The type of prototype.
     * @template I - The constructed object type.
     *
     */
     export interface CustomClassConstructorN<B extends ICustomClassBase<B, string>, P extends B & ICustomClassPrototypeN<B, P, string>, I extends B> {
        /**
         * Creates an instance of CustomClassConstructorN.
         * @param {...any[]} args - The constructor arguments.
         * @returns {I} - The new object instance.
         */
        new(...args: any[]): I;

        /**
         * Creates an instance of CustomClassConstructorN.
         * @param {...any[]} args - The constructor arguments.
         * @returns {I} - The new object instance.
         */
        (): I;

        /**
         * The prototype that will be used to create the new object.
         * @type {P}
         */
        prototype: P;
    }

    // #endregion
}

interface Object {
    /** The initial value of Object.prototype.constructor is the standard built-in Object constructor. */
    constructor: Function;

    /** Returns a string representation of an object. */
    toString(): string;

    /** Returns a date converted to a string using the current locale. */
    toLocaleString(): string;

    /** Returns the primitive value of the specified object. */
    valueOf(): Object;

    /**
     * Determines whether an object has a property with the specified name.
     * @param v A property name.
     */
    hasOwnProperty(v: string): boolean;

    /**
     * Determines whether an object exists in another object's prototype chain.
     * @param v Another object whose prototype chain is to be checked.
     */
    isPrototypeOf(v: Object): boolean;

    /**
     * Determines whether a specified property is enumerable.
     * @param v A property name.
     */
    propertyIsEnumerable(v: string): boolean;

    extendsObject<B, P>(baseType: B, protoType: P) : B & P;
}

declare var Class: {
    /**
     * Creates a ServiceNow-compatible object constructor.
     * @template B - The base type shared for the prototype and the object instance.
     * @template C - The constructor type.
     * @returns {C} - The ServiceNow-compatible object constructor.
     */
    create<B extends $$snClass.ICustomClassBase<B, string>, C extends $$snClass.CustomClassConstructor0<B, any, any> | $$snClass.CustomClassConstructor1<B, any, any, any> |
        $$snClass.CustomClassConstructor2<B, any, any, any, any> | $$snClass.CustomClassConstructor3<B, any, any, any, any, any> | $$snClass.CustomClassConstructor4<B, any, any, any, any, any, any> |
        $$snClass.CustomClassConstructorN<B, any, any>>(): C;

    create2<C extends $$snClass.CustomClassConstructor0<any, $$snClass.ICustomClassPrototype0<any, any, string>, $$snClass.ICustomClassPrototype0<any, any, string>> |
        $$snClass.CustomClassConstructor1<any, $$snClass.ICustomClassPrototype1<any, any, string, any>, $$snClass.ICustomClassPrototype1<any, any, string, any>, any> |
        $$snClass.CustomClassConstructor2<any, $$snClass.ICustomClassPrototype2<any, any, string, any, any>, $$snClass.ICustomClassPrototype2<any, any, string, any, any>, any, any> |
        $$snClass.CustomClassConstructor3<any, $$snClass.ICustomClassPrototype3<any, any, string, any, any, any>, $$snClass.ICustomClassPrototype3<any, any, string, any, any, any>, any, any, any> |
        $$snClass.CustomClassConstructor4<any, $$snClass.ICustomClassPrototype4<any, any, string, any, any, any, any>, $$snClass.ICustomClassPrototype4<any, any, string, any, any, any, any>, any, any, any, any> |
        $$snClass.CustomClassConstructorN<any, $$snClass.ICustomClassPrototypeN<any, any, string>, $$snClass.ICustomClassPrototypeN<any, any, string>>>(): C;
};

/**
 * Query operator values that can be used for string value comparisons.
 */
declare type StringQueryOperator = "=" | "!=" | "IN" | "NOT IN" | "STARTSWITH" | "ENDSWITH" | "CONTAINS" | "DOES NOT CONTAIN" | "INSTANCEOF";

/**
 * Query operator values that can be used for numerical operations.
 */
declare type NumberQueryOperator = "=" | "!=" | ">" | ">=" | "<" | "<=";

/**
 * Query operator values.
 */
declare type QueryOperator = StringQueryOperator | NumberQueryOperator;

/**
 * The scoped GlideAggregate class is an extension of GlideRecord and provides database aggregation (COUNT, SUM, MIN, MAX, AVG) queries.
 * This functionality can be helpful when creating customized reports or in calculations for calculated fields.
 * The GlideAggregate class works only on number fields.When you use GlideAggregate on currency or price fields, you are working with the reference currency value.
 * Be sure to convert the aggregate values to the user's session currency for display.
 * Because the conversion rate between the currency or price value (displayed value) and its reference currency value (aggregation value) might change, the result may not be what the user expects.
 * @summary GlideAggregate enables you to easily create database aggregation queries.
 * @class GlideAggregate
 */
declare class GlideAggregate extends GlideRecord {
    /**
     * Creates a GlideAggregate object on the specified table.
     * @constructor
     * @param {string} tableName - Name of the table.
     */
    constructor(tableName: string);

    /**
     * Adds an aggregate.
     * @param {string} agg - Name of the aggregate to add, for example, COUNT, MIN, or MAX
     * @param {string} [name] - Name of the column to aggregate. Null is the default.
     */
    addAggregate(agg: string, name?: string): void;

    /**
     * Adds a trend for a field.
     * @param {string} fieldName - The name of the field for which trending should occur.
     * @param {string} timeInterval - The time interval for the trend. The following choices are available: Year, Quarter, Date, Week, DayOfWeek, Hour, Value.
     */
    addTrend(fieldName: string, timeInterval: string): void;

    /**
     * Gets the value of an aggregate from the current record.
     * @param {string} agg - The type of the aggregate, for example, SUM or Count.
     * @param {string} [name] - Name of the field to get the aggregate from.
     * @returns {string} The value of the aggregate.
     */
    getAggregate(agg: string, name?: string): string;

    /**
     * Gets the query necessary to return the current aggregate.
     * @returns {string} The encoded query to get the aggregate.
     */
    getAggregateEncodedQuery(): string;

    /**
     * Provides the name of a field to use in grouping the aggregates.
     * @param {string} name - Name of the field.
     */
    groupBy(name: string): void;

    /**
     * Orders the aggregates based on the specified aggregate and field.
     * @param {string} agg - Type of aggregation.
     * @param {string} fieldName - Name of the field to aggregate.
     */
    orderByAggregate(agg: string, fieldName: string): void;

    /**
     * Sets whether the results are to be grouped.
     * @param {boolean} b - When true the results are grouped.
     */
    setGroup(b: boolean): void;
}

/**
 * GlideQueryCondition object.
 * @class GlideQueryCondition
 */
declare class GlideQueryCondition {
    protected constructor();

    /**
     * Adds an AND condition to the current condition.
     * @param {string} name - The name of a field.
     * @param {QueryOperator} oper - The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value - The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, oper: QueryOperator, value: any): GlideQueryCondition;

    /**
     * Adds an AND condition to the current condition. Assumes the equals operator.
     * @param {string} name - The name of a field.
     * @param {*} value - The value of a field.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, value: any): GlideQueryCondition;

    /**
     * Adds an AND condition to the current condition.
     * @param {GlideQueryCondition} queryCondition - Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(queryCondition: GlideQueryCondition): GlideQueryCondition
    /**
     * Adds an OR condition to the current condition.
     * @param {string} name - The name of a field.
     * @param {QueryOperator} oper - The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value - The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, oper: QueryOperator, value: any): GlideQueryCondition;

    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {string} name - The name of a field.
     * @param {*} value - The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, value: any): GlideQueryCondition;

    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {GlideQueryCondition} queryCondition - Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(queryCondition: GlideQueryCondition): GlideQueryCondition;
}

/**
 * The scoped GlideDate class provides methods for performing operations on GlideDate objects, such as instantiating GlideDate objects or working with GlideDate fields.
 * @class GlideDate
 */
declare class GlideDate {
    /**
     * Creates a GlideDate object with the current date time.
     * @constructor
     */
    constructor();

    /**
     * Gets the date in the specified date format.
     * @param {string} format - the desired date format
     * @returns {string} the date in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the day of the month stored by the GlideDate object, expressed in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthNoTZ(): number;

    /**
     * Gets the date in the current user's display format and time zone.
     * @returns {string} The date in the user's format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd).
     * @returns {string} The date values for the GlideDate object in the current user's time zone and the internal time format of yyyy-MM-dd.
     */
    getDisplayValueInternal(): string;

    /**
     * Gets the month stored by the GlideDate object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the month from 1 to 12.
     */
    getMonthNoTZ(): number;

    /**
     * Gets the date value stored in the database by the GlideDate object in the internal format, yyyy-MM-dd, and the system time zone, UTC by default.
     * @returns {string} The date value in the internal format and system time zone.
     */
    getValue(): string;

    /**
     * Gets the year stored by the GlideDate object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the year.
     */
    getYearNoTZ(): number;

    /**
     * Sets a date value using the current user's display format and time zone.
     * @param {string} asDisplayed - The date in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as yyyy-MM-dd.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the date of the GlideDate object.
     * @param {string} o - The date and time to use.
     */
    setValue(o: string): void;

    /**
     * Gets the duration difference between two GlideDate values.
     * @param {GlideDate} start - The start value.
     * @param {GlideDate} end - The end value.
     * @returns {GlideDuration} The duration between the two values.
     */
    subtract(start: GlideDate, end: GlideDate): GlideDuration;
}

/**
 * Use the GlideDateTime methods to perform date-time operations, such as instantiating a GlideDateTime object, performing date-time calculations, formatting a date-time,
 * or converting between date-time formats.
 * @summary Represents a scoped glide DateTime value.
 * @class GlideDateTime
 */
declare class GlideDateTime {
    /**
     * Adds a GlideTime object to the current GlideDateTime object.
     * @param {GlideTime} gd - The GlideTime object to add.
     */
    add(gd: GlideTime): void;

    /**
     * Adds the specified number of milliseconds to the current GlideDateTime object.
     * @param {number} milliseconds - The number of milliseconds to add.
     */
    add(milliseconds: number): void;

    /**
     * Instantiates a new GlideDateTime object with the current date and time in Greenwich Mean Time (GMT).
     * @constructor
     */
    constructor();

    /**
     * Instantiates a new GlideDateTime object set to the time of the GlideDateTime object passed in the parameter.
     * @constructor
     * @param {GlideDateTime} g - The GlideDateTime object to use for setting the time of the new object.
     */
    constructor(g: GlideDateTime);

    /**
     * Instantiates a new GlideDateTime object from a date and time value in the UTC time zone specified with the format yyyy-MM-dd HH:mm:ss.
     * @constructor
     * @param {string} value - A UTC date and time using the internal format yyyy-MM-dd HH:mm:ss.
     */
    constructor(value: string);

    /**
     * Adds a specified number of days to the current GlideDateTime object. A negative parameter subtracts days.
     * The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts days using the local date and time values.
     * @param {number} days - The number of days to add. Use a negative value to subtract.
     */
    addDaysLocalTime(days: number): void;

    /**
     * Adds a specified number of days to the current GlideDateTime object. A negative parameter subtracts days.
     * The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts days using the UTC date and time values.
     * @param {number} days - The number of days to add. Use a negative number to subtract.
     */
    addDaysUTC(days: number): void;

    /**
     * Adds a specified number of months to the current GlideDateTime object. A negative parameter subtracts months.
     * The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts months using the local date and time values.
     * @param {number} months - The number of months to add. use a negative value to subtract.
     */
    addMonthsLocalTime(months: number): void;

    /**
     * Adds a specified number of months to the current GlideDateTime object. A negative parameter subtracts months.
     * The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts months using the UTC date and time values.
     * @param {number} months - The number of months to add. Use a negative value to subtract.
     */
    addMonthsUTC(months: number): void;

    /**
     * Adds the specified number of seconds to the current GlideDateTime object.
     * @param {number} seconds - The number of seconds to add.
     */
    addSeconds(seconds: number): void;

    /**
     * Adds a specified number of weeks to the current GlideDateTime object. A negative parameter subtracts weeks.
     * The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts weeks using the local date and time values.
     * @param {number} weeks - The number of weeks to add. Use a negative value to subtract.
     */
    addWeeksLocalTime(weeks: number): void;

    /**
     * Adds a specified number of weeks to the current GlideDateTime object. A negative parameter subtracts weeks.
     * The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts weeks using the UTC date and time values.
     * @param {number} weeks - The number of weeks to add. Use a negative value to subtract.
     */
    addWeeksUTC(weeks: number): void;

    /**
     * Adds a specified number of years to the current GlideDateTime object. A negative parameter subtracts years.
     * The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts years using the local date and time values.
     * @param {number} years - The number of years to add. Use a negative value to subtract.
     */
    addYearsLocalTime(years: number): void;

    /**
     * Adds a specified number of years to the current GlideDateTime object. A negative parameter subtracts years.
     * The date and time value stored by GlideDateTime object is interpreted as being in the UTC time zone.
     * @param {number} years - The number of years to add. Use a negative value to subtract.
     */
    addYearsUTC(years: number): void;

    /**
     * Determines if the GlideDateTime object occurs after the specified GlideDateTime.
     * @param {GlideDateTime} gdt - The time to check against.
     * @returns {boolean} Returns true if the GlideDateTime object's time is after the time specified by the parameter.
     */
    after(gdt: GlideDateTime): boolean;

    /**
     * Determines if the GlideDateTime object occurs before the specified GlideDateTime.
     * @param {GlideDateTime} gdt - The time to check against.
     * @returns {boolean} Returns true if the GlideDateTime object's time is before the time specified by the parameter.
     */
    before(gdt: GlideDateTime): boolean;

    /**
     * Compares two date and time objects to determine whether they are equivalent or one occurs before or after the other.
     * @param {*} o - Date and time object in GlideDateTime format
     * @returns {number} 0 = Dates are equal1 = The object's date is after the date specified in the parameter-1 = The object's date is before the date specified in the parameter.
     */
    compareTo(o: any): number;

    /**
     * Compares a datetime with an existing value for equality.
     * @param {GlideDateTime | string} dateTime - The datetime to compare.
     * @returns {boolean} Returns true if they are equal; otherwise, false.
     */
    equals(dateTime: GlideDateTime | string): boolean;

    /**
     * Gets the date stored by the GlideDateTime object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
     * @returns {GlideDate} The date in the system time zone.
     */
    getDate(): GlideDate;

    /**
     * Gets the day of the month stored by the GlideDateTime object, expressed in the current user's time zone.
     * @returns {number} The day of the month in the user's time zone, from 1 to 31.
     */
    getDayOfMonthLocalTime(): number;

    /**
     * Gets the day of the month stored by the GlideDateTime object, expressed in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthUTC(): number;

    /**
     * Gets the day of the week stored by the GlideDateTime object, expressed in the user's time zone.
     * @returns {number} The day of week value, in the user's time zone, from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekLocalTime(): number;

    /**
     * Gets the day of the week stored by the GlideDateTime object, expressed in the UTC time zone.
     * @returns {number} The day of week value from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekUTC(): number;

    /**
     * Gets the number of days in the month stored by the GlideDateTime object, expressed in the current user's time zone.
     * @returns {number} The number of days in the current month in the user's time zone.
     */
    getDaysInMonthLocalTime(): number;

    /**
     * Gets the number of days in the month stored by the GlideDateTime object, expressed in the UTC time zone.
     * @returns {number} The number of days in the month stored by the GlideDateTime object, expressed in the UTC time zone.
     */
    getDaysInMonthUTC(): number;

    /**
     * Gets the date and time value in the current user's display format and time zone.
     * @returns {string} The date and time in the user's format and time zone.
     * Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd HH:mm:ss).
     * @returns {string} The date and time values for the GlideDateTime object in the current user's time zone and the internal date and time format of yyyy-MM-dd HH:mm:ss.
     */
    getDisplayValueInternal(): string;

    /**
     * Gets the amount of time that daylight saving time is offset.
     * @returns {number} Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
     */
    getDSTOffset(): number;

    /**
     * Gets the current error message.
     * @returns {string} The error message.
     */
    getErrorMsg(): string;

    /**
     * Returns the object's time in the local time zone and in the internal format.
     * @returns {string} The object's time in the local time zone and the internal format.
     */
    getInternalFormattedLocalTime(): string;

    /**
     * Gets the date stored by the GlideDateTime object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
     * @returns {GlideDate} The date in the user's time zone.
     */
    getLocalDate(): GlideDate;

    /**
     * Returns a GlideTime object that represents the time portion of the GlideDateTime object in the user's time zone.
     * @returns {GlideTime} The time in the user's time zone.
     */
    getLocalTime(): GlideTime;

    /**
     * Gets the month stored by the GlideDateTime object, expressed in the current user's time zone.
     * @returns {number} The numerical value of the month.
     */
    getMonthLocalTime(): number;

    /**
     * Gets the month stored by the GlideDateTime object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the month.
     */
    getMonthUTC(): number;

    /**
     * Gets the number of milliseconds since January 1, 1970, 00:00:00 GMT.
     * @returns {number} The number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    getNumericValue(): number;

    /**
     * Returns a GlideTime object that represents the time portion of the GlideDateTime object.
     * @returns {GlideTime} The Unix duration stamp in system format based on GMT time.
     */
    getTime(): GlideTime;

    /**
     * Gets the time zone offset in milliseconds.
     * @returns {number} The number of milliseconds of time zone offset.
     */
    getTZOffset(): number;

    /**
     * Returns the object's time in the local time zone and in the user's format.
     * @returns {string} The object's time in the local time zone and in the user's format.
     */
    getUserFormattedLocalTime(): string;

    /**
     * Gets the date and time value stored by the GlideDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
     * @returns {string} The date and time value in the internal format and system time zone.
     */
    getValue(): string;

    /**
     * Gets the number of the week stored by the GlideDateTime object, expressed in the current user's time zone. All weeks begin on Sunday.
     * The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     * @returns {number} The number of the current week in local time. The highest week number in a year is either 52 or 53.
     */
    getWeekOfYearLocalTime(): number;

    /**
     * Gets the number of the week stored by the GlideDateTime object, expressed in the UTC time zone. All weeks begin on Sunday.
     * The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     * @returns {number} The number of the current week in UTC time. The highest week number in a year is either 52 or 53.
     */
    getWeekOfYearUTC(): number;

    /**
     * Gets the year stored by the GlideDateTime object, expressed in the current user's time zone.
     * @returns {number} Four-digit year value in the user's time zone.
     */
    getYearLocalTime(): number;

    /**
     * Gets the year stored by the GlideDateTime object, expressed in the UTC time zone.
     * @returns {number} 4-digit year value in the UTC time zone.
     */
    getYearUTC(): number;

    /**
     * Determines if an object's date is set.
     * @returns {boolean} True if the object date is set; otherwise, returns false.
     */
    hasDate(): boolean;

    /**
     * Determines if an object's time uses a daylight saving offset.
     * @returns {boolean} True if the time is daylight saving; otherwise, returns false.
     */
    isDST(): boolean;

    /**
     * Determines if a value is a valid date and time.
     * @returns {boolean} True if value is valid; otherwise, returns false.
     */
    isValid(): boolean;

    /**
     * Determines if the GlideDateTime object occurs on or after the specified GlideDateTime.
     * @param {GlideDateTime} gdt - The time to check against.
     * @returns {boolean} Returns true if the GlideDateTime object's time is on or after the time specified by the parameter.
     */
    onOrAfter(gdt: GlideDateTime): boolean;

    /**
     * Determines if the GlideDateTime object occurs on or before the specified GlideDateTime.
     * @param {GlideDateTime} gdt - The time to check against.
     * @returns {boolean} Returns true if the GlideDateTime object's time is on or before the time specified by the parameter.
     */
    onOrBefore(gdt: GlideDateTime): boolean;

    /**
     * Sets the day of the month to a specified value in the current user's time zone.
     * @param {number} day - The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
     */
    setDayOfMonthLocalTime(day: number): void;

    /**
     * Sets the day of the month to a specified value in the UTC time zone.
     * @param {number} day - The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
     */
    setDayOfMonthUTC(day: number): void;

    /**
     * Sets a date and time value using the current user's display format and time zone.
     * @param {string} asDisplayed - The date and time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format,
     * such as MM-dd-yyyy HH:mm:ss. To assign the current date and time to a variable in a workflow script, use variable.setDisplayValue(gs.nowDateTime);.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets a date and time value using the current user's time zone and the specified date and time format.
     * This method throws a runtime exception if the date and time format used in the value parameter does not match the format parameter. You can retrieve the error message
     * by calling getErrorMsg() on the GlideDateTime object after the exception is caught.
     * @param {string} value - The date and time in the current user's time zone.
     * @param {string} format - The date and time format to use to parse the value parameter.
     */
    setDisplayValue(value: string, format: string): void;

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * @param {string} value - The date and time in internal format.
     */
    setDisplayValueInternal(value: string): void;

    /**
     * Sets the date and time of the current object using an existing GlideDateTime object. This method is equivalent to instantiating a new object with a GlideDateTime parameter.
     * @param {GlideDateTime} g - The object to use for setting the datetime value.
     */
    setGlideDateTime(g: GlideDateTime): void;

    /**
     * Sets the month stored by the GlideDateTime object to the specified value using the current user's time zone.
     * @param {number} month - The month to change to.
     */
    setMonthLocalTime(month: number): void;

    /**
     * Sets the month stored by the GlideDateTime object to the specified value using the UTC time zone.
     * @param {number} month - The month to change to.
     */
    setMonthUTC(month: number): void;

    /**
     * Sets the date and time of the GlideDateTime object.
     * @param {string} o - The date and time to use. This parameter may be one of several types:A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss.
     * Sets the value of the object to the specified date and time. Using the method this way is equivalent to instantiating a new GlideDateTime object using the GlideDateTime(String value) constructor.
     * If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats.
     * Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format,
     * use etValueUTC(String dt, String format) instead.
     * A GlideDateTime object: Sets the value of the object to the date and time stored by the GlideDateTime passed in the parameter.
     * Using the method this way is equivalent to instantiating a new GlideDateTime object using the GlideDateTime(GlideDateTime g) constructor.
     * A JavaScript Number: Sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT.
     */
    setValue(o: string): void;

    /**
     * Sets a date and time value using the UTC time zone and the specified date and time format.
     * This method throws a runtime exception if the date and time format used in the dt parameter does not match the format parameter.
     * You can retrieve the error message by calling getErrorMsg() on the GlideDateTime object after the exception is caught.
     * @param {string} dt - The date and time to use.
     * @param {string} format - The date and time format to use.
     */
    setValueUTC(dt: string, format: string): void;

    /**
     * Sets the year stored by the GlideDateTime object to the specified value using the current user's time zone.
     * @param {number} year - The year to change to.
     */
    setYearLocalTime(year: number): void;

    /**
     * Sets the year stored by the GlideDateTime object to the specified value using the UTC time zone.
     * @param {number} year - The year to change to.
     */
    setYearUTC(year: number): void;

    /**
     * Gets the duration difference between two GlideDateTime values.
     * @param {GlideDateTime} Start - The start value.
     * @param {GlideDateTime} End - The end value.
     * @returns {GlideDuration} The duration between the two values.
     */
    subtract(Start: GlideDateTime, End: GlideDateTime): GlideDuration;

    /**
     * Subtracts a specified amount of time from the current GlideDateTime object.
     * @param {GlideTime} time - The time value to subtract.
     */
    subtract(time: GlideTime): void;

    /**
     * Subtracts the specified number of milliseconds from the GlideDateTime object.
     * @param {number} milliseconds - The number of milliseconds to subtract.
     */
    subtract(milliseconds: number): void;

    /**
     * Gets the date and time value stored by the GlideDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default. This method is equivalent to getValue().
     * @returns {string} The date and time stored by the GlideDateTime object in the system time zone and format.
     */
    toString(): string;
}

/**
 * GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00. As a result, setValue() and getValue() use the scoped GlideDateTime object for parameters and return values.
 * @summary The scoped GlideDuration class provides methods for working with spans of time or durations.
 * @class GlideDuration
 */
declare class GlideDuration {
    /**
     * Add the specified duration to the object.
     * @param {GlideDuration} duration - The value to add to the object.
     * @returns {GlideDuration} The sum of the current and the added duration.
     */
    add(duration: GlideDuration): GlideDuration;

    /**
     * Instantiates a GlideDuration object.
     * @constructor
     */
    constructor();

    /**
     * Instantiates a GlideDuration object by cloning the value of another GlideDuration object.
     * @constructor
     * @param {GlideDuration} another - Another scoped GlideDuration object.
     */
    constructor(another: GlideDuration);

    /**
     * Instantiates a GlideDuration object with the specified duration.
     * @constructor
     * @param {number} milliseconds - The duration value in milliseconds.
     */
    constructor(milliseconds: number);

    /**
     * Instantiates a GlideDuration object with the specified display value.
     * @constructor
     * @param {string} displayValue - The display value.
     */
    constructor(displayValue: string);

    /**
     * Gets the duration in the specified format.
     * @param {string} format - The duration format.
     * @returns {string} The current duration in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the number of days.
     * @returns {number} The number of days.
     */
    getDayPart(): number;

    /**
     * Gets the display value of the duration in number of days, hours, and minutes.
     * @returns {string} The number of days, hours, and minutes.
     */
    getDisplayValue(): string;

    /**
     * Gets the duration value in "d HH:mm:ss" format.
     * @returns {string} The duration value.
     */
    getDurationValue(): string;

    /**
     * Gets the rounded number of days. If the time part is more than 12 hours, the return value is rounded up. Otherwise, it is rounded down.
     * @returns {number} The day part, rounded.
     */
    getRoundedDayPart(): number;

    /**
     * Gets the internal value of the GlideDuration object.
     * @returns {string} The duration in the object's internal format, which is the date and time from January 1, 1970, 00:00:00.
     */
    getValue(): string;

    /**
     * Sets the display value.
     * @param {string} asDisplayed - The duration in "d HH:mm:ss" format.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the internal value of the GlideDuration object.
     * @param {*} o - The duration in the object's internal format, which is the date and time from January 1, 1970, 00:00:00.
     */
    setValue(o: any): void;

    /**
     * Subtracts the specified duration from the current duration.
     * @param {GlideDuration} duration - The duration to subtract.
     */
    subtract(duration: GlideDuration): void;
}

/**
 * The scoped GlideTime class provides methods for performing operations on GlideTime objects, such as instantiating GlideTime objects or working with GlideTime fields.
 * @class GlideTime
 */
declare class GlideTime {
    /**
     * Instantiates a GlideTime object with the current time.
     * @constructor
     */
    constructor();

    /**
     * Instantiates a GlideTime object with the specified time.
     * @constructor
     * @param {number} milliseconds - The datetime in milliseconds.
     */
    constructor(milliseconds: number);

    /**
     * Gets the time in the specified format.
     * @param {string} format - The time format.
     * @returns {string} The time in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the time in the current user's display format and time zone.
     * @returns {string} The time in the user's format and time zone.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the current user's time zone and the internal format (HH:mm:ss).
     * @returns {string} The time value for the GlideTime object in the current user's time zone and the internal time format of HH:mm:ss.
     */
    getDisplayValueInternal(): string;

    /**
     * Returns the hours part of the time using the local time zone.
     * @returns {number} The hours using the local time zone.
     */
    getHourLocalTime(): number;

    /**
     * Returns the hours part of the time using the local time zone. The number of hours is based on a 24 hour clock.
     * @returns {number} The hours using the local time zone. The number of hours is based on a 24 hour clock.
     */
    getHourOfDayLocalTime(): number;

    /**
     * Returns the hours part of the time using the UTC time zone. The number of hours is based on a 24 hour clock.
     * @returns {number} The hours using the UTC time zone. The number of hours is based on a 24 hour clock.
     */
    getHourOfDayUTC(): number;

    /**
     * Returns the hours part of the time using the UTC time zone. The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
     * @returns {number} The hours using the UTC time zone. The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
     */
    getHourUTC(): number;

    /**
     * Returns the number of minutes using the local time zone.
     * @returns {number} The number of minutes using the local time zone.
     */
    getMinutesLocalTime(): number;

    /**
     * Returns the number of minutes in the hour based on the UTC time zone.
     * @returns {number} The number of minutes in the hour using the UTC time zone.
     */
    getMinutesUTC(): number;

    /**
     * Returns the number of seconds in the current minute.
     * @returns {number} The number of seconds in the minute.
     */
    getSeconds(): number;

    /**
     * Gets the time value stored in the database by the GlideTime object in the internal format, HH:mm:ss, and the system time zone.
     * @returns {string} The time value in the internal fomat and system time zone.
     */
    getValue(): string;

    /**
     * Sets a time value using the current user's display format and time zone.
     * @param {string} asDisplayed - The time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as HH:mm:ss.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the time of the GlideTime object in the internal time zone.
     * @param {string} o - The time in hh:mm:ss format.
     */
    setValue(o: string): void;

    /**
     * Gets the duration difference between two GlideTime object values.
     * @param {GlideTime} startTime - The start value.
     * @param {GlideTime} endTime - The end value.
     * @returns {GlideDuration} The duration between the two values.
     */
    subtract(startTime: GlideTime, endTime: GlideTime): GlideDuration;
}

/**
 * The Scoped GlideElement API provides a number of convenient script methods for dealing with fields and their values. Scoped GlideElement methods are available for the fields of the current GlideRecord.
 * @class GlideElement
 */
declare class GlideElement extends $$element.StringBased<string, GlideElement, string> { protected constructor(); }

declare class GlideElementBoolean extends Packages.java.lang.Boolean implements $$element.IValueSpecific<boolean, GlideElementBoolean, $$rhino.BooleanString> {
    protected constructor();

    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwise.
     */
    canWrite(): boolean;

    /**
     * Determines if the current field has been modified. This functionality is available for all available data types, except Journal fields.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {$$rhino.Nilable<$$property.Boolean>} o - An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesFrom(o: $$rhino.Nilable<$$property.Boolean>): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {$$rhino.Nilable<$$property.Boolean>} o - An object value to check against the new value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesTo(o: $$rhino.Nilable<$$property.Boolean>): boolean;

    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration field. Does not require the creation of a GlideDateTime object because the duration field is already
     * a GlideDateTime object.
     * @returns {number} Number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    dateNumericValue(): number;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName - Attribute name
     * @returns {string} Attribute value.
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName - Attribute name
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     */
    getBooleanAttribute(attributeName: string): boolean;

    /**
     * Generates a choice list for a field.
     * @param {string} [dependent] - A dependent value
     * @returns {Array<*>} An array list of choices.
     */
    getChoices(dependent?: string): any[];

    /**
     * Returns the choice label for the current choice.
     * @returns {string} The selected choice's label.
     */
    getChoiceValue(): string;

    /**
     * Returns the clear text value for Password (2 way encrypted) fields in scoped applications.
     * @returns {string} The clear text password.
     */
    getDecryptedValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] - Maximum characters desired
     * @returns {string} The display value of the field.
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Returns the element's descriptor.
     * @returns {GlideElementDescriptor} Element's descriptor.
     */
    getED(): GlideElementDescriptor;

    /**
     * Returns the phone number in international format.
     * @returns {string} The phone number in international format.
     */
    getGlobalDisplayValue(): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] - Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     */
    getHTMLValue(maxChars?: number): string;

    /**
     * Returns either the most recent journal entry or all journal entries.
     * @param {number} mostRecent - If 1, returns the most recent entry. If -1, returns all journal entries.
     * @returns {string} For the most recent entry, returns a string that contains the field label, timestamp, and user display name of the journal entry.
     * For all journal entries, returns the same information for all journal entries ever entered as a single string with each entry delimited by "\n\n".
     */
    getJournalEntry(mostRecent: number): string;

    /**
     * Returns the object label.
     * @returns {string} Object label.
     */
    getLabel(): string;

    /**
     * Returns the name of the field.
     * @returns {string} Field name.
     */
    getName(): string;

    /**
     * Returns the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     */
    getTableName(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds - Number of milliseconds since 1/1/1970
     */
    setDateNumericValue(milliseconds: number): void;

    /**
     * Sets the display value of the field.
     * @param {*} value - The value to set for the field.
     */
    setDisplayValue(value: any): void;

    /**
     * Adds an error message. Available in Fuji patch 3.
     * @param {string} errorMessage - The error message.
     */
    setError(errorMessage: string): void;

    /**
     * Sets the field to the specified phone number.
     * @param {*} phoneNumber - The phone number to set. This can be in either the international or local format.
     * @param {boolean} strict - When true, specifies that the number specified must match the correct format. When false, the system attempts to correct an improperly formatted phone number.
     * @returns {boolean} True if the value was set.
     */
    setPhoneNumber(phoneNumber: any, strict: boolean): boolean;

    /**
     * Sets the value of a field.
     * @param {$$rhino.Nilable<$$property.Boolean>} value - Object value to set the field to.
     */
    setValue(value: $$rhino.Nilable<$$property.Boolean>): void;
}

declare class GlideElementBreakdownElement extends $$element.StringBased<string, GlideElementBreakdownElement, string> { protected constructor(); }

declare class GlideElementCompressed extends $$element.StringBased<string, GlideElementCompressed, string> { protected constructor(); }

declare class GlideElementConditions extends $$element.StringBased<string, GlideElementConditions, string> { protected constructor(); }

declare class GlideElementCounter extends $$element.StringBased<number, GlideElementCounter, string> { protected constructor(); }

declare class GlideElementCurrency extends $$element.StringBased<string, GlideElementCurrency, string> { protected constructor(); }

declare class GlideElementDataObject extends $$element.StringBased<string, GlideElementDataObject, string> { protected constructor(); }

declare class GlideElementDocumentation extends $$element.StringBased<string, GlideElementDocumentation, string> { protected constructor(); }

declare class GlideElementDocumentId extends $$element.StringBased<string, GlideElementDocumentId, string> { protected constructor(); }

declare class GlideElementDomainId extends $$element.StringBased<string, GlideElementDomainId, string> { protected constructor(); }

declare class GlideElementFullUTF8 extends $$element.StringBased<string, GlideElementFullUTF8, string> { protected constructor(); }

declare class GlideElementGlideObject extends $$element.StringBased<string, GlideElementGlideObject, string> { protected constructor(); }

declare class GlideElementGlideVar extends $$element.StringBased<string, GlideElementGlideVar, string> { protected constructor(); }

declare class GlideElementIcon extends $$element.StringBased<string, GlideElementIcon, string> { protected constructor(); }

declare class GlideElementInternalType extends $$element.StringBased<string, GlideElementInternalType, string> { protected constructor(); }

declare class GlideElementNameValue extends $$element.StringBased<string, GlideElementNameValue, string> { protected constructor(); }

declare class GlideElementNumeric extends $$element.StringBased<number, GlideElementNumeric, string> implements $$element.IValueSpecific<number, GlideElementNumeric, string> { protected constructor(); }

declare class GlideElementPassword extends $$element.StringBased<string, GlideElementPassword, string> { protected constructor(); }

declare class GlideElementPassword2 extends $$element.StringBased<string, GlideElementPassword2, string> { protected constructor(); }

declare class GlideElementPrice extends $$element.StringBased<number, GlideElementPrice, string> { protected constructor();  }

/**
 * A Glide element that references another GlideRecord.
 * @class GlideElementReference
 * @todo Verify whether Packages.com.glide.script.glide_elements.GlideReference exists
 */
declare class GlideElementReference extends $$element.StringBased<string, GlideElementReference, string> implements $$element.IReference<IGlideTableProperties, GlideRecord>, IGlideTableProperties {
    protected constructor();
    /**
     * Created by
     * @type {$$property.Element}
     */
    sys_created_by: $$property.Element;

    /**
     * Created field. Internal type is "glide_date_time"
     * @summary Created
     * @type {$$property.GlideObject}
     */
    sys_created_on: $$property.GlideObject;

    /**
     * Sys ID field. Internal type is "GUID"
     * @summary Sys ID
     * @type {$$property.Element}
     */
    sys_id: $$property.Element;

    /**
     * Updates Count
     * @type {$$property.Numeric}
     */
    sys_mod_count: $$property.Numeric;

    /**
     * Updated by
     * @type {$$property.Element}
     */
    sys_updated_by: $$property.Element;

    /**
     * Updated field. Internal type is "glide_date_time"
     * @summary Updated
     * @type {$$property.GlideObject}
     */
    sys_updated_on: $$property.GlideObject;

    /**
     * Gets the table name for a reference element.
     * @returns {string} The table name of the reference.
     */
    getReferenceTable(): string;

    /**
     * Returns a GlideRecord object for a given reference element.
     * @returns {GlideRecord} A GlideRecord object.
     */
    getRefRecord(): GlideRecord | null | undefined;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {GlideRecord | $$rhino.Nilable<$$property.Reference>} o - An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesFrom(o: GlideRecord | $$rhino.Nilable<$$property.Reference>): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {GlideRecord | $$rhino.Nilable<$$property.Reference>} o - An object value to check against the new value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     */
    changesTo(o: GlideRecord | $$rhino.Nilable<$$property.Reference>): boolean;

    /**
     * Sets the value of a field.
     * @param {GlideRecord | $$rhino.Nilable<$$property.Reference>} value - Object value to set the field to.
     */
    setValue(value: GlideRecord | $$rhino.Nilable<$$property.Reference>): void;
}

declare class GlideElementScript extends $$element.StringBased<string, GlideElementScript, string> { protected constructor(); }

declare class GlideElementShortFieldName extends $$element.StringBased<string, GlideElementShortFieldName, string> { protected constructor(); }

declare class GlideElementShortTableName extends $$element.StringBased<string, GlideElementShortTableName, string> { protected constructor(); }

declare class GlideElementSourceId extends $$element.StringBased<string, GlideElementSourceId, string> { protected constructor(); }

declare class GlideElementSourceName extends $$element.StringBased<string, GlideElementSourceName, string> { protected constructor(); }

declare class GlideElementSourceTable extends $$element.StringBased<string, GlideElementSourceTable, string> { protected constructor(); }

declare class GlideElementSysClassName extends $$element.StringBased<string, GlideElementSysClassName, string> { protected constructor(); }

declare class GlideElementTranslatedField extends $$element.StringBased<string, GlideElementTranslatedField, string> { protected constructor(); }

declare class GlideElementTranslatedHTML extends $$element.StringBased<string, GlideElementTranslatedHTML, string> { protected constructor(); }

declare class GlideElementTranslatedText extends $$element.StringBased<string, GlideElementTranslatedText, string> { protected constructor(); }

declare class GlideElementURL extends $$element.StringBased<string, GlideElementURL, string> { protected constructor(); }

declare class GlideElementUserImage extends $$element.StringBased<string, GlideElementUserImage, string> { protected constructor(); }

declare class GlideElementVariableConditions extends $$element.StringBased<string, GlideElementVariableConditions, string> { protected constructor(); }

declare class GlideElementVariables extends $$element.StringBased<string, GlideElementVariables, string> { protected constructor(); }

declare class GlideElementWikiText extends $$element.StringBased<string, GlideElementWikiText, string> { protected constructor(); }

declare class GlideElementWorkflow extends $$element.StringBased<string, GlideElementWorkflow, string> { protected constructor(); }

declare class GlideElementWorkflowConditions extends $$element.StringBased<string, GlideElementWorkflowConditions, string> { protected constructor(); }

/**
 * A GlideRecord contains both records and fields. For information about GlideRecordSecure, which is a class inherited from GlideRecord that performs the same functions as GlideRecord, and also enforces ACLs,
 * see the GlideServer APIs .Always test queries on a sub-production instance prior to deploying them on a production instance.
 * An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query.
 * When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table.
 * Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
 * @summary Scoped GlideRecord is used for database operations.
 * @class GlideRecord
 */
declare class GlideRecord implements IGlideTableProperties, $$element.IDbObject {
    /**
     * Created by
     * @type {$$property.Element}
     */
    sys_created_by: $$property.Element;

    /**
     * Created field. Internal type is "glide_date_time"
     * @summary Created
     * @type {$$property.GlideObject}
     */
    sys_created_on: $$property.GlideObject;

    /**
     * Sys ID field. Internal type is "GUID"
     * @summary Sys ID
     * @type {$$property.Element}
     */
    sys_id: $$property.Element;

    /**
     * Updates
     * @type {$$property.Numeric}
     */
    sys_mod_count: $$property.Numeric;

    /**
     * Updated by
     * @type {$$property.Element}
     */
    sys_updated_by: $$property.Element;

    /**
     * Updated field. Internal type is "glide_date_time"
     * @summary Updated
     * @type {$$property.GlideObject}
     */
    sys_updated_on: $$property.GlideObject;

    /**
     * Adds a filter to return active records.
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @param {string} query - An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Applies a pre-defined GlideDBFunctionBuilder object to a record.
     * @param {*} function - A GlideDBFunctionBuilder object that defines a SQL operation.
     */
    addFunction(functionBuilder: any): void;

    /**
     * Creates an instance of the GlideRecord class for the specified table.
     * @constructor
     * @param {string} tableName - The table to be used.
     */
    constructor(tableName: string);

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @param {string} joinTable - Table name
     * @param {*} [primaryField] - If other than sys_id, the primary field
     * @param {*} [joinTableField] - If other than sys_id, the field that joins the tables.
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @param {string} fieldName - Name of the field to check.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @param {string} fieldName - Name of the field to check.
     * @returns {GlideQueryCondition} Query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Provides the ability to build a request, which when executed, returns the rows from the specified table, that match the request.
     */
    addQuery(): GlideQueryCondition;

    /**
     * Provides the ability to build a request, which when executed, returns the rows from the specified table, that match the request.
     * @param {string} name - Table field name.
     * @param {string} operator - Query operator. The available values are dependent on the data type of the value parameter.
     *                            Numbers:=!=&gt;&gt;=&lt;&lt;=Strings (must be in upper case):=!=INNOT INSTARTSWITHENDSWITHCONTAINSDOES NOT CONTAININSTANCEOF
     * @param {*} value - Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition that was added to the GlideRecord.
     */
    addQuery(name: string, operator: string, value: any): GlideQueryCondition;

    /**
     * Provides the ability to build a request, which when executed, returns the rows from the specified table, that match the request.
     * @param {string} name - Table field name.
     * @param {*} value - Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition that was added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} encodedQuery - Encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(encodedQuery: string): GlideQueryCondition;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @returns {boolean} Flag that indicates whether the user's roles permit deletions of records in this table.Valid values:true: Deletions permittedfalse: Deletions are not permitted.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @returns {boolean} Flag that indicates whether the user's roles permit reading of records in this table.Valid values:true: Reading permittedfalse: Reading is not permitted.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @returns {boolean} Flag that indicates whether the user's roles permit writing of records in this table.Valid values:true: Writing permittedfalse: Writing is not permitted.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {number} firstRow - The first row to include. Because the index starts at 0, a value of 0 returns the first row.
     * @param {number} lastRow - The last row to include in the range. Because the index starts at 0, use the value n - 1, in which n equals the actual row number.
     * @param {boolean} forceCount - If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} Flag that indicates whether the record was successfully deleted.Valid values:true: Record was deleted.false: No record was found to delete.
     */
    deleteRecord(): boolean;

    /**
     * Returns the specified record in an instantiated GlideRecord object.
     * @param {$$property.Element} sys_id - sys_id to match.
     * @returns {boolean} Flag that indicates whether the requested record was located - true: Record was found; false: Record was not found.
     */
    get(sys_id: $$property.Element): boolean;

    /**
     * Returns the specified record in an instantiated GlideRecord object.
     * @param {GLIDE.String} name - Name of the instantiated GlideRecord column to search for the specified value parameter.
     * @param {*} value - Value to match.
     * @returns {boolean} Flag that indicates whether the requested record was located.true: Record was foundfalse: Record was not found.
     */
    get(name: $$rhino.String, value: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @param {string} fieldName - Field name for which to return the dictionary attributes
     * @returns {string} Dictionary attributes.
     */
    getAttribute(fieldName: string): string;

    /**
     * Returns the table's label.
     * @returns {string} Table's label.
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @returns {string} The display value for the current record.
     */
    getDisplayValue(): string;

    /**
     * Returns the element's descriptor.
     * @returns {GlideElementDescriptor} Element's descriptor.
     */
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {string} columnName - Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns {string} The last error message as a string.
     */
    getLastErrorMessage(): string;

    /**
     * Retrieves a link to the current record.
     * @param {boolean} noStack - If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;

    /**
     * Retrieves the class name for the current record.
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @returns {number} Number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns {string} The table name.
     */
    getTableName(): string;

    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @returns {string} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name - The name of the field to get the value from.
     * @returns {string} The value of the field.
     */
    getValue(name: string): string;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;

    /**
     * Creates an empty record suitable for population before an insert.
     */
    initialize(): void;

    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Checks to see if the current database action is to be aborted.
     * @returns {boolean} Flag that indicates whether the current database action is to be aborted.Valid values:true: Action is to be aborted.false: Action is not to be aborted.
     */
    isActionAborted(): boolean;

    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @param {string} columnName - The name of the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if a record was actually returned by the query/get record operation.
     * @returns {boolean} Flag that indicates whether a record was actually returned by the query/get operation.
     *                    Valid values: true = Record returned by query/get operation; false = End of record set, no record returned.
     */
    isValidRecord(): boolean;

    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} Flag that indicates if there is a "next" record in the GlideRecord.Valid values:true: Move to the next record was successful.false: No more records in the result set.
     */
    next(): boolean;

    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name - The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name - The column name to be used to order the records in a GlideRecord object.
     */
    orderByDesc(name: string): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {*} field - Column name to query on.
     * @param {*} value - Value to query for.
     */
    query(field: any, value: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     */
    query(): void;

    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @param {boolean} b - True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {number} maxNumRecords - The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;

    /**
     * Sets sys_id value for the current record.
     * @param {string} guid - The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {string} name - Name of the field.
     * @param {*} value - The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @param {boolean} enable - If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @param {string} [reason] - Reason for the update. The reason appears in the audit record.
     * @returns {string} The sys_id of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string;

    /**
     * Updates each GlideRecord in a stated query with a specified set of changes.
     */
    updateMultiple(): void;

    /**
     * Moves to the next record in the GlideRecord. Provides the same functionality as next(), it is intended to be used in cases where the GlideRecord has a column named next.
     * @returns {boolean} True if there are more records in the query set.
     */
    _next(): boolean;

    /**
     * Identical to query(). This method is intended to be used on tables where there is a column named query, which would interfere with using the query() method.
     * @param {*} name - Column name on which to query
     * @param {*} value - Value for which to query
     */
    _query(name: any, value: any): void;
}

/**
 * There is no constructor for this class. Use the GlideElement getED() method to obtain a ElementDescriptor object.
 * @summary The scoped GlideElementDescriptor API provides information about individual fields.
 * @class GlideElementDescriptor
 */
declare class GlideElementDescriptor {
    protected constructor();

    /**
     * Returns the encryption type used for attachments on the element's table.
     * @returns {string | Packages.java.lang.String} The encryption type used on attachments. Returns null if attachments on the element's table are not being encrypted.
     */
    getAttachmentEncryptionType(): string | Packages.java.lang.String;

    /**
     * Returns the element's encryption type.
     * @returns {string | Packages.java.lang.String} The element's encryption type. Returns null if the element is not encrypted.
     */
    getEncryptionType(): string | Packages.java.lang.String;

    /**
     * Returns the element's internal data type.
     * @returns {string | Packages.java.lang.String} The element's internal data type.
     */
    getInternalType(): string | Packages.java.lang.String;

    /**
     * Returns the element's label.
     * @returns {string | Packages.java.lang.String} The element's label.
     */
    getLabel(): string | Packages.java.lang.String;

    /**
     * Returns the element's length.
     * @returns {number} The element's size.
     */
    getLength(): number;

    /**
     * Returns the element's name.
     * @returns {string} The element's name.
     */
    getName(): string | Packages.java.lang.String;

    /**
     * Returns the element's plural label.
     * @returns {string} The element's plural label.
     */
    getPlural(): string | Packages.java.lang.String;

    /**
     * Returns true if an encrypted attachment has been added to the table.
     * @returns {boolean} Returns true if an encrypted attachment has been added to the table.
     */
    hasAttachmentsEncrypted(): boolean;

    /**
     * Returns true if the element is an automatically generated or system field.
     * @returns {boolean} True if the element is automatically generated or a system field.
     */
    isAutoOrSysID(): boolean;

    /**
     * Returns true if the element is defined as a dropdown choice in its dictionary definition.
     * @returns {boolean} Returns true if the element is defined as a dropdown choice. Returns true even if there are no entries defined in the choice table.
     * The last choice type, suggestion, does not return true.
     */
    isChoiceTable(): boolean;

    /**
     * Returns true if an element is encrypted.
     * @returns {boolean} Returns true if the element is encrypted, false otherwise.
     */
    isEdgeEncrypted(): boolean;

    /**
     * Returns true if the element is a virtual element.
     * @returns {boolean} Returns true if the element is a virtual element.
     */
    isVirtual(): boolean;
}

declare class GlideEmail {
    /**
     * Adds the address to either the cc or bcc list.
     * @param {"cc"|"bcc"} type - Either cc or bcc, determines the list to which the address is added.
     * @param {string} address - The recipient's email address.
     */
    addAddress(type: string, address: string): void;

    /**
     * Adds the recipient to either the cc or bcc list, but uses the display name instead of the address when showing the recipient.
     * @param {"cc"|"bcc"} type - Either cc or bcc, determines the list to which the address is added.
     * @param {string} address - The recipient's email address.
     * @param {string} displayName - The name to be shown instead of the email address.
     */
    addAddress(type: string, address: string, displayName: string): void;

    /**
     *
     * @param address
     */
    addRecipient(address: string): void;

    /**
     * Instantiates a scoped GlideEmail object.
     * @constructor
     * @param {string} [body] Body of message
     */
    constructor(body?: string);

    /**
     *
     */
    getSMSText(): string;

    /**
     * Returns the email's subject line.
     * @returns {string} The email's subject line.
     */
    getSubject(): string;

    getTextBody(): string;

    /**
     * Returns the email's watermark.
     * @returns {string} The email's watermark.
     */
    getWatermark(): string;

    /**
     * Sets the body of the email.
     * @param {string} bodyText - The body of the email.
     */
    setBody(bodyText: string): void;

    /**
     * Sets the sender's address.
     * @param {string} address - The sender's email address.
     */
    setFrom(address: string): void;

    setRecipients(recipients: string): void;

    /**
     * Sets the reply to address.
     * @param {string} address - The reply to email address.
     */
    setReplyTo(address: string): void;

    /**
     * Sets the email's subject line.
     * @param {string} subject - Text for the subject line.
     */
    setSubject(subject: string): void;
}

declare class EmailWatermark {
    getWatermark(): string;
}

/**
 * You can use the GlideEmailOutbound methods with the email global object available in mail scripts.The email object behaves identically for global and scoped applications.
 * @summary The scoped GlideEmailOutbound class implements the email object for scoped applications.
 * @class GlideEmailOutbound
 */
declare class EmailOutbound extends GlideEmail {
    constructor(actionType_OR_action?: string | GlideRecord, m?: EmailWatermark);

    save(): void;
}

/**
 * The Scoped GlideTableHierarchy API provides methods for handling information about table relationships.
 * @class GlideTableHierarchy
 */
declare class GlideTableHierarchy {
    /**
     * Instantiates a GlideTableHierarchy object.
     * @constructor
     * @param {string} tableName - The name of the table.
     */
    constructor(tableName: string);

    /**
     * Returns an array of strings containing all tables that extend the current table and includes the current table.
     * @returns {Array<*>} An array of strings containing the tables in the hierarchy that includes the current table.
     */
    getAllExtensions(): any[];

    /**
     * Returns the parent class.
     * @returns {string} The parent class.
     */
    getBase(): string;

    /**
     * Returns an array of strings containing all classes in the hierarchy of the current table.
     * @returns {Array<*>} An array of strings of the classes in the hierarchy.
     */
    getHierarchy(): any[];

    /**
     * Returns the table's name.
     * @returns {string} The table's name.
     */
    getName(): string;

    /**
     * Returns the top level class in the hierarchy.
     * @returns {string} The root class.
     */
    getRoot(): string;

    /**
     * Returns an array of strings containing all tables that extend the current table.
     * @returns {Array<*>} An array of strings containing the tables that extend the current table.
     */
    getTableExtensions(): any[];

    /**
     * Returns an array of strings of the table names in the hierarchy.
     * @returns {Array<*>} An array of strings containing the names of tables in the hierarchy.
     */
    getTables(): any[];

    /**
     * Returns true of this class has been extended.
     * @returns {boolean} True if the current table has extensions.
     */
    hasExtensions(): boolean;

    /**
     * Returns true if this is a base class.
     * @returns {boolean} True if the current table has no parent and has extensions.
     */
    isBaseClass(): boolean;

    /**
     * Returns true if this table is not in a hierarchy.
     * @returns {boolean} True if the current table has no parent and no extensions.
     */
    isSoloClass(): boolean;
}

/**
 * There are no constructors for creating an instance of a scoped workflow object. Instead, use the global workflow object available in activity scripts.
 * This workflow object is available in any script location inside a workflow.
 * @summary The scoped Workflow API provides methods that can be used in an activity definition script.
 * @class Workflow
 */
declare class Workflow {
    protected constructor();

    /**
     * Returns the workflow variables.
     * @param {*} inputs - Workflow variables as name value pairs.
     */
    inputs(inputs: any): any;

    /**
     * Returns the workflow's result.
     * @param {string} result - Workflow results
     */
    result(result: string): any;

    /**
     * Adds a debug message to the log.
     * @param {string} message - The message to add to the log.
     * @param {*} args - Arguments to add to the message.
     * @returns {string} The message added to the log.
     */
    debug(message: string, args: any): string;

    /**
     * Adds an error message to the log.
     * @param {string} message - The message to add to the log.
     * @param {*} args - Arguments to add to the message.
     * @returns {string} The logged message.
     */
    error(message: string, args: any): string;

    /**
     * Returns the specified variable's value.
     * @param {string} name - The variable name
     * @returns {*} The variable's value.
     */
    getVariable(name: string): any;

    /**
     * Adds an informational message to the log.
     * @param {string} message - The message to add to the log.
     * @param {*} args - Arguments to add to the message.
     * @returns {string} The message that is logged.
     */
    info(message: string, args: any): string;

    /**
     * Returns the workflow name.
     * @returns {string} The workflow name.
     */
    name(): string;

    /**
     * Removes the specified variable from the workflow.
     * @param {string} name - The variable name
     */
    removeVariable(name: string): void;

    /**
     * Returns the workflow's scratchpad object.
     * @returns {*} The scratchpad object.
     */
    scratchpad(): any;

    /**
     * Sets the workflow's result.
     * @param {string} result - The workflow's result
     */
    setResult(result: string): void;

    /**
     * Sets the specified variable to the specified value.
     * @param {string} name - The variable name
     * @param {*} value - The value to be assigned to the variable.
     */
    setVariable(name: string, value: any): void;

    /**
     * Adds a warning message to the log.
     * @param {string} message - The message to add to the log.
     * @param {*} args - Arguments to add to the message.
     * @returns {string} The logged message.
     */
    warn(message: string, args: any): string;
}

/**
 * The scoped GlideSystem (referred to by the variable name 'gs' in any server-side JavaScript) API provides a number of convenient methods to get information about the system, the current logged in user, etc.
 * Many of the GlideSystem methods facilitate the easy inclusion of dates in query ranges, and are most often used in filters and reporting.
 * @summary Object referenced by the {@link gs} global variable.
 * @class GlideSystem
 */
declare class GlideSystem {
    protected constructor();

    /**
     * Adds an error message for the current session.
     * @param {*} message - The message to add.
     */
    addErrorMessage(message: any): void;

    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {*} message - An info message object.
     */
    addInfoMessage(message: any): void;

    /**
     * Returns an ASCII string from the specified base64 string.
     * @param {string} source - A base64 encoded string.
     * @returns {string} The decoded string.
     */
    base64Decode(source: string): string;

    /**
     * Creates a base64 string from the specified string.
     * @param {string} source - The string to be encoded.
     * @returns {string} The base64 string.
     */
    base64Encode(source: string): string;

    /**
     * Returns the date and time for the beginning of last month in GMT.
     * @returns {string} GMT beginning of last month, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfLastMonth(): string;

    /**
     * Returns the date and time for the beginning of last week in GMT.
     * @returns {string} GMT beginning of last week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfLastWeek(): string;

    /**
     * Returns the date and time for the beginning of next month in GMT.
     * @returns {string} GMT beginning of next month, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextMonth(): string;

    /**
     * Returns the date and time for the beginning of next week in GMT.
     * @returns {string} The GMT beginning of next week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextWeek(): string;

    /**
     * Returns the date and time for the beginning of next year in GMT.
     * @returns {string} GMT beginning of next year, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextYear(): string;

    /**
     * Returns the date and time for the beginning of this month in GMT.
     * @returns {string} GMT beginning of this month, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfThisMonth(): string;

    /**
     * Returns the date and time for the beginning of this quarter in GMT.
     * @returns {string} GMT beginning of this quarter, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfThisQuarter(): string;

    /**
     * Returns the date and time for the beginning of this week in GMT.
     * @returns {string} GMT beginning of this week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfThisWeek(): string;

    /**
     * Returns the date and time for the beginning of this year in GMT.
     * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfThisYear(): string;

    /**
     * Generates a date and time for the specified date in GMT.
     * @param {string} date - Format: yyyy-mm-dd
     * @param {string} range - Start, end, or a time in the 24 hour format hh:mm:ss.
     * @returns {string} A date and time in the format yyyy-mm-dd hh:mm:ss. If range is start, the returned value is yyyy-mm-dd 00:00:00; If range is end the return value is yyyy-mm-dd 23:59:59.
     */
    dateGenerate(date: string, range: string): string;

    /**
     * Returns the date and time for a specified number of days ago.
     * @param {number} days - Integer number of days
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    daysAgo(days: number): string;

    /**
     * Returns the date and time for the end of the day a specified number of days ago.
     * @param {number} days - Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss.
     */
    daysAgoEnd(days: number): string;

    /**
     * Returns the date and time for the beginning of the day a specified number of days ago.
     * @param {string} days - Integer number of days
     * @returns {string} GMT start of the day in the format yyyy-mm-dd hh:mm:ss.
     */
    daysAgoStart(days: string): string;

    /**
     * Writes a debug message to the system log.
     * @param {string} message - The log message with place holders for any variable arguments.
     * @param {*} [param1] - First variable argument.
     * @param {*} [param2] - Second variable argument.
     * @param {*} [param3] - Third variable argument.
     * @param {*} [param4] - Fourth variable argument.
     * @param {*} [param5] - Fifth variable argument.
     */
    debug(message: string, param1?: any, param2?: any, param3?: any, param4?: any, param5?: any): void;

    /**
     * Returns the date and time for the end of last month in GMT.
     * @returns {string} GMT end of last month, in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfLastMonth(): string;

    /**
     * Returns the date and time for the end of last week in GMT.
     * @returns {string} GMT end of last week, in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfLastWeek(): string;

    /**
     * Returns the date and time for the end of last year in GMT.
     * @returns {string} GMT in format yyyy-mm-dd hh:mm:ss.
     */
    endOfLastYear(): string;

    /**
     * Returns the date and time for the end of next month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfNextMonth(): string;

    /**
     * Returns the date and time for the end of next week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfNextWeek(): string;

    /**
     * Returns the date and time for the end of next year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfNextYear(): string;

    /**
     * Returns the date and time for the end of this month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfThisMonth(): string;

    /**
     * Returns the date and time for the end of this quarter in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfThisQuarter(): string;

    /**
     * Returns the date and time for the end of this week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfThisWeek(): string;

    /**
     * Returns the date and time for the end of this year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    endOfThisYear(): string;

    /**
     * Writes an error message to the system log.
     * @param {string} message - The log message with place holders for any variable arguments.
     * @param {*} [param1] - First variable argument.
     * @param {*} [param2] - Second variable argument.
     * @param {*} [param3] - Third variable argument.
     * @param {*} [param4] - Fourth variable argument.
     * @param {*} [param5] - Fifth variable argument.
     */
    error(message: string, param1?: any, param2?: any, param3?: any, param4?: any, param5?: any): void;

    /**
     * Queues an event for the event manager.
     * @param {string} name - Name of the event being queued.
     * @param {*} instance - GlideRecord object, such as "current".
     * @param {string} [parm1] - Saved with the instance if specified.
     * @param {string} [parm2] - Saved with the instance if specified.
     * @param {string} [queue] - Name of the queue.
     */
    eventQueue(name: string, instance: any, parm1?: string, parm2?: string, queue?: string): void;

    /**
     * Queues an event for the event manager at a specified date and time.
     * @param {string} name - Name of the event being queued.
     * @param {*} instance - GlideRecord object, such as "current".
     * @param {string} [parm1] - Saved with the instance if specified.
     * @param {string} [parm2] - Saved with the instance if specified.
     * @param {*} [expiration] - Date and time to process this event.
     */
    eventQueueScheduled(name: string, instance: any, parm1?: string, parm2?: string, expiration?: any): void;

    /**
     * Executes a job for a scoped application.
     * @param {GlideRecord} job - The job to be run.
     * @returns {string} Returns the sysID of the scheduled job. Returns null if the job is global.
     */
    executeNow(job: GlideRecord): string;

    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * @returns {string} A 32-character hexadecimal GUID.
     */
    generateGUID(): string;

    /**
     * Gets the caller scope name; returns null if there is no caller.
     * @returns {string} The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): string;

    /**
     * Gets a string representing the cache version for a CSS file.
     * @returns {string} The CSS cache version.
     */
    getCssCacheVersionString(): string;

    /**
     * Gets the ID of the current application as set using the Application Picker.
     * @returns {string} The current application's sys_id, or global in none is set.
     */
    getCurrentApplicationId(): string;

    /**
     * Gets the name of the current scope.
     * @returns {string} The current scope name.
     */
    getCurrentScopeName(): string;

    /**
     * Returns the list of error messages for the session that were added by addErrorMessage().
     * @returns {string} List of error messages.
     */
    getErrorMessages(): string;

    /**
     * Retrieves a message from UI messages that has HTML special characters, and replaces them with escape sequences. For example, &amp; becomes &amp;amp;.
     * @param {string} id - ID of the message.
     * @param {any[]} [args] - List of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message with HTML special characters replaced with escape sequences.
     */
    getEscapedMessage(id: string, args?: any[]): string;

    /**
     * Retrieves a message from UI messages.
     * @param {string} id - The ID of the message.
     * @param {any[]} [args] - A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message.
     */
    getMessage(id: string, args?: any[]): string;

    /**
     * Gets the value of a Glide property. If the property is not found, returns an alternate value.
     * @param {string} key - The key for the property whose value should be returned.
     * @param {*} [alt] -  Alternate object to return if the property is not found.
     * @returns {string} The value of the Glide property, or the alternate object defined above.
     */
    getProperty(key: string, alt?: any): string;

    /**
     * Gets a reference to the current Glide session.
     * @returns {string} A reference for the current session.
     */
    getSession(): string;

    /**
     * Retrieves the GlideSession session ID.
     * @returns {string} The session ID.
     */
    getSessionID(): string;

    /**
     * This method is no longer available. Instead, use gs.getSession().getSessionToken().
     * @returns {string} The session token.
     */
    getSessionToken(): string;

    /**
     * Returns the name of the time zone associated with the current user.
     * @returns {string} The time zone name.
     */
    getTimeZoneName(): string;

    /**
     * Gets the current URI for the session.
     * @returns {string} The URI.
     */
    getUrlOnStack(): string;

    /**
     * Returns a reference to the scoped GlideUser object for the current user.
     * @returns {GlideUser} Reference to a scoped user object.
     */
    getUser(): GlideUser;

    /**
     * Gets the display name of the current user.
     * @returns {string} The name field of the current user. Returns Abel Tuter, as opposed to abel.tuter.
     */
    getUserDisplayName(): string;

    /**
     * Gets the sys_id of the current user.
     * @returns {string} The sys_id of the current user.
     */
    getUserID(): string;

    /**
     * Gets the user name, or user id, of the current user.
     * @returns {string} The user name of the current user.
     */
    getUserName(): string;

    /**
     * Determines if the current user has the specified role.
     * @param {*} role - The role to check.
     * @returns {boolean} True if the user had the role. Returns true for users with the administrator role.
     */
    hasRole(role: any): boolean;

    /**
     * Returns the date and time for a specified number of hours ago.
     * @param {number} hours - Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    hoursAgo(hours: number): string;

    /**
     * Returns the date and time for the end of the hour a specified number of hours ago.
     * @param {number} hours - Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    hoursAgoEnd(hours: number): string;

    /**
     * Returns the date and time for the start of the hour a specified number of hours ago.
     * @param {number} hours - Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    hoursAgoStart(hours: number): string;

    /**
     * Provides a safe way to call from the sandbox, allowing only trusted scripts to be included.
     * @param {string} name - The name fo the script to include.
     * @returns {boolean} True if the include worked.
     */
    include(name: string): boolean;

    /**
     * Writes an info message to the system log.
     * @param {string} message - The log message with place holders for any variable arguments.
     * @param {*} [param1] - First variable argument.
     * @param {*} [param2] - Second variable argument.
     * @param {*} [param3] - Third variable argument.
     * @param {*} [param4] - Fourth variable argument.
     * @param {*} [param5] - Fifth variable argument.
     */
    info(message: string, param1?: any, param2?: any, param3?: any, param4?: any, param5?: any): void;

    /**
     * Determines if debugging is active for a specific scope.
     * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
     */
    isDebugging(): boolean;

    /**
     * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
     * @returns {boolean} True if the session is interactive.
     */
    isInteractive(): boolean;

    /**
     * Determines if the current user is currently logged in.
     * @returns {boolean} True if the current user is logged in.
     */
    isLoggedIn(): boolean;

    /**
     * You can determine if a request comes from a mobile device.
     * @returns {boolean} True if the request comes from a mobile device; otherwise, false.
     */
    isMobile(): boolean;

    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * @param {number} minutes - Integer number of minutes
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoEnd(minutes: number): string;

    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * @param {number} minutes - Integer number of minutes
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoStart(minutes: number): string;

    /**
     * Returns the date and time for a specified number of months ago.
     * @param {number} months - Integer number of months
     * @returns {string} GMT on today's date of the specified month, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgo(months: number): string;

    /**
     * Returns the date and time for the start of the month a specified number of months ago.
     * @param {number} months - Integer number of months
     * @returns {string} GMT start of the month the specified number of months ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgoStart(months: number): string;

    /**
     * Queries an object and returns true if the object is null, undefined, or contains an empty string.
     * @param {*} o - The object to be checked.
     * @returns {boolean} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
     */
    nil(o: any): o is (undefined | null | "");

    /**
     * Returns the date and time for the last day of the quarter for a specified number of quarters ago.
     * @param {number} quarters - Integer number of quarters
     * @returns {string} GMT end of the quarter that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoEnd(quarters: number): string;

    /**
     * Returns the date and time for the first day of the quarter for a specified number of quarters ago.
     * @param {number} quarters - Integer number of quarters
     * @returns {string} GMT end of the month that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoStart(quarters: number): string;

    /**
     * Sets the specified key to the specified value if the property is within the script's scope.
     * @param {string} key - The key for the property to be set.
     * @param {string} value - The value of the property to be set.
     * @param {string} description - A description of the property.
     */
    setProperty(key: string, value: string, description: string): void;

    /**
     * Sets the redirect URI for this transaction, which then determines the next page the user will see.
     * @param {*} o - URI object or URI string to set as the redirect
     */
    setRedirect(o: any): void;

    /**
     * Determines if a database table exists.
     * @param {string} name - Name of the table to check for existence.
     * @returns {boolean} True if the table exists. False if the table was not found.
     */
    tableExists(name: string): boolean;

    /**
     * Replaces UTF-8 encoded characters with ASCII characters.
     * @param {string} url - A string with UTF-8 percent (%) encoded characters.
     * @returns {string} A string with encoded characters replaced with ASCII characters.
     */
    urlDecode(url: string): string;

    /**
     * Encodes non-ASCII characters, unsafe ASCII characters, and spaces so the returned string can be used on the Internet. Uses UTF-8 encoding. Uses percent (%) encoding.
     * @param {string} url - The string to be encoded.
     * @returns {string} A string with non-ASCII characters, unsafe ASCII characters, and spaces encoded.
     */
    urlEncode(url: string): string;

    /**
     * Writes a warning message to the system log.
     * @param {string} message - The log message with place holders for any variable arguments.
     * @param {*} [param1] - First variable argument.
     * @param {*} [param2] - Second variable argument.
     * @param {*} [param3] - Third variable argument.
     * @param {*} [param4] - Fourth variable argument.
     * @param {*} [param5] - Fifth variable argument.
     */
    warn(message: string, param1?: any, param2?: any, param3?: any, param4?: any, param5?: any): void;

    /**
     * Takes an XML string and returns a JSON object.
     * @param {string} xmlString - The XML string to be converted.
     * @returns {*} A JSON object representing the XML string. Null if unable to process the XML string.
     */
    xmlToJSON(xmlString: string): any;

    /**
     * Returns a date and time for a certain number of years ago.
     * @param {number} years - An integer number of years
     * @returns {string} GMT beginning of the year that is the specified number of years ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    yearsAgo(years: number): string;

    /**
     * Returns yesterday's time (24 hours ago).
     * @returns {string} GMT for 24 hours ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    yesterday(): string;
}

declare class GlideUser {
    /**
     * Returns the current user's company sys_id.
     * @returns {string} Company sys_id.
     */
    getCompanyID(): string;

    /**
     * Returns the current user's display name.
     * @returns {string} User's display name.
     */
    getDisplayName(): string;

    /**
     * Returns the display value of the user's session domain.
     * @returns {string} The display value of the user's session domain.
     */
    getDomainDisplayValue(): string;

    /**
     * Returns the user's email address.
     * @returns {string} User's email address.
     */
    getEmail(): string;

    /**
     * Returns the user's first name.
     * @returns {string} User's first name.
     */
    getFirstName(): string;

    /**
     * Returns the sys_id of the current user.
     * @returns {string} User's sys_id.
     */
    getID(): string;

    /**
     * Returns the user's last name.
     * @returns {string} User's last name.
     */
    getLastName(): string;

    /**
     * Returns an iterator containing the list of all groups to which the user belongs. Only active groups are returned.
     * @returns {Packages.java.util.Iterator<$$rhino.String>} A list of sys_ids for the active groups to which the user belongs.
     */
    getMyGroups(): Packages.java.util.Iterator<$$rhino.String>;

    /**
     * Returns the user ID, or login name, of the current user.
     * @returns {string} User ID or login name.
     */
    getName(): string;

    /**
     * Returns a list of roles that includes explicitly granted roles, inherited roles, and roles acquired by group membership.
     * @returns {Array<*>} List of all roles available to the user.
     */
    getRoles(): any[];

    /**
     * Returns the user object associated with the passed-in user ID (sys_id in sys_user) or user_name.
     * @param {string} id - Unique ID (sys_id) or user_name of the desired user record.
     * @returns {*} User object associated with the specified sys_id or user_name.
     */
    getUserByID(id: string): any;

    /**
     * Returns the list of roles explicitly granted to the user.
     * @returns {Array<*>} List of roles explicitly assigned to the user.
     */
    getUserRoles(): any[];

    /**
     * Determines if the current user has the specified role.
     * @param {string} role - Role to check
     * @returns {boolean} True if the user has the role.
     */
    hasRole(role: string): boolean;

    /**
     * Determines if the current user is a member of the specified group.
     * @param {string} group - Group to check
     * @returns {boolean} True if the user is a member of the group.
     */
    isMemberOf(group: string): boolean;
}

/**
 *
 * @type {("not requested" | "cancelled" | "requested" | "duplicate" | "not_required" | "approved" | "rejected")}
 */
declare type TaskAppproval = "not requested" | "cancelled" | "requested" | "duplicate" | "not_required" | "approved" | "rejected";

/**
 * email=Email; endpoint_security=Endpoint Security; ids_ips=IDS/IPS; network_monitoring=Network Monitoring; phone=Phone; self-service=Self-service; siem=SIEM; virtual_agent=Virtual Agent;
 *      vulnerability_response=Vulnerability Response; walk-in=Walk-in
 * @type {("email" | "endpoint_security" | "ids_ips" | "network_monitoring" | "phone" | "self-service" | "siem" | "virtual_agent" | "vulnerability_response" | "walk-in")}
 */
declare type TaskContactType = "email" | "endpoint_security" | "ids_ips" | "network_monitoring" | "phone" | "self-service" | "siem" | "virtual_agent" | "vulnerability_response" | "walk-in";

/**
 * Task escalation numeric values.
 * @type {(0 | 1 | 2 | 3)} TaskEscalationValue
 */
declare type TaskEscalationValue = 0 | 1 | 2 | 3;

/**
 * JavaScript string values to represent task escalation values.
 * @type {("0" | "1" | "2" | "3)} TaskEscalationString
 */
declare type TaskEscalationString = "0" | "1" | "2" | "3";

/**
 * Task escalation values.
 * @type {(TaskEscalationValue | TaskEscalationString)} TaskEscalation
 */
declare type TaskEscalation = TaskEscalationValue | TaskEscalationString;

/**
 * Represents a numeric 3-value scale (1="1 - High"; 2="2 - Medium"; 3="3 - Low").
 * @summary 3-Value scale for task records.
 * @type {(1 | 2 | 3)} Task3ScaleValue
 */
declare type Task3ScaleValue = 1 | 2 | 3;

/**
 * Represents a 3-value string scale ("1"="1 - High"; "2"="2 - Medium"; "3"="3 - Low").
 * @summary 3-Value scale for task records.
 * @type {("1" | "2" | "3")} Task3ScaleString
 */
declare type Task3ScaleString = "1" | "2" | "3";

/**
 * Represents a 3-value scale (1="1 - High"; 2="2 - Medium"; 3="3 - Low").
 * @summary 3-Value scale for task records.
 * @type {(Task3ScaleValue | Task3ScaleString)} Task3Scale
 */
declare type Task3Scale = Task3ScaleValue | Task3ScaleString;

/**
 * Represents a numeric priority value (1="1 - Critical"; 2="2 - High"; 3="3 - Medium"; 4="4 - Low"; 5="5 - Planning").
 * @summary 5-scale value for task priority.
 * @type {(1 | 2 | 3)} Task3ScaleValue
 */
declare type TaskPriorityValue = 1 | 2 | 3 | 4 | 5;

/**
 * Represents a numeric priority value ("1"="1 - Critical"; "2"="2 - High"; "3"="3 - Medium"; "4"="4 - Low"; "5"="5 - Planning").
 * @summary 5-scale value for task priority.
 * @type {("1" | "2" | "3" | "4" | "5")} TaskPriorityString
 */
declare type TaskPriorityString = "1" | "2" | "3" | "4" | "5";

/**
 * Represents a task priority value (1="1 - Critical"; 2="2 - High"; 3="3 - Medium"; 4="4 - Low"; 5="5 - Planning").
 * @summary 5-scale value for task priority.
 * @type {(TaskPriorityValue | TaskPriorityString)} TaskPriority
 */
declare type TaskPriority = TaskPriorityValue | TaskPriorityString;

/**
 * Represents a numeric task state value (-5="Pending"; 1="Open"; 2="Work in Progress"; 3="Closed Complete"; 4="Closed Incomplete"; 7="Closed Skipped").
 * @summary Task state value.
 * @type {(-5 | 1 | 2 | 3 | 4 | 7)} TaskPriority
 */
declare type TaskStateValue = -5 | 1 | 2 | 3 | 4 | 7;

/**
 * Represents a task state string value ("-5"="Pending"; "1"="Open"; "2"="Work in Progress"; "3"="Closed Complete"; "4"="Closed Incomplete"; "7"="Closed Skipped").
 * @summary Task state value.
 * @type {("-5" | "1" | "2" | "3" | "4" | "7")} TaskPriority
 */
declare type TaskStateString = "-5" | "1" | "2" | "3" | "4" | "7";

/**
 * Represents a task state value (-5="Pending"; 1="Open"; 2="Work in Progress"; 3="Closed Complete"; 4="Closed Incomplete"; 7="Closed Skipped").
 * @summary Task state value.
 * @type {(TaskStateValue | TaskStateString)} TaskState
 */
declare type TaskState = TaskStateValue | TaskStateString;

/**
 * Represents an incident close code value.
 * @type {("Solved (Work Around)" | "Solved (Permanently)" | "Solved Remotely (Work Around)" | "Solved Remotely (Permanently)" | "Not Solved (Not Reproducible)" | "Not Solved (Too Costly)" |
 *      "Closed/Resolved by Caller")}
 */
declare type IncidentCloseCode = "Solved (Work Around)" | "Solved (Permanently)" | "Solved Remotely (Work Around)" | "Solved Remotely (Permanently)" | "Not Solved (Not Reproducible)" |
    "Not Solved (Too Costly)" | "Closed/Resolved by Caller";

/**
 * Represents a numeric incident on-hold reason value (1="Awaiting Caller"; 5="Awaiting Change"; 3="Awaiting Problem"; 4="Awaiting Vendor").
 * @summary Incident on-hold reason value
 * @type {(1 | 5 | 3 | 4)} IncidentHoldReasonValue
 */
declare type IncidentHoldReasonValue = 1 | 5 | 3 | 4;

/**
 * Represents an incident on-hold reason string value ("1"="Awaiting Caller"; "5"="Awaiting Change"; "3"="Awaiting Problem"; "4"="Awaiting Vendor").
 * @summary Incident on-hold reason value
 * @type {("1" | "5" | "3" | "4")} IncidentHoldReasonString
 */
declare type IncidentHoldReasonString = "1" | "5" | "3" | "4";

/**
 * Represents an incident on-hold reason value (1="Awaiting Caller"; 5="Awaiting Change"; 3="Awaiting Problem"; 4="Awaiting Vendor").
 * @summary Incident on-hold reason value
 * @type {(IncidentHoldReasonValue | IncidentHoldReasonString)} IncidentHoldReason
 */
declare type IncidentHoldReason = IncidentHoldReasonValue | IncidentHoldReasonString;

/**
 * Represents a numeric incident state value (1="New"; 2="In Progress"; 3="On Hold"; 6="Resolved"; 7="Closed"; 8="Canceled").
 * @summary Incident state value.
 * @type {(1 | 2 | 3 | 6 | 7 | 8)} IncidentStateValue
 */
declare type IncidentStateValue = 1 | 2 | 3 | 6 | 7 | 8;

/**
 * Represents an incident state string value ("1"="New"; "2"="In Progress"; "3"="On Hold"; "6"="Resolved"; "7"="Closed"; "8"="Canceled").
 * @summary Incident state value.
 * @type {("1" | "2" | "3" | "6" | "7" | "8")} IncidentStateString
 */
declare type IncidentStateString = "1" | "2" | "3" | "6" | "7" | "8";

/**
 * Represents an incident state value (1="New"; 2="In Progress"; 3="On Hold"; 6="Resolved"; 7="Closed"; 8="Canceled").
 * @summary Incident state value.
 * @type {(IncidentStateValue | IncidentStateString)} IncidentState
 */
declare type IncidentState = IncidentStateValue | IncidentStateString;

/**
 * Numeric incident notify value.
 * @type {(1 | 2 | 3)} IncidentNotifyValue
 */
declare type IncidentNotifyValue = 1 | 2 | 3;

/**
 * Incident notify string value.
 * @type {("1" | "2" | "3")} IncidentNotifyString
 */
declare type IncidentNotifyString = "1" | "2" | "3";

/**
 * Incident notify value.
 * @type {(IncidentNotifyValue | IncidentNotifyString)} IncidentNotify
 */
declare type IncidentNotify = IncidentNotifyValue | IncidentNotifyString;

/**
 * Represents a numeric change review status value (1="Success"; 2="Fail").
 * @summary Change review status value.
 * @type {(1 | 2)} ChangeReviewStatusValue
 */
declare type ChangeReviewStatusValue = 1 | 2;

/**
 * Represents a change review status string value ("1"="Success"; "2"="Fail").
 * @summary Change review status value.
 * @type {("1" | "2")} ChangeReviewStatusString
 */
declare type ChangeReviewStatusString = "1" | "2";

/**
 * Represents a change review status value (1="Success"; 2="Fail").
 * @summary Change review status value.
 * @type {(ChangeReviewStatusValue | ChangeReviewStatusString)} ChangeReviewStatus
 */
declare type ChangeReviewStatus = ChangeReviewStatusValue | ChangeReviewStatusString;

/**
 * Represents a numeric change risk value (2="High"; 3="Moderate"; 4="Low").
 * @summary Change risk value.
 * @type {(2 | 3 | 4)} ChangeRiskValue
 */
declare type ChangeRiskValue = 2 | 3 | 4;

/**
 * Represents a change risk string value ("2"="High"; "3"="Moderate"; "4"="Low").
 * @summary Change risk value.
 * @type {("2" | "3" | "4")} ChangeRiskString
 */
declare type ChangeRiskString = "2" | "3" | "4";

/**
 * Represents a change risk value (2="High"; 3="Moderate"; 4="Low").
 * @summary Change risk value.
 * @type {(ChangeRiskValue | ChangeRiskString)} ChangeRisk
 */
declare type ChangeRisk = ChangeRiskValue | ChangeRiskString;

/**
 * Represents a change scope value (1="Massive"; 2="Large"; 3="Medium"; 4="Small"; 5="Tiny").
 * @summary Change scope value.
 * @type {(1 | 2 | 3 | 4 | 5)} ChangeScopeValue
 */
declare type ChangeScopeValue = 1 | 2 | 3 | 4 | 5;

/**
 * Represents a change scope value (1="Massive"; 2="Large"; 3="Medium"; 4="Small"; 5="Tiny").
 * @summary Change scope value.
 * @type {("1" | "2" | "3" | "4" | "5")} ChangeScopeString
 */
declare type ChangeScopeString = "1" | "2" | "3" | "4" | "5";

/**
 * Represents a change scope value (1="Massive"; 2="Large"; 3="Medium"; 4="Small"; 5="Tiny").
 * @summary Change scope value.
 * @type {(ChangeScopeValue | ChangeScopeString)} ChangeScope
 */
declare type ChangeScope = ChangeScopeValue | ChangeScopeString;

/**
 * Change type value.
 * @type {("standard" | "normal" | "emergency")} IncidentHoldReason
 */
declare type ChangeType = "standard" | "normal" | "emergency";

/**
 * Represents a change close code ("successful"="Successful"; "successful_issues"="Successful with issues"; "unsuccessful"="Unsuccessful").
 * @summary Change close code.
 * @type {("successful" | "successful_issues" | "unsuccessful")}
 */
declare type ChangeCloseCode = "successful" | "successful_issues" | "unsuccessful";

/**
 * Reprsents a problem state value (1="Open"; 3="Pending Change"; 2="Known Error"; 4="Closed/Resolved").
 * @summary Problem state value.
 * @type {(1 | 3 | 2 | 4)} ProblemStateValue
 */
declare type ProblemStateValue = 1 | 3 | 2 | 4;

/**
 * Reprsents a problem state value (1="Open"; 3="Pending Change"; 2="Known Error"; 4="Closed/Resolved").
 * @summary Problem state value.
 * @type {("1" | "3" | "2" | "4")} ProblemStateString
 */
declare type ProblemStateString = "1" | "3" | "2" | "4";

/**
 * Reprsents a problem state value (1="Open"; 3="Pending Change"; 2="Known Error"; 4="Closed/Resolved").
 * @summary Problem state value.
 * @type {(ProblemStateValue | ProblemStateString)} ProblemState
 */
declare type ProblemState = ProblemStateValue | ProblemStateString;

/**
 * Glide progress worker state value.
 * @type {("starting" | "running" | "complete" | "cancelled" | "unknown")}
 */
declare type GlideProgressWorkerState = "starting" | "running" | "complete" | "cancelled" | "unknown";

/**
 * Glide worker process completion code.
 * @type {("success" | "cancelled" | "error")}
 */
declare type GlideProgressWorkerCompletionCode = "success" | "cancelled" | "error";

/**
 * Represents a request state value ("requested"="Pending Approval"; "in_process"="Approved"; "closed_complete"="Closed Complete"; "closed_incomplete"="Closed Incomplete"; "closed_cancelled"="Closed Cancelled";
 *      "closed_rejected"="Closed Rejected"; "closed_skipped"="Closed Skipped").
 * @summary Request state value.
 * @type {("requested" | "in_process" | "closed_complete" | "closed_incomplete" | "closed_cancelled" | "closed_rejected" | "closed_skipped")}
 */
declare type IRequestState = "requested" | "in_process" | "closed_complete" | "closed_incomplete" | "closed_cancelled" | "closed_rejected" | "closed_skipped";

/**
 * Fields common to all tables.
 * @interface IGlideTableProperties
 */
declare interface IGlideTableProperties {
    /**
     * Created by
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_created_by: $$rhino.Nilable<$$property.Element>;

    /**
     * Created
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    sys_created_on: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Sys ID field. Internal type is "GUID".
     * @summary Sys ID.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_id: $$rhino.Nilable<$$property.Element>;

    /**
     * Updates
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    sys_mod_count: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Updated by
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_updated_by: $$rhino.Nilable<$$property.Element>;

    /**
     * Updated
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    sys_updated_on: $$rhino.Nilable<$$property.GlideObject>;
}

/**
 * Fields common to all extendable tables.
 * @interface IExtendedGlideTableProperties
 * @extends {}
 */
declare interface IExtendedGlideTableProperties extends IGlideTableProperties {
    /**
     * Class
     * @type {$$rhino.Nilable<$$property.SysClassName>}
     */
    sys_class_name: $$rhino.Nilable<$$property.SysClassName>;
}

/**
 * GlideElement values from the Application File table.
 * @interface sys_metadataFields
 * @extends {IExtendedGlideTableProperties}
 */
declare interface sys_metadataFields extends IExtendedGlideTableProperties {
    /**
     * Display name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Package reference field. Refers to sys_package (Package).
     * @summary Package.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_packageFields, sys_packageGlideRecord>>}
     */
    sys_package: $$rhino.Nilable<$$property.generic.Reference<sys_packageFields, sys_packageGlideRecord>>;

    /**
     * Protection policy
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_policy: $$rhino.Nilable<$$property.Element>;

    /**
     * Application reference field. Refers to sys_scope (Application).
     * @summary Application.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_scopeFields, sys_scopeGlideRecord>>}
     */
    sys_scope: $$rhino.Nilable<$$property.generic.Reference<sys_scopeFields, sys_scopeGlideRecord>>;

    /**
     * Update name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_update_name: $$rhino.Nilable<$$property.Element>;
}

declare type sys_metadataGlideRecord = GlideRecord & sys_metadataFields;

/**
 * GlideElement values from the Table table.
 * @interface sys_db_objectFields
 * @extends {sys_metadataFields}
 */
declare interface sys_db_objectFields extends sys_metadataFields {
    /**
     * Accessible from
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    access: $$rhino.Nilable<$$property.Element>;

    /**
     * Allow UI actions
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    actions_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Allow new fields
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    alter_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Caller Access
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    caller_access: $$rhino.Nilable<$$property.Element>;

    /**
     * Allow client scripts
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    client_scripts_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Allow configuration
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    configuration_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Can create
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    create_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Create access controls
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    create_access_controls: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Can delete
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    delete_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Extension model
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    extension_model: $$rhino.Nilable<$$property.Element>;

    /**
     * Extensible
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    is_extendable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Label
     * @type {$$rhino.Nilable<$$property.Documentation>}
     */
    label: $$rhino.Nilable<$$property.Documentation>;

    /**
     * Live feed
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    live_feed_enabled: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Auto number field. Refers to sys_number (Number).
     * @summary Auto number.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_numberFields, sys_numberGlideRecord>>}
     */
    number_ref: $$rhino.Nilable<$$property.generic.Reference<sys_numberFields, sys_numberGlideRecord>>;

    /**
     * Provider class
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    provider_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Can read
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    read_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Table being extended. Refers to sys_db_object (Table).
     * @summary Extends table.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>}
     */
    super_class: $$rhino.Nilable<$$property.generic.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>;

    /**
     * Sys class code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_class_code: $$rhino.Nilable<$$property.Element>;

    /**
     * Sys class path
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_class_path: $$rhino.Nilable<$$property.Element>;

    /**
     * Can update
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    update_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * User roles field. Refers to sys_user_role (Role).
     * @summary User role.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_roleFields, sys_user_roleGlideRecord>>}
     */
    user_role: $$rhino.Nilable<$$property.generic.Reference<sys_user_roleFields, sys_user_roleGlideRecord>>;

    /**
     * Allow access to this table via web services
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    ws_access: $$rhino.Nilable<$$property.Boolean>;
}

declare type sys_db_objectGlideRecord = sys_metadataGlideRecord & sys_db_objectFields;

/**
 * GlideElement values from the Dictionary Entry table.
 * @interface sys_dictionaryFields
 * @extends {sys_metadataFields}
 */
declare interface sys_dictionaryFields extends sys_metadataFields {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Array
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    array: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Array denormalized
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    array_denormalized: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Attributes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    attributes: $$rhino.Nilable<$$property.Element>;

    /**
     * Audit
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    audit: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Calculation
     * @type {$$rhino.Nilable<$$property.Script>}
     */
    calculation: $$rhino.Nilable<$$property.Script>;

    /**
     * Choice
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    choice: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Choice field
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    choice_field: $$rhino.Nilable<$$property.Element>;

    /**
     * Choice table
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    choice_table: $$rhino.Nilable<$$property.Element>;

    /**
     * Column label
     * @type {$$rhino.Nilable<$$property.Documentation>}
     */
    column_label: $$rhino.Nilable<$$property.Documentation>;

    /**
     * Comments
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    comments: $$rhino.Nilable<$$property.Element>;

    /**
     * Create roles
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    create_roles: $$rhino.Nilable<$$property.Element>;

    /**
     * Defaultsort
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    defaultsort: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Default value
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    default_value: $$rhino.Nilable<$$property.Element>;

    /**
     * Delete roles
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    delete_roles: $$rhino.Nilable<$$property.Element>;

    /**
     * Dependent
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    dependent: $$rhino.Nilable<$$property.Element>;

    /**
     * Dependent on field
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    dependent_on_field: $$rhino.Nilable<$$property.Element>;

    /**
     * Display
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    display: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Dynamic creation
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    dynamic_creation: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Dynamic creation script
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    dynamic_creation_script: $$rhino.Nilable<$$property.Element>;

    /**
     * Dynamic default value field. Refers to sys_filter_option_dynamic (Dynamic Filter Options).
     * @summary Dynamic default value.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    dynamic_default_value: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Dynamic ref qual field. Refers to sys_filter_option_dynamic (Dynamic Filter Options).
     * @summary Dynamic ref qual.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    dynamic_ref_qual: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Column name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    element: $$rhino.Nilable<$$property.Element>;

    /**
     * Element reference
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    element_reference: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Foreign database
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    foreign_database: $$rhino.Nilable<$$property.Element>;

    /**
     * Function definition
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    function_definition: $$rhino.Nilable<$$property.Element>;

    /**
     * Function field
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    function_field: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Type field. Refers to sys_glide_object (Field class).
     * @summary Type.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_glide_objectFields, sys_glide_objectGlideRecord>>}
     */
    internal_type: $$rhino.Nilable<$$property.generic.Reference<sys_glide_objectFields, sys_glide_objectGlideRecord>>;

    /**
     * Mandatory
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    mandatory: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Max length
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    max_length: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Table
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Next element
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    next_element: $$rhino.Nilable<$$property.Element>;

    /**
     * Primary
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    primary: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Read only
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    read_only: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Read roles
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    read_roles: $$rhino.Nilable<$$property.Element>;

    /**
     * Reference field. Refers to sys_db_object (Table).
     * @summary Reference.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>}
     */
    reference: $$rhino.Nilable<$$property.generic.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>;

    /**
     * Reference cascade rule
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reference_cascade_rule: $$rhino.Nilable<$$property.Element>;

    /**
     * Reference floats
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    reference_floats: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Reference key
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reference_key: $$rhino.Nilable<$$property.Element>;

    /**
     * Reference qual
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reference_qual: $$rhino.Nilable<$$property.Element>;

    /**
     * Reference qual condition
     * @type {$$rhino.Nilable<$$property.Conditions>}
     */
    reference_qual_condition: $$rhino.Nilable<$$property.Conditions>;

    /**
     * Reference type
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reference_type: $$rhino.Nilable<$$property.Element>;

    /**
     * Sizeclass
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    sizeclass: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Spell check
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    spell_check: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Staged
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    staged: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Table reference
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    table_reference: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Text index
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    text_index: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Unique
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    unique: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Use dependent field
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    use_dependent_field: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Use dynamic default
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    use_dynamic_default: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Use reference qualifier
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    use_reference_qualifier: $$rhino.Nilable<$$property.Element>;

    /**
     * Calculated
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    virtual: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Widget
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    widget: $$rhino.Nilable<$$property.Element>;

    /**
     * Write roles
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    write_roles: $$rhino.Nilable<$$property.Element>;

    /**
     * XML view
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    xml_view: $$rhino.Nilable<$$property.Boolean>;
}

declare type sys_dictionaryGlideRecord = sys_metadataGlideRecord & sys_dictionaryFields;

/**
 * GlideElement values from the Field class table.
 * @interface sys_glide_objectFields
 * @extends {sys_metadataFields}
 */
declare interface sys_glide_objectFields extends sys_metadataFields {
    /**
     * Attributes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    attributes: $$rhino.Nilable<$$property.Element>;

    /**
     * Class name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    class_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Label
     * @type {$$rhino.Nilable<$$property.TranslatedField>}
     */
    label: $$rhino.Nilable<$$property.TranslatedField>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Length
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    scalar_length: $$rhino.Nilable<$$property.Element>;

    /**
     * Extends
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    scalar_type: $$rhino.Nilable<$$property.Element>;

    /**
     * Use original value
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    use_original_value: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Visible
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    visible: $$rhino.Nilable<$$property.Boolean>;
}

declare type sys_glide_objectGlideRecord = sys_metadataGlideRecord & sys_glide_objectFields;

/**
 * GlideElement values from the Number table.
 * @interface sys_numberFields
 * @extends {sys_metadataFields}
 */
declare interface sys_numberFields extends sys_metadataFields {
    /**
     * Table field. Refers to sys_db_object (Table).
     * @summary Table.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>}
     */
    category: $$rhino.Nilable<$$property.generic.Reference<sys_db_objectFields, sys_db_objectGlideRecord>>;

    /**
     * Number of digits
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    maximum_digits: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Number
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    number: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Prefix
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    prefix: $$rhino.Nilable<$$property.Element>;
}

declare type sys_numberGlideRecord = sys_metadataGlideRecord & sys_numberFields;

/**
 * GlideElement values from the Number table.
 * @interface sys_choiceFields
 * @extends {IGlideTableProperties}
 */
declare interface sys_choiceFields extends IGlideTableProperties {
    /**
     * Dependent value
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    dependent_value: $$rhino.Nilable<$$property.Element>;

    /**
     * Element
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    element: $$rhino.Nilable<$$property.Element>;

    /**
     * Hint
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    hint: $$rhino.Nilable<$$property.Element>;

    /**
     * Inactive
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    inactive: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Label
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    label: $$rhino.Nilable<$$property.Element>;

    /**
     * Language
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    language: $$rhino.Nilable<$$property.Element>;

    /**
     * Table
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Sequence
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    sequence: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Domain
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Domain Path
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain_path: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Value
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    value: $$rhino.Nilable<$$property.Element>;
}

declare type sys_choiceGlideRecord = GlideRecord & sys_choiceFields;

/**
 * GlideElement values from the Dictionary Entry Override table.
 * @interface sys_dictionary_overrideFields
 * @extends {sys_metadataFields}
 */
declare interface sys_dictionary_overrideFields extends sys_metadataFields {
    /**
     * Attributes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    attributes: $$rhino.Nilable<$$property.Element>;

    /**
     * Override attributes
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    attributes_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Base table
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    base_table: $$rhino.Nilable<$$property.Element>;

    /**
     * Calculation
     * @type {$$rhino.Nilable<$$property.Script>}
     */
    calculation: $$rhino.Nilable<$$property.Script>;

    /**
     * Override calculation
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    calculation_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Default value
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    default_value: $$rhino.Nilable<$$property.Element>;

    /**
     * Override default value
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    default_value_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Dependent
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    dependent: $$rhino.Nilable<$$property.Element>;

    /**
     * Override dependent
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    dependent_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Override display value
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    display_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Column name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    element: $$rhino.Nilable<$$property.Element>;

    /**
     * Mandatory
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    mandatory: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Override mandatory
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    mandatory_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Table
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Read only
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    read_only: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Override read only
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    read_only_override: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Reference qual
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reference_qual: $$rhino.Nilable<$$property.Element>;

    /**
     * Override reference qualifier
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    reference_qual_override: $$rhino.Nilable<$$property.Boolean>;
}

declare type sys_dictionary_overrideGlideRecord = sys_metadataGlideRecord & sys_dictionary_overrideFields;

/**
 * GlideElement values from the Package table.
 * @interface sys_packageFields
 * @extends {IExtendedGlideTableProperties}
 */
declare interface sys_packageFields extends IExtendedGlideTableProperties {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Subscription requirement
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    enforce_license: $$rhino.Nilable<$$property.Element>;

    /**
     * Licensable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    licensable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Subscription Category
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    license_category: $$rhino.Nilable<$$property.Element>;

    /**
     * Subscription Model
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    license_model: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * ID
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    source: $$rhino.Nilable<$$property.Element>;

    /**
     * Trackable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    trackable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Version
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    version: $$rhino.Nilable<$$property.Element>;
}

declare type sys_packageGlideRecord = GlideRecord & sys_packageFields;

/**
 * GlideElement values from the Application table.
 * @interface sys_scopeFields
 * @extends {sys_packageFields}
 */
declare interface sys_scopeFields extends sys_packageFields {
    /**
     * JavaScript Mode
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    js_level: $$rhino.Nilable<$$property.Element>;

    /**
     * Logo
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    logo: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Private
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    private: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Restrict Table Choices
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    restrict_table_access: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Runtime Access Tracking
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    runtime_access_tracking: $$rhino.Nilable<$$property.Element>;

    /**
     * Scope
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    scope: $$rhino.Nilable<$$property.Element>;

    /**
     * Application administration
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    scoped_administration: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Short description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    short_description: $$rhino.Nilable<$$property.Element>;

    /**
     * Template
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    template: $$rhino.Nilable<$$property.Element>;

    /**
     * Vendor
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    vendor: $$rhino.Nilable<$$property.Element>;

    /**
     * Vendor prefix
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    vendor_prefix: $$rhino.Nilable<$$property.Element>;
}

declare type sys_scopeGlideRecord = sys_packageGlideRecord & sys_scopeFields;

/**
 * GlideElement values from the Role table.
 * @interface sys_user_roleFields
 * @extends {sys_metadataFields}
 */
declare interface sys_user_roleFields extends sys_metadataFields {
    /**
     * Assignable by field. Refers to sys_user_role (Role).
     * @summary Assignable by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_roleFields, sys_user_roleGlideRecord>>}
     */
    assignable_by: $$rhino.Nilable<$$property.generic.Reference<sys_user_roleFields, sys_user_roleGlideRecord>>;

    /**
     * Can delegate
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    can_delegate: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Elevated privilege
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    elevated_privilege: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Encryption context field. Refers to sys_encryption_context (Encryption Context)
     * @summary Encryption context
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_encryption_contextFields, sys_encryption_contextGlideRecord>>}
     */
    encryption_context: $$rhino.Nilable<$$property.generic.Reference<sys_encryption_contextFields, sys_encryption_contextGlideRecord>>;

    /**
     * Grantable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    grantable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Includes roles
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    includes_roles: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Requires Subscription
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    requires_subscription: $$rhino.Nilable<$$property.Element>;

    /**
     * Application Administrator
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    scoped_admin: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Suffix
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    suffix: $$rhino.Nilable<$$property.Element>;
}

declare type sys_user_roleGlideRecord = sys_metadataGlideRecord & sys_user_roleFields;

/**
 * GlideElement values from the Encryption Context table.
 * @interface sys_encryption_contextFields
 * @extends {sys_metadataFields}
 */
declare interface sys_encryption_contextFields extends sys_metadataFields {
    /**
     * Encryption key
     * @type {$$rhino.Nilable<$$property.Password2>}
     */
    encryption_key: $$rhino.Nilable<$$property.Password2>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    type: $$rhino.Nilable<$$property.Element>;
}

declare type sys_encryption_contextGlideRecord = sys_metadataGlideRecord & sys_encryption_contextFields;

/**
 * GlideElement values from the Calendar table.
 * @interface sys_calendarFields
 * @extends {sys_metadataFields}
 */
declare interface sys_calendarFields extends sys_metadataFields {
    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;
}

declare type sys_calendarGlideRecord = sys_metadataGlideRecord & sys_calendarFields;

/**
 * GlideElement values from the Agreement table.
 * @interface slaFields
 * @extends {IGlideTableProperties}
 */
declare interface slaFields extends IGlideTableProperties {
    /**
     * Accountable user field. Refers to sys_user (User).
     * @summary Accountable user
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    accountable_user: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Avail pct field. Internal type is "decimal".
     * @summary Avail pct.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    avail_pct: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Begins field. Internal type is "glide_date".
     * @summary Begins.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    begins: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Business lead field. Refers to sys_user (User).
     * @summary Business lead.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    business_lead: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Business unit
     * @type {$$rhino.Nilable<$$property.generic.Element<("Operations" | "Sales")>>}
     */
    business_unit: $$rhino.Nilable<$$property.generic.Element<("Operations" | "Sales")>>;

    /**
     * Calendar field. Refers to sys_calendar (Calendar).
     * @summary Calendar.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_calendarFields, sys_calendarGlideRecord>>}
     */
    calendar: $$rhino.Nilable<$$property.generic.Reference<sys_calendarFields, sys_calendarGlideRecord>>;

    /**
     * Change procedures field. Internal type is "html".
     * @summary Change procedures.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    change_procedures: $$rhino.Nilable<$$property.Element>;

    /**
     * Consultant user field. Refers to sys_user (User).
     * @summary Consultant user.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    consultant_user: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Contract field. Refers to ast_contract (Contract).
     * @summary Contract.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    contract: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Department field. Refers to cmn_department (Department).
     * @summary Department.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
     */
    department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Description field. Internal type is "html".
     * @summary Description.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Disaster recovery field. Internal type is "html".
     * @summary Disaster recovery.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    disaster_recovery: $$rhino.Nilable<$$property.Element>;

    /**
     * Ends field. Internal type is "glide_date".
     * @summary Ends.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    ends: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Functional area
     * @type {$$rhino.Nilable<$$property.generic.Element<("Data Management" | "Network" | "Security")>>}
     */
    functional_area: $$rhino.Nilable<$$property.generic.Element<("Data Management" | "Network" | "Security")>>;

    /**
     * Incident procedures field. Internal type is "html".
     * @summary Incident procedures.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    incident_procedures: $$rhino.Nilable<$$property.Element>;

    /**
     * Informed user field. Refers to sys_user (User).
     * @summary Informed user.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    informed_user: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Maintenance field. Refers to sys_calendar (Calendar).
     * @summary Maintenance.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_calendarFields, sys_calendarGlideRecord>>}
     */
    maintenance: $$rhino.Nilable<$$property.generic.Reference<sys_calendarFields, sys_calendarGlideRecord>>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Next review field. Internal type is "glide_date".
     * @summary Next review.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    next_review: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Notes field. Internal type is "html".
     * @summary Notes.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    notes: $$rhino.Nilable<$$property.Element>;

    /**
     * Number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    number: $$rhino.Nilable<$$property.Element>;

    /**
     * Reponsibilities field. Internal type is "html".
     * @summary Reponsibilities.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reponsibilities: $$rhino.Nilable<$$property.Element>;

    /**
     * Response time field. Internal type is "decimal".
     * @summary Response time.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    response_time: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Responsible user field. Refers to sys_user (User).
     * @summary Responsible user.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    responsible_user: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Security notes field. Internal type is "html".
     * @summary Security notes.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    security_notes: $$rhino.Nilable<$$property.Element>;

    /**
     * Service goals field. Internal type is "html".
     * @summary Service goals.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    service_goals: $$rhino.Nilable<$$property.Element>;

    /**
     * Short description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    short_description: $$rhino.Nilable<$$property.Element>;

    /**
     * Signatures field. Internal type is "html".
     * @summary Signatures.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    signatures: $$rhino.Nilable<$$property.Element>;

    /**
     * Technical lead field. Refers to sys_user (User).
     * @summary Technical lead.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    technical_lead: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Transaction load field. Internal type is "decimal".
     * @summary Transaction load.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    transaction_load: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Users field. Refers to sys_user_group (Group).
     * @summary Users.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    users: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;
}

declare type slaGlideRecord = GlideRecord & slaFields;

/**
 * GlideElement values from the Task table.
 * @interface taskFields
 * @extends {IExtendedGlideTableProperties}
 */
declare interface taskFields extends IExtendedGlideTableProperties {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Activity due field. Internal type is "due_date".
     * @summary Activity due.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    activity_due: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Additional assignee list field. Internal type is "glide_list".
     * @summary Additional assignee list.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    additional_assignee_list: $$rhino.Nilable<IGlideElement>;

    /**
     * Approval
     * @type {$$rhino.Nilable<$$property.generic.Element<TaskAppproval>>}
     */
    approval: $$rhino.Nilable<$$property.generic.Element<TaskAppproval>>;

    /**
     * Approval history field. Internal type is "journal".
     * @summary Approval history.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    approval_history: $$rhino.Nilable<IGlideElement>;

    /**
     * Approval set
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    approval_set: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Assigned to field. Refers to sys_user (User).
     * @summary Assigned to.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    assigned_to: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Assignment group field. Refers to sys_user_group (Group).
     * @summary Assignment group.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    assignment_group: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Business duration field. Internal type is "glide_duration".
     * @summary Business duration.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    business_duration: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Business service field. Refers to cmdb_ci_service (Business Service).
     * @summary Business service.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ci_serviceFields, cmdb_ci_serviceGlideRecord>>}
     */
    business_service: $$rhino.Nilable<$$property.generic.Reference<cmdb_ci_serviceFields, cmdb_ci_serviceGlideRecord>>;

    /**
     * Duration field. Internal type is "glide_duration".
     * @summary Duration.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    calendar_duration: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Closed
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    closed_at: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Closed by field. Refers to sys_user (User).
     * @summary Closed by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    closed_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Close notes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    close_notes: $$rhino.Nilable<$$property.Element>;

    /**
     * Configuration item field. Refers to cmdb_ci (Configuration Item).
     * @summary Configuration item.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>}
     */
    cmdb_ci: $$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>;

    /**
     * Additional comments field. Internal type is "journal_input".
     * @summary Additional comments.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    comments: $$rhino.Nilable<IGlideElement>;

    /**
     * Comments and Work notes field. Internal type is "journal_list".
     * @summary Comments and Work notes.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    comments_and_work_notes: $$rhino.Nilable<IGlideElement>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Contact type
     * @type {$$rhino.Nilable<$$property.generic.Element<TaskContactType>>}
     */
    contact_type: $$rhino.Nilable<$$property.generic.Element<TaskContactType>>;

    /**
     * Contract field. Refers to ast_contract (Contract).
     * @summary Contract.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    contract: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Correlation display
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    correlation_display: $$rhino.Nilable<$$property.Element>;

    /**
     * Correlation ID
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    correlation_id: $$rhino.Nilable<$$property.Element>;

    /**
     * delivery_plan field. Refers to sc_cat_item_delivery_plan (Execution Plan).
     * @summary delivery_plan.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    delivery_plan: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Delivery task field. Refers to sc_cat_item_delivery_task (Execution Plan Task).
     * @summary Delivery task.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    delivery_task: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Due date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    due_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Escalation
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    escalation: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Expected start
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    expected_start: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Follow up
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    follow_up: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Group list field. Internal type is "glide_list".
     * @summary Group list.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    group_list: $$rhino.Nilable<IGlideElement>;

    /**
     * Impact
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    impact: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Knowledge
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    knowledge: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Made SLA
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    made_sla: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    number: $$rhino.Nilable<$$property.Element>;

    /**
     * Opened
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    opened_at: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Opened by field. Refers to sys_user (User).
     * @summary Opened by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    opened_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Order
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    order: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Parent field. Refers to task (Task).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>;

    /**
     * Priority
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    priority: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Reassignment count
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    reassignment_count: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Rejection goto field. Refers to task (Task).
     * @summary Rejection goto.
     * @type {$$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>}
     */
    rejection_goto: $$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>;

    /**
     * Service offering field. Refers to service_offering (Service Offering).
     * @summary Service offering.
     * @type {$$rhino.Nilable<$$property.generic.Reference<service_offeringFields, service_offeringGlideRecord>>}
     */
    service_offering: $$rhino.Nilable<$$property.generic.Reference<service_offeringFields, service_offeringGlideRecord>>;

    /**
     * Short description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    short_description: $$rhino.Nilable<$$property.Element>;

    /**
     * Skills field. Internal type is "glide_list".
     * @summary Skills.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    skills: $$rhino.Nilable<IGlideElement>;

    /**
     * SLA due field. Internal type is "due_date".
     * @summary SLA due.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    sla_due: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * State
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    state: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Domain
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Domain Path field. Internal type is "domain_path".
     * @summary Domain Path.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_domain_path: $$rhino.Nilable<$$property.Element>;

    /**
     * Time worked field. Internal type is "timer".
     * @summary Time worked.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    time_worked: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Upon approval field ("proceed"="Proceed to Next Task"; "do_nothing"="Wait for a User to Close this task").
     * @summary Upon approval.
     * @type {$$rhino.Nilable<$$property.generic.Element<("proceed" | "do_nothing")>>}
     */
    upon_approval: $$rhino.Nilable<$$property.generic.Element<("proceed" | "do_nothing")>>;

    /**
     * Upon reject field ("cancel"="Cancel all future Tasks"; "goto"="Go to a previous Task").
     * @summary Upon reject.
     * @type {$$rhino.Nilable<$$property.generic.Element<("cancel" | "goto")>>}
     */
    upon_reject: $$rhino.Nilable<$$property.generic.Element<("cancel" | "goto")>>;

    /**
     * Urgency
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    urgency: $$rhino.Nilable<$$property.Numeric>;

    /**
     * User input field. Internal type is "user_input".
     * @summary User input.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    user_input: $$rhino.Nilable<IGlideElement>;

    /**
     * Variables
     * @type {$$rhino.Nilable<$$property.Variables>}
     */
    variables: $$rhino.Nilable<$$property.Variables>;

    /**
     * Watch list field. Internal type is "glide_list".
     * @summary Watch list.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    watch_list: $$rhino.Nilable<IGlideElement>;

    /**
     * Workflow activity field. Refers to wf_activity (Workflow Activity).
     * @summary Workflow activity.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    wf_activity: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Actual end
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    work_end: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Work notes field. Internal type is "journal_input".
     * @summary Work notes.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    work_notes: $$rhino.Nilable<IGlideElement>;

    /**
     * Work notes list field. Internal type is "glide_list".
     * @summary Work notes list.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    work_notes_list: $$rhino.Nilable<IGlideElement>;

    /**
     * Actual start
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    work_start: $$rhino.Nilable<$$property.GlideObject>;
}

declare type taskGlideRecord = GlideRecord & taskFields;

/**
 * GlideElement values from the Incident table.
 * @interface incidentFields
 * @extends {taskFields}
 */
declare interface incidentFields extends taskFields {
    /**
     * Business resolve time
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    business_stc: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Resolve time
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    calendar_stc: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Caller field. Refers to sys_user (User).
     * @summary Caller.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    caller_id: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Category
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    category: $$rhino.Nilable<$$property.Element>;

    /**
     * Caused by Change field. Refers to change_request (Change Request).
     * @summary Caused by Change.
     * @type {$$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>}
     */
    caused_by: $$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>;

    /**
     * Child Incidents
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    child_incidents: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Close code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    close_code: $$rhino.Nilable<$$property.Element>;

    /**
     * On hold reason
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    hold_reason: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Incident state
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    incident_state: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Notify
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    notify: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Parent Incident field. Refers to incident (Incident).
     * @summary Parent Incident.
     * @type {$$rhino.Nilable<$$property.generic.Reference<incidentFields, incidentGlideRecord>>}
     */
    parent_incident: $$rhino.Nilable<$$property.generic.Reference<incidentFields, incidentGlideRecord>>;

    /**
     * Problem field. Refers to problem (Problem).
     * @summary Problem.
     * @type {$$rhino.Nilable<$$property.generic.Reference<problemFields, problemGlideRecord>>}
     */
    problem_id: $$rhino.Nilable<$$property.generic.Reference<problemFields, problemGlideRecord>>;

    /**
     * Last reopened by field. Refers to sys_user (User).
     * @summary Last reopened by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    reopened_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Last reopened at
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    reopened_time: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Reopen count
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    reopen_count: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Resolved
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    resolved_at: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Resolved by field. Refers to sys_user (User).
     * @summary Resolved by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    resolved_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Change Request field. Refers to change_request (Change Request).
     * @summary Change Request.
     * @type {$$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>}
     */
    rfc: $$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>;

    /**
     * Severity
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    severity: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Subcategory
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    subcategory: $$rhino.Nilable<$$property.Element>;

    /**
     * Is Mission Related
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    u_is_mission_related: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Network field. Refers to x_44813_phys_net_network (Physical Network).
     * @summary Network.
     * @type {$$rhino.Nilable<$$property.generic.Reference<x_44813_phys_net_networkFields, x_44813_phys_net_networkGlideRecord>>}
     */
    u_network: $$rhino.Nilable<$$property.generic.Reference<x_44813_phys_net_networkFields, x_44813_phys_net_networkGlideRecord>>;

    /**
     * VIP Priority
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    u_vip_priority: $$rhino.Nilable<$$property.Boolean>;
}

declare type incidentGlideRecord = taskGlideRecord & incidentFields;

/**
 * GlideElement values from the Change Request table.
 * @interface change_requestFields
 * @extends {taskFields}
 */
declare interface change_requestFields extends taskFields {
    /**
     * Backout plan
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    backout_plan: $$rhino.Nilable<$$property.Element>;

    /**
     * CAB date field. Internal type is "glide_date".
     * @summary CAB date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    cab_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * CAB delegate field. Refers to sys_user (User).
     * @summary CAB delegate.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    cab_delegate: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * CAB recommendation
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    cab_recommendation: $$rhino.Nilable<$$property.Element>;

    /**
     * CAB required
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    cab_required: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Category
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    category: $$rhino.Nilable<$$property.Element>;

    /**
     * Change plan
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    change_plan: $$rhino.Nilable<$$property.Element>;

    /**
     * CI class field. Internal type is "table_name".
     * @summary CI class.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    ci_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Close code
     * @type {$$rhino.Nilable<$$property.generic.Element<IncidentCloseCode>>}
     */
    close_code: $$rhino.Nilable<$$property.generic.Element<IncidentCloseCode>>;

    /**
     * Conflict last run
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    conflict_last_run: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Conflict status
     * @type {$$rhino.Nilable<$$property.generic.Element<("Not Run" | "Conflict" | "No Conflict")>>}
     */
    conflict_status: $$rhino.Nilable<$$property.generic.Element<("Not Run" | "Conflict" | "No Conflict")>>;

    /**
     * Planned end date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    end_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Implementation plan
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    implementation_plan: $$rhino.Nilable<$$property.Element>;

    /**
     * Justification
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    justification: $$rhino.Nilable<$$property.Element>;

    /**
     * On hold
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    on_hold: $$rhino.Nilable<$$property.Boolean>;

    /**
     * On hold reason
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    on_hold_reason: $$rhino.Nilable<$$property.Element>;

    /**
     * On Hold Change Tasks field. Internal type is "glide_list".
     * @summary On Hold Change Tasks.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    on_hold_task: $$rhino.Nilable<IGlideElement>;

    /**
     * Outside maintenance schedule
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    outside_maintenance_schedule: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Phase
     * @type {$$rhino.Nilable<$$property.generic.Element<("requested" | "plan" | "build" | "accept")>>}
     */
    phase: $$rhino.Nilable<$$property.generic.Element<("requested" | "plan" | "build" | "accept")>>;

    /**
     * Phase state
     * @type {$$rhino.Nilable<$$property.generic.Element<("open" | "work in progress" | "approved" | "rejected" | "testing" | "implementation" | "on hold" | "complete")>>}
     */
    phase_state: $$rhino.Nilable<$$property.generic.Element<("open" | "work in progress" | "approved" | "rejected" | "testing" | "implementation" | "on hold" | "complete")>>;

    /**
     * Production system
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    production_system: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Proposed change field. Internal type is "template_value".
     * @summary Proposed change.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    proposed_change: $$rhino.Nilable<IGlideElement>;

    /**
     * Reason
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    reason: $$rhino.Nilable<$$property.Element>;

    /**
     * Requested by field. Refers to sys_user (User).
     * @summary Requested by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    requested_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Requested by date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    requested_by_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Review comments
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    review_comments: $$rhino.Nilable<$$property.Element>;

    /**
     * Review date field. Internal type is "glide_date".
     * @summary Review date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    review_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Review status
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    review_status: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Risk
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    risk: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Risk and impact analysis
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    risk_impact_analysis: $$rhino.Nilable<$$property.Element>;

    /**
     * Risk value
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    risk_value: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Scope
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    scope: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Planned start date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    start_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Standard Change Template version field. Refers to std_change_producer_version (Standard Change Template Version).
     * @summary Standard Change Template version.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    std_change_producer_version: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Test plan
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    test_plan: $$rhino.Nilable<$$property.Element>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    type: $$rhino.Nilable<$$property.Element>;
}

declare type change_requestGlideRecord = taskGlideRecord & change_requestFields;

/**
 * GlideElement values from the Change Task table.
 * @interface change_taskFields
 * @extends {taskFields}
 */
declare interface change_taskFields extends taskFields {
    /**
     * Change request field. Refers to change_request (Change Request).
     * @summary Change request.
     * @type {$$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>}
     */
    change_request: $$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.generic.Element<("planning" | "implementation" | "testing" | "review")>>}
     */
    change_task_type: $$rhino.Nilable<$$property.generic.Element<("planning" | "implementation" | "testing" | "review")>>;

    /**
     * Close code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    close_code: $$rhino.Nilable<$$property.Element>;

    /**
     * Created from value.
     * @type {$$rhino.Nilable<$$property.generic.Element<("workflow" | "manual")>>}
     */
    created_from: $$rhino.Nilable<$$property.generic.Element<("workflow" | "manual")>>;

    /**
     * On hold
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    on_hold: $$rhino.Nilable<$$property.Boolean>;

    /**
     * On hold reason
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    on_hold_reason: $$rhino.Nilable<$$property.Element>;

    /**
     * Planned end date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    planned_end_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Planned start date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    planned_start_date: $$rhino.Nilable<$$property.GlideObject>;
}

declare type change_taskGlideRecord = taskGlideRecord & change_taskFields;

/**
 * GlideElement values from the Problem table.
 * @interface problemFields
 * @extends {taskFields}
 */
declare interface problemFields extends taskFields {
    /**
     * Known error
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    known_error: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Major problem
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    major_problem: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Problem state
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    problem_state: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Related Incidents
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    related_incidents: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Review outcome
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    review_outcome: $$rhino.Nilable<$$property.Element>;

    /**
     * Change request field. Refers to change_request (Change Request).
     * @summary Change request.
     * @type {$$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>}
     */
    rfc: $$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>;

    /**
     * Workaround field. Internal type is "journal_input".
     * @summary Workaround.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    work_around: $$rhino.Nilable<IGlideElement>;
}

declare type problemGlideRecord = taskGlideRecord & problemFields;

/**
 * GlideElement values from the Problem Task table.
 * @interface problem_taskFields
 * @extends {taskFields}
 */
declare interface problem_taskFields extends taskFields {
    /**
     * Problem field. Refers to problem (Problem).
     * @summary Problem.
     * @type {$$rhino.Nilable<$$property.generic.Reference<problemFields, problemGlideRecord>>}
     */
    problem: $$rhino.Nilable<$$property.generic.Reference<problemFields, problemGlideRecord>>;
}

declare type problem_taskGlideRecord = taskGlideRecord & problem_taskFields;

/**
 * GlideElement values from the User table.
 * @interface sys_userFields
 * @extends {IGlideTableProperties}
 */
declare interface sys_userFields extends IGlideTableProperties {
    /**
     * Accumulated roles
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    accumulated_roles: $$rhino.Nilable<$$property.Element>;

    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Work agent status field. Internal type is "choice".
     * @summary Work agent status.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    agent_status: $$rhino.Nilable<IGlideElement>;

    /**
     * Average Daily FTE Hours/Hours Per Person Day field. Internal type is "decimal".
     * @summary Average Daily FTE Hours/Hours Per Person Day.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    average_daily_fte: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Building field. Refers to cmn_building (Building).
     * @summary Building.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_buildingFields, cmn_buildingGlideRecord>>}
     */
    building: $$rhino.Nilable<$$property.generic.Reference<cmn_buildingFields, cmn_buildingGlideRecord>>;

    /**
     * Business impact
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    business_criticality: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Calendar integration
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    calendar_integration: $$rhino.Nilable<$$property.Numeric>;

    /**
     * City
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    city: $$rhino.Nilable<$$property.Element>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Cost center field. Refers to cmn_cost_center (Cost Center).
     * @summary Cost center.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    cost_center: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Country code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    country: $$rhino.Nilable<$$property.Element>;

    /**
     * Date format
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    date_format: $$rhino.Nilable<$$property.Element>;

    /**
     * Default perspective field. Refers to sys_perspective (Menu List).
     * @summary Default perspective.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    default_perspective: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Department field. Refers to cmn_department (Department).
     * @summary Department.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
     */
    department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * EDU Status
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    edu_status: $$rhino.Nilable<$$property.Element>;

    /**
     * Email field. Internal type is "email".
     * @summary Email.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    email: $$rhino.Nilable<$$property.Element>;

    /**
     * Employee number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    employee_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Enable Multifactor Authentication
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    enable_multifactor_authn: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Failed login attempts
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    failed_attempts: $$rhino.Nilable<$$property.Numeric>;

    /**
     * First name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    first_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Gender
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    gender: $$rhino.Nilable<$$property.Element>;

    /**
     * Geolocation tracked
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    geolocation_tracked: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Home phone field. Internal type is "ph_number".
     * @summary Home phone.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    home_phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Internal Integration User
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    internal_integration_user: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Prefix
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    introduction: $$rhino.Nilable<$$property.Element>;

    /**
     * Last login field. Internal type is "glide_date".
     * @summary Last login.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    last_login: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Last login device
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    last_login_device: $$rhino.Nilable<$$property.Element>;

    /**
     * Last login time
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    last_login_time: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Last name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    last_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Last password
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    last_password: $$rhino.Nilable<$$property.Element>;

    /**
     * Last position update
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    last_position_update: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Latitude field. Internal type is "float".
     * @summary Latitude.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    latitude: $$rhino.Nilable<$$property.Numeric>;

    /**
     * LDAP server field. Refers to ldap_server_config (LDAP server).
     * @summary LDAP server.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    ldap_server: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Locked out
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    locked_out: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Longitude field. Internal type is "float".
     * @summary Longitude.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    longitude: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Manager field. Refers to sys_user (User).
     * @summary Manager.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Middle name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    middle_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Mobile phone field. Internal type is "ph_number".
     * @summary Mobile phone.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    mobile_phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Notification
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    notification: $$rhino.Nilable<$$property.Numeric>;

    /**
     * On schedule field. Internal type is "choice".
     * @summary On schedule.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    on_schedule: $$rhino.Nilable<IGlideElement>;

    /**
     * Password needs reset
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    password_needs_reset: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Black phone field. Internal type is "ph_number".
     * @summary Black phone.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Photo
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    photo: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Language
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    preferred_language: $$rhino.Nilable<$$property.Element>;

    /**
     * Roles field. Internal type is "user_roles".
     * @summary Roles.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    roles: $$rhino.Nilable<IGlideElement>;

    /**
     * Schedule field. Refers to cmn_schedule (Schedule).
     * @summary Schedule.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>}
     */
    schedule: $$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>;

    /**
     * Source
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    source: $$rhino.Nilable<$$property.Element>;

    /**
     * State / Province
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    state: $$rhino.Nilable<$$property.Element>;

    /**
     * Street field. Internal type is "multi_two_lines".
     * @summary Street.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    street: $$rhino.Nilable<IGlideElement>;

    /**
     * Class
     * @type {$$rhino.Nilable<$$property.SysClassName>}
     */
    sys_class_name: $$rhino.Nilable<$$property.SysClassName>;

    /**
     * Domain
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Domain Path field. Internal type is "domain_path".
     * @summary Domain Path.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_domain_path: $$rhino.Nilable<$$property.Element>;

    /**
     * Time format
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    time_format: $$rhino.Nilable<$$property.Element>;

    /**
     * Time sheet policy field. Refers to time_sheet_policy (Time Sheet Policy).
     * @summary Time sheet policy.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    time_sheet_policy: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Time zone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    time_zone: $$rhino.Nilable<$$property.Element>;

    /**
     * Title
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    title: $$rhino.Nilable<$$property.Element>;

    /**
     * User ID
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    user_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Password
     * @type {$$rhino.Nilable<$$property.Password>}
     */
    user_password: $$rhino.Nilable<$$property.Password>;

    /**
     * Grey Phone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    u_grey_phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Rank
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    u_rank: $$rhino.Nilable<$$property.Element>;

    /**
     * Red Phone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    u_red_phone: $$rhino.Nilable<$$property.Element>;

    /**
     * VIP
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    vip: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Web service access only
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    web_service_access_only: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Zip / Postal code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    zip: $$rhino.Nilable<$$property.Element>;
}

declare type sys_userGlideRecord = GlideRecord & sys_userFields;

/**
 * GlideElement values from the Group table.
 * @interface sys_user_groupFields
 * @extends {IGlideTableProperties}
 */
declare interface sys_user_groupFields extends IGlideTableProperties {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Average Daily FTE Hours/Hours Per Person Day field. Internal type is "decimal".
     * @summary Average Daily FTE Hours/Hours Per Person Day.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    average_daily_fte: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Cost center field. Refers to cmn_cost_center (Cost Center).
     * @summary Cost center.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    cost_center: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Default assignee field. Refers to sys_user (User).
     * @summary Default assignee.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    default_assignee: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Group email field. Internal type is "email".
     * @summary Group email.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    email: $$rhino.Nilable<$$property.Element>;

    /**
     * Exclude manager
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    exclude_manager: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Hourly rate
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    hourly_rate: $$rhino.Nilable<$$property.Currency>;

    /**
     * Include members
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    include_members: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Manager field. Refers to sys_user (User).
     * @summary Manager.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Parent field. Refers to sys_user_group (Group).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Points
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    points: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Roles field. Internal type is "user_roles".
     * @summary Roles.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    roles: $$rhino.Nilable<IGlideElement>;

    /**
     * Source
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    source: $$rhino.Nilable<$$property.Element>;

    /**
     * Type field. Internal type is "glide_list".
     * @summary Type.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    type: $$rhino.Nilable<IGlideElement>;

    /**
     * Vendors field. Internal type is "glide_list".
     * @summary Vendors.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    vendors: $$rhino.Nilable<IGlideElement>;
}

declare type sys_user_groupGlideRecord = GlideRecord & sys_user_groupFields;

/**
 * GlideElement values from the Schedule table.
 * @interface cmn_scheduleFields
 * @extends {IGlideTableProperties}
 */
declare interface cmn_scheduleFields extends IGlideTableProperties {
    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Document
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    document: $$rhino.Nilable<$$property.Element>;

    /**
     * Document key
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    document_key: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Parent field. Refers to cmn_schedule (Schedule).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>;

    /**
     * Read only
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    read_only: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Time zone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    time_zone: $$rhino.Nilable<$$property.Element>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    type: $$rhino.Nilable<$$property.Element>;
}

declare type cmn_scheduleGlideRecord = GlideRecord & cmn_scheduleFields;

/**
 * GlideElement values from the Location table.
 * @interface cmn_locationFields
 * @extends {IGlideTableProperties}
 */
declare interface cmn_locationFields extends IGlideTableProperties {
    /**
     * City
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    city: $$rhino.Nilable<$$property.Element>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Contact field. Refers to sys_user (User).
     * @summary Contact.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    contact: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Country
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    country: $$rhino.Nilable<$$property.Element>;

    /**
     * Fax phone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    fax_phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Full name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    full_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Latitude field. Internal type is "float".
     * @summary Latitude.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    latitude: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Lat long error
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    lat_long_error: $$rhino.Nilable<$$property.Element>;

    /**
     * Longitude field. Internal type is "float".
     * @summary Longitude.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    longitude: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Parent field. Refers to cmn_location (Location).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Phone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Phone territory field. Refers to sys_phone_territory (Sys Phone Territory).
     * @summary Phone territory.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    phone_territory: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * State / Province
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    state: $$rhino.Nilable<$$property.Element>;

    /**
     * Stock room
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    stock_room: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Street field. Internal type is "multi_two_lines".
     * @summary Street.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    street: $$rhino.Nilable<IGlideElement>;

    /**
     * Time zone
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    time_zone: $$rhino.Nilable<$$property.Element>;

    /**
     * Zip / Postal Code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    zip: $$rhino.Nilable<$$property.Element>;
}

declare type cmn_locationGlideRecord = GlideRecord & cmn_locationFields;

/**
 * GlideElement values from the Department table.
 * @interface cmn_departmentFields
 * @extends {IGlideTableProperties}
 */
declare interface cmn_departmentFields extends IGlideTableProperties {
    /**
     * Business unit field. Refers to business_unit (Business Unit).
     * @summary Business unit.
     * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
     */
    business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

    /**
     * Code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    code: $$rhino.Nilable<$$property.Element>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Cost center field. Refers to cmn_cost_center (Cost Center).
     * @summary Cost center.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    cost_center: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Department head field. Refers to sys_user (User).
     * @summary Department head.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    dept_head: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Head count
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    head_count: $$rhino.Nilable<$$property.Numeric>;

    /**
     * ID
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    id: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Parent field. Refers to cmn_department (Department).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Primary contact field. Refers to sys_user (User).
     * @summary Primary contact.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    primary_contact: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;
}

declare type cmn_departmentGlideRecord = GlideRecord & cmn_departmentFields;

/**
 * GlideElement values from the Company table.
 * @interface core_companyFields
 * @extends {IGlideTableProperties}
 */
declare interface core_companyFields extends IGlideTableProperties {
    /**
     * Apple icon
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    apple_icon: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Banner image
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    banner_image: $$rhino.Nilable<$$property.UserImage>;

    /**
     * UI16 Banner Image
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    banner_image_light: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Banner text
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    banner_text: $$rhino.Nilable<$$property.Element>;

    /**
     * City
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    city: $$rhino.Nilable<$$property.Element>;

    /**
     * Contact field. Refers to sys_user (User).
     * @summary Contact.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    contact: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Country
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    country: $$rhino.Nilable<$$property.Element>;

    /**
     * Customer
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    customer: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Discount field. Internal type is "decimal".
     * @summary Discount.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    discount: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Fax phone field. Internal type is "ph_number".
     * @summary Fax phone.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    fax_phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Fiscal year field. Internal type is "glide_date".
     * @summary Fiscal year.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    fiscal_year: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Latitude field. Internal type is "float".
     * @summary Latitude.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    latitude: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Lat long error
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    lat_long_error: $$rhino.Nilable<$$property.Element>;

    /**
     * Longitude field. Internal type is "float".
     * @summary Longitude.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    longitude: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Manufacturer
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    manufacturer: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Market cap
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    market_cap: $$rhino.Nilable<$$property.Currency>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Notes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    notes: $$rhino.Nilable<$$property.Element>;

    /**
     * Number of employees
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    num_employees: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Parent field. Refers to core_company (Company).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Phone field. Internal type is "ph_number".
     * @summary Phone.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    phone: $$rhino.Nilable<$$property.Element>;

    /**
     * Primary
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    primary: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Profits
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    profits: $$rhino.Nilable<$$property.Currency>;

    /**
     * Publicly traded
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    publicly_traded: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Rank tier
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    rank_tier: $$rhino.Nilable<$$property.Element>;

    /**
     * Revenue per year
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    revenue_per_year: $$rhino.Nilable<$$property.Currency>;

    /**
     * State / Province
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    state: $$rhino.Nilable<$$property.Element>;

    /**
     * Stock price
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    stock_price: $$rhino.Nilable<$$property.Element>;

    /**
     * Stock symbol
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    stock_symbol: $$rhino.Nilable<$$property.Element>;

    /**
     * Street field. Internal type is "multi_two_lines".
     * @summary Street.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    street: $$rhino.Nilable<IGlideElement>;

    /**
     * Theme field. Refers to sys_ui_theme (Theme).
     * @summary Theme.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    theme: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Vendor
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    vendor: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Vendor manager field. Internal type is "glide_list".
     * @summary Vendor manager.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    vendor_manager: $$rhino.Nilable<IGlideElement>;

    /**
     * Vendor type field. Internal type is "glide_list".
     * @summary Vendor type.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    vendor_type: $$rhino.Nilable<IGlideElement>;

    /**
     * Website
     * @type {$$rhino.Nilable<$$property.URL>}
     */
    website: $$rhino.Nilable<$$property.URL>;

    /**
     * Zip / Postal code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    zip: $$rhino.Nilable<$$property.Element>;
}

declare type core_companyGlideRecord = GlideRecord & core_companyFields;

/**
 * GlideElement values from the Building table.
 * @interface cmn_buildingFields
 * @extends {IGlideTableProperties}
 */
declare interface cmn_buildingFields extends IGlideTableProperties {
    /**
     * Contact field. Refers to sys_user (User).
     * @summary Contact.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    contact: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Floors
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    floors: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Notes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    notes: $$rhino.Nilable<$$property.Element>;
}

declare type cmn_buildingGlideRecord = GlideRecord & cmn_buildingFields;

/**
 * GlideElement values from the Business Unit table.
 * @interface business_unitFields
 * @extends {IGlideTableProperties}
 */
declare interface business_unitFields extends IGlideTableProperties {
    /**
     * Business Unit Head field. Refers to sys_user (User).
     * @summary Business Unit Head.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    bu_head: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Description field. Internal type is "wide_text".
     * @summary Description.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Hierarchy level
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    hierarchy_level: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Parent field. Refers to business_unit (Business Unit).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

    /**
     * Domain
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Domain Path field. Internal type is "domain_path".
     * @summary Domain Path.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_domain_path: $$rhino.Nilable<$$property.Element>;
}

declare type business_unitGlideRecord = GlideRecord & business_unitFields;

/**
 * GlideElement values from the GlideRecord that contains values from a record in the Progress Worker table.
 * @interface sys_progress_workerFields
 * @extends {IGlideTableProperties}
 */
declare interface sys_progress_workerFields extends IGlideTableProperties {
    /**
     * Error message
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    error_message: $$rhino.Nilable<$$property.Element>;

    /**
     * Message
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    message: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Output summary
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    output_summary: $$rhino.Nilable<$$property.Element>;

    /**
     * Queued Time field. Internal type is "glide_duration".
     * @summary Queued Time.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    queued_time: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Run in background
     * @type {$$rhino.Nilable<$$property.generic.Element<("true" | "false")>>}
     */
    run_in_background: $$rhino.Nilable<$$property.generic.Element<("true" | "false")>>;

    /**
     * State
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    state: $$rhino.Nilable<$$property.Element>;

    /**
     * Completion code
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    state_code: $$rhino.Nilable<$$property.Element>;

    /**
     * Total Execute Time field. Internal type is "glide_duration".
     * @summary Total Execute Time.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    total_execute_time: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Total Run Time field. Internal type is "glide_duration".
     * @summary Total Run Time.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    total_run_time: $$rhino.Nilable<$$property.GlideObject>;
}

declare type sys_progress_workerGlideRecord = GlideRecord & sys_progress_workerFields;

/**
 * GlideElement values from the Attachment table.
 * @interface sys_attachmentFields
 * @extends {IGlideTableProperties}
 */
declare interface sys_attachmentFields extends IGlideTableProperties {
    /**
     * Average image color field. Internal type is "color".
     * @summary Average image color.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    average_image_color: $$rhino.Nilable<IGlideElement>;

    /**
     * Chunk size bytes
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    chunk_size_bytes: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Compressed
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    compressed: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Content type
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    content_type: $$rhino.Nilable<$$property.Element>;

    /**
     * Encryption context field. Refers to sys_encryption_context (Encryption Context).
     * @summary Encryption context.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_encryption_contextFields, sys_encryption_contextGlideRecord>>}
     */
    encryption_context: $$rhino.Nilable<$$property.generic.Reference<sys_encryption_contextFields, sys_encryption_contextGlideRecord>>;

    /**
     * File name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    file_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Image height
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    image_height: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Image width
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    image_width: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Size bytes field. Internal type is "longint".
     * @summary Size bytes.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    size_bytes: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Size compressed field. Internal type is "longint".
     * @summary Size compressed.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    size_compressed: $$rhino.Nilable<$$property.Numeric>;

    /**
     * State
     * @type {$$rhino.Nilable<$$property.generic.Element<("pending" | "available" | "not_available" | "available_conditionally")>>}
     */
    state: $$rhino.Nilable<$$property.generic.Element<("pending" | "available" | "not_available" | "available_conditionally")>>;

    /**
     * Table name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    table_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Table sys ID field. Internal type is "char".
     * @summary Table sys ID.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    table_sys_id: $$rhino.Nilable<$$property.Element>;
}

declare type sys_attachmentGlideRecord = GlideRecord & sys_attachmentFields;

/**
 * GlideElement values from the GlideRecord that contains values from a record in the System Plugin table.
 * @interface v_pluginFields
 * @extends {IGlideTableProperties}
 */
declare interface v_pluginFields extends IGlideTableProperties {
    /**
     * Status
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    active: $$rhino.Nilable<$$property.Element>;

    /**
     * Available version
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    available_version: $$rhino.Nilable<$$property.Element>;

    /**
     * Definition
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    definition: $$rhino.Nilable<$$property.Element>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Entitled
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    entitled: $$rhino.Nilable<$$property.Element>;

    /**
     * Has demo data
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    has_demo_data: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Help
     * @type {$$rhino.Nilable<$$property.URL>}
     */
    help: $$rhino.Nilable<$$property.URL>;

    /**
     * ID
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    id: $$rhino.Nilable<$$property.Element>;

    /**
     * Licensable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    licensable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Subscription Category
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    license_category: $$rhino.Nilable<$$property.Element>;

    /**
     * Subscription Model
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    license_model: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Path
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    path: $$rhino.Nilable<$$property.Element>;

    /**
     * Provider
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    provider: $$rhino.Nilable<$$property.Element>;

    /**
     * Requires field. Internal type is "glide_list".
     * @summary Requires.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    requires: $$rhino.Nilable<IGlideElement>;

    /**
     * Scope
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    scope: $$rhino.Nilable<$$property.Element>;

    /**
     * State
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    state: $$rhino.Nilable<$$property.Element>;

    /**
     * Supports Rollback
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    supports_rollback: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Trackable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    trackable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    type: $$rhino.Nilable<$$property.Element>;

    /**
     * Version
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    version: $$rhino.Nilable<$$property.Element>;
}

declare type v_pluginGlideRecord = GlideRecord & v_pluginFields;

/**
 * GlideElement values from the Category table.
 * @interface sc_categoryFields
 * @extends {sys_metadataFields}
 */
declare interface sc_categoryFields extends sys_metadataFields {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.TranslatedText>}
     */
    description: $$rhino.Nilable<$$property.TranslatedText>;

    /**
     * Entitlement script
     * @type {$$rhino.Nilable<$$property.Script>}
     */
    entitlement_script: $$rhino.Nilable<$$property.Script>;

    /**
     * Header icon
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    header_icon: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Homepage image
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    homepage_image: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Homepage renderer field. Refers to sc_homepage_renderer (Homepage Category Renderer).
     * @summary Homepage renderer.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    homepage_renderer: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Icon
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    icon: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Image field. Internal type is "image".
     * @summary Image.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    image: $$rhino.Nilable<IGlideElement>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Hide description (mobile browsing)
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    mobile_hide_description: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Mobile Picture
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    mobile_picture: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Mobile Subcategory Render Type field. "list"=""; "card"="".
     * @summary Mobile Subcategory Render Type.
     * @type {$$rhino.Nilable<$$property.generic.Element<("list" | "card")>>}
     */
    mobile_subcategory_render_type: $$rhino.Nilable<$$property.generic.Element<("list" | "card")>>;

    /**
     * Module link field. Refers to sys_app_module (Module).
     * @summary Module link.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    module: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Order
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    order: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Parent field. Refers to sc_category (Category).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_categoryFields, sc_categoryGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<sc_categoryFields, sc_categoryGlideRecord>>;

    /**
     * Roles field. Internal type is "user_roles".
     * @summary Roles.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    roles: $$rhino.Nilable<IGlideElement>;

    /**
     * Catalog field. Refers to sc_catalog (Catalog).
     * @summary Catalog.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_catalogFields, sc_catalogGlideRecord>>}
     */
    sc_catalog: $$rhino.Nilable<$$property.generic.Reference<sc_catalogFields, sc_catalogGlideRecord>>;

    /**
     * Show in CMS
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    show_in_cms: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Title
     * @type {$$rhino.Nilable<$$property.TranslatedText>}
     */
    title: $$rhino.Nilable<$$property.TranslatedText>;
}

declare type sc_categoryGlideRecord = sys_metadataGlideRecord & sc_categoryFields;

/**
 * GlideElement values from the Catalog table.
 * @interface sc_catalogFields
 * @extends {sys_metadataFields}
 */
declare interface sc_catalogFields extends sys_metadataFields {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Background Color field. Internal type is "color".
     * @summary Background Color.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    background_color: $$rhino.Nilable<IGlideElement>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.TranslatedText>}
     */
    description: $$rhino.Nilable<$$property.TranslatedText>;

    /**
     * 'Continue Shopping' page
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    desktop_continue_shopping: $$rhino.Nilable<$$property.Element>;

    /**
     * 'Catalog Home' Page
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    desktop_home_page: $$rhino.Nilable<$$property.Element>;

    /**
     * Desktop image
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    desktop_image: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Editors field. Internal type is "glide_list".
     * @summary Editors.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    editors: $$rhino.Nilable<IGlideElement>;

    /**
     * Enable Wish List
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    enable_wish_list: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Manager field. Refers to sys_user (User).
     * @summary Manager.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Title
     * @type {$$rhino.Nilable<$$property.TranslatedField>}
     */
    title: $$rhino.Nilable<$$property.TranslatedField>;
}

declare type sc_catalogGlideRecord = sys_metadataGlideRecord & sc_catalogFields;

/**
 * GlideElement values from the Catalog Item table.
 * @interface sc_cat_itemFields
 * @extends {sys_metadataFields}
 */
declare interface sc_cat_itemFields extends sys_metadataFields {
    /**
     * Active
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Availability field.
     * @type {$$rhino.Nilable<$$property.generic.Element<("on_both" | "on_desktop" | "on_mobile")>>}
     */
    availability: $$rhino.Nilable<$$property.generic.Element<("on_both" | "on_desktop" | "on_mobile")>>;

    /**
     * Billable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    billable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Category. field. Category field. Refers to sc_category (Category).
     * @summary Category.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_categoryFields, sc_categoryGlideRecord>>}
     */
    category: $$rhino.Nilable<$$property.generic.Reference<sc_categoryFields, sc_categoryGlideRecord>>;

    /**
     * Cost field. Internal type is "decimal".
     * @summary Cost.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    cost: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Cart field. Refers to sys_ui_macro (Macro).
     * @summary Cart.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    custom_cart: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Execution Plan field. Refers to sc_cat_item_delivery_plan (Execution Plan).
     * @summary Execution Plan.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    delivery_plan: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Delivery plan script
     * @type {$$rhino.Nilable<$$property.Script>}
     */
    delivery_plan_script: $$rhino.Nilable<$$property.Script>;

    /**
     * Delivery time field. Internal type is "glide_duration".
     * @summary Delivery time.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    delivery_time: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.TranslatedHTML>}
     */
    description: $$rhino.Nilable<$$property.TranslatedHTML>;

    /**
     * Entitlement script
     * @type {$$rhino.Nilable<$$property.Script>}
     */
    entitlement_script: $$rhino.Nilable<$$property.Script>;

    /**
     * Fulfillment group field. Refers to sys_user_group (Group).
     * @summary Fulfillment group.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    group: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Hide on Service Portal
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    hide_sp: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Icon
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    icon: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Ignore price
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    ignore_price: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Image field. Internal type is "image".
     * @summary Image.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    image: $$rhino.Nilable<IGlideElement>;

    /**
     * List Price
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    list_price: $$rhino.Nilable<$$property.Currency>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Meta
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    meta: $$rhino.Nilable<$$property.Element>;

    /**
     * Hide price (mobile listings)
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    mobile_hide_price: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Mobile Picture
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    mobile_picture: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Mobile Picture Type field.
     * @type {$$rhino.Nilable<$$property.generic.Element<("use_desktop_picture" | "use_mobile_picture" | "use_no_picture")>>}
     */
    mobile_picture_type: $$rhino.Nilable<$$property.generic.Element<("use_desktop_picture" | "use_mobile_picture" | "use_no_picture")>>;

    /**
     * Model field. Refers to cmdb_model (Product Model).
     * @summary Model.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>}
     */
    model: $$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.TranslatedText>}
     */
    name: $$rhino.Nilable<$$property.TranslatedText>;

    /**
     * No cart
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    no_cart: $$rhino.Nilable<$$property.Boolean>;

    /**
     * No order
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    no_order: $$rhino.Nilable<$$property.Boolean>;

    /**
     * No order now
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    no_order_now: $$rhino.Nilable<$$property.Boolean>;

    /**
     * No proceed checkout
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    no_proceed_checkout: $$rhino.Nilable<$$property.Boolean>;

    /**
     * No quantity
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    no_quantity: $$rhino.Nilable<$$property.Boolean>;

    /**
     * No search
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    no_search: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Omit price in cart
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    omit_price: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Order
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    order: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Ordered item link field. Refers to sc_ordered_item_link (Ordered Item Link).
     * @summary Ordered item link.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    ordered_item_link: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Picture
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    picture: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Preview link field. Internal type is "catalog_preview".
     * @summary Preview link.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    preview: $$rhino.Nilable<IGlideElement>;

    /**
     * Price
     * @type {$$rhino.Nilable<$$property.Price>}
     */
    price: $$rhino.Nilable<$$property.Price>;

    /**
     * Recurring Price Frequency field.
     * @type {$$rhino.Nilable<$$property.generic.Element<("daily" | "weekly" | "weekly2" | "monthly" | "monthly2" | "quarterly" | "semiannual" | "yearly")>>}
     */
    recurring_frequency: $$rhino.Nilable<$$property.generic.Element<("daily" | "weekly" | "weekly2" | "monthly" | "monthly2" | "quarterly" | "semiannual" | "yearly")>>;

    /**
     * Recurring price
     * @type {$$rhino.Nilable<$$property.Price>}
     */
    recurring_price: $$rhino.Nilable<$$property.Price>;

    /**
     * Roles field. Internal type is "user_roles".
     * @summary Roles.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    roles: $$rhino.Nilable<IGlideElement>;

    /**
     * Catalogs field. Internal type is "glide_list".
     * @summary Catalogs.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    sc_catalogs: $$rhino.Nilable<IGlideElement>;

    /**
     * Created from item design field. Refers to sc_ic_item_staging (Item).
     * @summary Created from item design.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    sc_ic_item_staging: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Published version
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    sc_ic_version: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Short description
     * @type {$$rhino.Nilable<$$property.TranslatedText>}
     */
    short_description: $$rhino.Nilable<$$property.TranslatedText>;

    /**
     * Expand help for all questions
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    show_variable_help_on_load: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Start closed
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    start_closed: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Template field. Refers to sys_template (Template).
     * @summary Template.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    template: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.generic.Element<("item" | "task" | "bundle" | "template" | "package")>>}
     */
    type: $$rhino.Nilable<$$property.generic.Element<("item" | "task" | "bundle" | "template" | "package")>>;

    /**
     * Use cart layout
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    use_sc_layout: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Vendor field. Refers to core_company (Company).
     * @summary Vendor.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    vendor: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Visible on Bundles
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    visible_bundle: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Visible on Guides
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    visible_guide: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Visible elsewhere
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    visible_standalone: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Workflow field. Refers to wf_workflow (Workflow).
     * @summary Workflow.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    workflow: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;
}

declare type sc_cat_itemGlideRecord = sys_metadataGlideRecord & sc_cat_itemFields;

/**
 * GlideElement values from the Request table.
 * @interface sc_requestFields
 * @extends {taskFields}
 */
declare interface sc_requestFields extends taskFields {
    /**
     * Resolve Time
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    calendar_stc: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Delivery address
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    delivery_address: $$rhino.Nilable<$$property.Element>;

    /**
     * Price
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    price: $$rhino.Nilable<$$property.Currency>;

    /**
     * Requested for date field. Internal type is "glide_date".
     * @summary Requested for date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    requested_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Requested for field. Refers to sys_user (User).
     * @summary Requested for.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    requested_for: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Request state
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    request_state: $$rhino.Nilable<$$property.Element>;

    /**
     * Sourceable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    sourceable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Sourced
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    sourced: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Special instructions
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    special_instructions: $$rhino.Nilable<$$property.Element>;

    /**
     * Stage
     * @type {$$rhino.Nilable<GlideElementWorkflow>}
     */
    stage: $$rhino.Nilable<GlideElementWorkflow>;
}

declare type sc_requestGlideRecord = taskGlideRecord & sc_requestFields;

/**
 * GlideElement values from the Requested Item table.
 * @interface sc_req_itemFields
 * @extends {taskFields}
 */
declare interface sc_req_itemFields extends taskFields {
    /**
     * Backordered
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    backordered: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Billable
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    billable: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Item field. Refers to sc_cat_item (Catalog Item).
     * @summary Item.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_cat_itemFields, sc_cat_itemGlideRecord>>}
     */
    cat_item: $$rhino.Nilable<$$property.generic.Reference<sc_cat_itemFields, sc_cat_itemGlideRecord>>;

    /**
     * Configuration item field. Refers to cmdb_ci (Configuration Item).
     * @summary Configuration item.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>}
     */
    configuration_item: $$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>;

    /**
     * Context field. Refers to wf_context (Workflow context).
     * @summary Context.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    context: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Estimated delivery
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    estimated_delivery: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Order Guide field. Refers to sc_cat_item_guide (Order guide).
     * @summary Order Guide.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    order_guide: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Price
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    price: $$rhino.Nilable<$$property.Currency>;

    /**
     * Quantity
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    quantity: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Quantity Sourced
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    quantity_sourced: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Received
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    received: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Recurring Price Frequency field. Internal type is "choice".
     * @summary Recurring Price Frequency.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    recurring_frequency: $$rhino.Nilable<IGlideElement>;

    /**
     * Recurring Price
     * @type {$$rhino.Nilable<$$property.Price>}
     */
    recurring_price: $$rhino.Nilable<$$property.Price>;

    /**
     * Request field. Refers to sc_request (Request).
     * @summary Request.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_requestFields, sc_requestGlideRecord>>}
     */
    request: $$rhino.Nilable<$$property.generic.Reference<sc_requestFields, sc_requestGlideRecord>>;

    /**
     * Catalog field. Refers to sc_catalog (Catalog).
     * @summary Catalog.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_catalogFields, sc_catalogGlideRecord>>}
     */
    sc_catalog: $$rhino.Nilable<$$property.generic.Reference<sc_catalogFields, sc_catalogGlideRecord>>;

    /**
     * Sourced
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    sourced: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Stage
     * @type {$$rhino.Nilable<GlideElementWorkflow>}
     */
    stage: $$rhino.Nilable<GlideElementWorkflow>;
}

declare type sc_req_itemGlideRecord = taskGlideRecord & sc_req_itemFields;

/**
 * GlideElement values from the Catalog Task table.
 * @interface sc_taskFields
 * @extends {taskFields}
 */
declare interface sc_taskFields extends taskFields {
    /**
     * Resolve Time
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    calendar_stc: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Request field. Refers to sc_request (Request).
     * @summary Request.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_requestFields, sc_requestGlideRecord>>}
     */
    request: $$rhino.Nilable<$$property.generic.Reference<sc_requestFields, sc_requestGlideRecord>>;

    /**
     * Request item field. Refers to sc_req_item (Requested Item).
     * @summary Request item.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_req_itemFields, sc_req_itemGlideRecord>>}
     */
    request_item: $$rhino.Nilable<$$property.generic.Reference<sc_req_itemFields, sc_req_itemGlideRecord>>;

    /**
     * Catalog field. Refers to sc_catalog (Catalog).
     * @summary Catalog.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_catalogFields, sc_catalogGlideRecord>>}
     */
    sc_catalog: $$rhino.Nilable<$$property.generic.Reference<sc_catalogFields, sc_catalogGlideRecord>>;
}

declare type sc_taskGlideRecord = taskGlideRecord & sc_taskFields;

/**
 * GlideElement values from the Service Offering table.
 * @interface service_offeringFields
 * @extends {cmdb_ci_serviceFields}
 */
declare interface service_offeringFields extends cmdb_ci_serviceFields {
    /**
     * Billing field. "monthly"=""; "weekly"=""; "yearly"="".
     * @summary Billing.
     * @type {$$rhino.Nilable<$$property.generic.Element<("monthly" | "weekly" | "yearly")>>}
     */
    billing: $$rhino.Nilable<$$property.generic.Element<("monthly" | "weekly" | "yearly")>>;

    /**
     * Contract field. Refers to ast_contract (Contract).
     * @summary Contract.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    contract: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    description: $$rhino.Nilable<$$property.Element>;

    /**
     * Price
     * @type {$$rhino.Nilable<$$property.Price>}
     */
    price: $$rhino.Nilable<$$property.Price>;

    /**
     * Technical contact field. Refers to sys_user (User).
     * @summary Technical contact.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    technical_contact: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;
}

declare type service_offeringGlideRecord = cmdb_ci_serviceGlideRecord & service_offeringFields;

/**
 * GlideElement values from the Model Category table.
 * @interface cmdb_model_categoryFields
 * @extends {IGlideTableProperties}
 */
declare interface cmdb_model_categoryFields extends IGlideTableProperties {
    /**
     * Allow as master
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    allow_as_master: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Allow in bundle
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    allow_in_bundle: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Allow pre-allocation
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    allow_pre_allocation: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Asset class field. Internal type is "table_name".
     * @summary Asset class.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    asset_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Bundle
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    bundle: $$rhino.Nilable<$$property.Boolean>;

    /**
     * CI class field. Internal type is "table_name".
     * @summary CI class.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    cmdb_ci_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Enforce CI verification
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    enforce_verification: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;
}

declare type cmdb_model_categoryGlideRecord = GlideRecord & cmdb_model_categoryFields;

/**
 * GlideElement values from the Model Component table.
 * @interface cmdb_m2m_model_componentFields
 * @extends {IGlideTableProperties}
 */
declare interface cmdb_m2m_model_componentFields extends IGlideTableProperties {
    /**
     * Component field. Refers to cmdb_model (Product Model).
     * @summary Component.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>}
     */
    child: $$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>;

    /**
     * Is main component
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    master: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Model category of component field. Refers to cmdb_model_category (Model Category).
     * @summary Model category of component.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_model_categoryFields, cmdb_model_categoryGlideRecord>>}
     */
    model_category: $$rhino.Nilable<$$property.generic.Reference<cmdb_model_categoryFields, cmdb_model_categoryGlideRecord>>;

    /**
     * Bundle field. Refers to cmdb_model (Product Model).
     * @summary Bundle.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>;
}

declare type cmdb_m2m_model_componentGlideRecord = GlideRecord & cmdb_m2m_model_componentFields;

/**
 * GlideElement values from the Product Model table.
 * @interface cmdb_modelFields
 * @extends {IGlideTableProperties}
 */
declare interface cmdb_modelFields extends IGlideTableProperties {
    /**
     * Acquisition method
     * @type {$$rhino.Nilable<$$property.generic.Element<("Both" | "Buy" | "Lease")>>}
     */
    acquisition_method: $$rhino.Nilable<$$property.generic.Element<("Both" | "Buy" | "Lease")>>;

    /**
     * Asset tracking strategy field.
     * @type {$$rhino.Nilable<$$property.generic.Element<("leave_to_category" | "track_as_consumable" | "do_not_track")>>}
     */
    asset_tracking_strategy: $$rhino.Nilable<$$property.generic.Element<("leave_to_category" | "track_as_consumable" | "do_not_track")>>;

    /**
     * Barcode
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    barcode: $$rhino.Nilable<$$property.Element>;

    /**
     * Bundle
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    bundle: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Certified
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    certified: $$rhino.Nilable<$$property.Boolean>;

    /**
     * CMDB CI class
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    cmdb_ci_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Model categories field. Internal type is "glide_list".
     * @summary Model categories.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    cmdb_model_category: $$rhino.Nilable<IGlideElement>;

    /**
     * Comments
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    comments: $$rhino.Nilable<$$property.Element>;

    /**
     * Cost
     * @type {$$rhino.Nilable<$$property.Price>}
     */
    cost: $$rhino.Nilable<$$property.Price>;

    /**
     * Depreciation field. Refers to cmdb_depreciation (Depreciation).
     * @summary Depreciation.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    depreciation: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.TranslatedHTML>}
     */
    description: $$rhino.Nilable<$$property.TranslatedHTML>;

    /**
     * Display name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    display_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Expenditure type field. "capex"=""; "opex"="".
     * @summary Expenditure type.
     * @type {$$rhino.Nilable<$$property.generic.Element<("capex" | "opex")>>}
     */
    expenditure_type: $$rhino.Nilable<$$property.generic.Element<("capex" | "opex")>>;

    /**
     * Flow Rate (cfm)
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    flow_rate: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Full name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    full_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Main component field. Refers to cmdb_m2m_model_component (Model Component).
     * @summary Main component.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_m2m_model_componentFields, cmdb_m2m_model_componentGlideRecord>>}
     */
    main_component: $$rhino.Nilable<$$property.generic.Reference<cmdb_m2m_model_componentFields, cmdb_m2m_model_componentGlideRecord>>;

    /**
     * Manufacturer field. Refers to core_company (Company).
     * @summary Manufacturer.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    manufacturer: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Model number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    model_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Owner field. Refers to sys_user (User).
     * @summary Owner.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    owner: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Picture
     * @type {$$rhino.Nilable<$$property.UserImage>}
     */
    picture: $$rhino.Nilable<$$property.UserImage>;

    /**
     * Power (watts)
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    power_consumption: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Product Catalog Item field. Refers to sc_cat_item (Catalog Item).
     * @summary Product Catalog Item.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_cat_itemFields, sc_cat_itemGlideRecord>>}
     */
    product_catalog_item: $$rhino.Nilable<$$property.generic.Reference<sc_cat_itemFields, sc_cat_itemGlideRecord>>;

    /**
     * Height (U)
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    rack_units: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Salvage value
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    salvage_value: $$rhino.Nilable<$$property.Currency>;

    /**
     * Short description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    short_description: $$rhino.Nilable<$$property.Element>;

    /**
     * SLA
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sla: $$rhino.Nilable<$$property.Element>;

    /**
     * Sound Power (bels)
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    sound_power: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Status
     * @type {$$rhino.Nilable<$$property.generic.Element<("In Production" | "Retired" | "Sold")>>}
     */
    status: $$rhino.Nilable<$$property.generic.Element<("In Production" | "Retired" | "Sold")>>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.generic.Element<("Generic" | "Product" | "Scrum product")>>}
     */
    type: $$rhino.Nilable<$$property.generic.Element<("Generic" | "Product" | "Scrum product")>>;

    /**
     * Weight (lbs)
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    weight: $$rhino.Nilable<$$property.Numeric>;
}

declare type cmdb_modelGlideRecord = GlideRecord & cmdb_modelFields;

/**
 * GlideElement values from the Asset table.
 * @interface alm_assetFields
 * @extends {IGlideTableProperties}
 */
declare interface alm_assetFields extends IGlideTableProperties {
    /**
     * Acquisition method
     * @type {$$rhino.Nilable<$$property.generic.Element<("purchase" | "lease" | "rental" | "loan")>>}
     */
    acquisition_method: $$rhino.Nilable<$$property.generic.Element<("purchase" | "lease" | "rental" | "loan")>>;

    /**
     * Active transfer order
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    active_to: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Asset tag
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    asset_tag: $$rhino.Nilable<$$property.Element>;

    /**
     * Assigned
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    assigned: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Assigned to field. Refers to sys_user (User).
     * @summary Assigned to.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    assigned_to: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Beneficiary field. Refers to core_company (Company).
     * @summary Beneficiary.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    beneficiary: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Checked in
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    checked_in: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Checked out
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    checked_out: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Configuration Item field. Refers to cmdb_ci (Configuration Item).
     * @summary Configuration Item.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>}
     */
    ci: $$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>;

    /**
     * Comments
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    comments: $$rhino.Nilable<$$property.Element>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    cost: $$rhino.Nilable<$$property.Currency>;

    /**
     * Cost center field. Refers to cmn_cost_center (Cost Center).
     * @summary Cost center.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    cost_center: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Order received
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    delivery_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Department field. Refers to cmn_department (Department).
     * @summary Department.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
     */
    department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Depreciated amount
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    depreciated_amount: $$rhino.Nilable<$$property.Currency>;

    /**
     * Depreciation field. Refers to cmdb_depreciation (Depreciation).
     * @summary Depreciation.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    depreciation: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Depreciation effective date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    depreciation_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Display name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    display_name: $$rhino.Nilable<$$property.Element>;

    /**
     * Disposal reason
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    disposal_reason: $$rhino.Nilable<$$property.Element>;

    /**
     * Due
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    due: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Due in
     * @type {$$rhino.Nilable<$$property.generic.Element<("1 Day" | "1 Hour" | "1 Week")>>}
     */
    due_in: $$rhino.Nilable<$$property.generic.Element<("1 Day" | "1 Hour" | "1 Week")>>;

    /**
     * Expenditure type field.
     * @type {$$rhino.Nilable<$$property.generic.Element<("capex" | "opex")>>}
     */
    expenditure_type: $$rhino.Nilable<$$property.generic.Element<("capex" | "opex")>>;

    /**
     * GL account
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    gl_account: $$rhino.Nilable<$$property.Element>;

    /**
     * Installed
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    install_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * State
     * @type {$$rhino.Nilable<$$property.generic.Element<("2" | "6" | "9" | "1" | "10" | "3" | "7" | "8")>>}
     */
    install_status: $$rhino.Nilable<$$property.generic.Element<("2" | "6" | "9" | "1" | "10" | "3" | "7" | "8")>>;

    /**
     * Invoice number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    invoice_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Justification
     * @type {$$rhino.Nilable<$$property.generic.Element<("New employee hire" | "Replace in repair" | "Replace stolen" | "Replacement" | "Stock replenishment" | "Swap" | "Testing" | "Upgrade")>>}
     */
    justification: $$rhino.Nilable<$$property.generic.Element<("New employee hire" | "Replace in repair" | "Replace stolen" | "Replacement" | "Stock replenishment" | "Swap" | "Testing" | "Upgrade")>>;

    /**
     * Lease contract
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    lease_id: $$rhino.Nilable<$$property.Element>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Managed by field. Refers to sys_user (User).
     * @summary Managed by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    managed_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Model field. Refers to cmdb_model (Product Model).
     * @summary Model.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>}
     */
    model: $$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>;

    /**
     * Model category field. Refers to cmdb_model_category (Model Category).
     * @summary Model category.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_model_categoryFields, cmdb_model_categoryGlideRecord>>}
     */
    model_category: $$rhino.Nilable<$$property.generic.Reference<cmdb_model_categoryFields, cmdb_model_categoryGlideRecord>>;

    /**
     * Old status
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    old_status: $$rhino.Nilable<$$property.Element>;

    /**
     * Old substatus
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    old_substatus: $$rhino.Nilable<$$property.Element>;

    /**
     * Ordered
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    order_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Owned by field. Refers to sys_user (User).
     * @summary Owned by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    owned_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Parent field. Refers to alm_asset (Asset).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<alm_assetFields, alm_assetGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<alm_assetFields, alm_assetGlideRecord>>;

    /**
     * PO number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    po_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Pre-allocated
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    pre_allocated: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Purchased field. Internal type is "glide_date".
     * @summary Purchased.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    purchase_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Purchase order line field. Refers to proc_po_item (Purchase order line items).
     * @summary Purchase order line.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    purchase_line: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Quantity
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    quantity: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Receiving line field. Refers to proc_rec_slip_item (Receiving Slip Line).
     * @summary Receiving line.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    receiving_line: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Request line field. Refers to sc_req_item (Requested Item).
     * @summary Request line.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sc_req_itemFields, sc_req_itemGlideRecord>>}
     */
    request_line: $$rhino.Nilable<$$property.generic.Reference<sc_req_itemFields, sc_req_itemGlideRecord>>;

    /**
     * Resale price
     * @type {$$rhino.Nilable<$$property.Price>}
     */
    resale_price: $$rhino.Nilable<$$property.Price>;

    /**
     * Reserved for field. Refers to sys_user (User).
     * @summary Reserved for.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    reserved_for: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Residual value
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    residual: $$rhino.Nilable<$$property.Currency>;

    /**
     * Residual date field. Internal type is "glide_date".
     * @summary Residual date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    residual_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Retired date field. Internal type is "glide_date".
     * @summary Retired date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    retired: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Scheduled retirement field. Internal type is "glide_date".
     * @summary Scheduled retirement.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    retirement_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Salvage value
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
    salvage_value: $$rhino.Nilable<$$property.Currency>;

    /**
     * Serial number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    serial_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Skip sync
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    skip_sync: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Stockroom field. Refers to alm_stockroom (Stockroom).
     * @summary Stockroom.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    stockroom: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Substate
     * @type {$$rhino.Nilable<$$property.generic.Element<("available" | "disposed" | "lost" | "reserved" | "sold" | "stolen" | "defective" | "donated" | "pending_repair" | "vendor_credit" | "pending_install" |
     *      "pending_disposal" | "pending_transfer" | "pre_allocated")>>}
     */
    substatus: $$rhino.Nilable<$$property.generic.Element<("available" | "disposed" | "lost" | "reserved" | "sold" | "stolen" | "defective" | "donated" | "pending_repair" | "vendor_credit" | "pending_install" |
        "pending_disposal" | "pending_transfer" | "pre_allocated")>>;

    /**
     * Supported by field. Refers to sys_user (User).
     * @summary Supported by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    supported_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Support group field. Refers to sys_user_group (Group).
     * @summary Support group.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    support_group: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Class
     * @type {$$rhino.Nilable<$$property.SysClassName>}
     */
    sys_class_name: $$rhino.Nilable<$$property.SysClassName>;

    /**
     * Domain
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Domain Path field. Internal type is "domain_path".
     * @summary Domain Path.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_domain_path: $$rhino.Nilable<$$property.Element>;

    /**
     * Vendor field. Refers to core_company (Company).
     * @summary Vendor.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    vendor: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Warranty expiration field. Internal type is "glide_date".
     * @summary Warranty expiration.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    warranty_expiration: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Work notes field. Internal type is "journal_input".
     * @summary Work notes.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
    work_notes: $$rhino.Nilable<IGlideElement>;
}

declare type alm_assetGlideRecord = GlideRecord & alm_assetFields;

/**
 * GlideElement values from the Base Configuration Item table.
 * @interface cmdbFields
 * @extends {IExtendedGlideTableProperties}
 */
declare interface cmdbFields extends IExtendedGlideTableProperties {
    /**
     * Asset field. Refers to alm_asset (Asset).
     * @summary Asset.
     * @type {$$rhino.Nilable<$$property.generic.Reference<alm_assetFields, alm_assetGlideRecord>>}
     */
    asset: $$rhino.Nilable<$$property.generic.Reference<alm_assetFields, alm_assetGlideRecord>>;

    /**
     * Asset tag
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    asset_tag: $$rhino.Nilable<$$property.Element>;

    /**
     * Assigned
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    assigned: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Assigned to field. Refers to sys_user (User).
     * @summary Assigned to.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    assigned_to: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Assignment group field. Refers to sys_user_group (Group).
     * @summary Assignment group.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    assignment_group: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Checked in
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    checked_in: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Checked out
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    checked_out: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Company field. Refers to core_company (Company).
     * @summary Company.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    company: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Cost field. Internal type is "float".
     * @summary Cost.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    cost: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Cost currency
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    cost_cc: $$rhino.Nilable<$$property.Element>;

    /**
     * Cost center field. Refers to cmn_cost_center (Cost Center).
     * @summary Cost center.
     * @type {$$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>}
     */
    cost_center: $$rhino.Nilable<$$property.generic.Reference<IGlideTableProperties, GlideRecord>>;

    /**
     * Order received
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    delivery_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Department field. Refers to cmn_department (Department).
     * @summary Department.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
     */
    department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Due
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    due: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Due in
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    due_in: $$rhino.Nilable<$$property.Element>;

    /**
     * GL account
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    gl_account: $$rhino.Nilable<$$property.Element>;

    /**
     * Installed
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    install_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Status field.
     * @type {$$rhino.Nilable<$$property.generic.Element<("100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8")>>}
     */
    install_status: $$rhino.Nilable<$$property.generic.Element<("100" | "3" | "6" | "1" | "2" | "4" | "5" | "7" | "8")>>;

    /**
     * Invoice number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    invoice_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Justification
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    justification: $$rhino.Nilable<$$property.Element>;

    /**
     * Lease contract
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    lease_id: $$rhino.Nilable<$$property.Element>;

    /**
     * Location field. Refers to cmn_location (Location).
     * @summary Location.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    location: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Managed by field. Refers to sys_user (User).
     * @summary Managed by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    managed_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Manufacturer field. Refers to core_company (Company).
     * @summary Manufacturer.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    manufacturer: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Model ID field. Refers to cmdb_model (Product Model).
     * @summary Model ID.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>}
     */
    model_id: $$rhino.Nilable<$$property.generic.Reference<cmdb_modelFields, cmdb_modelGlideRecord>>;

    /**
     * Name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    name: $$rhino.Nilable<$$property.Element>;

    /**
     * Ordered
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    order_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Owned by field. Refers to sys_user (User).
     * @summary Owned by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    owned_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * PO number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    po_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Purchased field. Internal type is "glide_date".
     * @summary Purchased.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    purchase_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Serial number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    serial_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Skip sync
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    skip_sync: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Supported by field. Refers to sys_user (User).
     * @summary Supported by.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    supported_by: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Support group field. Refers to sys_user_group (Group).
     * @summary Support group.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    support_group: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Class
     * @type {$$rhino.Nilable<$$property.SysClassName>}
     */
    sys_class_name: $$rhino.Nilable<$$property.SysClassName>;

    /**
     * Sys class path field. Internal type is "sys_class_path".
     * @summary Sys class path.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_class_path: $$rhino.Nilable<$$property.Element>;

    /**
     * Domain
     * @type {$$rhino.Nilable<$$property.DomainId>}
     */
    sys_domain: $$rhino.Nilable<$$property.DomainId>;

    /**
     * Domain Path field. Internal type is "domain_path".
     * @summary Domain Path.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    sys_domain_path: $$rhino.Nilable<$$property.Element>;

    /**
     * Requires verification
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    unverified: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Vendor field. Refers to core_company (Company).
     * @summary Vendor.
     * @type {$$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>}
     */
    vendor: $$rhino.Nilable<$$property.generic.Reference<core_companyFields, core_companyGlideRecord>>;

    /**
     * Warranty expiration field. Internal type is "glide_date".
     * @summary Warranty expiration.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    warranty_expiration: $$rhino.Nilable<$$property.GlideObject>;
}

declare type cmdbGlideRecord = GlideRecord & cmdbFields;

/**
 * GlideElement values from the Configuration Item table.
 * @interface cmdb_ciFields
 * @extends {cmdbFields}
 */
declare interface cmdb_ciFields extends cmdbFields {
    /**
     * Attributes
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    attributes: $$rhino.Nilable<$$property.Element>;

    /**
     * Can Print
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    can_print: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Category
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    category: $$rhino.Nilable<$$property.Element>;

    /**
     * Approval group field. Refers to sys_user_group (Group).
     * @summary Approval group.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    change_control: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Comments
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    comments: $$rhino.Nilable<$$property.Element>;

    /**
     * Correlation ID
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    correlation_id: $$rhino.Nilable<$$property.Element>;

    /**
     * Discovery source
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    discovery_source: $$rhino.Nilable<$$property.Element>;

    /**
     * DNS Domain
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    dns_domain: $$rhino.Nilable<$$property.Element>;

    /**
     * Fault count
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
    fault_count: $$rhino.Nilable<$$property.Numeric>;

    /**
     * First discovered
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    first_discovered: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Fully qualified domain name
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    fqdn: $$rhino.Nilable<$$property.Element>;

    /**
     * IP Address
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    ip_address: $$rhino.Nilable<$$property.Element>;

    /**
     * Most recent discovery
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    last_discovered: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * MAC Address
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    mac_address: $$rhino.Nilable<$$property.Element>;

    /**
     * Maintenance schedule field. Refers to cmn_schedule (Schedule).
     * @summary Maintenance schedule.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>}
     */
    maintenance_schedule: $$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>;

    /**
     * Model number
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    model_number: $$rhino.Nilable<$$property.Element>;

    /**
     * Monitor
     * @type {$$rhino.Nilable<$$property.Boolean>}
     */
    monitor: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Operational status
     * @type {$$rhino.Nilable<$$property.generic.Element<("1" | "2" | "3" | "4" | "5" | "6")>>}
     */
    operational_status: $$rhino.Nilable<$$property.generic.Element<("1" | "2" | "3" | "4" | "5" | "6")>>;

    /**
     * Schedule field. Refers to cmn_schedule (Schedule).
     * @summary Schedule.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>}
     */
    schedule: $$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>;

    /**
     * Description
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    short_description: $$rhino.Nilable<$$property.Element>;

    /**
     * Start date
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
    start_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Subcategory
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    subcategory: $$rhino.Nilable<$$property.Element>;
}

declare type cmdb_ciGlideRecord = cmdbGlideRecord & cmdb_ciFields;

/**
 * GlideElement values from the Business Service table.
 * @interface cmdb_ci_serviceFields
 * @extends {cmdb_ciFields}
 */
declare interface cmdb_ci_serviceFields extends cmdb_ciFields {
    /**
     * Business Criticality
     * @type {$$rhino.Nilable<$$property.generic.Element<("1 - most critical" | "2 - somewhat critical" | "3 - less critical" | "4 - not critical")>>}
     */
    busines_criticality: $$rhino.Nilable<$$property.generic.Element<("1 - most critical" | "2 - somewhat critical" | "3 - less critical" | "4 - not critical")>>;

    /**
     * Parent field. Refers to cmdb_ci_service (Business Service).
     * @summary Parent.
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ci_serviceFields, cmdb_ci_serviceGlideRecord>>}
     */
    parent: $$rhino.Nilable<$$property.generic.Reference<cmdb_ci_serviceFields, cmdb_ci_serviceGlideRecord>>;

    /**
     * Portfolio status
     * @type {$$rhino.Nilable<$$property.generic.Element<("pipeline" | "catalog" | "retired")>>}
     */
    portfolio_status: $$rhino.Nilable<$$property.generic.Element<("pipeline" | "catalog" | "retired")>>;

    /**
     * Price model
     * @type {$$rhino.Nilable<$$property.generic.Element<("fixed" | "per_unit")>>}
     */
    price_model: $$rhino.Nilable<$$property.generic.Element<("fixed" | "per_unit")>>;

    /**
     * Price unit
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    price_unit: $$rhino.Nilable<$$property.Element>;

    /**
     * Service classification
     * @type {$$rhino.Nilable<$$property.generic.Element<("Business Service" | "Technical Service" | "Service Offering" | "Shared Service" | "Application Service" | "Billable Service")>>}
     */
    service_classification: $$rhino.Nilable<$$property.generic.Element<("Business Service" | "Technical Service" | "Service Offering" | "Shared Service" | "Application Service" | "Billable Service")>>;

    /**
     * Service level requirement
     * @type {$$rhino.Nilable<$$property.TranslatedHTML>}
     */
    service_level_requirement: $$rhino.Nilable<$$property.TranslatedHTML>;

    /**
     * Service status
     * @type {$$rhino.Nilable<$$property.generic.Element<("design" | "requirements" | "definition" | "development" | "analysis" | "buildtestrelease" | "approved" | "operational" | "chartered" | "retiring")>>}
     */
    service_status: $$rhino.Nilable<$$property.generic.Element<("design" | "requirements" | "definition" | "development" | "analysis" | "buildtestrelease" | "approved" | "operational" | "chartered" |
        "retiring")>>;

    /**
     * SLA field. Refers to sla (Agreement).
     * @summary SLA.
     * @type {$$rhino.Nilable<$$property.generic.Reference<slaFields, slaGlideRecord>>}
     */
    sla: $$rhino.Nilable<$$property.generic.Reference<slaFields, slaGlideRecord>>;

    /**
     * Unit description field. Internal type is "html".
     * @summary Unit description.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    unit_description: $$rhino.Nilable<$$property.Element>;

    /**
     * Used for
     * @type {$$rhino.Nilable<$$property.generic.Element<("Production" | "Staging" | "QA" | "Test" | "Development" | "Demonstration" | "Training" | "Disaster recovery")>>}
     */
    used_for: $$rhino.Nilable<$$property.generic.Element<("Production" | "Staging" | "QA" | "Test" | "Development" | "Demonstration" | "Training" | "Disaster recovery")>>;

    /**
     * Users supported field. Refers to sys_user_group (Group).
     * @summary Users supported.
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>}
     */
    user_group: $$rhino.Nilable<$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>;

    /**
     * Version
     * @type {$$rhino.Nilable<$$property.Element>}
     */
    version: $$rhino.Nilable<$$property.Element>;
}

declare type cmdb_ci_serviceGlideRecord = cmdb_ciGlideRecord & cmdb_ci_serviceFields;

/**
 * GlideElement values from the Physical Network table.
 * @interface x_44813_phys_net_networkFields
 * @extends {cmdb_ciFields}
 */
declare interface x_44813_phys_net_networkFields extends cmdb_ciFields {
}

declare type x_44813_phys_net_networkGlideRecord = cmdb_ciGlideRecord & x_44813_phys_net_networkFields;

/**
 * GlideElement values from the Security Classification table.
 * @interface Ix_44813_sec_clsif_definitionFields
 * @extends {Isys_metadataFields}
 */
declare interface x_44813_sec_clsif_definitionFields extends sys_metadataFields {
	/**
	 * Active
	 * @type {$$property.Boolean}
	 * @memberof x_44813_sec_clsif_definitionFields
	 */
    active: $$property.Boolean;

	/**
	 * Name
	 * @type {$$property.Element}
	 * @memberof x_44813_sec_clsif_definitionFields
	 */
    name: $$property.Element;

	/**
	 * Internal type is integer
	 * @summary Order
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof x_44813_sec_clsif_definitionFields
	 */
    order: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Portion Marking
	 * @type {$$property.Element}
	 * @memberof x_44813_sec_clsif_definitionFields
	 */
    portion_marking: $$property.Element;
}

declare type x_44813_sec_clsif_definitionGlideRecord = sys_metadataGlideRecord & x_44813_sec_clsif_definitionFields;

declare interface change_request_imacFields extends change_requestFields {
    /**
     * Move department
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
     */
    move_department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Move from
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    move_from: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Move from dc
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>}
     */
    move_from_dc: $$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>;

    /**
     * Move to
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>}
     */
    move_to: $$rhino.Nilable<$$property.generic.Reference<cmn_locationFields, cmn_locationGlideRecord>>;

    /**
     * Move to dc
     * @type {$$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>}
     */
    move_to_dc: $$rhino.Nilable<$$property.generic.Reference<cmdb_ciFields, cmdb_ciGlideRecord>>;

    /**
     * Move user
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
    move_user: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Network component
     * @type {$$property.Boolean}
     */
    network_component: $$property.Boolean;
}

declare type change_request_imacGlideRecord = change_requestGlideRecord & change_request_imacFields;

declare interface incident_taskFields extends taskFields {
    /**
     * Incident
     * @type {$$rhino.Nilable<$$property.generic.Reference<incidentFields, incidentGlideRecord>>}
     */
    incident: $$rhino.Nilable<$$property.generic.Reference<incidentFields, incidentGlideRecord>>;
}

declare type incident_taskGlideRecord = taskGlideRecord & incident_taskFields;

declare interface kb_knowledgeFields extends IExtendedGlideTableProperties {
}

declare class GlideJSUtil {
    static isInstanceOf(object: any, typeName: string): boolean;

    static isJavaArray(object: any): boolean;

    static getJavaClassName(object: any): string;
}

declare class JSUtil {
    static isJavaObject(object: any): boolean;
}

declare class GlideRhinoHelper {
    static getNativeFromRhino(object: any): any;
}

declare class GlideURI {
    constructor();

    /**
     * Returns the specified parameter.
     * @param name The parameter name.
     * @returns {string} The value for the specified parameter.
     */
    get(name: string): string;

    /**
     * Returns the file name portion of the URI.
     * @returns {string} The file name portion of the URI.
     */
    getFileFromPath(): string;

    /**
     * Sets the specified parameter to the specified value.
     * @param name The parameter name.
     * @param value The value.
     */
    set(name: string, value: string): void;

    /**
     * Reconstructs the URI string and performs the proper URL encoding by converting non-valid characters to their URL code. For example, converting & to '%26'.
     * @param path The base portion of the system URL to which the URI is appended.
     * @returns {string} The URL.
     */
    toString(path: string): string;
}

declare class GlideElementEncrypted extends GlideElement {
	getContextID(): string;

	getContextName(): string;

	setContextID(newContextID: string): boolean;
}

declare class GlideActionList extends GlideList {
	constructor(tableName?: string, element?: string);
}

declare class GlideElementReplicationPayload extends GlideElement {
}

declare class GlideList {
	constructor(tableName?: string, element?: string);

	getIDMap(tableName: string, values: Array<any>): Record<string, any>;

	getReference(): string;

	getValues(): Array<any>;

	setValue(o: any): void;
}

declare class GlideIntegerTime {
	constructor(time_OR_cal?: number|any);

	getHour(): number;

	getIntegerTimeValue(): number;

	getMinute(): number;

	getSecond(): number;

	setTime(hours: number, mins: number, secs: number): void;
}

declare class GlideIntegerDate {
	addDays(days: number): void;

	compareTo(otherIntegerDate: any): number;

	constructor(value_OR_year_OR_cal?: number|any, monthOfYear?: number, dayOfMonth?: number);

	daysDiff(end_OR_intDate: GlideIntegerDate|number): number;

	getDisplayValue(): string;

	getValue(): string;

	setValue(o: any): void;
}

declare class GlideScheduleDateTime {
	addDays(days: number): void;

	addSeconds(seconds: number): void;

	compareTo(o: any): number;

	constructor(timeZone_OR_gdt_OR_sdt_OR_cal_OR_d_OR_ms_OR_userDateTime?: any|GlideDateTime|GlideScheduleDateTime|number|string, timeZone?: string);

	convertTimeZone(fromTZ: string, toTZ: string): string;

	equals(idt: GlideScheduleDateTime): boolean;

	getCal(): any;

	getDisplayValue(): string;

	getDisplayValueInternal(): string;

	getGlideDateTime(): GlideDateTime;

	getIntegerDate(): GlideIntegerDate;

	getIntegerTime(): GlideIntegerTime;

	getMS(): number;

	getTimeZone(): any;

	getTimeZoneID(): string;

	getValue(): string;

	getValueInternal(): string;

	isFloating(): boolean;

	setBeginningOfDay(): void;

	setCal(cal: any): void;

	setEndOfDay(): void;

	setIncludeZFormat(value: boolean): void;

	setMS(ms: number): void;

	setTimeZone(tz: string): void;

	setValue(o: any): void;

	toString(): string;
}

declare class GlideChoiceListSet {
	constructor();

	getColumns(): GlideChoiceList;

	getSelected(): GlideChoiceList;

	setColumns(clColumns: GlideChoiceList): void;

	setSelected(clSelected: GlideChoiceList): void;

	sortColumns(): void;

	toXML(): any;
}

declare class GlideSysList {
	InsertListElements(fields: Array<any>): void;

	constructor(tableName: string, parentName?: string);

	createDefaultBaseline(): void;

	getAccessList(collectionKey: string): Array<string>;

	getListColumns(): GlideChoiceList;

	getListRecords(): Array<string>;

	getListSet(): GlideChoiceListSet;

	getRecordSet(): GlideRecord;

	getStandardListID(): string;

	isUserList(): boolean;

	save(fields?: string): void;

	saveForUser(fields: string): void;

	setIncludeFormatting(b: boolean): void;

	setReconcileList(b: boolean): void;

	setRelatedParentID(parentID: string): void;

	setRelatedParentName(parentName: string): void;

	setRelationshipID(relationshipID: string): void;

	setUserApplies(b: boolean): void;
}

declare class GlideScriptEvaluator {
	constructor();

	evaluateGeneratedString(expression: string, returnError: boolean): any;

	evaluateString(expression: string, returnError_OR_identifierKey: boolean|string, returnError?: boolean): any;

	haveError(): boolean;

	setEnforceSecurity(enforce: boolean): void;
}

declare class GlideEvaluator extends GlideScriptEvaluator {
	constructor(inter?: boolean, strict?: boolean);

	static evaluateCondition(condition: string): boolean;

	evaluateString(expression: string, returnError_OR_identifierKey?: boolean|string, returnError?: boolean): any;

	static evaluateStringWithGlobals(expression: string, globals: Record<string, any>): any;

	static interpretGeneratedString(expression: string, returnError?: boolean): any;

	static interpretString(expression: string, returnError?: boolean): any;
}

declare class GlideLRUCache {
	constructor(initialCapacity?: number, loadFactor?: number);

	get(key: any): any;
}

declare class GlideController extends GlideEvaluator {
	constructor(global?: any);

	evaluateAsObject(expression: string, ed?: GlideElementDescriptor): any;

	static exists(name: string): any;

	static getCache(): GlideLRUCache;

	static getGlobal(name: string): any;

	static getSandboxGlobal(name: string): any;

	static putGlobal(name: string, value: any): void;

	static removeGlobal(string_1: string): void;
}

declare class GlideChoiceList {
	add(choice_OR_value: GlideChoice|string, label?: string): boolean;

	addAll(cl: GlideChoiceList): void;

	addFirst(value: string, label: string): void;

	addNone(): GlideChoice;

	constructor();

	getChoice(index_OR_value: number|string): GlideChoice;

	static getChoiceList(tableName: string, fieldName: string): GlideChoiceList;

	getChoiceNoTrim(value: string): GlideChoice;

	getLabelOf(value: string): string;

	getNullOverride(gc: GlideController): string;

	getSelectedIndex(): number;

	getSize(): number;

	getValueOf(label: string): string;

	removeChoice(value_OR_i: string|number): GlideChoice;

	removeNone(): void;

	sort(): void;

	toJSON(): any;

	toXML(x: GlideXMLDocument): void;
}

declare class GlideXMLDocument {
	constructor(d_OR_rootName_OR_file?: any|string);

	createCDATAElement(name: string, value: string): any;

	createComment(msg: string): any;

	createElement(name: string, value?: string): any;

	getChildTextByTagName(parent: any, tagName: string): string;

	getDocument(): any;

	getDocumentElement(): any;

	getElementByTagName(tagName: string): any;

	getElementValueByTagName(tagName: string): string;

	importElement(e: any): any;

	importElementToParent(e: any, parent: any): any;

	isNamespaceAware(): boolean;

	isValid(): boolean;

	parse(xml: string): boolean;

	pop(): void;

	selectNodes(xpath: string): any;

	selectSingleNode(xpath_OR_currentNode: string|any, xpath?: string): any;

	selectSingleNodeText(xpath: string): string;

	setAttribute(name: string, value: string): void;

	setCurrent(e: any): void;

	setDocument(document: any|string): void;

	setNamespaceAware(nsAware: boolean): void;

	setText(e: any, text: string): void;

	toIndentedString(): string;

	toString(): string;
}

declare class GlideElementViewable extends GlideElement {
	constructor();

	getHTMLValueIntelligently(canWrite: boolean): string;

	getUpdateLink(): string;
}

declare class GlideElementAudio extends GlideElementViewable {
	constructor();

	getHTMLValueIntelligently(canWrite: boolean): string;
}

declare class GlideElementVariable extends GlideElementGlideObject {
	constructor();

	getDecryptedValue(): string;
}

declare class GlideActionURL {
	setRedirectURL(o: any): void;
}

declare class GlideChoice {
	constructor(value: string, label: string, sysId?: string);

	getId(): string;

	getImage(): string;

	getLabel(): string;

	getParameter(name: string): any;

	getSelected(): boolean;

	getValue(): string;

	setId(sysId: string): void;

	setImage(image: string): void;

	setLabel(string_1: string): void;

	setParameter(name: string, value: any): void;

	setSelected(selected: boolean): void;

	setValue(string_1: string): void;
}

declare class PhoneNumberFormat {
	constructor();

	getGlobalDialingCode(): string;

	getInternationalDialingCode(): string;

	getLocalDialingCode(): string;

	getTerritory(): string;

	isLocalDialingCodeOptional(): boolean;

	isLocalFollowsGlobal(): boolean;
}

declare class GlideElementPhoneNumber extends GlideElement {
	constructor();

	getGlobalDialingCode(): string;

	getGlobalDisplayValue(): string;

	getLocalDialingCode(): string;

	getLocalDialingCodeOptionalText(): string;

	getLocalDisplayValue(): string;

	getPartialMatchType(): string;

	getPhoneFormatForLocation(locationSysId: string): PhoneNumberFormat;

	getPhoneFormatForTerritory(territorySysId: string): PhoneNumberFormat;

	getPhoneFormatForUser(userSysId: string): PhoneNumberFormat;

	getPhoneTerritories(): any;

	getTerritory(): string;

	getTerritoryForUser(userSysID: string): string;

	getUsersExitCode(): string;

	getUsersPhoneFormat(): PhoneNumberFormat;

	getUsersTerritory(): string;

	getValue(): string;

	isLocalFollowsGlobal(): boolean;

	isStrict(): boolean;

	isValid(): boolean;

	setAllowNationalEntry(allowNationalEntry: boolean): void;

	setPhoneNumber(value: any, strict: boolean): boolean;

	setPhoneNumberFormat(phoneNumberFormat: PhoneNumberFormat): void;

	setStrict(strict: boolean): void;
}

declare class GlideElementRelatedTags extends GlideElement {
	constructor();

	getLabelIds(): string;

	getLabelsAsJson(): string;
}

declare class GlideSysAttachment {
	changeEncryptionContext(sourceTable: string, sourceID: string, attachmentID: string, newEncryptionContextID: string): void;

	constructor(fp_OR_ignoreDomain_OR_sysID?: any|boolean|string, ignoreDomain?: boolean);

	static copy(sourceTable: string, sourceID: string, targetTable: string, targetID: string, targetFieldName?: string): Array<any>;

	deleteAll(gr: GlideRecord): void;

	deleteAttachment(sysID: string): void;

	exists(): boolean;

	fixImageDimensions(reset: boolean): void;

	get(input: GlideRecord, fieldName: string): string;

	getAllAttachments(tableName: string, sys_id: string): GlideRecord;

	static getAttachmentParts(id: string): GlideRecord;

	getAttachments(tableName: string, sys_id: string): GlideRecord;

	getBytes(tableName_OR_gr: string|GlideRecord, sys_id?: string): number;

	getContentStream(sysAttachmentID: string): any;

	getParameter(name: string): any;

	static move(sourceTable: string, sourceID: string, targetTable: string, targetID: string): void;

	renameAttachment(sysID: string, newName: string, initialUpload: boolean): number;

	static selectIcon(sys_ids_string: string): string;

	static selectIconFromGR(gr: GlideRecord): string;

	static selectThumbnail(sys_id: string): string;

	setImageDimensions(sys_id: string, contentType: string): void;

	write(gr_OR_tableSysID: GlideRecord|string, fieldName_OR_fileName_OR_tableName: string, content_OR_contentType_OR_fileName: string, content_OR_contentType?: string|Array<number>, in_1?: any,
        domainID?: string): void;

	writeContentStream(gr: GlideRecord, fileName: string, contentType: string, is: any): string;

	writeParts(request: any, tableName: string, tableSysID: string, attachmentToRecordAssociations: any): void;
}