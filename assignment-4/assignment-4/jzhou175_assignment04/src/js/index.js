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
      
      //temp is a deep copy of the all array (multi dimensional array)
      temp = JSON.parse(JSON.stringify(this.all));

      // set name variable in temp according to the selected language
      for (var i=0; i<temp.length;i++)
       {
         temp[i].name=temp[i].name[language];
       }
      return temp;
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
    getByPopulation: function(minPopulation,maxPopulation) {
     
      var arr_p=[];  // arr_p will store the desired result of this function
      var temp_p=[]; // temp_p is an array that has "name" based on the language selected
           
      temp_p=this.getByLanguage(language);
         
      if (maxPopulation>0) // maxPopulation parameter exists
         {
           temp_p.forEach ((element)=>{
           if((element.population >= minPopulation)&&(element.population<=maxPopulation))
             arr_p.push(element);
           });
          }
      else
         {
           temp_p.forEach ((element)=>{
           if(element.population >= minPopulation)
             arr_p.push(element);
          });
         }
      return arr_p;
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
      
      var arr_a=[];  // arr_a will store the desired result of this function
      var temp_a=[]; // temp_a is an array that has "name" based on the language selected
      
      temp_a=this.getByLanguage(language);
          
      if (minArea>0) // minArea parameter exists
      {
        temp_a.forEach ((element)=>{
           if((element.continent==continent)&&(element.areaInKm2>=minArea))
             arr_a.push(element);
           });
      }
      else
      { 
        temp_a.forEach ((element)=>{
        if(element.continent==continent)
          arr_a.push(element);
        });
      }
    return arr_a;
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
      
      // Removing all rows(children) from table body(element)
			var element = tbl.querySelector("tbody");
			while (element.firstChild) {
			  element.removeChild(element.firstChild);
			}
      
      // Removing a specified element without having to specify its parent node
      if (element.parentNode) {
        element.parentNode.removeChild(element);
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
     
      var image=document.createElement("img");
      var str = "../flags/"+countryCode+".png";
      image.src=str;
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
    
    // Create <td> elements and put them at the end of the table row
    var flag_img_td=document.createElement("td");
    var flag_img=this.countryCodeToFlagImg(country.code);
    flag_img_td.appendChild(flag_img);
    row.appendChild(flag_img_td);
    row.appendChild(this.getTdElement(country.code));
    row.appendChild(this.getTdElement(country.name));
    row.appendChild(this.getTdElement(country.continent));
    row.appendChild(this.getTdElement(country.areaInKm2));
    row.appendChild(this.getTdElement(country.population));
    row.appendChild(this.getTdElement(country.capital));
    return row;
    },

    // Helper funtion to create a <td> element and a text
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
    countriesToTable: function(countries) {
      
      // creating all table rows
      for (var i = 0; i < countries.length; i++) {
        {
          // creates a table row
          var tblrow = tableHelper.countryToRow(countries[i]);
          tblBody.appendChild(tblrow);
        }

      // add the table body to the table
      tbl.appendChild(tblBody);
      }
    },
    
    /**
     * Takes a string and update table subtitle accordingly.
     */
    subtitleUpdate: function(newTitle){
      
      var sub_title=document.getElementById ("subtitle");
      
      // remove "2" in km2, if exists
      if(sub_title.childNodes[1])
        {sub_title.removeChild(sub_title.childNodes[1]);}
      
        // replace sub-title
      var new_text=document.createTextNode(newTitle);
      var new_node=sub_title.appendChild(new_text);
      console.log (new_node)
      sub_title.replaceChild(new_node,sub_title.childNodes[0]);
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
    
    language="English"; // declare global variable and default value as English
    var elem_en = document.querySelector("#menu_english");
    elem_en.onclick = function() {language="English"}; 
    var elem_ar = document.querySelector("#menu_arabic");
    elem_ar.onclick = function() {language="Arabic"};
    var elem_en = document.querySelector("#menu_chinese");
    elem_en.onclick = function() {language="Chinese"}; 
    var elem_ar = document.querySelector("#menu_french");
    elem_ar.onclick = function() {language="French"};
    var elem_en = document.querySelector("#menu_hindi");
    elem_en.onclick = function() {language="Hindi"}; 
    var elem_ar = document.querySelector("#menu_korean");
    elem_ar.onclick = function() {language="Korean"};
    var elem_en = document.querySelector("#menu_japanese");
    elem_en.onclick = function() {language="Japanese"}; 
    var elem_ar = document.querySelector("#menu_russian");
    elem_ar.onclick = function() {language="Russian"};

    // define global variables to create the table of countries
    // get the reference for the body
    tbl = document.querySelector("#outputTable");
    // creates a <tbody> element
    tblBody = document.createElement("tbody");
    
    // events related to the population menu
    var elem_pop1 = document.querySelector("#menu_population_100_000_000m");
    elem_pop1.onclick = function() {
      var arr=countries.getByPopulation(100000000);
      tableHelper.clearTable();
      tableHelper.countriesToTable(arr);
      tableHelper.subtitleUpdate("List of Countries and Dependencies - Population greater than 100 million");
    };

    var elem_pop2 = document.querySelector("#menu_population_1m_2m");
    elem_pop2.onclick = function() {
      var arr=countries.getByPopulation(1000000,2000000);
      tableHelper.clearTable();
      tableHelper.countriesToTable(arr);
      tableHelper.subtitleUpdate("List of Countries and Dependencies - Population between 1 and 2 million");
    };

    // events related to the area and continent menu
    var elem_area1 = document.querySelector("#menu_americas_1mkm");
    elem_area1.onclick = function() {
      var arr=countries.getByAreaAndContinent("Americas",1000000);
      tableHelper.clearTable();
      tableHelper.countriesToTable(arr);
      tableHelper.subtitleUpdate("List of Countries and Dependencies - All countries in America with more than 1 million km");
      // addition code to format km2 
      var sub_title=document.getElementById ("subtitle");
      var sup_text=document.createElement("sup");
      var sqr_text=document.createTextNode("2");
      sup_text.appendChild(sqr_text);
      sub_title.appendChild(sup_text);
    };

    var elem_area2 = document.querySelector("#menu_asia_all");
    elem_area2.onclick = function() {
      var arr=countries.getByAreaAndContinent("Asia",0);
      tableHelper.clearTable();
      tableHelper.countriesToTable(arr);
      tableHelper.subtitleUpdate("List of Countries and Dependencies - All countries in Asia");
    };

  }

  // When the page loads, setup all event handlers by calling setup function.
  window.onload = setupMenuHandlers;
  
})();
