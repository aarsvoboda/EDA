import { LightningElement, api, track, wire } from "lwc";

import getAccountRecordTypeComboboxVModel from "@salesforce/apex/AffiliationsSettingsController.getAccountRecordTypeComboboxVModel";
import getContactAccountLookupFieldComboboxVModel from "@salesforce/apex/AffiliationsSettingsController.getContactAccountLookupFieldComboboxVModel";

import stgApiNameLabel from "@salesforce/label/c.stgApiNameLabel";
import stgColAccountRecordType from "@salesforce/label/c.stgColAccountRecordType";
import stgColContactPrimaryAfflField from "@salesforce/label/c.stgColContactPrimaryAfflField";
import stgOptSelect from "@salesforce/label/c.stgOptSelect";
import stgAffiliationsEditModalBody from "@salesforce/label/c.stgAffiliationsEditModalBody";
import stgAffiliationsNewModalBody from "@salesforce/label/c.stgAffiliationsNewModalBody";
import stgTellMeMoreLink from "@salesforce/label/c.stgTellMeMoreLink";
import stgAffiliationsDeleteModalBody from "@salesforce/label/c.stgAffiliationsDeleteModalBody";
import stgAfflDeleteWithAutoEnrollment from "@salesforce/label/c.stgAfflDeleteWithAutoEnrollment";

export default class PrimaryAffiliationsModalBody extends LightningElement {
    isAccountRecordTypeInitDone = false;
    isContactFieldInitDone = false;

    @api affiliationsAction;
    @api accountRecordType;
    @api contactField;
    @api autoEnrollmentEnabled;
    @api lastname = 'test';

    @track accountRecordTypeComboboxVModel;
    @track accountRecordTypeComboboxWireResult;

    @track contactAccountLookupFieldComboboxVModel;
    @track contactAccountLookupFieldComboboxWireResult;

    labelReference = {
        accountRecordTypeCombobox: stgColAccountRecordType,
        apiNameDisplay: stgApiNameLabel,
        comboboxPlaceholderText: stgOptSelect,
        contactFieldCombobox: stgColContactPrimaryAfflField,
        modalBodyEditSave: stgAffiliationsEditModalBody,
        modalBodyDelete: stgAffiliationsDeleteModalBody,
        modalBodyDeleteWithAutoEnrollment: stgAfflDeleteWithAutoEnrollment,
        tellMeMoreLink: stgTellMeMoreLink,
        modalBodyCreate: stgAffiliationsNewModalBody,
    };

    affiliationsHyperLink =
        '<a href="https://powerofus.force.com/s/article/EDA-Configure-Affiliations-Settings">' +
        this.labelReference.tellMeMoreLink +
        "</a>";

    inputAttributeReference = {
        accountRecordType: "primaryAffiliationsAccountRecordType",
        contactField: "primaryAffiliationsContactField",
    };

    @wire(getAccountRecordTypeComboboxVModel, {
        recordTypeToCheck: "$accountRecordType",
    })
    accountRecordTypeComboboxVModelWire(result) {
        this.accountRecordTypeComboboxWireResult = result;

        if (result.data) {
            this.accountRecordTypeComboboxVModel = result.data;
        } else if (result.error) {
            //console.log("error retrieving accountRecordTypeComboboxVModel");
        }
    }

    @wire(getContactAccountLookupFieldComboboxVModel, {
        contactFieldToCheck: "$contactField",
    })
    contactAccountLookupFieldComboboxVModelWire(result) {
        this.contactAccountLookupFieldComboboxWireResult = result;

        if (result.data) {
            this.contactAccountLookupFieldComboboxVModel = result.data;
        } else if (result.error) {
            //console.log("error retrieving preferredContactInfoSettingsVModel");
        }
    }

    get modifyRecords() {
        return this.affiliationsAction === "edit" || this.affiliationsAction === "create";
    }

    get deleteRecords() {
        return this.affiliationsAction === "delete";
    }

    get accountRecordTypeApiNameLabel() {
        return this.labelReference.apiNameDisplay.replace("{0}", this.accountRecordTypeComboboxVModel.value);
    }

    get contactFieldApiNameLabel() {
        return this.labelReference.apiNameDisplay.replace("{0}", this.contactAccountLookupFieldComboboxVModel.value);
    }

