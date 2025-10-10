sap.ui.define(["sap/ui/core/mvc/Controller", 
               "sap/ui/model/json/JSONModel", 
               "sap/m/SelectDialog", 
               "sap/m/StandardListItem",
               "sap/ui/model/Filter",
	           "sap/ui/model/FilterOperator",
               "helloworld/utils/formatter",
               "sap/m/MessageToast"], (Controller, JSONModel, SelectDialog, StandardListItem, Filter, FilterOperator, formatter, MessageToast) => {
  "use strict";

  return Controller.extend("helloworld.controller.Main", {
    formatter: formatter,

    onInit() {},

    onItemPress: function (oEvent) {
      // teste
      const oCtx = oEvent.getParameter("listItem").getBindingContext();
      sap.m.MessageToast.show("Você tocou: " + oCtx.getProperty("name"));
    },

    onSearch: function (oEvent) {
      const sQuery = oEvent.getParameter("newValue") || "";
      const oList = oEvent.getSource().getParent().getContent()[3]; // pega a Table logo abaixo do SearchField
      const oBinding = oList.getBinding("items");
      const aFilters = sQuery
        ? [
            new sap.ui.model.Filter(
              "name",
              sap.ui.model.FilterOperator.Contains,
              sQuery
            ),
          ]
        : [];
      oBinding.filter(aFilters);
    },

    onSortName: function () {
      const oTable =
        this.getView().byId("__xmlview0--table") ||
        this.getView().getContent()[0].getContent()[3]; // fallback
      const oBinding = oTable.getBinding("items");
      oBinding.sort(new sap.ui.model.Sorter("name", false));
    },

    onOpenDialog: function () {
      if (!this._pDialog) {
        this._pDialog = this.loadFragment({
          name: "helloworld.view.fragment.HelloDialog",
        });
      }
      this._pDialog.then((d) => d.open());
    },

    onCloseDialog: function (oEvent) {
      oEvent.getSource().getParent().close();
    },

    onOpenVH: function () {
      if (!this._vh) {
        var aCountries = [
          { code: "BR", name: "Brasil" },
          { code: "US", name: "USA" },
          { code: "DE", name: "Alemanha" },
        ];
        var oModel = new JSONModel(aCountries);

        this._vh = new SelectDialog({
          title: "Selecionar País",
          items: {
            path: "/",
            template: new StandardListItem({
              title: "{code}",
              description: "{name}",
            }),
          },
          liveChange: function (oEvt) {
            var sVal = oEvt.getParameter("value") || "";
            var oBinding = oEvt.getSource().getBinding("items");
            oBinding.filter(
              sVal ? [new Filter("name", FilterOperator.Contains, sVal)] : []
            );
          },
          confirm: function (oEvt) {
            var oItem = oEvt.getParameter("selectedItem");
            if (oItem) {
              this.getView()
                .getModel()
                .setProperty("/user/country", oItem.getTitle());
            }
          }.bind(this),
        });

        this._vh.setModel(oModel);
        this.getView().addDependent(this._vh);
      }
      this._vh.open();
    },

    onExit: function () {
      if (this._pDialog) {
        this._pDialog.then(function (d) {
          d.destroy();
        });
      }
      if (this._vh) {
        this._vh.destroy();
      }
    },

    onBusy: function () {
      var oBusy = this.byId("busy");
      oBusy.setVisible(true);
      setTimeout(function () {
        oBusy.setVisible(false);
      }, 10000);
    },

    onSuccess: function () {
      MessageToast.show("Operação concluída!");
    }
  });
});
