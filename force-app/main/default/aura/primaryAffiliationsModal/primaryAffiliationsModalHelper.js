({
    handleAccountRecordTypeChange: function (component, accountRecordType, isValid) {
        component.set("v.accountRecordType", accountRecordType);
        component.set("v.isValid", isValid);
        this.dispatchDataChangeEvent(component, "accountRecordType", accountRecordType, isValid);
    },
    handleContactFieldChange: function (component, contactField, isValid) {
        component.set("v.contactField", contactField);
        component.set("v.isValid", isValid);
        this.dispatchDataChangeEvent(component, "contactField", contactField, isValid);
    },
    dispatchDataChangeEvent: function (component, field, fieldValue, isValid) {
        let modalDataChangeEvent = component.getEvent("modalDataChangeEvent");
        modalDataChangeEvent.setParams({
            field: field,
            fieldValue: fieldValue,
            isValid: isValid
        });
        modalDataChangeEvent.fire();
    },

    handleDisplayErrors: function (component, parameters) {
        console.log('primaryAffiliationsModal  helper handleDisplayErrors');
        console.log(JSON.stringify(parameters));

        component.find("primaryAffiliationsModalBody").validate(parameters.errorParameters);
    },
    handleInitValidation: function (component) {
        console.log('handleInitValidation  helper');

        component.find("primaryAffiliationsModalBody").handleInitValidation();
    }
});
