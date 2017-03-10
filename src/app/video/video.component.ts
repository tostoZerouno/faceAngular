import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {

 @Output() stop: EventEmitter<string> = new EventEmitter<string>();

  videoSelect = (<HTMLSelectElement>document.getElementsByName("videoSelect")[0]);
  vid;
  localstream;
  bottone = "Ferma il Video"

  constructor() {
    //this.enumerate();
    /*this.videoSelect.onselect = function(){
      console.log(this);
    }*/
  }

  selectSource() {
    var videoSelect = (<HTMLSelectElement>document.getElementsByName("videoSelect")[0]);
    var videoSource = videoSelect.value;
    //console.log(videoSelect);
    this.vid = "" + (videoSelect.value);
    console.log("vid: " + this.vid);
    //var constraints  = { video: { deviceId: { exact: videoSource } } };
    var constraints = { video: { deviceId: videoSource } };
    this.stopStream();
    setTimeout(this.startStream(constraints), 150);
    //this.ngAfterViewInit();
  }

  @ViewChild('video') video: any;
  // note that "#video" is the name of the template variable in the video element

  ngAfterViewInit() {
    var constraints = { video: true };
    //FIXME
    //var videoSource = this.videoSelect.value;
    //var constraints = { video: { deviceId: { exact: videoSource } } }
    this.startStream(constraints);
  }

  onClick() {
    let _video = this.video.nativeElement;
    var videoSelect = (<HTMLSelectElement>document.getElementsByName("videoSelect")[0]);
    var videoSource = videoSelect.value;
    console.log(videoSource);
    var constraints = { video: { deviceId: { exact: videoSource } } };
    if (!_video.paused){
        this.stopStream();
        this.bottone = "Avvia il Video";
    }else{
      this.startStream(constraints);
      this.bottone = "Ferma il Video";
    }
    
    //this.startStream(constraints);
    this.stop.emit("stopping video");
  }

  startStream(constraints) {
    let _video = this.video.nativeElement;
    //this.enumerate();
    //var videoSource = (<HTMLSelectElement>document.getElementsByName("videoSelect")[0]).value;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          _video.src = window.URL.createObjectURL(stream);
          console.log(_video.src);
          this.localstream = stream;
          //_video.paused=false;
          _video.load();

        })
    }
  }

  stopStream() {
    let _video = this.video.nativeElement;
    console.log(this.localstream);
    if (!_video.paused) {
      console.log("not paused");
      _video.pause();
      _video.src = "";
      this.localstream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    console.log("Video off");
  }


  enumerate() {
    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .catch(errorCallback);

    /*var audioInputSelect = (<HTMLSelectElement>document.getElementsByName("audioInputSelect")[0]);
    var audioOutputSelect = (<HTMLSelectElement>document.getElementsByName("audioOutputSelect")[0]);*/
    var videoSelect = (<HTMLSelectElement>document.getElementsByName("videoSelect")[0]);

    function gotDevices(deviceInfos) {


      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        /*if (deviceInfo.kind === 'audioinput') {
          option.text = deviceInfo.label ||
            'Microphone ' + (audioInputSelect.length + 1);
          audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
          option.text = deviceInfo.label || 'Speaker ' +
            (audioOutputSelect.length + 1);
          audioOutputSelect.appendChild(option);
        } else */
        if (deviceInfo.kind === 'videoinput') {
          option.text = deviceInfo.label || 'Camera ' +
            (videoSelect.length + 1);
          videoSelect.appendChild(option);
        }
      }

      //console.log(audioInputSelect);
      /*console.log(audioOutputSelect.value);
      console.log(videoSelect.value);*/
      //this.vid = "a: " + videoSelect.value;
      //console.log(navigator.mediaDevices.getUserMedia({ video: true }));

    }

    function errorCallback(error) {
      console.log(error);

    }



  }

  ngOnInit() {
    this.enumerate();
/*    this.enumerate();*/
  }

}
