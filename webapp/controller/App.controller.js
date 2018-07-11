sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (Controller, JSONModel, Filter, FilterOperator) {
	'use strict';

	var i18n;

	return Controller.extend('sap.ui.demo.todo.controller.App', {

		featuredMap: new Map(), // toDoo global variables in SAP UI 5?
		stylesUrlArray: [],

		onInit: function () {
			
			i18n = this.getView().getModel("i18n").getResourceBundle();
			console.log("onInit, i18n: ", this.i18n);
			console.log("model: ", this.getView().getModel());
			this.stylesUrlArray = this.initStylesUrlArray();
			this.initPaintingStyleComboBox();
			this.featuredMap = this.initFeaturedMap();

			// move to another function, call when button is triggered
			//this.loadPaintingStyleData("socialist-realism", true);
			//this.changeToRandomPicture();

		},

		onBeforeRendering: function () {
			console.log("onBeforeRendering, i18n: ", this.i18n);
			this.initButtonsOnMainTextPage();
		},

		initButtonsOnMainTextPage: function () {
			// console.log("initButtonsOnMainTextPage");
			var mainBox = this.byId("buttonBox");
			var oModel = this.getView().getModel();
			var paintingStyles = oModel.oData.paintingStyles;
			// console.log("painging style, ", paintingStyles);
			for (var i = 0; i < paintingStyles.length; i++) {
				if (paintingStyles[i].divider !== true) {
					var buttonText = paintingStyles[i].name;
					var buttonId = "OpeningButton" + i;
					var button = new sap.m.Button(buttonId, {
						text: buttonText,
						press: [this.pressStartButtonFromStyle, this]
					});
					button.setType("Transparent");
					button.data("styleData", paintingStyles[i].url);

					//console.log("adding button: ", button);
					mainBox.addItem(button);
				} else {
					var buttonText = paintingStyles[i].name;
					var textId = "OpeningTestDivider" + i;
					var text = new sap.m.Text(textId, {
						textAlign: "Center",
						wrapping: true,
						text: buttonText + ":"
					});
					text.addStyleClass("dividerTextIntroPage");
					mainBox.addItem(text);
				}
			}
		},

		initPaintingStyleComboBox: function () {
			// console.log("init comboBox");

			var comboBox = this.byId("comboBoxPaintingStyle");
			var oModel = this.getView().getModel();
			var paintingStyles = oModel.oData.paintingStyles;

			var comboBoxToolTipText = i18n.getText("COMBOBOX_TOOLTIP");
			comboBox.setTooltip(comboBoxToolTipText);
			//comboBox.setValue("Socialist Realism");

			for (var i = 0; i < paintingStyles.length; i++) {
				var currentStyle = paintingStyles[i];
				if (currentStyle.divider === true) {
					var listItem = new sap.ui.core.ListItem("Separator-" + i);
					listItem.setText("----" + currentStyle.name + "----");
					listItem.setEnabled(false);
					comboBox.addItem(listItem);
				} else {
					var listItem = new sap.ui.core.ListItem(currentStyle.url);
					listItem.setText(currentStyle.name);
					listItem.setKey(currentStyle.url);
					comboBox.addItem(listItem);
				}
			}
		},

		initFeaturedMap: function () {
			var featuredMap = new Map();
			var paintingStyles = this.getView().getModel().oData.paintingStyles;

			for (var i = 0; i < paintingStyles.length; i++) {
				var style = paintingStyles[i];
				//console.log("style", style);
				var featured = false;
				if (style.featured) {
					featured = true;
				}
				featuredMap.set(style.url, featured)
			}
			// console.log("featuredMap", featuredMap);
			return featuredMap;
		},

		initStylesUrlArray: function () {
			var stylesUrlArray = [];
			var paintingStyles = this.getView().getModel().oData.paintingStyles;
			console.log("initStylesUrlArray paintingStyles", paintingStyles);
			console.log("initStylesUrlArray oData", this.getView().getModel().oData);
			console.log("initStylesUrlArray getData", this.getView().getModel().getData());
			console.log("initStylesUrlArray Model", this.getView().getModel());

			for (var i = 0; i < paintingStyles.length; i++) {
				var style = paintingStyles[i];
				if (!style.divider) {
					stylesUrlArray.push(style.url)
				}
			}
			return stylesUrlArray;
		},

		changePaintingStyleComboBox: function () {
			var comboBox = this.byId("comboBoxPaintingStyle");
			var changeToPaintingStyle = comboBox.getSelectedKey();
			var featured = this.checkPaintingStyleIsFeatured(changeToPaintingStyle);
			this.triggerPaintingStyleDataLoad(changeToPaintingStyle, featured);

			console.log("changeToPaintingStyle ", changeToPaintingStyle);

			var oModel = this.getView().getModel();
			console.log("oModel.oData", oModel.oData);

		},

		checkPaintingStyleIsFeatured: function (changeToPaintingStyle) {
			var featured = false;
			var featuredCheckBox = this.byId("featuredCheckBox");

			if (this.getIsFeatured(changeToPaintingStyle)) {
				featured = featuredCheckBox.getSelected();
				featuredCheckBox.setEnabled(true);
				return featured;
			} else {
				featuredCheckBox.setEnabled(false);
				return featured;
			}
		},

		getIsFeatured: function (changeToPaintingStyle) {
			var featuredValue = this.featuredMap.get(changeToPaintingStyle);
			return featuredValue;
		},

		triggerPaintingStyleDataLoad: function (paintingStyle, featured) {
			var pageToLoad = this.getPageToLoad();
			this.getPaintingDataForStylePaged(paintingStyle, featured, pageToLoad)
			//this.getPaintingDataForStyle(paintingStyle, featured)
			//.done(this.successHandlerPaintingStyleDataLoad)
			//.fail(this.errorHandlerPaintingStyleDataLoad);
		},

		getPaintingDataForStyle: function (paintingStyle, featured) {
			var featuredString = "";
			if (featured) {
				featuredString = "select=featured&";
			}
			var url = "https://cors.io/?https://www.wikiart.org/en/paintings-by-style/" + paintingStyle + "?" + featuredString + "json=2"; // use https://cors.io/ to circumvent No 'Access-Control-Allow-Origin' header is present on the requested resource problem

			this.openBusyDialog();
			return $.ajax({
				dataType: 'json',
				url: url,
				type: 'GET',
				context: this, // pass in controller context
				async: true,
				success: this.successHandlerPaintingStyleDataLoad,   // decide whether to have it here or add with .done/..
				error: this.errorHandlerPaintingStyleDataLoad
			});
		},

		getPageToLoad: function () {
			var oModel = this.getView().getModel();
			var pageNumberToLoad = oModel.getProperty("/pageNumberToLoad");
			console.log("pageNumberToLoad onStart ", pageNumberToLoad);
			if (pageNumberToLoad === undefined) {
				pageNumberToLoad = 1;
			} else {
				pageNumberToLoad += 1;
			}
			oModel.setProperty("/pageNumberToLoad", pageNumberToLoad);
			console.log("pageNumberToLoad ", pageNumberToLoad);
			return pageNumberToLoad;
		},

		getPaintingDataForStylePaged: function (paintingStyle, featured, pageToLoad) {
			var featuredString = "";
			if (featured) {
				featuredString = "select=featured&";
			}

			console.log("pageToLoad getPaintingDataForStylePaged", pageToLoad);
			var pageString = "";
			if (pageToLoad) {
				pageString = "&page=" + pageToLoad;
				console.log("pageToLoad", pageToLoad);
				console.log("pageString", pageString);
			}
			var url = "https://cors.io/?https://www.wikiart.org/en/paintings-by-style/" + paintingStyle + "?" + featuredString + "json=2" + pageString; // use https://cors.io/ to circumvent No 'Access-Control-Allow-Origin' header is present on the requested resource problem

			this.openBusyDialog();
			return $.ajax({
				dataType: 'json',
				url: url,
				type: 'GET',
				context: this, // pass in controller context
				async: true,
				success: this.successHandlerPaintingStyleDataLoad,   // decide whether to have it here or add with .done/..
				error: this.errorHandlerPaintingStyleDataLoad
			});
		},

		successHandlerPaintingStyleDataLoad: function (data) {
			// jQuery.sap.log.info('Successfully retrieved data from APU');
			var oModel = this.getView().getModel();
			oModel.setProperty("/paintingDataCurrentStyle", data);
			this.changeToRandomPicture();
			this.closeBusyDialog();
		},

		// toDo: make general error handler function
		errorHandlerPaintingStyleDataLoad: function (data) {
			console.log("error data: ", data);
			jQuery.sap.log.error('Error on calling the API');
			var errorText = i18n.getText("API_ERROR");
			this.showErrorDialog(errorText);
			this.closeBusyDialog();
		},

		openBusyDialog: function () {
			var busyDialog = this.byId("BusyDialog");
			busyDialog.open();
		},

		closeBusyDialog: function () {
			var busyDialog = this.byId("BusyDialog");
			busyDialog.close();
		},

		showErrorDialog: function (errorText) { //toDo: add this dynamically to error callback of ajax call
			var okButtonText = i18n.getText("DIALOG_BUTTON_OK");
			var errorTitleText = i18n.getText("ERROR_TITLE");
			var dialog = new sap.m.Dialog("errorDialog", {
				title: errorTitleText,
				type: 'Message',
				state: 'Error',
				content: new sap.m.Text({
					text: errorText
				}),
				beginButton: new sap.m.Button({
					text: okButtonText,
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			}); // toDo:'put in i18n'
			dialog.open();
		},

		/**
		 *
		 */
		changeToRandomPicture: function () { // put this all in one function, rename
			var oData = this.getView().getModel().oData;
			var randomEntry = this.getRandomEntry();

			this.setMainImage(randomEntry);
			//console.log("oModel.oData.displayedImage", oData.displayedImage);

			oData.displayedImage = randomEntry;
			oData.paintingHistory.push(randomEntry);

			// sap.m.MessageToast.show("Picture changed successfully", {duration: 1000, at: "right bottom"}); //toDo: add to i18n
		},

		setMainImage: function (paintingsDataObj) {
			// console.log("setMainImage", paintingsDataObj);
			var pic = this.byId("mainPicture");
			var paintingArtistText = this.byId("painting_artist");
			var paintingTitleText = this.byId("painting_title");
			var paintingYearText = this.byId("painting_year");
			var newSource = paintingsDataObj.image;

			pic.setSrc(newSource);
			paintingArtistText.setText(paintingsDataObj.artistName);
			paintingTitleText.setText(paintingsDataObj.title);
			paintingYearText.setText(paintingsDataObj.year);
		},

		getRandomEntry: function () {
			var oModel = this.getView().getModel();
			console.log("oModel getRandomEntry", oModel);
			console.log("picArray getRandomEntry", oModel.oData.paintingDataCurrentStyle.Paintings);
			var picArray = oModel.oData.paintingDataCurrentStyle.Paintings;

			return picArray[Math.floor(Math.random() * picArray.length)];
		},

		getRandomStyle: function () {
			return this.stylesUrlArray[Math.floor(Math.random() * this.stylesUrlArray.length)];
		},

		openImgOverviewDialog: function () {
			var paintingDataCurrentStyle = this.getView().getModel().oData.paintingDataCurrentStyle;
			var picAmount = paintingDataCurrentStyle.Paintings.length;
			var picAmountTotal = paintingDataCurrentStyle.AllPaintingsCount;
			var dialogTitleString1 = i18n.getText("IMGOVERVIEW_DIALOG_TITLE_IMG_OVERVIEW_1");
			var dialogTitleString2 = i18n.getText("IMGOVERVIEW_DIALOG_TITLE_IMG_OVERVIEW_2");
			var dialogTitleString3 = i18n.getText("IMGOVERVIEW_DIALOG_TITLE_IMG_OVERVIEW_3");
			var dialogTitleString = dialogTitleString1 + " " + picAmount + " " + dialogTitleString2 + " " + picAmountTotal + " " + dialogTitleString3; // this can be done properly!
			var loadMoreButton = new sap.m.Button({
				text: "Load More",
				type: "Emphasized",
				press: [this.getPaintingDataForStylePaged, this]
			});
			var content = new sap.m.List({items: this.fillImgOverviewItemsArray()});
			content.addItem(loadMoreButton);
			// make code smaller, put this somewhere else!!!!!!!!!!!
			this.showContentDialog(dialogTitleString, content);

		},

		openHistoryDialog: function () {
			var dialogTitleString = i18n.getText("HISTORY_DIALOG_TITLE");
			var content = new sap.m.List({items: this.fillHistoryListItemArray()});
			this.showContentDialog(dialogTitleString, content);
		},

		showContentDialog: function (dialogTitleString, content) { // contentWidth: "40%", (?)
			var dialogButtonClose = i18n.getText("DIALOG_BUTTON_CLOSE");

			var dialog = new sap.m.Dialog({
				title: dialogTitleString,
				content: content,
				beginButton: new sap.m.Button({
					text: dialogButtonClose,
					press: function () {
						dialog.close();
					}.bind(this)
				})
			});
			dialog.open();
		},

		fillImgOverviewItemsArray: function () { // https://answers.sap.com/questions/204573/how-to-get-the-value-while-press-button-in-customl.html
			var viewButtonText = i18n.getText("BUTTON_VIEW");

			var items = [];
			var paintingsArray = this.getView().getModel().oData.paintingDataCurrentStyle.Paintings;
			for (var i = 0; i < paintingsArray.length; i++) {
				var paintingFromHistory = paintingsArray[i];
				var customListItem = new sap.m.CustomListItem();
				var box = new sap.m.FlexBox({alignItems: "Start", justifyContent: "SpaceBetween"});
				var text = new sap.m.Text({text: paintingFromHistory.artistName + " - " + paintingFromHistory.title});
				var button = new sap.m.Button({
					text: viewButtonText,
					type: "Emphasized",
					press: [this.setMainImgFromImgOverview, this] // add to history here
				});
				text.addStyleClass("modalListItemText");
				button.data("imgData", paintingFromHistory);
				button.addStyleClass("modalListButtons");
				//console.log(button.data("imgData"));
				box.addItem(text);
				box.addItem(button);
				customListItem.addContent(box);
				items.push(customListItem);
			}
			return items;
		},

		fillHistoryListItemArray: function () { // https://answers.sap.com/questions/204573/how-to-get-the-value-while-press-button-in-customl.html
			var viewButtonText = i18n.getText("BUTTON_VIEW");

			var items = [];
			var paintingHistory = this.getView().getModel().oData.paintingHistory;
			for (var i = 0; i < paintingHistory.length; i++) {
				var paintingFromHistory = paintingHistory[i];
				var countHistory = i + 1;
				var customListItem = new sap.m.CustomListItem();
				var box = new sap.m.FlexBox({alignItems: "Start", justifyContent: "SpaceBetween"});
				var text = new sap.m.Text({text: countHistory + ". " + paintingFromHistory.artistName + " - " + paintingFromHistory.title});
				var button = new sap.m.Button({
					text: viewButtonText,
					type: "Emphasized",
					press: [this.setMainImgFromHistory, this]
				});
				text.addStyleClass("modalListItemText");
				button.data("imgData", paintingFromHistory);
				// console.log(button.data("imgData"));
				button.addStyleClass("modalListButtons");
				box.addItem(text);
				box.addItem(button);
				customListItem.addContent(box);
				items.push(customListItem);
			}
			return items;
		},

		setMainImgFromImgOverview: function (evt) {
			// console.log("evt.getSource()", evt.getSource().data());
			// console.log("imgData", imgData);

			var imgData = evt.getSource().data().imgData;
			var oData = this.getView().getModel().oData;

			this.setMainImage(imgData);
			oData.displayedImage = imgData;
			oData.paintingHistory.push(imgData);
		},

		setMainImgFromHistory: function (evt) {
			//console.log("evt.getSource()", evt.getSource().data());
			//console.log("imgData", imgData);

			var imgData = evt.getSource().data().imgData;
			var oData = this.getView().getModel().oData;

			this.setMainImage(imgData);
			oData.displayedImage = imgData;
		},

		downloadImg: function () {
			// console.log("displayedImage", displayedImage);
			var displayedImage = this.getView().getModel().oData.displayedImage;
			this.forceDownload(displayedImage.image, displayedImage.artistName + "_" + displayedImage.title + ".jpg");
		},

		forceDownload: function (url, fileName) { // https://stackoverflow.com/questions/17527713/force-browser-to-download-image-files-on-click    workaround on deprecated image downloading from Chrome
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.responseType = "blob";
			xhr.onload = function () {
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = urlCreator.createObjectURL(this.response);
				var tag = document.createElement('a');
				tag.href = imageUrl;
				tag.download = fileName;
				document.body.appendChild(tag);
				tag.click();
				document.body.removeChild(tag);
			};
			xhr.send();
		},

		pressStartButtonRandom: function () {
			var randomStyle = this.getRandomStyle();
			console.log("ranbdomStyle ", randomStyle);
			this.pressStartButton(randomStyle);
		},

		pressStartButtonFromStyle: function (evt) {
			var style = evt.getSource().data().styleData;
			this.pressStartButton(style);
		},

		pressStartButton: function (style) {
			console.log("style ", style);
			var featured = this.getIsFeatured(style);
			var comboBox = this.byId("comboBoxPaintingStyle");
			this.triggerPaintingStyleDataLoad(style, featured);
			this.showContent();
			comboBox.setValue(style); // set Name here
		},

		showContent: function () {
			//btw: the whole toolbar can be enabled/disabled https://openui5.hana.ondemand.com/#/sample/sap.m.sample.ToolbarEnabled/preview
			var flexBox = this.byId("mainFlexBox");
			var messagePage = this.byId("mainFlexBoxIntro");
			var randomPictureButton = this.byId("changePic");
			var comboBoxPaintingStyle = this.byId("comboBoxPaintingStyle");
			var imgDownloadButton = this.byId("imgDownloadButton");
			var showPoolButton = this.byId("showPoolButton");
			var showHistoryButton = this.byId("showHistoryButton");
			var showIntorPageButton = this.byId("showIntorPageButton");
			var footerToolbarImgInformation = this.byId("imgInformation");
			flexBox.setVisible(true);
			messagePage.setVisible(false);
			randomPictureButton.setEnabled(true);
			comboBoxPaintingStyle.setEnabled(true);
			imgDownloadButton.setEnabled(true);
			showPoolButton.setEnabled(true);
			showHistoryButton.setEnabled(true);
			showIntorPageButton.setEnabled(true);
			footerToolbarImgInformation.setVisible(true);
		},

		showIntroPage: function () {
			//btw: the whole toolbar can be enabled/disabled https://openui5.hana.ondemand.com/#/sample/sap.m.sample.ToolbarEnabled/preview
			var flexBox = this.byId("mainFlexBox");
			var messagePage = this.byId("mainFlexBoxIntro");
			var randomPictureButton = this.byId("changePic");
			var comboBoxPaintingStyle = this.byId("comboBoxPaintingStyle");
			var imgDownloadButton = this.byId("imgDownloadButton");
			var showPoolButton = this.byId("showPoolButton");
			var showHistoryButton = this.byId("showHistoryButton");
			var showIntorPageButton = this.byId("showIntorPageButton");
			var footerToolbarImgInformation = this.byId("imgInformation");
			flexBox.setVisible(false);
			messagePage.setVisible(true);
			randomPictureButton.setEnabled(false);
			comboBoxPaintingStyle.setEnabled(false);
			imgDownloadButton.setEnabled(false);
			showPoolButton.setEnabled(false);
			showHistoryButton.setEnabled(false);
			showIntorPageButton.setEnabled(false);
			footerToolbarImgInformation.setVisible(false);
		},

	});
});
