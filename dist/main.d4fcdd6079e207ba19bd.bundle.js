webpackJsonp([1,4],{343:function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=343},344:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(432),i=n(0),o=n(457),r=n(455);o.a.production&&n.i(i.a)(),n.i(a.a)().bootstrapModule(r.a)},454:function(e,t,n){"use strict";var a=n(0);n.d(t,"a",function(){return r});var i=this&&this.__decorate||function(e,t,n,a){var i,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,a);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(r=(o<3?i(r):o>3?i(t,n,r):i(t,n))||r);return o>3&&r&&Object.defineProperty(t,n,r),r},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=function(){function e(){this.title="Rilevamento Età"}return e.prototype.ngOnInit=function(){},e=i([n.i(a.U)({selector:"app-root",template:n(612),styles:[n(610)]}),o("design:paramtypes",[])],e)}()},455:function(e,t,n){"use strict";var a=n(136),i=n(0),o=n(422),r=n(428),c=n(452),s=n(454),f=n(456);n.d(t,"a",function(){return d});var u=this&&this.__decorate||function(e,t,n,a){var i,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,a);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(r=(o<3?i(r):o>3?i(t,n,r):i(t,n))||r);return o>3&&r&&Object.defineProperty(t,n,r),r},l=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},d=function(){function e(){}return e=u([n.i(i.b)({declarations:[s.a,f.a,c.a],imports:[a.a,o.a,r.a],providers:[],bootstrap:[s.a]}),l("design:paramtypes",[])],e)}()},456:function(e,t,n){"use strict";var a=n(0);n.d(t,"a",function(){return r});var i=this&&this.__decorate||function(e,t,n,a){var i,o=arguments.length,r=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,a);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(r=(o<3?i(r):o>3?i(t,n,r):i(t,n))||r);return o>3&&r&&Object.defineProperty(t,n,r),r},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=function(){function e(){var e=this;this.age="Clicca sull'immagine per cominciare (o per mettere in pausa)",this.options={audio:!1,video:!0,width:parent.innerWidth/2,height:parent.innerHeight/2},this.fermaticazzo=0,this.onSuccess=function(t){setTimeout(function(){return e.onResize()},1e3)},this.onError=function(e){}}return e.prototype.evaluateAge=function(){var e=this;if(this.age=1==this.fermaticazzo?"Cercando...":"In pausa",1===this.fermaticazzo){var t=document.getElementsByTagName("video")[0],n=document.getElementsByName("canvas")[0];n.width=t.videoWidth,n.height=t.videoHeight,n.getContext("2d").drawImage(t,0,0);var a=n.toDataURL("image/png");this.getAgeFromImage(a).then(function(n){var a=document.getElementsByName("videoCanvas")[0],i=a.getContext("2d");i.clearRect(0,0,a.width,a.height),i.strokeStyle="#FF0000";var o=t.width/20;i.font=o+"px Georgia",i.fillStyle="#FF0000";var r=Math.min(t.videoWidth/t.width,t.videoHeight/t.height);Object.keys(n).map(function(e){return n[e]}).forEach(function(e){var t=e.faceAttributes.age,n=e.faceAttributes.smile,a=e.faceAttributes.facialHair,c=e.faceAttributes.glasses.toLowerCase(),s=e.faceRectangle;i.strokeRect(s.left/r,s.top/r,s.width/r,s.height/r);var f=t+" anni, "+(n>.5?"felice":"triste");switch(i.fillText(f,(s.left+s.width)/r,s.top/r),f=(a.beard>=.5?" barba":"")+(a.moustache>=.5?" baffi":""),i.fillText(f,(s.left+s.width)/r,(s.top+1.2*o)/r),c){case"noglasses":f="";break;case"readingglasses":f="Occhiali da lettura";break;case"sunglasses":f="Occhiali da sole";break;default:f=""}i.fillText(f,(s.left+s.width)/r,(s.top+1.2*o*2)/r)}),setTimeout(function(){return e.evaluateAge()},3e3)})}},e.prototype.onClick=function(){this.fermaticazzo=(this.fermaticazzo+1)%2,this.evaluateAge()},e.prototype.onResize=function(){var e=document.getElementsByTagName("video")[0],t=document.getElementsByName("videoCanvas")[0];e.width=parent.innerWidth/2;var n=e.videoHeight/e.videoWidth;e.height=e.width*n,t.height=e.height,t.width=2*e.width},e.prototype.getAgeFromImage=function(e){var t=this;return new Promise(function(n,a){var i=["https://westus.api.cognitive.microsoft.com/face/v1.0/detect?","returnFaceId=true","returnFaceLandmarks=false","returnFaceAttributes=age,smile,facialHair,glasses"].join("&"),o=new XMLHttpRequest;o.open("POST",i,!0),o.setRequestHeader("content-type","application/octet-stream"),o.setRequestHeader("Ocp-Apim-Subscription-Key","6e2715cbea564f4f95f9a097e935e8c7"),o.onreadystatechange=function(){if(200==o.status){n(JSON.parse(o.response))}else n(o.status)},o.send(t.dataURItoBlob(e))})},e.prototype.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),n=new ArrayBuffer(t.length),a=new Uint8Array(n),i=0;i<t.length;i++)a[i]=t.charCodeAt(i);return new Blob([n],{type:"image/jpeg"})},e.prototype.ngOnInit=function(){},e=i([n.i(a.U)({selector:"app-photo",template:n(613),styles:[n(611)]}),o("design:paramtypes",[])],e)}()},457:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={production:!0}},610:function(e,t){e.exports=""},611:function(e,t){e.exports=".videoCanvas{position:absolute;z-index:10}"},612:function(e,t){e.exports="<h1>\n  {{title}}\n</h1>\n<app-photo></app-photo>"},613:function(e,t){e.exports='<h1 id="age">{{age}}</h1>\n<div (window:resize)="onResize()"  (document:load)="onResize()">\n    <canvas id="videoCanvas" name="videoCanvas" class="videoCanvas" (click)="onClick()"></canvas>\n    <ng2-webcam [options]="options" [onSuccess]="onSuccess" [onError]="onError"></ng2-webcam>\n</div>\n<canvas name="canvas" id="canvas" style="display:none;"></canvas>\n<button id="take" (click)="onClick()">Take a photo</button><br />'},625:function(e,t,n){e.exports=n(344)}},[625]);