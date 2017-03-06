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
    const canvas = <any>document.getElementsByTagName('canvas')[0];
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    console.log(canvas.toDataURL('image/png'));
    var image =  canvas.toDataURL('image/png');
             this.getAgeFromImage(image).then(imageAge => {
                 this.age = "Età rilevata: " + imageAge;
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
          'https://faceage.herokuapp.com/age?',
        ].join('&');

        //var formData = new FormData();
        //formData.append("file", dataURItoBlob(stream));

        var xhr = new XMLHttpRequest();
        xhr.open('POST', speechApiUrl, true);
        xhr.setRequestHeader('content-type', 'image/png');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        //xhr.setRequestHeader('Ocp-Apim-Subscription-Key', FACE_API_KEY);

        xhr.onreadystatechange = function () {//Call a function when the state changes.
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response).body.age);
          } else {
            resolve(xhr.status);
          }
        }
        console.log(this.dataURItoBlob(stream));
        xhr.send(this.dataURItoBlob(stream));
        // resolve(32);
      });
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
  }

}
