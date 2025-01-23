var stopVideos = function () {
  var video = document.querySelector("#intro-video-player");
  var modalVideo = document.getElementById("model-modal-container");
  modalVideo.classList.remove("universal-blank-modal");
  modalVideo.innerHTML = `<lite-youtube js-api videoid="zvEyJALH4Ec" playlabel="Vinayak Amara location overview"></lite-youtube>`;

  video.pause();
};
var playVideo = async function () {
  var video = document.querySelector("#intro-video-player");
  var modalVideo = document.getElementById("model-modal-container");
  modalVideo.classList.add("universal-blank-modal");
  modalVideo.innerHTML = "";
  video.play();
};

// var myModalEl1 = document.getElementById("videoModal1");
// myModalEl1.addEventListener("hidden.bs.modal", function (event) {
//   stopVideos();
// });
var myModalEl2 = document.getElementById("videoModal2");
myModalEl2.addEventListener("hidden.bs.modal", function (event) {
  playVideo();
  console.log("HIDE");
});

myModalEl2.addEventListener("shown.bs.modal", function (event) {
  stopVideos();
  console.log("SHOWN");
});
