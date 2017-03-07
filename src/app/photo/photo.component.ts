import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  age = "età non rilevata";
  options = {
    audio: false,
    video: true,
    width: 500,
    height: 500
  };
  /*video = <any>document.getElementsByTagName('video')[0];
  canvas = <any>document.getElementsByTagName('canvas')[0];*/


  onSuccess = (stream: MediaStream) => { };

  onError = (err) => { };

  onClick() {
    const video = <any>document.getElementsByTagName('video')[0];
    const canvas = <any>document.getElementsByName('canvas')[0];
    console.log(video.height);
    console.log(video.videoHeight);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    //console.log(canvas.toDataURL('image/png'));
    var image = canvas.toDataURL('image/png');

    this.getAgeFromImage(image).then(imageAge => {
      //console.log(imageAge);
      this.age = "Età rilevata: " + imageAge[0].faceAttributes.age;
      const rect = imageAge[0].faceRectangle;
      const vCanvas = <any>document.getElementsByName('videoCanvas')[0];
      const ctx = vCanvas.getContext('2d');
      vCanvas.width = video.videoWidth/1.33;
      vCanvas.height = video.videoHeight/1.33;
      //console.log(canvas.getContext("2d").getImageData(0,0,480,640));
      //vCanvas.width = 500;
      //vCanvas.height = 500;
      console.log(video.height+" "+video.videoHeight);
      var top =(video.offsetTop+(video.height-video.videoHeight)/2)*1.33+"px";
      console.log(top);
      vCanvas.style.top = top;
      vCanvas.style.left = video.offsetleft;
      ctx.strokeStyle="#FF0000";
      var resize = 4/3;
      ctx.strokeRect(rect.left/resize, rect.top/resize, rect.width/resize, rect.height/resize);

    })
  }

  constructor() {
    /*
        if (this.video) {
          console.log("video");
          this.canvas.width = this.video.videoWidth;
          this.canvas.height = this.video.videoHeight;
          this.canvas.getContext('2d').drawImage(this.video, 0, 0);
        }*/
  }

  getAgeFromImage(stream) {
    return new Promise(
      (resolve, reject) => {
        const speechApiUrl = [
          //'https://faceage.herokuapp.com/age?',
          'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?',
          'returnFaceId=true',
          'returnFaceLandmarks=false',
          'returnFaceAttributes=age'
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
            console.log(xhr);
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
  }

}