    handleInitValidation(){

        console.log('handleInitValidation lwc');

        //AccountRecordType
        let accountRecordTypeElement = this.template.querySelector("[data-qa-locator='" + this.inputAttributeReference.accountRecordType + "']");

        if (accountRecordTypeElement && this.isAccountRecordTypeInitDone == false) {
            let accountRecordTypeValue = accountRecordTypeElement.value;
            let isAccountRecordTypeValid = this.handleValidation("accountRecordType");
            this.dispatchAccountRecordTypeChangeEvent(accountRecordTypeValue, isAccountRecordTypeValid);

            console.log('accountRecordTypeValue: ' + accountRecordTypeValue);
            console.log('isAccountRecordTypeValid: ' + isAccountRecordTypeValid);
            this.isAccountRecordTypeInitDone = true;
        }
        //ContactField
        let contactFieldElement = this.template.querySelector("[data-qa-locator='" + this.inputAttributeReference.contactField + "']");
        if (contactFieldElement && this.isContactFieldInitDone == false) {
            
            let contactFieldValue = contactFieldElement.value;
            let isContactFieldValid = this.handleValidation("contactField");
            this.dispatchContactFieldChangeEvent(contactFieldValue, isContactFieldValid);

            console.log('contactFieldValue: ' + contactFieldValue);
            console.log('isContactFieldValid: ' + isContactFieldValid);

            this.isContactFieldInitDone = true;

        }

    }

    handleAccountRecordTypeChange(event) {
        let isValid = this.handleValidation("accountRecordType");
        this.dispatchAccountRecordTypeChangeEvent(event.detail.value, isValid);
    }

    dispatchAccountRecordTypeChangeEvent(accountRecordType, isValid) {
        const accountRecordTypeDetails = {
            accountRecordType: accountRecordType,
            isValid: isValid
        };

        const accountRecordTypeChangeEvent = new CustomEvent("accountrecordtypechange", {
            detail: accountRecordTypeDetails,
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(accountRecordTypeChangeEvent);
    }

    handleContactFieldChange(event) {
        let isValid = this.handleValidation("contactField");
        this.dispatchContactFieldChangeEvent(event.detail.value, isValid);
    }

    dispatchContactFieldChangeEvent(contactField, isValid) {
        const contactFieldDetails = {
            contactField: contactField,
            isValid: isValid
        };

        const contactFieldChangeEvent = new CustomEvent("contactfieldchange", {
            detail: contactFieldDetails,
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(contactFieldChangeEvent);
    }

    get affiliationsDesc() {
        switch (this.affiliationsAction) {
            case "edit":
                return this.labelReference.modalBodyEditSave + " " + this.affiliationsHyperLink;

            case "create":
                return this.labelReference.modalBodyCreate + " " + this.affiliationsHyperLink;
        }
    }

    get deleteWarning() {
        let deleteWarningText = this.labelReference.modalBodyDelete
            .replace("{0}", this.accountRecordType)
            .replace("{1}", this.contactField);

        if (!this.autoEnrollmentEnabled) {
            return deleteWarningText;
        }

        let autoEnrollmentDeleteWarningText =
            this.labelReference.modalBodyDeleteWithAutoEnrollment.replace("{0}", this.accountRecordType) + " ";

        return autoEnrollmentDeleteWarningText.concat(deleteWarningText);
    }


    // Standard lifecycle hooks used to sub/unsub to message channel
    renderedCallback() {
        console.log('rendered called');
        if (this.affiliationsAction === 'edit') {
            if (this.isAccountRecordTypeInitDone === false || 
                this.isContactFieldInitDone === false) {
                this.handleInitValidation();
            }
        }
    }


    @api
    validate(errorParameters) {
        console.log('Body Received:' + JSON.stringify(errorParameters));

        let comboElement = this.template.querySelector("[data-qa-locator='" + errorParameters.elementId + "']");
        comboElement.setCustomValidity(errorParameters.message);
        comboElement.reportValidity();
    }

    @api
    show(){
        console.log('body show fired');
    }

    getValidationResult(field) {
        let validationResult;

        if (field === "accountRecordType") {
            validationResult = {
                success: false,
                elementId: "primaryAffiliationsAccountRecordType",
                error: {
                    message: "Oooops! There is an error with this field"
                }
            };
        }

        if (field === "contactField") {
            validationResult = {
                success: true,
                elementId: "primaryAffiliationsContactField",
                error: {
                    message: "Oooops! There is an error with this field"
                }
            };
        }

        return validationResult;
    }

    handleValidation(field) {
        let validationResult = this.getValidationResult(field);
        let comboElement = this.template.querySelector("[data-qa-locator='" + validationResult.elementId + "']");
        
        if (validationResult.success === false) {
            comboElement.setCustomValidity(validationResult.error.message);
            comboElement.reportValidity();
            return false;
        }
        if (validationResult.success === true) {
            comboElement.setCustomValidity("");
            comboElement.reportValidity();
            return true;
        }
    }
    
}
