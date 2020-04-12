/** * WEB222 Assignment 02 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.*  
 * No part of this assignment has been copied manually or electronically from any other source * 
 * (including web sites) or distributed to other students. * 
 *  Please update the following with your information: 
 * * Name: Jingmin Zhou (Jessica) *     
 * * Student ID: 119766194 *      
 * * Date: Jan. 29th 2020 */

const users = require('./users.json');

function firstName() {
    // Get the first element from the users Array
    var firstUser = users[0];    
    // TODO: fix this code to use dot notation to access the first name  portion only    
    return firstUser.name.first + " " + firstUser.name.last;  
}
console.log(firstName()); 
// Output: Paige Bools

// Task 1: 
function getAge(birthdate, currentdate) {

    return (currentdate.getFullYear() - new Date(birthdate).getFullYear());
}
console.log(getAge(users[0].birthDate, new Date()));

// Task 2:
function getAvg() {
    var ages = 0;
    for (var i = 0; i < users.length; i++) {
        ages += getAge(users[i].birthDate, new Date());
    }

    return ages / users.length;
}
console.log(getAvg()); 
// Output:20.733333333333334

// Task 3:
const userUtils = {};
userUtils.getManager = function() {

    var userManager = users.filter(element => element.isManager == true);

    return userManager;
}
console.log(userUtils.getManager()); 
// Output: 69 user_objects in userManager array

// Task 4:
function getNameLength(firstname,lastname) {
    var str = "";
    str = firstname.concat(" ", lastname);

    return str.length;
}
console.log(getNameLength("Sharmin","Ahmed")); // 13

// Task 4:
userUtils.getLongestName = function() {
    var max = getNameLength(users[0].name.first, users[0].name.last);
    var index = 0;
    for (var i = 1; i < users.length; i++) {        
        if (getNameLength(users[i].name.first, users[i].name.last) > max) {
            max = getNameLength(users[i].name.first, users[i].name.last);
            index = i;
        }
    }
    
    return users[index];
}
console.log(userUtils.getLongestName(users));

// Task 5:
userUtils.searchByName = function(patt, fuzzy) {
    var userMatch = [];
    if (fuzzy == true) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name.first.toLowerCase().startsWith(patt.toLowerCase()) ||
                users[i].name.last.toLowerCase().startsWith(patt.toLowerCase())) {
                    userMatch.push(users[i]);
                }
        }
    }
    else if (fuzzy == false || fuzzy == undefined) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].name.first == patt || users[i].name.last == patt) {
                    userMatch.push(users[i]);
                }
        }
    }
    
    return userMatch;
}
console.log(userUtils.searchByName("pa", true))

// Task 6:
userUtils.mostCommonCountry = function(users) {
    var countries = [];
    var country;
    var count;
    for(var i = 0;i < users.length; i++) {   
        country = users[i].address.country;
        count = countries[country] || 0;
        countries[country] = count + 1;
    }
    var max = 0;
    var index;
    for (var x in countries) {
        if (countries[x] > max) {
            max = countries[x];
            index = x;
        }
    }

    return index + ": " + countries[index];
}
console.log(userUtils.mostCommonCountry(users));
// Output: China: 29