// Data for the "HTML Video" Page

const video = {
  controls: true,
  width: 320,
  height: 240,
  source: [
    {
      src: 'https://scs.senecac.on.ca/~tanvir.alam/shared/fall-2018/web222/movie.mp4',
      type: 'video/mp4'
    },
    {
      src: 'https://scs.senecac.on.ca/~tanvir.alam/shared/fall-2018/web222/movie.ogg',
      type: 'video/ogg'
    }
  ]
};

window.onload = function() {
  var videoContainer = document.getElementById("video");

  var videoElement = document.createElement("video");
  videoElement.width = video.width;
  videoElement.height = video.height;
  videoElement.controls = video.controls;

  for (var i = 0; i < video.source.length; i++) {
    var sourceElement = document.createElement("source");
    sourceElement.src = video.source[i].src;
    sourceElement.type = video.source[i].type;
    videoElement.appendChild(sourceElement);
  }
  videoContainer.appendChild(videoElement);
}


