webpackJsonp([1,4],{343:function(t,e){function o(t){throw new Error("Cannot find module '"+t+"'.")}o.keys=function(){return[]},o.resolve=o,t.exports=o,o.id=343},344:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(432),a=o(0),i=o(457),r=o(455);i.a.production&&o.i(a.a)(),o.i(n.a)().bootstrapModule(r.a)},454:function(t,e,o){"use strict";var n=o(0);o.d(e,"a",function(){return r});var a=this&&this.__decorate||function(t,e,o,n){var a,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(r=(i<3?a(r):i>3?a(e,o,r):a(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r},i=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},r=function(){function t(){this.title="app works!"}return t.prototype.ngOnInit=function(){},t=a([o.i(n.U)({selector:"app-root",template:o(612),styles:[o(610)]}),i("design:paramtypes",[])],t)}()},455:function(t,e,o){"use strict";var n=o(136),a=o(0),i=o(422),r=o(428),c=o(452),s=o(454),f=o(456);o.d(e,"a",function(){return l});var u=this&&this.__decorate||function(t,e,o,n){var a,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(r=(i<3?a(r):i>3?a(e,o,r):a(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r},p=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},l=function(){function t(){}return t=u([o.i(a.b)({declarations:[s.a,f.a,c.a],imports:[n.a,i.a,r.a],providers:[],bootstrap:[s.a]}),p("design:paramtypes",[])],t)}()},456:function(t,e,o){"use strict";var n=o(0);o.d(e,"a",function(){return r});var a=this&&this.__decorate||function(t,e,o,n){var a,i=arguments.length,r=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(a=t[c])&&(r=(i<3?a(r):i>3?a(e,o,r):a(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r},i=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},r=function(){function t(){this.age="età non rilevata",this.options={audio:!1,video:!0,width:500,height:500},this.onSuccess=function(t){},this.onError=function(t){}}return t.prototype.onClick=function(){var t=this,e=document.getElementsByTagName("video")[0],o=document.getElementsByName("canvas")[0];console.log(e.height),console.log(e.videoHeight),o.width=e.videoWidth,o.height=e.videoHeight,o.getContext("2d").drawImage(e,0,0);var n=o.toDataURL("image/png");this.getAgeFromImage(n).then(function(o){t.age="Età rilevata: "+o[0].faceAttributes.age;var n=o[0].faceRectangle,a=document.getElementsByName("videoCanvas")[0],i=a.getContext("2d");a.width=e.videoWidth/1.33,a.height=e.videoHeight/1.33,console.log(e.height+" "+e.videoHeight);var r=1.33*(e.offsetTop+(e.height-e.videoHeight)/2)+"px";console.log(r),a.style.top=r,a.style.left=e.offsetleft,i.strokeStyle="#FF0000";var c=4/3;i.strokeRect(n.left/c,n.top/c,n.width/c,n.height/c)})},t.prototype.getAgeFromImage=function(t){var e=this;return new Promise(function(o,n){var a=["https://westus.api.cognitive.microsoft.com/face/v1.0/detect?","returnFaceId=true","returnFaceLandmarks=false","returnFaceAttributes=age"].join("&"),i=new XMLHttpRequest;i.open("POST",a,!0),i.setRequestHeader("content-type","application/octet-stream"),i.setRequestHeader("Ocp-Apim-Subscription-Key","6e2715cbea564f4f95f9a097e935e8c7"),i.onreadystatechange=function(){if(200==i.status){console.log(i);o(JSON.parse(i.response))}else o(i.status)},i.send(e.dataURItoBlob(t))})},t.prototype.dataURItoBlob=function(t){for(var e=atob(t.split(",")[1]),o=new ArrayBuffer(e.length),n=new Uint8Array(o),a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return new Blob([o],{type:"image/jpeg"})},t.prototype.ngOnInit=function(){},t=a([o.i(n.U)({selector:"app-photo",template:o(613),styles:[o(611)]}),i("design:paramtypes",[])],t)}()},457:function(t,e,o){"use strict";o.d(e,"a",function(){return n});var n={production:!0}},610:function(t,e){t.exports=""},611:function(t,e){t.exports=".fullsize{width:500;height:500;position:absolute;z-index:10}"},612:function(t,e){t.exports="<h1>\n  {{title}}\n</h1>\n<app-photo></app-photo>"},613:function(t,e){t.exports='<h1 id="age">{{age}}<h1>\n<canvas id="videoCanvas" name="videoCanvas"  class="fullsize"></canvas>\n<ng2-webcam [options]="options" [onSuccess]="onSuccess" [onError]="onError"></ng2-webcam>\n<canvas name="canvas" id="canvas" style="display:none;"></canvas>\n<button id="take" (click)="onClick()">Take a photo</button><br />'},625:function(t,e,o){t.exports=o(344)}},[625]);