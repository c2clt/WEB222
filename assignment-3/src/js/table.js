// Data for the "HTML Tables" Page

const users = [
  {
    first_name: 'Kaitlin',
    last_name: 'Burns',
    age: 23,
    email: 'kburns99753@usermail.com'
  },
  {
    first_name: 'Joshua',
    last_name: 'Feir',
    age: 31,
    email: 'josh319726@usermail.com'
  },
  {
    first_name: 'Stephen',
    last_name: 'Shaw',
    age: 28,
    email: 'steve.shaw47628@usermail.com'
  },
  {
    first_name: 'Timothy',
    last_name: 'McAlpine',
    age: 37,
    email: 'Timbo72469@usermail.com'
  },
  {
    first_name: 'Sarah',
    last_name: 'Connor',
    age: 19,
    email: 'SarahC6320@usermail.com'
  }
];

window.onload = function table3(){
  var tbl = document.querySelector("#table3");

  var tblExistingBody = tbl.querySelector("tbody");
  if (tblExistingBody) {
    tbl.removeChild(tblExistingBody);
  }
  
  var tblBody = document.createElement("tbody");

  for (var i = 0; i < users.length; i++) {
     var row = document.createElement("tr");

     row.appendChild(getTdElement(users[i].first_name));
     row.appendChild(getTdElement(users[i].last_name));
     row.appendChild(getTdElement(users[i].age));
     row.appendChild(getTdLinkElement(users[i].email, users[i].email));

     tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
}

function getTdElement(text) {
  var cell = document.createElement("td");
  var cellText = document.createTextNode(text);
  cell.appendChild(cellText);
  return cell;
}

function getTdLinkElement(text, href) {
   var anchor = document.createElement("a");
   anchor.setAttribute("href", "mailto:" + href);
   var anchorText = document.createTextNode(text);
   anchor.appendChild(anchorText);
   
   var cell = document.createElement("td");
   cell.appendChild(anchor);
   return cell;
}