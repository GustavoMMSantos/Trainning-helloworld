sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
  function (JSONModel, Device) {
    "use strict";

    return {
      /**
       * Provides runtime information for the device the UI5 app is running on as a JSONModel.
       * @returns {sap.ui.model.json.JSONModel} The device model.
       */
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },

      createModelMain: function () {
        const oData = {
          user: { name: "Aluno(a)", country: "BR" },
          items: [
            { id: 1, name: "Button" },
            { id: 2, name: "Table" },
            { id: 3, name: "Dialog" },
          ],
        };

        const oModel = new JSONModel(oData);
        oModel.setDefaultBindingMode("TwoWay");

        return new JSONModel(oData);
      },
    };
  }
);