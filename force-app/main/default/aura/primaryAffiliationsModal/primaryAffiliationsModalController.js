({
    handleAccountRecordTypeChange: function (component, event, helper) {
        helper.handleAccountRecordTypeChange(component, event.getParam("accountRecordType"));
    },
    handleContactFieldChange: function (component, event, helper) {
        helper.handleContactFieldChange(component, event.getParam("contactField"));
    },
    displayErrors: function (component, event, helper) {
        console.log('primaryAffiliationsModal displayErrors');
        helper.handleDisplayErrors(component, event.getParam('arguments'));
    }
});
