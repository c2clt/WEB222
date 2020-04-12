// Data for the "HTML Images" Page

const images = [
  {
    caption: 'Red Slate Mountain',
    alt: 'Mountain',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Red_Slate_Mountain_1.jpg/320px-Red_Slate_Mountain_1.jpg'
  },
  {
    caption: 'St. Petersburg River',
    alt: 'River',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Saint-petersburg-river-march-24-2016.jpg/320px-Saint-petersburg-river-march-24-2016.jpg'
  },
  {
    caption: 'Lybian Desert',
    alt: 'Desert',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Libyan_Desert_-_2006.jpg/320px-Libyan_Desert_-_2006.jpg'
  },
  {
    caption: 'Azerbaijan Forest',
    alt: 'Forest',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Azerbaijan_forest_3.JPG/320px-Azerbaijan_forest_3.JPG'
  },
  {
    caption: 'Indonesian Jungle',
    alt: 'Jungle',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Indonesian_jungle3%2C_Zoo_Prague.jpg/320px-Indonesian_jungle3%2C_Zoo_Prague.jpg'
  }
];

window.onload = function picture() {
  var pic = document.querySelector("#pictures");
   

  for (var i = 0; i < images.length; i++) {  

    var figure = document.createElement("figure");   
    
    var imgLink = document.createElement("a");
    imgLink.href = images[i].url;
    imgLink.appendChild(getImgElement(images[i].alt, images[i].url))
    figure.appendChild(imgLink);

    var caption = document.createElement("figcaption");
    caption.appendChild(getCapElement(images[i].caption));   
    figure.appendChild(caption);

    pic.appendChild(figure);
 }  
}

function getImgElement(text, link) {
  var img = document.createElement("img");
    img.src = link;
    img.alt = text;
    return img;
}

function getCapElement(text) {
  return document.createTextNode(text);
}
