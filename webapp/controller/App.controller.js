sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function(Controller, JSONModel, Filter, FilterOperator) {
	'use strict';

	var i18n;

	return Controller.extend('sap.ui.demo.todo.controller.App', {

		featuredMap: new Map(), // toDoo global variables in SAP UI 5?
		stylesUrlArray: [],

		onInit: function() {
			console.log("this.getOwnerComponent().getModel()", this.getOwnerComponent().getModel().oData);
			var oModel = this.getView().getModel();
			oModel.oData = 
					{
						"settings": "",
						
						  "paintingHistory": [],
						
						  "displayedImage": {},
						
						  "pageNumberToLoad": 1,
						
						  "paintingStyles": [
						  {
							"name": "Medieval Art",
							"divider": true
						  },
						  {
							"name": "Early Christian",
							"url": "early-christian"
						  },
						  {
							"name": "Mozarabic",
							"url": "mozarabic"
						  },
						  {
							"name": "Byzantine",
							"url": "byzantine",
							"featured": true
						  },
						  {
							"name": "Romanesque",
							"url": "romanesque"
						  },
						  {
							"name": "Mosan art",
							"url": "mosan-art"
						  },
						  {
							"name": "Gothic",
							"url": "gothic"
						  },
						  {
							"name": "International Gothic",
							"url": "international-gothic",
							"featured": true
						  },
						  {
							"name": "Renaissance Art",
							"divider": true
						  },
						  {
							"name": "Proto Renaissance",
							"url": "proto-renaissance",
							"featured": true
						  },
						  {
							"name": "Early Renaissance",
							"url": "early-renaissance",
							"featured": true
						  },
						  {
							"name": "High Renaissance",
							"url": "high-renaissance",
							"featured": true
						  },
						  {
							"name": "Mannerism (Late Renaissance)",
							"url": "mannerism-late-renaissance",
							"featured": true
						  },
						  {
							"name": "Northern Renaissance",
							"url": "northern-renaissance",
							"featured": true
						  },
						  {
							"name": "Renaissance",
							"url": "renaissance"
						  },
						  {
							"name": "Post Renaissance Art",
							"divider": true
						  },
						  {
							"name": "Baroque",
							"url": "baroque",
							"featured": true
						  },
						  {
							"name": "Tenebrism",
							"url": "tenebrism",
							"featured": true
						  },
						  {
							"name": "Rococo",
							"url": "rococo",
							"featured": true
						  },
						  {
							"name": "Classicism",
							"url": "classicism",
							"featured": true
						  },
						  {
							"name": "Neoclassicism",
							"url": "neoclassicism",
							"featured": true
						  },
						  {
							"name": "Academicism",
							"url": "academicism",
							"featured": true
						  },
						  {
							"name": "Romanticism",
							"url": "romanticism",
							"featured": true
						  },
						  {
							"name": "Orientalism",
							"url": "orientalism",
							"featured": true
						  },
						  {
							"name": "Costumbrismo",
							"url": "costumbrismo"
						  },
						  {
							"name": "Biedermeier",
							"url": "biedermeier",
							"featured": true
						  },
						  {
							"name": "Neo-Rococo",
							"url": "neo-rococo"
						  },
						  {
							"name": "Luminism",
							"url": "luminism",
							"featured": true
						  },
						  {
							"name": "Realism",
							"url": "realism",
							"featured": true
						  },
						  {
							"name": "Modern Art",
							"divider": true
						  },
						  {
							"name": "Naturalism",
							"url": "naturalism",
							"featured": true
						  },
						  {
							"name": "Naïve Art (Primitivism)",
							"url": "na-ve-art-primitivism",
							"featured": true
						  },
						  {
							"name": "Action painting",
							"url": "action-painting"
						  },
						  {
							"name": "Symbolism",
							"url": "symbolism",
							"featured": true
						  },
						  {
							"name": "Tonalism",
							"url": "tonalism",
							"featured": true
						  },
						  {
							"name": "Impressionism",
							"url": "impressionism",
							"featured": true
						  },
						  {
							"name": "Pointillism",
							"url": "pointillism",
							"featured": true
						  },
						  {
							"name": "Divisionism",
							"url": "divisionism",
							"featured": true
						  },
						  {
							"name": "Japonism",
							"url": "japonism",
							"featured": true
						  },
						  {
							"name": "Verism",
							"url": "verism"
						  },
						  {
							"name": "Post-Impressionism",
							"url": "post-impressionism",
							"featured": true
						  },
						  {
							"name": "Cloisonnism",
							"url": "cloisonnism",
							"featured": true
						  },
						  {
							"name": "Synthetism",
							"url": "synthetism"
						  },
						  {
							"name": "Intimism",
							"url": "intimism"
						  },
						  {
							"name": "Fauvism",
							"url": "fauvism",
							"featured": true
						  },
						  {
							"name": "Art Nouveau (Modern)",
							"url": "art-nouveau-modern",
							"featured": true
						  },
						  {
							"name": "Pictorialism",
							"url": "pictorialism",
							"featured": true
						  },
						  {
							"name": "Expressionism",
							"url": "expressionism",
							"featured": true
						  },
						  {
							"name": "Kitsch",
							"url": "kitsch",
							"featured": true
						  },
						  {
							"name": "Neo-Romanticism",
							"url": "neo-romanticism",
							"featured": true
						  },
						  {
							"name": "Cubism",
							"url": "cubism",
							"featured": true
						  },
						  {
							"name": "Analytical Cubism",
							"url": "analytical-cubism"
						  },
						  {
							"name": "Synthetic Cubism",
							"url": "synthetic-cubism",
							"featured": true
						  },
						  {
							"name": "Orphism",
							"url": "orphism",
							"featured": true
						  },
						  {
							"name": "Tubism",
							"url": "tubism"
						  },
						  {
							"name": "Cubo-Expressionism",
							"url": "cubo-expressionism"
						  },
						  {
							"name": "Abstract Art",
							"url": "abstract-art",
							"featured": true
						  },
						  {
							"name": "Futurism",
							"url": "futurism",
							"featured": true
						  },
						  {
							"name": "Cubo-Futurism",
							"url": "cubo-futurism",
							"featured": true
						  },
						  {
							"name": "Rayonism",
							"url": "rayonism"
						  },
						  {
							"name": "Synchromism",
							"url": "synchromism"
						  },
						  {
							"name": "Dada",
							"url": "dada",
							"featured": true
						  },
						  {
							"name": "Suprematism",
							"url": "suprematism",
							"featured": true
						  },
						  {
							"name": "Neo-Byzantine",
							"url": "neo-byzantine"
						  },
						  {
							"name": "Constructivism",
							"url": "constructivism",
							"featured": true
						  },
						  {
							"name": "Spectralism",
							"url": "spectralism"
						  },
						  {
							"name": "Modernismo",
							"url": "modernismo"
						  },
						  {
							"name": "Neo-Suprematism",
							"url": "neo-suprematism"
						  },
						  {
							  "name": "Analytical Realism",
							"url": "analytical-realism"
						  },
						  {
							"name": "Neoplasticism",
							"url": "neoplasticism",
							"featured": true
						  },
						  {
							"name": "Concretism",
							"url": "concretism",
							"featured": true
						  },
						  {
							"name": "Perceptism ",
							"url": "perceptism"
						  },
						  {
							"name": "New Realism",
							"url": "new-realism",
							"featured": true
						  },
						  {
							"name": "American Realism",
							"url": "american-realism",
							"featured": true
						  },
						  {
							"name": "Social Realism",
							"url": "social-realism",
							"featured": true
						  },
						  {
							"name": "Surrealism",
							"url": "surrealism",
							"featured": true
						  },
						  {
							"name": "Automatic Painting",
							"url": "automatic-painting"
						  },
						  {
							"name": "Metaphysical art",
							"url": "metaphysical-art",
							"featured": true
						  },
						  {
							"name": "Magic Realism",
							"url": "magic-realism",
							"featured": true
						  },
						  {
							"name": "Fantastic Realism",
							"url": "fantastic-realism",
							"featured": true
						  },
						  {
							"name": "Neo-baroque",
							"url": "neo-baroque",
							"featured": true
						  },
						  {
							"name": "Art Deco",
							"url": "art-deco",
							"featured": true
						  },
						  {
							"name": "Purism",
							"url": "purism",
							"featured": true
						  },
						  {
							"name": "Precisionism",
							"url": "precisionism",
							"featured": true
						  },
						  {
							"name": "Regionalism",
							"url": "regionalism",
							"featured": true
						  },
						  {
							"name": "Socialist Realism",
							"url": "socialist-realism",
							"featured": true
						  },
						  {
							"name": "Muralism",
							"url": "muralism",
							"featured": true
						  },
						  {
							"name": "Cartographic Art",
							"url": "cartographic-art"
						  },
						  {
							"name": "Existential Art",
							"url": "existential-art"
						  },
						  {
							"name": "Lettrism",
							"url": "lettrism"
						  },
						  {
							"name": "Mechanistic Cubism",
							"url": "mechanistic-cubism"
						  },
						  {
							"name": "Miserablism",
							"url": "miserablism"
						  },
						  {
							"name": "Abstract Expressionism",
							"url": "abstract-expressionism",
							"featured": true
						  },
						  {
							"name": "Color Field Painting",
							"url": "color-field-painting",
							"featured": true
						  },
						  {
							"name": "Hard Edge Painting",
							"url": "hard-edge-painting",
							"featured": true
						  },
						  {
							"name": "Lyrical Abstraction",
							"url": "lyrical-abstraction",
							"featured": true
						  },
						  {
							"name": "Indian Space painting",
							"url": "indian-space-painting"
						  },
						  {
							"name": "Street Photography",
							"url": "street-photography"
						  },
						  {
							"name": "Figurative Expressionism",
							"url": "figurative-expressionism",
							"featured": true
						  },
						  {
							"name": "Art Informel",
							"url": "art-informel",
							"featured": true
						  },
						  {
							"name": "Tachisme",
							"url": "tachisme",
							"featured": true
						  },
						  {
							"name": "Neo-Concretism",
							"url": "neo-concretism"
						  },
						  {
							"name": "Performance Art",
							"url": "performance-art"
						  },
						  {
							"name": "Transautomatism",
							"url": "transautomatism"
						  },
						  {
							"name": "Sots Art",
							"url": "sots-art"
						  },
						  {
							"name": "Post-Painterly Abstraction",
							"url": "post-painterly-abstraction",
							"featured": true
						  },
						  {
							"name": "Severe Style",
							"url": "severe-style"
						  },
						  {
							"name": "Feminist Art",
							"url": "feminist-art",
							"featured": true
						  },
						  {
							"name": "Fiber art",
							"url": "fiber-art"
						  },
						  {
							"name": "Mail Art",
							"url": "mail-art"
						  },
						  {
							"name": "Outsider art",
							"url": "outsider-art",
							"featured": true
						  },
						  {
							"name": "Art Brut",
							"url": "art-brut",
							"featured": true
						  },
						  {
							"name": "Neo-Expressionism",
							"url": "neo-expressionism",
							"featured": true
						  },
						  {
							"name": "Neo-Dada",
							"url": "neo-dada",
							"featured": true
						  },
						  {
							"name": "Neo-Figurative Art",
							"url": "neo-figurative-art"
						  },
						  {
							"name": "Kinetic Art",
							"url": "kinetic-art",
							"featured": true
						  },
						  {
							"name": "Spatialism",
							"url": "spatialism",
							"featured": true
						  },
						  {
							"name": "Op Art",
							"url": "op-art",
							"featured": true
						  },
						  {
							"name": "Pop Art",
							"url": "pop-art",
							"featured": true
						  },
						  {
							"name": "Nouveau Réalisme",
							"url": "nouveau-r-alisme",
							"featured": true
						  },
						  {
							"name": "Contemporary Art",
							"divider": true
						  },
						  {
							"name": "Conceptual Art",
							"url": "conceptual-art",
							"featured": true
						  },
						  {
							"name": "Minimalism",
							"url": "minimalism",
							"featured": true
						  },
						  {
							"name": "Post-Minimalism",
							"url": "post-minimalism",
							"featured": true
						  },
						  {
							"name": "Light and Space",
							"url": "light-and-space",
							"featured": true
						  },
						  {
							"name": "Environmental (Land) Art",
							"url": "environmental-land-art"
						  },
						  {
							"name": "Junk Art",
							"url": "junk-art"
						  },
						  {
							"name": "Cyber Art",
							"url": "cyber-art"
						  },
						  {
							"name": "Photorealism",
							"url": "photorealism",
							"featured": true
						  },
						  {
							"name": "Hyper-Realism",
							"url": "hyper-realism",
							"featured": true
						  },
						  {
							"name": "Poster Art Realism",
							"url": "poster-art-realism"
						  },
						  {
							"name": "Contemporary Realism",
							"url": "contemporary-realism",
							"featured": true
						  },
						  {
							"name": "P&D (Pattern and Decoration)",
							"url": "p-d-pattern-and-decoration",
							"featured": true
						  },
						  {
							"name": "Transavantgarde",
							"url": "transavantgarde",
							"featured": true
						  },
						  {
							"name": "New European Painting",
							"url": "new-european-painting",
							"featured": true
						  },
						  {
							"name": "Neo-Pop Art",
							"url": "neo-pop-art",
							"featured": true
						  },
						  {
							"name": "Neo-Geo",
							"url": "neo-geo",
							"featured": true
						  },
						  {
							"name": "Maximalism",
							"url": "maximalism"
						  },
						  {
							"name": "Neo-Orthodoxism",
							"url": "neo-orthodoxism"
						  },
						  {
							"name": "Street art",
							"url": "street-art",
							"featured": true
						  },
						  {
							"name": "Lowbrow Art",
							"url": "lowbrow-art"
						  },
						  {
							"name": "Stuckism",
							"url": "stuckism"
						  },
						  {
							"name": "Toyism",
							"url": "toyism"
						  },
						  {
							"name": "New Casualism",
							"url": "new-casualism"
						  },
						  {
							"name": "Symbiotic Art",
							"url": "symbiotic-art",
							"featured": true
						  },
						  {
							"name": "Art Singulier",
							"url": "art-singulier"
						  },
						  {
							"name": "Superflat",
							"url": "superflat"
						  },
						  {
							"name": "Excessivism",
							"url": "excessivism"
						  },
						  {
							"name": "Digital Art",
							"url": "digital-art"
						  },
						  {
							"name": "Hyper-Mannerism (Anachronism)",
							"url": "hyper-mannerism-anachronism"
						  },
						  {
							"name": "Neo-Minimalism",
							"url": "neo-minimalism",
							"featured": true
						  },
						  {
							"name": "Fantasy Art",
							"url": "fantasy-art"
						  },
						  {
							"name": "Sky Art",
							"url": "sky-art"
						  },
						  {
							"name": "Contemporary",
							"url": "contemporary"
						  },
						  {
							"name": "Chinese Art",
							"divider": true
						  },
						  {
							"name": "Gongbi",
							"url": "gongbi"
						  },
						  {
							"name": "Ink and wash painting",
							"url": "ink-and-wash-painting",
							"featured": true
						  },
						  {
							"name": "Korean Art",
							"divider": true
						  },
						  {
							"name": "Joseon Dynasty",
							"url": "joseon-dynasty"
						  },
						  {
							"name": "Japanese Art",
							"divider": true
						  },
						  {
							"name": "Shin-hanga",
							"url": "shin-hanga",
							"featured": true
						  },
						  {
							"name": "Sōsaku hanga",
							"url": "s-saku-hanga",
							"featured": true
						  },
						  {
							"name": "Sumi-e (Suiboku-ga)",
							"url": "suiboku-ga-0"
						  },
						  {
							"name": "Ukiyo-e",
							"url": "ukiyo-e",
							"featured": true
						  },
						  {
							"name": "Yamato-e",
							"url": "yamato-e"
						  },
						  {
							"name": "Kanō school style",
							"url": "kano-school"
						  },
						  {
							"name": "Nanga (Bunjinga)",
							"url": "nanga-bunjinga"
						  },
						  {
							"name": "Nihonga",
							"url": "nihonga"
						  },
						  {
							"name": "Zen",
							"url": "zen",
							"featured": true
						  },
						  {
							"name": "Islamic Art",
							"divider": true
						  },
						  {
							"name": "Nas-Taliq",
							"url": "nas-taliq"
						  },
						  {
							"name": "Ilkhanid",
							"url": "ilkhanid"
						  },
						  {
							"name": "Timurid Period",
							"url": "timurid-period"
						  },
						  {
							"name": "Mughal",
							"url": "mughal"
						  },
						  {
							"name": "Ottoman Period",
							"url": "ottoman-period"
						  },
						  {
							"name": "Safavid Period",
							"url": "safavid-period",
							"featured": true
						  },
						  {
							"name": "Native Art",
							"divider": true
						  },
						  {
							"name": "Native Art",
							"url": "native-art"
						  }
						]
					};

			i18n = this.getView().getModel("i18n").getResourceBundle();
			console.log("onInit, i18n: ", this.i18n);
			console.log("model: ", this.getView().getModel());

			console.log("oModel: ", oModel);


			console.log("JSON.stringify(oModel): ", JSON.stringify(oModel));
			console.log("oModel type: ", typeof oModel);
			console.log("oModel.getData(): ", oModel.getData());
			console.log("oModel.oData: ", oModel.oData);
			console.log("initStylesUrlArray");
			this.stylesUrlArray = this.initStylesUrlArray(oModel);
			console.log("initPaintingStyleComboBox");
			this.initPaintingStyleComboBox(oModel);
			console.log("initFeaturedMap");
			this.featuredMap = this.initFeaturedMap(oModel);

			// move to another function, call when button is triggered
			//this.loadPaintingStyleData("socialist-realism", true);
			//this.changeToRandomPicture();
				
		},

		onBeforeRendering: function() {
		},
		
		onAfterRendering: function() {
			console.log("onAfterRendering, i18n: ", this.i18n);
			this.initButtonsOnMainTextPage();
			
		},
		
		initButtonsOnMainTextPage: function() {
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

		initPaintingStyleComboBox: function(oModel) {
			// console.log("init comboBox");

			var comboBox = this.byId("comboBoxPaintingStyle");
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

		initFeaturedMap: function(oModel) {
			var featuredMap = new Map();
			var paintingStyles = oModel.oData.paintingStyles;

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

		initStylesUrlArray: function(oModel) {
			var stylesUrlArray = [];
			var oModel2 = this.getView().getModel();
			var oData = oModel2.oData;
			var paintingStyles = oData.paintingStyles;
			console.log("initStylesUrlArray paintingStyles", paintingStyles);
			console.log("initStylesUrlArray oData", oData);
			console.log("initStylesUrlArray getData", oModel.getData());
			console.log("initStylesUrlArray oModel.bCache", oModel.bCache);
			console.log("initStylesUrlArray oModel", oModel);
			console.log("initStylesUrlArray oModel2", oModel2);
			console.log("initStylesUrlArray Model", this.getView().getModel());

			for (var i = 0; i < paintingStyles.length; i++) {
				var style = paintingStyles[i];
				if (!style.divider) {
					stylesUrlArray.push(style.url)
				}
			}
			return stylesUrlArray;
		},

		changePaintingStyleComboBox: function() {
			var comboBox = this.byId("comboBoxPaintingStyle");
			var changeToPaintingStyle = comboBox.getSelectedKey();
			var featured = this.checkPaintingStyleIsFeatured(changeToPaintingStyle);
			this.triggerPaintingStyleDataLoad(changeToPaintingStyle, featured);

			console.log("changeToPaintingStyle ", changeToPaintingStyle);

			var oModel = this.getView().getModel();
			console.log("oModel.oData", oModel.oData);

		},

		checkPaintingStyleIsFeatured: function(changeToPaintingStyle) {
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

		getIsFeatured: function(changeToPaintingStyle) {
			var featuredValue = this.featuredMap.get(changeToPaintingStyle);
			return featuredValue;
		},

		triggerPaintingStyleDataLoad: function(paintingStyle, featured) {
			// var pageToLoad = this.getPageToLoad();
			this.getPaintingDataForStylePaged(paintingStyle, featured, pageToLoad)
			//this.getPaintingDataForStyle(paintingStyle, featured)
			//.done(this.successHandlerPaintingStyleDataLoad)
			//.fail(this.errorHandlerPaintingStyleDataLoad);
		},

		getPaintingDataForStyle: function(paintingStyle, featured) {
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
				success: this.successHandlerPaintingStyleDataLoad, // decide whether to have it here or add with .done/..
				error: this.errorHandlerPaintingStyleDataLoad
			});
		},

		getPageToLoad: function() {
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

		getPaintingDataForStylePaged: function(paintingStyle, featured, pageToLoad) {
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
				success: this.successHandlerPaintingStyleDataLoad, // decide whether to have it here or add with .done/..
				error: this.errorHandlerPaintingStyleDataLoad
			});
		},

		successHandlerPaintingStyleDataLoad: function(data) {
			// jQuery.sap.log.info('Successfully retrieved data from APU');
			var oModel = this.getView().getModel();
			oModel.setProperty("/paintingDataCurrentStyle", data);
			this.changeToRandomPicture();
			this.closeBusyDialog();
		},

		// toDo: make general error handler function
		errorHandlerPaintingStyleDataLoad: function(data) {
			console.log("error data: ", data);
			jQuery.sap.log.error('Error on calling the API');
			var errorText = i18n.getText("API_ERROR");
			this.showErrorDialog(errorText);
			this.closeBusyDialog();
		},

		openBusyDialog: function() {
			var busyDialog = this.byId("BusyDialog");
			busyDialog.open();
		},

		closeBusyDialog: function() {
			var busyDialog = this.byId("BusyDialog");
			busyDialog.close();
		},

		showErrorDialog: function(errorText) { //toDo: add this dynamically to error callback of ajax call
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
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			}); // toDo:'put in i18n'
			dialog.open();
		},

		/**
		 *
		 */
		changeToRandomPicture: function() { // put this all in one function, rename
			var oData = this.getView().getModel().oData;
			var randomEntry = this.getRandomEntry();

			this.setMainImage(randomEntry);
			//console.log("oModel.oData.displayedImage", oData.displayedImage);

			oData.displayedImage = randomEntry;
			oData.paintingHistory.push(randomEntry);

			// sap.m.MessageToast.show("Picture changed successfully", {duration: 1000, at: "right bottom"}); //toDo: add to i18n
		},

		setMainImage: function(paintingsDataObj) {
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

		getRandomEntry: function() {
			var oModel = this.getView().getModel();
			console.log("oModel getRandomEntry", oModel);
			console.log("picArray getRandomEntry", oModel.oData.paintingDataCurrentStyle.Paintings);
			var picArray = oModel.oData.paintingDataCurrentStyle.Paintings;

			if (this.isArrayNull(picArray)) {
				console.log("if (this.isArrayNull(picArray)) { picArray", picArray);
				// this.errorHandlerPaintingStyleDataLoad(); // use this as an error handler?
				alert("It seems there are no entries for this art style. :(");
				console.error("It seems there are no entries for this art style. :(");
				this.closeBusyDialog();
				this.showIntroPage();
				// do we need to end the function here?
			};
			return picArray[Math.floor(Math.random() * picArray.length)];
		},

		getRandomStyle: function() {
			return this.stylesUrlArray[Math.floor(Math.random() * this.stylesUrlArray.length)];
		},

		openImgOverviewDialog: function() {
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
			var content = new sap.m.List({ items: this.fillImgOverviewItemsArray() });
			content.addItem(loadMoreButton);
			// make code smaller, put this somewhere else!!!!!!!!!!!
			this.showContentDialog(dialogTitleString, content);

		},

		openHistoryDialog: function() {
			var dialogTitleString = i18n.getText("HISTORY_DIALOG_TITLE");
			var content = new sap.m.List({ items: this.fillHistoryListItemArray() });
			this.showContentDialog(dialogTitleString, content);
		},

		showContentDialog: function(dialogTitleString, content) { // contentWidth: "40%", (?)
			var dialogButtonClose = i18n.getText("DIALOG_BUTTON_CLOSE");

			var dialog = new sap.m.Dialog({
				title: dialogTitleString,
				content: content,
				beginButton: new sap.m.Button({
					text: dialogButtonClose,
					press: function() {
						dialog.close();
					}.bind(this)
				})
			});
			dialog.open();
		},

		fillImgOverviewItemsArray: function() { // https://answers.sap.com/questions/204573/how-to-get-the-value-while-press-button-in-customl.html
			var viewButtonText = i18n.getText("BUTTON_VIEW");

			var items = [];
			var paintingsArray = this.getView().getModel().oData.paintingDataCurrentStyle.Paintings;
			for (var i = 0; i < paintingsArray.length; i++) {
				var paintingFromHistory = paintingsArray[i];
				var customListItem = new sap.m.CustomListItem();
				var box = new sap.m.FlexBox({ alignItems: "Start", justifyContent: "SpaceBetween" });
				var text = new sap.m.Text({ text: paintingFromHistory.artistName + " - " + paintingFromHistory.title });
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

		fillHistoryListItemArray: function() { // https://answers.sap.com/questions/204573/how-to-get-the-value-while-press-button-in-customl.html
			var viewButtonText = i18n.getText("BUTTON_VIEW");

			var items = [];
			var paintingHistory = this.getView().getModel().oData.paintingHistory;
			for (var i = 0; i < paintingHistory.length; i++) {
				var paintingFromHistory = paintingHistory[i];
				var countHistory = i + 1;
				var customListItem = new sap.m.CustomListItem();
				var box = new sap.m.FlexBox({ alignItems: "Start", justifyContent: "SpaceBetween" });
				var text = new sap.m.Text({ text: countHistory + ". " + paintingFromHistory.artistName + " - " + paintingFromHistory.title });
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

		setMainImgFromImgOverview: function(evt) {
			// console.log("evt.getSource()", evt.getSource().data());
			// console.log("imgData", imgData);

			var imgData = evt.getSource().data().imgData;
			var oData = this.getView().getModel().oData;

			this.setMainImage(imgData);
			oData.displayedImage = imgData;
			oData.paintingHistory.push(imgData);
		},

		setMainImgFromHistory: function(evt) {
			//console.log("evt.getSource()", evt.getSource().data());
			//console.log("imgData", imgData);

			var imgData = evt.getSource().data().imgData;
			var oData = this.getView().getModel().oData;

			this.setMainImage(imgData);
			oData.displayedImage = imgData;
		},

		downloadImg: function() {
			// console.log("displayedImage", displayedImage);
			var displayedImage = this.getView().getModel().oData.displayedImage;
			this.forceDownload(displayedImage.image, displayedImage.artistName + "_" + displayedImage.title + ".jpg");
		},

		forceDownload: function(url, fileName) { // https://stackoverflow.com/questions/17527713/force-browser-to-download-image-files-on-click    workaround on deprecated image downloading from Chrome
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.responseType = "blob";
			xhr.onload = function() {
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

		pressStartButtonRandom: function() {
			var randomStyle = this.getRandomStyle();
			console.log("ranbdomStyle ", randomStyle);
			this.pressStartButton(randomStyle);
		},

		pressStartButtonFromStyle: function(evt) {
			var style = evt.getSource().data().styleData;
			this.pressStartButton(style);
		},

		pressStartButton: function(style) {
			console.log("style ", style);
			var featured = this.getIsFeatured(style);
			var comboBox = this.byId("comboBoxPaintingStyle");
			this.triggerPaintingStyleDataLoad(style, featured);
			this.showContent();
			comboBox.setValue(style); // set Name here
		},

		showContent: function() {
			//btw: the whole toolbar can be enabled/disabled https://openui5.hana.ondemand.com/#/sample/sap.m.sample.ToolbarEnabled/preview
			var flexBox = this.byId("mainFlexBox");
			var messagePage = this.byId("mainFlexBoxIntro");
			var randomPictureButton = this.byId("changePic");
			var comboBoxPaintingStyle = this.byId("comboBoxPaintingStyle");
			var imgDownloadButton = this.byId("imgDownloadButton");
			var showPoolButton = this.byId("showPoolButton");
			var showHistoryButton = this.byId("showHistoryButton");
			//var showIntorPageButton = this.byId("showIntorPageButton");
			var footerToolbarImgInformation = this.byId("imgInformation");
			flexBox.setVisible(true);
			messagePage.setVisible(false);
			randomPictureButton.setEnabled(true);
			comboBoxPaintingStyle.setEnabled(true);
			imgDownloadButton.setEnabled(true);
			showPoolButton.setEnabled(true);
			showHistoryButton.setEnabled(true);
			//showIntorPageButton.setEnabled(true);
			footerToolbarImgInformation.setVisible(true);
		},

		showIntroPage: function() {
			//btw: the whole toolbar can be enabled/disabled https://openui5.hana.ondemand.com/#/sample/sap.m.sample.ToolbarEnabled/preview
			var flexBox = this.byId("mainFlexBox");
			var messagePage = this.byId("mainFlexBoxIntro");
			var randomPictureButton = this.byId("changePic");
			var comboBoxPaintingStyle = this.byId("comboBoxPaintingStyle");
			var imgDownloadButton = this.byId("imgDownloadButton");
			var showPoolButton = this.byId("showPoolButton");
			var showHistoryButton = this.byId("showHistoryButton");
			//var showIntorPageButton = this.byId("showIntorPageButton");
			var footerToolbarImgInformation = this.byId("imgInformation");
			flexBox.setVisible(false);
			messagePage.setVisible(true);
			randomPictureButton.setEnabled(false);
			comboBoxPaintingStyle.setEnabled(false);
			imgDownloadButton.setEnabled(false);
			showPoolButton.setEnabled(false);
			showHistoryButton.setEnabled(false);
			//showIntorPageButton.setEnabled(false);
			footerToolbarImgInformation.setVisible(false);
		},

		isArrayNull: function(array) {
			if (!Array.isArray(array) || !array.length) {
				console.log("Array is empty!");
				return true;
			} else {
				return false
			}
		},

	});
});