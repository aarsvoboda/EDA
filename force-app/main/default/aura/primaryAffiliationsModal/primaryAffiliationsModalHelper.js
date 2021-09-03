({
    handleAccountRecordTypeChange: function (component, accountRecordType) {
        component.set("v.accountRecordType", accountRecordType);
        this.dispatchDataChangeEvent(component, "accountRecordType", accountRecordType);
    },
    handleContactFieldChange: function (component, contactField) {
        component.set("v.contactField", contactField);
        this.dispatchDataChangeEvent(component, "contactField", contactField);
    },
    dispatchDataChangeEvent: function (component, field, fieldValue) {
        let modalDataChangeEvent = component.getEvent("modalDataChangeEvent");
        modalDataChangeEvent.setParams({
            field: field,
            fieldValue: fieldValue
        });
        modalDataChangeEvent.fire();
    },

    handleDisplayErrors: function (component, parameters) {
        console.log('primaryAffiliationsModal  helper handleDisplayErrors');
        console.log(JSON.stringify(parameters));

        component.find("primaryAffiliationsModalBody").validate(parameters.errorParameters);
    }
});
