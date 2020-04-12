// Data for the "HTML Lists" Page

const fruits = ['Apples', 'Oranges', 'Pears', 'Grapes', 'Pineapples', 'Mangos'];
var str = '<ol>';
fruits.forEach(function(fruit) {
  str += '<li>'+ fruit + '</li>';
}); 
str += '</ol>';
document.getElementById("fruitslist").innerHTML = str;


const directory = [
  { type: 'file', name: 'file1.txt' },
  { type: 'file', name: 'file2.txt' },
  {
    type: 'directory',
    name: 'HTML Files',
    files: [
      { type: 'file', name: 'file1.html' },
      { type: 'file', name: 'file2.html' }
    ]
  },
  { type: 'file', name: 'file3.txt' },
  {
    type: 'directory',
    name: 'JavaScript Files',
    files: [
      { type: 'file', name: 'file1.js' },
      { type: 'file', name: 'file2.js' },
      { type: 'file', name: 'file3.js' }
    ]
  }
];
var strDir = '<ul>';
for (var i = 0; i < directory.length; i++) {
  if (directory[i].type == "file") {
    strDir += '<li>'+ directory[i].name + '</li>';
  }
  else if (directory[i].type == "directory") {
    strDir += '<li>'+ directory[i].name;
    var strSub = '<ul>';
    for (var j = 0; j < directory[i].files.length; j++) {
      strSub += '<li>'+ directory[i].files[j].name + '</li>';
    }
    strSub += '</ul>';
    strDir += strSub + '</li>';
  }
}; 

strDir += '</ul>';
document.getElementById("directories").innerHTML = strDir;
