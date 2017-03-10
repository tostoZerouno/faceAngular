import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  age = "Clicca sull'immagine per cominciare (o per mettere in pausa)";
  description = ["no description"];

  fermaticazzo = 0;

  constructor() {
  }

  computerVision(blob) {

    const visionApiUrl = 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description';

    let p = this.description;
    //var formData = new FormData();
    //formData.append("file", dataURItoBlob(stream));

    var xhrvision = new XMLHttpRequest();
    xhrvision.open('POST', visionApiUrl, true);
    //xhr.setRequestHeader('content-type', 'image/png');
    xhrvision.setRequestHeader('content-type', 'application/octet-stream');
    //xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhrvision.setRequestHeader('Ocp-Apim-Subscription-Key', "b10fb5b057fe4f9cbeac59dcf0f5727f");


    xhrvision.onreadystatechange = function () {//Call a function when the state changes.
      if (xhrvision.status == 200) {

        var resp = JSON.parse(xhrvision.response);
        console.log(resp.description.captions[0].text);
        p[0] = resp.description.captions[0].text;


      } else {
        console.log(xhrvision.status);
      }
    }
    //console.log(this.dataURItoBlob(stream));
    xhrvision.send(blob);

  }

  evaluateAge() {
    this.age = this.fermaticazzo == 1 ? "Cercando..." : "In pausa";
    if (this.fermaticazzo == 1) {
      //console.log(this.fermaticazzo);
      const video = <any>document.getElementsByTagName('video')[0];
      const canvas = <any>document.getElementsByName('canvas')[0];
      //console.log(video.height);
      //console.log(video.videoHeight);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      //console.log(canvas.toDataURL('image/png'));
      var image = canvas.toDataURL('image/jpeg', 0.3);

      this.getAgeFromImage(image).then(imageAge => {
        //console.log(imageAge);
        this.clearCanvas();
        const vCanvas = <any>document.getElementsByName('videoCanvas')[0];
        const ctx = vCanvas.getContext('2d');
        //ctx.clearRect(0, 0, vCanvas.width, vCanvas.height);
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
          //console.log(element.faceAttributes);
          const rect = element.faceRectangle;
          const left = (rect.left + rect.width) / resize;
          var top = (rect.top /*+ rect.height*/) / resize;
          ctx.strokeRect(rect.left / resize, rect.top / resize, rect.width / resize, rect.height / resize);
          var text = age + " anni, ";// +
          //(smile > 0.5 ? "felice" : "triste");

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
        //this.evaluateAge();
      })
    }
  }

  onClick() {
    this.fermaticazzo = (this.fermaticazzo + 1) % 2;
    this.evaluateAge();
  }

  onResize() {
    const video = <any>document.getElementsByTagName('video')[0];
    const canvas = <any>document.getElementsByName('videoCanvas')[0];
    video.width = parent.innerWidth / 2;
    var ratio = video.videoHeight / video.videoWidth;
    video.height = video.width * ratio;
    //console.log(video.height + " " + parent.innerHeight);
    //console.log("ratio: " + ratio);
    canvas.height = video.height;
    canvas.width = video.width * 2;
    //console.log(canvas.height + " " + video.height);
  }

  getAgeFromImage(stream) {
    var face = false;
    var emotion = false;
    var blob = this.dataURItoBlob(stream);
    var finalresponse;
    var comp = this;
    this.computerVision(blob);
    return new Promise(
      (resolve, reject) => {
        const faceApiUrl = [
          'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?',
          'returnFaceId=true',
          'returnFaceLandmarks=false',
          'returnFaceAttributes=age,smile,facialHair,glasses'
        ].join('&');

        const emotionApiUrl = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?';

        //var formData = new FormData();
        //formData.append("file", dataURItoBlob(stream));

        var xhrface = new XMLHttpRequest();
        xhrface.open('POST', faceApiUrl, true);
        //xhr.setRequestHeader('content-type', 'image/png');
        xhrface.setRequestHeader('content-type', 'application/octet-stream');
        //xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        xhrface.setRequestHeader('Ocp-Apim-Subscription-Key', "6e2715cbea564f4f95f9a097e935e8c7");


        xhrface.onreadystatechange = function () {//Call a function when the state changes.
          if (xhrface.status == 200) {
            //console.log(JSON.parse(xhr.response));
            //console.log(xhr);
            var resp = JSON.parse(xhrface.response);
            //console.log("face " + face + " " + emotion);
            //console.log(resp);
            face = true;
            //resolve(resp);
            if (emotion) {
              finalresponse = comp.addFaceToEmotion(finalresponse, resp);
              resolve(finalresponse);
            } else {
              finalresponse = resp;
            }
          } else {
            resolve(xhrface.status);
          }
        }
        //console.log(this.dataURItoBlob(stream));
        xhrface.send(blob);

        var xhremotion = new XMLHttpRequest();

        xhremotion.open('POST', emotionApiUrl, true);
        //xhr.setRequestHeader('content-type', 'image/png');
        xhremotion.setRequestHeader('content-type', 'application/octet-stream');
        //xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        xhremotion.setRequestHeader('Ocp-Apim-Subscription-Key', "81f079954302459e904d8c98d06263b1");

        xhremotion.onreadystatechange = function () {//Call a function when the state changes.
          if (xhremotion.status == 200) {
            //console.log(JSON.parse(xhr.response));
            //console.log(xhr);
            var resp = JSON.parse(xhremotion.response);
            //console.log("emotion " + face + " " + emotion);
            //console.log(resp);
            emotion = true;
            if (face) {
              finalresponse = comp.addEmotionToFace(finalresponse, resp);
              resolve(finalresponse);
            } else {
              finalresponse = resp;
            }
            //resolve(resp);
          } else {
            resolve(xhremotion.status);
          }
        }
        //console.log(this.dataURItoBlob(stream));
        xhremotion.send(this.dataURItoBlob(stream));
        // resolve(32);

      });
  }

  dataURItoBlob(dataURI) {
    //console.log(dataURI);
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  ngOnInit() {
    var interval = setInterval(() => {
      this.onResize()
      const video = <any>document.getElementsByTagName('video')[0];
      console.log("gira");
      //console.log(video);
      if (video.height > 0) {
        clearInterval(interval);
        console.log("stop");
      }
    }, 100);

  }

  addEmotionToFace(faces, emotions) {
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
      //console.log(final);
    });

    return final;
  }
  addFaceToEmotion(emotions, faces) {
    var final = this.addEmotionToFace(faces, emotions);
    return final;
  }

  clearCanvas() {
    const vCanvas = <any>document.getElementsByName('videoCanvas')[0];
    const ctx = vCanvas.getContext('2d');
    ctx.clearRect(0, 0, vCanvas.width, vCanvas.height);

  }

}
