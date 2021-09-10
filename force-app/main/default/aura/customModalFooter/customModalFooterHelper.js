({
    fireButtonClickEvent: function (component, buttonClicked) {
        let customModalFooterEvent = component.getEvent("customModalFooterEvent");
        customModalFooterEvent.setParams({
            action: buttonClicked
        });

        try {
            customModalFooterEvent.fire();
            /*
            if (buttonClicked === "cancel"){
                component.find("edaOverlayLibrary").notifyClose();
            }
            */
            component.find("edaOverlayLibrary").notifyClose();
        } catch (e) {
            //save for validation handling
            //console.error(e);
            console.log(e.message);
            var message = e.message.substring(
                e.message.indexOf("[") + 1, 
                e.message.lastIndexOf("]")
            );

            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                type: "error",
                mode: 'sticky',
                "title": "Error",
                "message": message
            });
            toastEvent.fire();

        }
    },
    handleToggleSaveButtonVisibility: function (component, sourceName, disableSaveButton) {
        if (sourceName === component.get("v.sourceName")) {
            component.set("v.disableSaveButton", disableSaveButton);
        }
    }
});
