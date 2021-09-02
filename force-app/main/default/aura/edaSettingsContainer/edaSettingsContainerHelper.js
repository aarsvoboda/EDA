({
    setPageReference: function (component) {
        const componentPageReference = component.get("v.pageReference");
        component.set("v.pageReference", componentPageReference);
    },
    openPrimaryAffiliationModal: function (component, eventParameters) {
        const mappingName = eventParameters.mappingName;
        const affiliationsAction = eventParameters.affiliationsAction;
        const accountRecordType = eventParameters.accountRecordType;
        const contactField = eventParameters.contactField;
        const autoProgramEnrollment = eventParameters.autoProgramEnrollment;

        component
            .find("primaryAffiliationsModal")
            .openPrimaryAffiliationsModal(
                affiliationsAction,
                mappingName,
                accountRecordType,
                contactField,
                autoProgramEnrollment
            );
    },
    openAutoEnrollmentMappingModal: function (component, eventParameters) {
        const actionName = eventParameters.actionName;
        const mappingName = eventParameters.mappingName;
        const oldAccountRecordType = eventParameters.accountRecordType;
        const autoProgramEnrollmentStatus = eventParameters.autoProgramEnrollmentStatus;
        const autoProgramEnrollmentRole = eventParameters.autoProgramEnrollmentRole;

        component
            .find("autoEnrollmentMappingModal")
            .openAutoEnrollmentMappingModal(
                actionName,
                mappingName,
                oldAccountRecordType,
                autoProgramEnrollmentStatus,
                autoProgramEnrollmentRole
            );
    },
    openRelationshipMappingModal: function (component, eventParameters) {
        const actionName = eventParameters.actionName;
        const relationshipMappingName = eventParameters.relationshipMappingName;
        const femaleValue = eventParameters.femaleValue;
        const maleValue = eventParameters.maleValue;
        const neutralValue = eventParameters.neutralValue;
        const isActive = eventParameters.isActive;

        component
            .find("relationshipMappingModal")
            .openRelationshipMappingModal(
                actionName,
                relationshipMappingName,
                femaleValue,
                maleValue,
                neutralValue,
                isActive
            );
    },
    openSettingsBatchJobModal: function (component, eventParameters) {
        const batchJobToRun = eventParameters.batchJobToRun;
        component.find("settingBatchJobModal").openSettingsBatchJobModal(batchJobToRun);
    },
    handleModalSaveEvent: function (component, saveModel) {
        const edaSettings = component.find("edaSettings");
        const edaSettingsElement = edaSettings.getElement();
        edaSettingsElement.modalSave(saveModel);
    },
    closeModal: function (component, eventParameters) {
        console.log('eda settings helper closemodal');
        const modal = eventParameters.modal;
        component.find(modal).closeModal();
    },
    handleDisplayErrors: function (component, errorParameters) {
        console.log('eda settings helper handleDisplayErrors');
        const modal = errorParameters.modal;
        component.find(modal).displayErrors(errorParameters);
    }
});
