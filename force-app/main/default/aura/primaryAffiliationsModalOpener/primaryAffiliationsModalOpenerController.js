({
    openPrimaryAffiliationsModal: function (component, event, helper) {
        helper.openPrimaryAffiliationsModal(component, event.getParam('arguments'));
    },
    handleModalDataChangeEvent: function (component, event, helper) {
        helper.handleModalDataChangeEvent(component,event);
    },
    handleModalFooterEvent: function (component, event, helper) {
        helper.handleModalFooterEvent(component,event);
    },
    closeModal: function (component, event, helper) {
        console.log('primaryAffiliationsModal opener closemodal');
        helper.handleCloseModal(component);
    },
    displayErrors: function (component, event, helper) {
        console.log('primaryAffiliationsModal opener displayErrors');
        helper.handleDisplayErrors(component, event.getParam('arguments'));
    }
});
