({
    openPrimaryAffiliationsModal: function (component, eventParameters) {
        const affiliationsAction = eventParameters.affiliationsAction;
        const mappingName = eventParameters.mappingName;
        const accountRecordType = eventParameters.accountRecordType;
        const contactField = eventParameters.contactField;
        const autoProgramEnrollment = eventParameters.autoProgramEnrollment;

        component.set("v.affiliationsAction", affiliationsAction);
        component.set("v.mappingName", mappingName);
        component.set("v.accountRecordType", accountRecordType);
        component.set("v.contactField", contactField);
        component.set("v.autoProgramEnrollment", autoProgramEnrollment);

        let modalBody;
        let modalFooter;

        let modalHeaderLabel;
        let confirmButton;
        let cancelButton;

        let primaryAffiliationModalCmp;

        switch (component.get("v.affiliationsAction")) {
            case "create":
                modalHeaderLabel = $A.get("$Label.c.stgNewAfflMapping");
                confirmButton = $A.get("$Label.c.stgBtnSave");
                cancelButton = $A.get("$Label.c.stgBtnCancel");
                break;
            case "edit":
                modalHeaderLabel = $A.get("$Label.c.stgAffiliationsEditModalTitle");
                confirmButton = $A.get("$Label.c.stgBtnSave");
                cancelButton = $A.get("$Label.c.stgBtnCancel");
                break;
            case "delete":
                modalHeaderLabel = $A.get("$Label.c.stgAffiliationsDeleteModalTitle");
                cancelButton = $A.get("$Label.c.stgBtnCancel");
                confirmButton = $A.get("$Label.c.stgBtnDelete");
                break;
        }

        $A.createComponents(
            [
                [
                    "c:primaryAffiliationsModal",
                    {   "aura:id": "primaryAffiliationsModalId",
                        affiliationsAction: component.get("v.affiliationsAction"),
                        accountRecordType: component.get("v.accountRecordType"),
                        contactField: component.get("v.contactField"),
                        autoProgramEnrollment: component.get("v.autoProgramEnrollment"),
                        modalDataChangeEvent: component.getReference("c.handleModalDataChangeEvent")
                    }
                ],
                [
                    "c:customModalFooter",
                    {
                        "aura:id": "customModalFooterId",
                        confirmButtonLabel: confirmButton,
                        confirmButtonTitle: confirmButton,
                        cancelButtonLabel: cancelButton,
                        cancelButtonTitle: cancelButton,
                        customModalFooterEvent: component.getReference("c.handleModalFooterEvent")
                    }
                ]
            ],
            function (components, status) {
                if (status === "SUCCESS") {
                    modalBody = components[0];
                    modalFooter = components[1];
                    
                    //Create the modal
                    var overlayPromise = component.find("edaOverlayLibrary").showCustomModal({
                        header: modalHeaderLabel,
                        body: modalBody,
                        footer: modalFooter,
                        showCloseButton: false
                    });
                    component.set("v.overlayPromise", overlayPromise);

                    if(components) {
                        console.log('body: '+JSON.stringify(components[0]));
                        console.log('footer: '+JSON.stringify(components[1]));

                        //The footer is aura and works
                        components[1].show();

                        //The body is lwc and doesnt work
                        //components[0].show();

                        //Trying to store(footer) the aura component in a variable
                        component.set("v.primaryAffiliationModalFooterCmp", components[1]);

                        //Trying to store(body)the lwc component in a variable
                        component.set("v.primaryAffiliationModalBodyCmp", components[0]);

                        console.log('all fine');

                    }

                    /*
                    component.set("v.primaryAffiliationModalBodyCmp", modalBody);
                    console.log('body: '+JSON.stringify(modalBody));
                    console.log('modalFooter: '+JSON.stringify(modalFooter));
                    */
                }
            }
        );
    },
    handleModalDataChangeEvent: function (component, event) {
        event.stopPropagation();
        const field = event.getParam("field");
        const fieldValue = event.getParam("fieldValue");
        switch (field) {
            case "accountRecordType":
                component.set("v.accountRecordType", fieldValue);
                break;
            case "contactField":
                component.set("v.contactField", fieldValue);
                break;
        }
    },
    handleModalFooterEvent: function (component, event) {
        event.stopPropagation();
        switch (event.getParam("action")) {
            case "confirm":
                this.handleModalFooterConfirm(component);
                break;
        }
    },
    handleModalFooterConfirm: function (component) {
        switch (component.get("v.affiliationsAction")) {
            case "create":
                this.handleModalCreateConfirm(component);
                break;
            case "edit":
                this.handleModalEditConfirm(component);
                break;
            case "delete":
                this.handleModalDeleteConfirm(component);
                break;
        }
    },

    handleModalEditConfirm: function (component) {
        let modalSaveEvent = component.getEvent("modalSaveEvent");

        const mappingName = component.get("v.mappingName");
        const affiliationsAction = component.get("v.affiliationsAction");
        const accountRecordType = component.get("v.accountRecordType");
        const contactField = component.get("v.contactField");

        const saveModel = {
            modalType: "affiliations",
            action: affiliationsAction,
            mappingName: mappingName,
            accountRecordType: accountRecordType,
            contactField: contactField
        };

        modalSaveEvent.setParams({
            saveModel: saveModel
        });
        modalSaveEvent.fire();
    },

    handleModalDeleteConfirm: function(component) {
        let modalSaveEvent = component.getEvent("modalSaveEvent");

        const mappingName = component.get("v.mappingName");
        const affiliationsAction = component.get("v.affiliationsAction");
        const accountRecordType = component.get("v.accountRecordType");
        const contactField = component.get("v.contactField");
        const autoProgramEnrollment = component.get("v.autoProgramEnrollment");

        const saveModel = {
            modalType: "affiliations",
            action: affiliationsAction,
            mappingName: mappingName,
            accountRecordType: accountRecordType,
            contactField: contactField,
            autoEnrollmentEnabled: autoProgramEnrollment
        };
        
        modalSaveEvent.setParams({
            saveModel: saveModel
        });
        modalSaveEvent.fire();
    },
    handleModalCreateConfirm: function (component) {
        let modalSaveEvent = component.getEvent("modalSaveEvent");

        const mappingName = component.get("v.accountRecordType");
        const affiliationsAction = component.get("v.affiliationsAction");
        const accountRecordType = component.get("v.accountRecordType");
        const contactField = component.get("v.contactField");

        const saveModel = {
            modalType: "affiliations",
            action: affiliationsAction,
            mappingName: mappingName,
            accountRecordType: accountRecordType,
            contactField: contactField
        };

        modalSaveEvent.setParams({
            saveModel: saveModel
        });
        modalSaveEvent.fire();
    },
    handleCloseModal: function (component) {
        console.log('primary affiliation opener helper close modal');
        component.get("v.overlayPromise").then(function(overlay){
            overlay.close();
        });
    },

    handleDisplayErrors: function (component, parameters) {
        console.log('primary affiliation opener helper handleDisplayErrors');
        console.log(JSON.stringify(parameters));

        var payload = {
            validationErrors : parameters.errorParameters
        };

        //Test 1 - Using a stored aura component
        //It doesnt work
        let primaryAffiliationModalFooterCmp = component.get("v.primaryAffiliationModalFooterCmp");
        primaryAffiliationModalFooterCmp.show();
        

        /* 
        //Test 2 - Using the aura component id - 
        //works the first time and when the next popup opens, it throws an error
        let customModalFooter = component.find("customModalFooterId");
        customModalFooter.show();
        */

        
        // Test 3 - Using a stored lwc component (I thought it was a lwc but it is aura duhh!)
        // It works!
        let primaryAffiliationModalBodyCmp = component.get("v.primaryAffiliationModalBodyCmp");
        primaryAffiliationModalBodyCmp.displayErrors(parameters.errorParameters);
        
        
        /*
        // Test 4 - Using the lwc component id
        // It doesn't work, multiples examples show this is possible, but this example inserts the modalBody into the overlay framework not in the opener.
        let primaryAffiliationModalBody = component.find("primaryAffiliationsModalId");
        primaryAffiliationModalBody.show();
        */


        // Publish LMS message with payload
        component.find("validationErrors").publish(payload);

    }
});
