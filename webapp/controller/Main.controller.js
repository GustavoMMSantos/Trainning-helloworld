sap.ui.define([  "sap/ui/core/mvc/Controller"], (Controller) => {
    "use strict";

    return Controller.extend("helloworld.controller.Main", {
        onInit() {   },

      onItemPress: function (oEvent) {
  const oCtx = oEvent.getParameter("listItem").getBindingContext();
  sap.m.MessageToast.show("Você tocou: " + oCtx.getProperty("name"));
},

onSearch: function (oEvent) {
  const sQuery = oEvent.getParameter("newValue") || "";
  const oList = oEvent.getSource().getParent().getContent()[3]; // pega a Table logo abaixo do SearchField
  const oBinding = oList.getBinding("items");
  const aFilters = sQuery ? [ 
    new sap.ui.model.Filter("name", 
        sap.ui.model.FilterOperator.Contains, 
        sQuery) ] : [];
  oBinding.filter(aFilters);
},
onSortName: function () {
  const oTable = 
  this.getView().byId("__xmlview0--table") 
  || this.getView().getContent()[0].getContent()[3]; // fallback
  const oBinding = oTable.getBinding("items");
  oBinding.sort(new sap.ui.model.Sorter("name", false));
},
    });
});