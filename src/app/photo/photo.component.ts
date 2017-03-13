import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  age = "Clicca sull'immagine per cominciare";
  description = "no description";
  enableCapture = false;
  log = "";
  faces = {};

  constructor() { }

  evaluateAge() {
    this.age = this.enableCapture ? "Cercando...(clicca sull'immagine per mettere in pausa)" : "In pausa(clicca sull'immagine per ricominciare)";
    if (this.enableCapture) {
      const video = <any>document.getElementsByTagName('video')[0];
      const canvas = <any>document.getElementsByName('canvas')[0];
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const size = this.dataURItoBlob(canvas.toDataURL('image/jpeg', 1)).size;
      const rapp = 153600 / size;
      //console.log(size*rapp);
      var image = canvas.toDataURL('image/jpeg', rapp);

      this.analyzeImage(image).then(imageAge => {
        //this.log = imageAge[0];

        this.clearCanvas();
        const vCanvas = <any>document.getElementsByName('videoCanvas')[0];
        //console.log(imageAge[0]);
        //imageAge[0] = {};
        if (Object.keys(imageAge[0]).length > 0) {
          this.log = video.height + "x" + video.width + " c:" + vCanvas.height + "x" + vCanvas.width + " " +
            imageAge[0].faceRectangle.width;
        } else {
          this.log = "no rectangles.....";
        }

        const ctx = vCanvas.getContext('2d');
        //ctx
        ctx.strokeStyle = "#FF0000";
        const fs = video.width / 20;
        ctx.font = fs + "px Georgia";
        ctx.fillStyle = "#FF0000";
        var resize = Math.min(video.videoWidth / video.width, video.videoHeight / video.height);
        var arr = Object.keys(imageAge).map(function (key) { return imageAge[key]; });
        arr.forEach(function (element) {
          var age = element.faceAttributes.age;
          var smile = element.faceAttributes.smile;
          var facialHair = element.faceAttributes.facialHair;
          var glasses = element.faceAttributes.glasses.toLowerCase();
          const emotionMapping = {
            "anger": "arrabbiato",
            "contempt": "contento",
            "disgust": "disgustato",
            "fear": "spaventato",
            "happiness": "felice",
            "neutral": "neutro",
            "sadness": "triste",
            "surprise": "sorpreso"
          }
          const rect = element.faceRectangle;
          const left = (rect.left + rect.width) / resize;
          var top = (rect.top /*+ rect.height*/) / resize;
          ctx.strokeRect(rect.left / resize, rect.top / resize, rect.width / resize, rect.height / resize);

          var text = age + " anni, ";// +
          ctx.fillText(text, left, top);
          top += 1.3 * fs;

          var scores = element.scores;
          var max = Math.max.apply(null, Object.keys(scores).map(function (x) { return scores[x] }));
          text = (Object.keys(scores).filter(function (x) { return scores[x] == max; })[0]);
          ctx.fillText(emotionMapping[text], left, top);
          top += 1.3 * fs;

          text = (facialHair.beard >= 0.2 ? "barba " : "") +
            (facialHair.moustache >= 0.2 ? "baffi " : "");
          ctx.fillText(text, left, top);
          top += 1.3 * fs;

          switch (glasses) {
            case "noglasses":
              text = "Non porti gli occhiali";
              break;
            case "readingglasses":
              text = "Occhiali da lettura";
              break;
            case "sunglasses":
              text = "Occhiali da sole";
              //text="Spacciatore";
              break;
            default:
              text = "";
          }
          ctx.fillText(text, left, top);
          //top+=1.3*fs;
        });

        setTimeout(() => this.evaluateAge(), 3000);
      })
    }
  }

  onClick() {
    this.enableCapture = !(this.enableCapture);
    this.evaluateAge();
  }

  onResize() {
    const video = <any>document.getElementsByTagName('video')[0];
    const canvas = <any>document.getElementsByName('videoCanvas')[0];
    video.width = parent.innerWidth / 2;
    var ratio = video.videoHeight / video.videoWidth;
    video.height = video.width * ratio;
    canvas.height = video.height;
    canvas.width = video.width * 2;

    this.log = video.height + "x" + video.width + " c:" + canvas.height + "x" + canvas.width;
  }

  analyzeImage(stream) {
    var delay = 1000;
    const blob = this.dataURItoBlob(stream);
    //var finalresponse = {};
    //var comp = this;
    this.computerVision(blob).then(captions => {
      this.description = captions[0].text;
    });
    return new Promise(
      (resolve, reject) => {
        this.getAgeFromImage(blob).then(faces => {
          this.faces = faces;
          delay = 0;
          //resolve(faces);
        });

        setTimeout(() => {
          this.getEmotionFromImage(blob).then(emotions => {

            if (Object.keys(this.faces).length === 0) {
              this.faces = emotions;
            } else {
              this.faces = this.addEmotionToFace(this.faces, emotions);
            }
            this.log = "" + delay;
            console.log(this.faces);
            resolve(this.faces);
          });
        }, delay);


      });
  }

  getAgeFromImage(blob) {
    return new Promise(
      (resolve, reject) => {
        const faceApiUrl = [
          'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?',
          'returnFaceId=true',
          'returnFaceLandmarks=false',
          'returnFaceAttributes=age,smile,facialHair,glasses'
        ].join('&');

        const emotionApiUrl = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?';

        var xhrface = new XMLHttpRequest();
        xhrface.open('POST', faceApiUrl, true);
        xhrface.setRequestHeader('content-type', 'application/octet-stream');
        xhrface.setRequestHeader('Ocp-Apim-Subscription-Key', "6e2715cbea564f4f95f9a097e935e8c7");

        xhrface.onreadystatechange = function () {
          if (xhrface.readyState == 4) {
            if (xhrface.status == 200) {
              //var resp = JSON.parse(xhrface.response);
              //console.log(this);
              var resp = JSON.parse(xhrface.response);
              resolve(resp);
            } else {
              resolve(xhrface.status);
            }
          }
        }
        xhrface.send(blob);
      });
  }

  getEmotionFromImage(blob) {
    return new Promise((resolve, reject) => {
      const emotionApiUrl = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?';

      var xhremotion = new XMLHttpRequest();
      xhremotion.open('POST', emotionApiUrl, true);
      xhremotion.setRequestHeader('content-type', 'application/octet-stream');
      xhremotion.setRequestHeader('Ocp-Apim-Subscription-Key', "81f079954302459e904d8c98d06263b1");
      xhremotion.onreadystatechange = function () {
        if (xhremotion.readyState == 4) {
          if (xhremotion.status == 200) {
            //console.log(this);
            var resp = JSON.parse(xhremotion.response);
            resolve(resp);
          } else {
            resolve(xhremotion.status);
          }
        }
      }
      xhremotion.send(blob);
    })
  }


  computerVision(blob) {

    return new Promise((resolve, reject) => {
      const visionApiUrl = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description';

      var xhrvision = new XMLHttpRequest();
      xhrvision.open('POST', visionApiUrl, true);
      xhrvision.setRequestHeader('content-type', 'application/octet-stream');
      xhrvision.setRequestHeader('Ocp-Apim-Subscription-Key', "b10fb5b057fe4f9cbeac59dcf0f5727f");

      xhrvision.onreadystatechange = function () {
        if (xhrvision.readyState == 4) {
          if (xhrvision.status == 200) {
            //console.log(this);
            var resp = JSON.parse(xhrvision.response);
            console.log(resp.description.captions[0].text);
            resolve(resp.description.captions);
          } else {
            console.log(xhrvision.status);
          }
        }
      }
      xhrvision.send(blob);
    })
  }
  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  ngOnInit() {
    /*var interval = setInterval(() => {
      this.onResize()
      const video = <any>document.getElementsByTagName('video')[0];
      console.log("gira");
      if (video.height > 0) {
        clearInterval(interval);
        console.log("stop");
      }
    }, 100);*/
  }

  ngAfterViewInit() {
    var interval = setInterval(() => {
      this.onResize()
      const video = <any>document.getElementsByTagName('video')[0];
      console.log("gira");
      if (video.height > 0) {
        clearInterval(interval);
        console.log("stop");
      }
    }, 100);
  }

  addEmotionToFace(faces, emotions) {
    /*console.log(faces);
    console.log(emotions);*/
    var final = faces;
    var arrF = Object.keys(faces).map(function (key) { return faces[key]; });

    arrF.forEach(function (face) {
      var top = face.faceRectangle.top;
      var left = face.faceRectangle.left;
      var min = 10000;
      var arrE = Object.keys(emotions).map(function (key) { return emotions[key]; });
      arrE.forEach(function (emotion) {
        var topE = emotion.faceRectangle.top;
        var leftE = emotion.faceRectangle.left;
        var dist = Math.sqrt(Math.pow(top - topE, 2) + Math.pow(left - leftE, 2));
        if (dist < min) {
          face.scores = emotion.scores;
        }
      });
    });
    return final;
  }
  addFaceToEmotion(emotions, faces) {
    var final = this.addEmotionToFace(faces, emotions);
    return final;
  }

  videoButtonClick(event) {
    this.clearCanvas();
    console.log(event);
    if (event == "stop") {
      this.enableCapture = false;
    }/*else{
      this.enableCapture=true;
      this.evaluateAge();
    }*/
  }

  clearCanvas() {
    const vCanvas = <any>document.getElementsByName('videoCanvas')[0];
    const ctx = vCanvas.getContext('2d');
    ctx.clearRect(0, 0, vCanvas.width, vCanvas.height);
  }
}