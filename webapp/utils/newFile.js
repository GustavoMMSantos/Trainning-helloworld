sap.ui.define([], function () {
  "use strict";
  return {
    greet: function (sName) {
      return "👋 " + (sName || "UI5");
    }
  };
});
