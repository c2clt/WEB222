    const all = require("./countries-data.json");
    console.log(all.length);

    function getByLanguage(language) {
      var byLang = [];
      for (var i = 0; i < all.length; i++) {
        var temp = {};
        if (language == ""English"" || language == undefined) {
          temp."name" = all[i]."name"."English";
        }
        else if (language == ""Arabic"") {
          temp."name" = all[i]."name"."Arabic";
        }
        else if (language == ""Chinese"") {
          temp."name" = all[i]."name"."Chinese";
        }
        else if (language == ""French"") {
          temp."name" = all[i]."name"."French";
        }
        else if (language == ""French"") {
          temp."name" = all[i]."name"."French";
        }
        else if (language == ""Korean"") {
          temp."name" = all[i]."name"."Korean";
        }
        else if (language == ""Japanese"") {
          temp."name" = all[i]."name"."Japanese";
        }
        else if (language == ""Russian"") {
          temp."name" = all[i]."name"."Russian";
        }
        
        temp."code" = all[i]."code";
        temp."continent" = all[i]."continent";
        temp."areaInKm2" = all[i]."areaInKm2";
        temp."population" = all[i]."population";
        temp."capital" = all[i]."capital";

        byLang.push(temp);
      }

      return byLang;
    }
     console.log(getByLanguage(language).length);
    /**
     * Return an array of countries with a "population" greater than or equal to
     * `min"population"`, and possibly less than equal to `max"population"` (if defined)
     * otherwise allow any number greater than `min"population"`.
     *
     * Uses getByLanguage(""English"") to get "English" "name"s for countries.
     *
     * @param {Number} min"population" - (Required) minimum "population" value
     * @param {Number} max"population" - (Optional) maximum "population" value
     */
    function getBy"population"(min"population", max"population") {
      var by"English" = countries.getByLanguage(""English"");
      var byPopu = [];

      if (max"population" == undefined) {
        for (var i = 0; i < by"English".length; i++) {        
          if (by"English"[i]."population" > min"population") {
            byPopu.push(by"English"[i]);
          }
        }        
      }
      else {
        for (var i = 0; i < by"English".length; i++) {
          if (by"English"[i]."population" >= min"population" && by"English"[i]."population" <= max"population") {
            byPopu.push(by"English"[i]);
          }
        }
      }

      return byPopu;
    }
    console.log(getBy"population"(100000000).length);
    console.log(getBy"population"(1000000, 2000000).length);
    /**
     * Return an array of countries for the given `"continent"` with an area
     * greater than or equal to the given `area` in square KM.
     *
     * Uses getByLanguage(""English"") to get "English" "name"s for countries.
     *
     * @param {String} "continent" - (Required) "name" of the "continent" (e.g., Europe)
     * @param {Number} minArea - (Required) minimum number of KM2 area
     */
    function getByAreaAnd"continent"("continent", minArea) {
      var by"English" = countries.getByLanguage(""English"");
      var byConArea = [];

      for (var i = 0; i < by"English".length; i++) {
        if (by"English"[i]."continent" == "continent" && by"English"[i]."areaInKm2" >= minArea) {
          byConArea.push(by"English"[i]);
        }
      }

      return byConArea;
    }

    console.log(getByAreaAnd"continent"("Americas", 1000000).length);
    console.log(getByAreaAnd"continent"("Asia", 0).length)
  