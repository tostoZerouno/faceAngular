webpackJsonp([1,4],{343:function(t,e){function n(t){throw new Error("Cannot find module '"+t+"'.")}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=343},344:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(432),r=n(0),a=n(457),i=n(455);a.a.production&&n.i(r.a)(),n.i(o.a)().bootstrapModule(i.a)},454:function(t,e,n){"use strict";var o=n(0);n.d(e,"a",function(){return i});var r=this&&this.__decorate||function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},i=function(){function t(){this.title="app works!"}return t.prototype.ngOnInit=function(){},t=r([n.i(o.U)({selector:"app-root",template:n(612),styles:[n(610)]}),a("design:paramtypes",[])],t)}()},455:function(t,e,n){"use strict";var o=n(136),r=n(0),a=n(422),i=n(428),c=n(452),s=n(454),f=n(456);n.d(e,"a",function(){return d});var u=this&&this.__decorate||function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},p=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},d=function(){function t(){}return t=u([n.i(r.b)({declarations:[s.a,f.a,c.a],imports:[o.a,a.a,i.a],providers:[],bootstrap:[s.a]}),p("design:paramtypes",[])],t)}()},456:function(t,e,n){"use strict";var o=n(0);n.d(e,"a",function(){return i});var r=this&&this.__decorate||function(t,e,n,o){var r,a=arguments.length,i=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(i=(a<3?r(i):a>3?r(e,n,i):r(e,n))||i);return a>3&&i&&Object.defineProperty(e,n,i),i},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},i=function(){function t(){this.age="età non rilevata",this.options={audio:!1,video:!0,width:500,height:500},this.onSuccess=function(t){},this.onError=function(t){}}return t.prototype.onClick=function(){var t=this,e=document.getElementsByTagName("video")[0],n=document.getElementsByTagName("canvas")[0];n.width=e.videoWidth,n.height=e.videoHeight,n.getContext("2d").drawImage(e,0,0);var o=n.toDataURL("image/png");this.getAgeFromImage(o).then(function(e){t.age="Età rilevata: "+e})},t.prototype.getAgeFromImage=function(t){var e=this;return new Promise(function(n,o){var r=["https://westus.api.cognitive.microsoft.com/face/v1.0/detect?","returnFaceId=true","returnFaceLandmarks=false","returnFaceAttributes=age"].join("&"),a=new XMLHttpRequest;a.open("POST",r,!0),a.setRequestHeader("content-type","application/octet-stream"),a.setRequestHeader("Ocp-Apim-Subscription-Key","6e2715cbea564f4f95f9a097e935e8c7"),a.onreadystatechange=function(){n(200==a.status?JSON.parse(a.response)[0].faceAttributes.age:a.status)},a.send(e.dataURItoBlob(t))})},t.prototype.dataURItoBlob=function(t){for(var e=atob(t.split(",")[1]),n=new ArrayBuffer(e.length),o=new Uint8Array(n),r=0;r<e.length;r++)o[r]=e.charCodeAt(r);return new Blob([n],{type:"image/jpeg"})},t.prototype.ngOnInit=function(){},t=r([n.i(o.U)({selector:"app-photo",template:n(613),styles:[n(611)]}),a("design:paramtypes",[])],t)}()},457:function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o={production:!0}},610:function(t,e){t.exports=""},611:function(t,e){t.exports=""},612:function(t,e){t.exports="<h1>\n  {{title}}\n</h1>\n<app-photo></app-photo>"},613:function(t,e){t.exports='<h1 id="age">{{age}}<h1>\n<ng2-webcam [options]="options" [onSuccess]="onSuccess" [onError]="onError"></ng2-webcam>\n<canvas id="canvas" style="display:none;"></canvas>\n<button id="take" (click)="onClick()">Take a photo</button><br />'},625:function(t,e,n){t.exports=n(344)}},[625]);