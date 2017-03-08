import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  age = "Clicca sull'immagine per cominciare (o per mettere in pausa)";
  options = {
    audio: false,
    video: true,
    width: parent.innerWidth / 2,
    height: parent.innerHeight / 2
  };
  fermaticazzo = 0;

  /*video = <any>document.getElementsByTagName('video')[0];
  canvas = <any>document.getElementsByTagName('canvas')[0];*/

  constructor() {
  }

  onSuccess = (stream: MediaStream) => {
    setTimeout(() => this.onResize(), 1000);
  };

  onError = (err) => { };

  evaluateAge() {
    this.age = this.fermaticazzo == 1 ? "Cercando..." : "In pausa";
    if (this.fermaticazzo === 1) {
      //console.log(this.fermaticazzo);
      const video = <any>document.getElementsByTagName('video')[0];
      const canvas = <any>document.getElementsByName('canvas')[0];
      //console.log(video.height);
      //console.log(video.videoHeight);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      //console.log(canvas.toDataURL('image/png'));
      var image = canvas.toDataURL('image/png');

      this.getAgeFromImage(image).then(imageAge => {
        //console.log(imageAge);
        const vCanvas = <any>document.getElementsByName('videoCanvas')[0];
        const ctx = vCanvas.getContext('2d');
        ctx.clearRect(0, 0, vCanvas.width, vCanvas.height);
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
          //console.log(element.faceAttributes);
          const rect = element.faceRectangle;
          ctx.strokeRect(rect.left / resize, rect.top / resize, rect.width / resize, rect.height / resize);
          var text = age + " anni, " +
            (smile > 0.5 ? "felice" : "triste");

          ctx.fillText(text,
            (rect.left + rect.width) / resize, (rect.top /*+ rect.height*/) / resize);

          text = (facialHair.beard >= 0.5 ? " barba" : "") +
            (facialHair.moustache >= 0.5 ? " baffi" : "");

          ctx.fillText(text,
            (rect.left + rect.width) / resize, (rect.top + fs * 1.2) / resize);

          switch (glasses) {
            case "noglasses":
              text = "";
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

          ctx.fillText(text,
            (rect.left + rect.width) / resize, (rect.top + fs * 1.2*2) / resize);

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
    return new Promise(
      (resolve, reject) => {
        const speechApiUrl = [
          //'https://faceage.herokuapp.com/age?',
          'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?',
          'returnFaceId=true',
          'returnFaceLandmarks=false',
          'returnFaceAttributes=age,smile,facialHair,glasses'
        ].join('&');

        //var formData = new FormData();
        //formData.append("file", dataURItoBlob(stream));

        var xhr = new XMLHttpRequest();
        xhr.open('POST', speechApiUrl, true);
        //xhr.setRequestHeader('content-type', 'image/png');
        xhr.setRequestHeader('content-type', 'application/octet-stream');
        //xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        xhr.setRequestHeader('Ocp-Apim-Subscription-Key', "6e2715cbea564f4f95f9a097e935e8c7");

        xhr.onreadystatechange = function () {//Call a function when the state changes.
          if (xhr.status == 200) {
            //console.log(JSON.parse(xhr.response));
            //console.log(xhr);
            var resp = JSON.parse(xhr.response);
            resolve(resp);
          } else {
            resolve(xhr.status);
          }
        }
        //console.log(this.dataURItoBlob(stream));
        xhr.send(this.dataURItoBlob(stream));
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
    //this.onResize();
    //setTimeout(this.onResize(),2000);
    //console.log("oninit");
    // this.photoReadyEvent.emit("load");
  }

}
