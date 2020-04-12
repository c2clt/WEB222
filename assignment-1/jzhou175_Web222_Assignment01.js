/**
 *  WEB222 Assignment 01 
 * 
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source 
 *  (including web sites) or distributed to other students. 
 *  Please update the following with your information: 
 *  Name: Jingmin Zhou (Jessica) 
 *  Student ID: 119766194      
 *  Date: January 18th, 2020
 */

/**
 * Task 1​ - Create a function ​formatEmailAddress(name,email)​ to 
 * format a name and emailaddress into the following String format: 
 * "Name <email@address>"
 * name - a String with the person's name (e.g., "Kim Smythe")
 * email - a String with the person's email (e.g., "kims@gmail.com")
 * formatEmailAddress(“Kim Smythe”, “kims@gmail.com”)
 * returns Kim Smythe <kims@gmail.com>
 */
function formatEmailAddress(name, email) {
    return name + " <" + email + ">";
}

console.log(formatEmailAddress("Kim Smyth", "kims@gmail.com"));
//Output: Kim Smyth <kims@gmail.com>


/**
 * Task 2 - ​Create a function ​massToPounds(mass,unit)​ to 
 * convert mass in Kilograms or Stones to Pounds. 
 * Return a formatted string (e.g., “33.07 lb”)
 * mass - a number with a mass value (e.g., 15)
 * unit - a String with a mass scale unit (one of: “kg”, “KG”,”stone” or “STONE”)
 * If no unit is given, assume that the mass is kg. 
 * For all other values of unit, write an errormessage.
 * Write this function using ​Function Expression​ format 
 */
 var massToPunds = function(mass, unit) {
     var pound;
     if (unit == "kg" || unit == "KG" || unit == undefined) {
         pound = (mass * 2.2).toFixed(2) + " lb";
     }
     else if (unit == "stone" || unit == "STONE" ) {
         pound = (mass * 14).toFixed(2) + " lb";
     }
     else {
         pound = "Error: wrong unit entered!!!";
     }
     
     return pound;
 }

 console.log(massToPunds(15, "kg"));
 //Ouyput: 33.00 lb

 /**
  * Task 3 - ​Create a function called ​toSeconds(days) ​
  * that calculates the number of seconds for the given number of days.
  * days - a Number of days.
  * Ignore any fractional parts (i.e., treat 1.34 the same as 1). 
  * If no value is given for `days`(undefined, null, 0), assume 1 as a default.
  */
  function toSeconds(days) {
      var seconds;

      if (days == undefined || days == null || days == 0) {
          seconds = 1;
      }
      else {
        seconds = parseInt(days) * 24 * 60 * 60;
      }
      
      return seconds;
  }

  console.log(toSeconds(1.34));
  //Output: 86400

/**
 * Task 4​ - Create a function called ​currencyTotal() 
 * ​that takes a varying number of currency 
 * strings as a list of arguments and 
 * returns it formatted as a currency string, 
 * formatted to 2 decimal points (use toFixed() specified in week 2 slides)
 * currencyTotal('1.99', '3.00', '4.16') should return '$9.15'
 */
 function currencyTotal() {
     var sum = 0;
     for (var i = 0; i < arguments.length; i++) {
         sum += Number(arguments[i]);
     }

     return "$" + sum.toFixed(2);
 }

 console.log(currencyTotal("1.99", "3.00", "4.16"));
 //Output: $9.15

 /**
  * Task 5 - ​Create a function ​lessthanHundred() ​
  * that takes varying number of inputs asparameter (as a list of arguments)
  * and checks if the sum of all the numbers is less than 100.
  * Allow both String and Number arguments to be passed, 
  * but print an error message 
  * if any other type is passed to the function (e.g., Boolean). 
  * If the list is empty (nothing passed to thefunction), 
  * return true.
  * lessThanhundred(1,”2”,3,”4”,23) returns true
  * lessThanhundred(1,2,3,4,23) returns true
  * lessThanhundred(1,2,3,4,false) returns false
  * lessThanhundred(1,2,78,45,23) returns false
  * lessThanhundred() returns true
  */
  function lessThanhundred() {
      var sum = 0;
      var b = true;
      for (var i = 0; i < arguments.length; i++) {
          if (isNaN(arguments[i])) {
              b = false;
          }
          else if (typeof(arguments[i]) === "boolean") {
              b = false;
          }
          else {
              sum += Number(arguments[i]);
          }
      }

      if (sum >= 100 && b == true) {
          b = false;
      }

      return b;
  }

  console.log(lessThanhundred(1,"2",3,"4",23)); //output: true
  console.log(lessThanhundred(1,2,3,4,23));     //output: true
  console.log(lessThanhundred(1,2,3,4,false));  //output: false
  console.log(lessThanhundred(1,2,78,45,23));   //output: false
  console.log(lessThanhundred());               //output: true