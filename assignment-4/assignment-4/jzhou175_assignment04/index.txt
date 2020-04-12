(function() {
  /**
   * Helper object for working with countries data and extracting information.
   * See countries-data.js for format of the countries data set.
   */
  let countries = {
    /**
     * Store all countries from countries-data.js on `countries.all` for convenience.
     */
    all: window.countriesData,

    /**
     * Return an array of all countries, with the Name Object replaced by the
     * appropriate translation, or English if not specified (or unknown).  For
     * example, when language="English", you would process the record for Canada into:
     *
     * {
     *     code: "CA",
     *     continent: "Americas",
     *     areaInKm2: 9984670,
     *     population: 36624199,
     *     capital: "Ottawa",
     *     name: "Canada"
     * }
     *
     * Supported languages include:
     *
     * English, Arabic, Chinese, French, Hindi, Korean, Japanese, Russian
     *
     * Uses `countries.all` as the underlying array of countries to be processed.
     *
     * HINT: make sure you don't overwrite the original name object.
     */
    getByLanguage: function(language) {
      var byLang = [];
      for (var i = 0; i < countries.all.length; i++) {
        var temp = {};
        if (language == "English" || language == undefined) {
          temp.name = countries.all[i].name.English;
        }
        else if (language == "Arabic") {
          temp.name = countries.all[i].name.Arabic;
        }
        else if (language == "Chinese") {
          temp.name = countries.all[i].name.Chinese;
        }
        else if (language == "French") {
          temp.name = countries.all[i].name.French;
        }
        else if (language == "Hindi") {
          temp.name = countries.all[i].name.Hindi;
        }
        else if (language == "Korean") {
          temp.name = countries.all[i].name.Korean;
        }
        else if (language == "Japanese") {
          temp.name = countries.all[i].name.Japanese;
        }
        else if (language == "Russian") {
          temp.name = countries.all[i].name.Russian;
        }
        
        temp.code = countries.all[i].code;
        temp.continent = countries.all[i].continent;
        temp.areaInKm2 = countries.all[i].areaInKm2;
        temp.population = countries.all[i].population;
        temp.capital = countries.all[i].capital;

        byLang.push(temp);
      }

      return byLang;
    },
    
    /**
     * Return an array of countries with a population greater than or equal to
     * `minPopulation`, and possibly less than equal to `maxPopulation` (if defined)
     * otherwise allow any number greater than `minPopulation`.
     *
     * Uses getByLanguage('English') to get English names for countries.
     *
     * @param {Number} minPopulation - (Required) minimum population value
     * @param {Number} maxPopulation - (Optional) maximum population value
     */
    getByPopulation: function(minPopulation, maxPopulation) {
      var byEnglish = countries.getByLanguage("English");
      var byPopu = [];

      if (maxPopulation == undefined) {
        for (var i = 0; i < byEnglish.length; i++) {        
          if (byEnglish[i].population > minPopulation) {
            byPopu.push(byEnglish[i]);
          }
        }        
      }
      else {
        for (var i = 0; i < byEnglish.length; i++) {
          if (byEnglish[i].population >= minPopulation && byEnglish[i].population <= maxPopulation) {
            byPopu.push(byEnglish[i]);
          }
        }
      }

      return byPopu;
    },

    /**
     * Return an array of countries for the given `continent` with an area
     * greater than or equal to the given `area` in square KM.
     *
     * Uses getByLanguage('English') to get English names for countries.
     *
     * @param {String} continent - (Required) name of the continent (e.g., Europe)
     * @param {Number} minArea - (Required) minimum number of KM2 area
     */
    getByAreaAndContinent: function(continent, minArea) {
      var byEnglish = countries.getByLanguage("English");
      var byConArea = [];

      for (var i = 0; i < byEnglish.length; i++) {
        if (byEnglish[i].continent == continent && byEnglish[i].areaInKm2 >= minArea) {
          byConArea.push(byEnglish[i]);
        }
      }

      return byConArea;
    }
  };

  /**
   * Helper functions for building table elements.
   */
  let tableHelper = {
    /**
     * Clears (any) existing rows from the #table-rows table body
     */
    clearTable: function() {
      
      // remove existing Body element
      var tBody = document.getElementById("table-rows");
      while (tBody.firstChild) {        
          tBody.removeChild(tBody.firstChild);
        }  
      },

    /**
     * Takes a `country.code` (e.g., "CA" for Canada) and returns an <img>
     * element with its `src` property set the appropriate flag image URL
     * for this code, e.g., src="flags/ca.png" for Canada.
     * 
     * Note: Some of the images are missing and may result in a 404 error. 
     * Ignore these errors.
     */
    countryCodeToFlagImg: function(countryCode) {
      var image = document.createElement("img");
      var flagName = countryCode.toLowerCase();
      image.src = "flags/" + flagName + ".png";
      image.alt = "";

      return image;
    },

    /**
     * Takes a single `country` object and converts it to a <tr> with <td>
     * child elements for every column in the row.  The row should match the
     * expected format of the table (i.e., flag, code, country, continent, etc).
     * Return the new <tr>...</tr> row.
     *
     * Use the DOM methods document.createElement(), element.appendChild(), etc
     * to create your <tr> row.
     */
    countryToRow: function(country) {      
      var row = document.createElement("tr");

      var cell = document.createElement("td");
      cell.appendChild(this.countryCodeToFlagImg(country.code));
      row.appendChild(cell);

      row.appendChild(this.getTdElement(country.code));
      row.appendChild(this.getTdElement(country.name));
      row.appendChild(this.getTdElement(country.continent));
      row.appendChild(this.getTdElement(country.areaInKm2));
      row.appendChild(this.getTdElement(country.population));
      row.appendChild(this.getTdElement(country.capital));

      return row;
    },

    getTdElement: function(text) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(text);
      cell.appendChild(cellText);
      
      return cell;
    },

    /**
     * Takes an array of `country` Objects named `countries`, and passes each
     * `country` in the array  to `tableHelper.countryToRow()`.  The resulting
     * rows are then appended to the #table-rows table body element.  Make sure
     * you use `tableHelper.clear()` to remove any existing rows before you do this.
     */
    countriesToTable: function(countriesTbl) {
      this.clearTable();

      var tBody = document.getElementById("table-rows");
      for (var i = 0; i < countriesTbl.length; i++) {
        var row = this.countryToRow(countriesTbl[i]);
        tBody.appendChild(row);
      }
    }
  };

  /**
   * Register click handlers for every menu item in the page.  Use the `countries`
   * and `tableHelper` Objects, and their associated methods, to update/populate
   * the #table-rows table body with the appropriate set of countries, based on the
   * menu item clicked.
   *
   * Make sure you also update the #subtitle heading to properly reflect what
   * is in the table after you populate it. For example: "List of Countries
   * and Dependencies - Population between 1 and 2 million" or "List of Countries
   * and Dependencies - All countries in Asia" etc.
   */
  function setupMenuHandlers() {
    document.querySelector("#menu_english").onclick = function () {
      var subttl = document.querySelector("#subtitle");
     // alert(subttl.innerText);
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in English";
      
      var countriesEnglish = countries.getByLanguage("English");      
      tableHelper.countriesToTable(countriesEnglish);     
    };

    document.getElementById("menu_arabic").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in Arabic";

      var countriesArabic = countries.getByLanguage("Arabic");
      tableHelper.countriesToTable(countriesArabic);
    };

    document.getElementById("menu_chinese").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in Chinese (中文)";

      var countriesChina = countries.getByLanguage("Chinese");
      tableHelper.countriesToTable(countriesChina);
    };

    document.getElementById("menu_french").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in French";

      var countriesFrench = countries.getByLanguage("French");
      tableHelper.countriesToTable(countriesFrench);
    };

    document.getElementById("menu_hindi").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in Hindi";

      var countriesHindi = countries.getByLanguage("Hindi");
      tableHelper.countriesToTable(countriesHindi);
    };

    document.getElementById("menu_korean").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in Korean";

      var countriesKorean = countries.getByLanguage("Korean");
      tableHelper.countriesToTable(countriesKorean);
    };

    document.getElementById("menu_japanese").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in Japanese";

      var countriesJapanese = countries.getByLanguage("Japanese");
      tableHelper.countriesToTable(countriesJapanese);
    };

    document.getElementById("menu_russian").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Country/Dep. Name in Russian";

      var countriesRussian = countries.getByLanguage("Russian");
      tableHelper.countriesToTable(countriesRussian);
    };

    document.getElementById("menu_population_100_000_000m").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Population greater than 100000000";

      var popu1 = countries.getByPopulation(100000000);
      tableHelper.countriesToTable(popu1);
    };

    document.getElementById("menu_population_1m_2m").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Population between 1 and 2 million";

      var popu2 = countries.getByPopulation(1000000, 2000000);
      tableHelper.countriesToTable(popu2);
    };

    document.getElementById("menu_americas_1mkm").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - Countries in Americas with area greater than 1 million Km2";

      var americaArea = countries.getByAreaAndContinent("Americas", 1000000);
      tableHelper.countriesToTable(americaArea);
    };

    document.getElementById("menu_asia_all").onclick = function () {
      var subttl = document.querySelector("#subtitle");
      subttl.innerText = "List of Countries and Dependencies - All countries in Asia";

      var asia = countries.getByAreaAndContinent("Asia", 0);
      tableHelper.countriesToTable(asia);
    };

  }

  // When the page loads, setup all event handlers by calling setup function.
  window.onload = setupMenuHandlers;
})();
