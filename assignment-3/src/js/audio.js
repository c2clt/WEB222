// Data for the "HTML Audio" Page

const audio = {
  controls: true,
  source: [
    {
      src: 'https://scs.senecac.on.ca/~tanvir.alam/shared/fall-2018/web222/Track03.mp3',
      type: 'audio/mpeg'
    },
    {
      src: 'https://scs.senecac.on.ca/~tanvir.alam/shared/fall-2018/web222/Track03.ogg',
      type: 'audio/ogg'
    }
  ]
};

window.onload = function() {
  var audioContainer = document.getElementById("audios");

  var audioElement = document.createElement("audio");
  audioElement.controls = audio.controls;
  for (var i = 0; i < audio.source.length; i++) {
    var sourceElement = document.createElement("source");
    sourceElement.src = audio.source[i].src;
    sourceElement.type = audio.source[i].type;
    audioElement.appendChild(sourceElement);
  }
  audioContainer.appendChild(audioElement);
}