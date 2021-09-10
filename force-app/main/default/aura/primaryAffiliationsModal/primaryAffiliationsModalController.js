({
    handleAccountRecordTypeChange: function (component, event, helper) {
        helper.handleAccountRecordTypeChange(
            component, 
            event.getParam("accountRecordType"),
            event.getParam("isValid")
            );
    },
    handleContactFieldChange: function (component, event, helper) {
        helper.handleContactFieldChange(
            component, 
            event.getParam("contactField"),
            event.getParam("isValid")
            );
    },
    displayErrors: function (component, event, helper) {
        console.log('primaryAffiliationsModal displayErrors');
        helper.handleDisplayErrors(component, event.getParam('arguments'));
    }
});
