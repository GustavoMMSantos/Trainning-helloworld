sap.ui.define([  "sap/ui/core/mvc/Controller"], (Controller) => {
    "use strict";

    return Controller.extend("helloworld.controller.Main", {
        onInit() {   },

      onItemPress: function (oEvent) {
  const oCtx = oEvent.getParameter("listItem").getBindingContext();
  sap.m.MessageToast.show("Você tocou: " + oCtx.getProperty("name"));
}
    });
});