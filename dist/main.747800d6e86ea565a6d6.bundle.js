webpackJsonp([1,4],{217:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.age="Clicca sull'immagine per cominciare",this.description="no description",this.enableCapture=!1,this.log="",this.faces={}}return e.prototype.evaluateAge=function(){var e=this;if(this.age=this.enableCapture?"Cercando...(clicca sull'immagine per mettere in pausa)":"In pausa(clicca sull'immagine per ricominciare)",this.enableCapture){var t=document.getElementsByTagName("video")[0],n=document.getElementsByName("canvas")[0];n.width=t.videoWidth,n.height=t.videoHeight,n.getContext("2d").drawImage(t,0,0);var i=this.dataURItoBlob(n.toDataURL("image/jpeg",1)).size,r=153600/i,o=n.toDataURL("image/jpeg",r);this.analyzeImage(o).then(function(n){e.clearCanvas();var i=document.getElementsByName("videoCanvas")[0];Object.keys(n[0]).length>0?e.log=t.height+"x"+t.width+" c:"+i.height+"x"+i.width+" "+n[0].faceRectangle.width:e.log="no rectangles.....";var r=i.getContext("2d");r.strokeStyle="#FF0000";var o=t.width/20;r.font=o+"px Georgia",r.fillStyle="#FF0000";var s=Math.min(t.videoWidth/t.width,t.videoHeight/t.height);Object.keys(n).map(function(e){return n[e]}).forEach(function(e){var t=e.faceAttributes.age,n=(e.faceAttributes.smile,e.faceAttributes.facialHair),i=e.faceAttributes.glasses.toLowerCase(),_={anger:"arrabbiato",contempt:"contento",disgust:"disgustato",fear:"spaventato",happiness:"felice",neutral:"neutro",sadness:"triste",surprise:"sorpreso"},a=e.faceRectangle,h=(a.left+a.width)/s,c=a.top/s;r.strokeRect(a.left/s,a.top/s,a.width/s,a.height/s);var l=t+" anni, ";r.fillText(l,h,c),c+=1.3*o;var u=e.scores,p=Math.max.apply(null,Object.keys(u).map(function(e){return u[e]}));switch(l=Object.keys(u).filter(function(e){return u[e]==p})[0],r.fillText(_[l],h,c),c+=1.3*o,l=(n.beard>=.2?"barba ":"")+(n.moustache>=.2?"baffi ":""),r.fillText(l,h,c),c+=1.3*o,i){case"noglasses":l="Non porti gli occhiali";break;case"readingglasses":l="Occhiali da lettura";break;case"sunglasses":l="Occhiali da sole";break;default:l=""}r.fillText(l,h,c)}),setTimeout(function(){return e.evaluateAge()},3e3)})}},e.prototype.onClick=function(){this.enableCapture=!this.enableCapture,this.evaluateAge()},e.prototype.onResize=function(){var e=document.getElementsByTagName("video")[0],t=document.getElementsByName("videoCanvas")[0];e.width=parent.innerWidth/2;var n=e.videoHeight/e.videoWidth;e.height=e.width*n,t.height=e.height,t.width=2*e.width,this.log=e.height+"x"+e.width+" c:"+t.height+"x"+t.width},e.prototype.analyzeImage=function(e){var t=this,n=1e3,i=this.dataURItoBlob(e);return this.computerVision(i).then(function(e){t.description=e[0].text}),new Promise(function(e,r){t.getAgeFromImage(i).then(function(e){t.faces=e,n=0}),setTimeout(function(){t.getEmotionFromImage(i).then(function(i){0===Object.keys(t.faces).length?t.faces=i:t.faces=t.addEmotionToFace(t.faces,i),t.log=""+n,console.log(t.faces),e(t.faces)})},n)})},e.prototype.getAgeFromImage=function(e){return new Promise(function(t,n){var i=["https://westus.api.cognitive.microsoft.com/face/v1.0/detect?","returnFaceId=true","returnFaceLandmarks=false","returnFaceAttributes=age,smile,facialHair,glasses"].join("&"),r=new XMLHttpRequest;r.open("POST",i,!0),r.setRequestHeader("content-type","application/octet-stream"),r.setRequestHeader("Ocp-Apim-Subscription-Key","6e2715cbea564f4f95f9a097e935e8c7"),r.onreadystatechange=function(){if(4==r.readyState)if(200==r.status){var e=JSON.parse(r.response);t(e)}else t(r.status)},r.send(e)})},e.prototype.getEmotionFromImage=function(e){return new Promise(function(t,n){var i=new XMLHttpRequest;i.open("POST","https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?",!0),i.setRequestHeader("content-type","application/octet-stream"),i.setRequestHeader("Ocp-Apim-Subscription-Key","81f079954302459e904d8c98d06263b1"),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var e=JSON.parse(i.response);t(e)}else t(i.status)},i.send(e)})},e.prototype.computerVision=function(e){return new Promise(function(t,n){var i=new XMLHttpRequest;i.open("POST","https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description",!0),i.setRequestHeader("content-type","application/octet-stream"),i.setRequestHeader("Ocp-Apim-Subscription-Key","b10fb5b057fe4f9cbeac59dcf0f5727f"),i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var e=JSON.parse(i.response);console.log(e.description.captions[0].text),t(e.description.captions)}else console.log(i.status)},i.send(e)})},e.prototype.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),n=new ArrayBuffer(t.length),i=new Uint8Array(n),r=0;r<t.length;r++)i[r]=t.charCodeAt(r);return new Blob([n],{type:"image/jpeg"})},e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){var e=this,t=setInterval(function(){e.onResize();var n=document.getElementsByTagName("video")[0];console.log("gira"),n.height>0&&(clearInterval(t),console.log("stop"))},100)},e.prototype.addEmotionToFace=function(e,t){var n=e;return Object.keys(e).map(function(t){return e[t]}).forEach(function(e){var n=e.faceRectangle.top,i=e.faceRectangle.left;Object.keys(t).map(function(e){return t[e]}).forEach(function(t){var r=t.faceRectangle.top,o=t.faceRectangle.left;Math.sqrt(Math.pow(n-r,2)+Math.pow(i-o,2))<1e4&&(e.scores=t.scores)})}),n},e.prototype.addFaceToEmotion=function(e,t){return this.addEmotionToFace(t,e)},e.prototype.videoButtonClick=function(e){this.clearCanvas(),console.log(e),"stop"==e&&(this.enableCapture=!1)},e.prototype.clearCanvas=function(){var e=document.getElementsByName("videoCanvas")[0];e.getContext("2d").clearRect(0,0,e.width,e.height)},e.ctorParameters=function(){return[]},e}()},218:function(e,t,n){"use strict";var i=n(1);n.d(t,"a",function(){return r});var r=function(){function e(){this.stop=new i.K,this.videoSelect=document.getElementsByName("videoSelect")[0],this.bottone="Ferma il Video"}return e.prototype.selectSource=function(){var e=document.getElementsByName("videoSelect")[0],t=e.value;this.vid=""+e.value,console.log("vid: "+this.vid);var n={video:{deviceId:t}};this.stopStream(),setTimeout(this.startStream(n),150)},e.prototype.ngAfterViewInit=function(){var e={video:!0};this.startStream(e)},e.prototype.onClick=function(){var e=this.video.nativeElement,t=document.getElementsByName("videoSelect")[0],n=t.value;console.log(n);var i={video:{deviceId:{exact:n}}};e.paused?(this.startStream(i),this.bottone="Ferma il Video",this.stop.emit("start")):(this.stopStream(),this.bottone="Avvia il Video",this.stop.emit("stop"))},e.prototype.startStream=function(e){var t=this,n=this.video.nativeElement;navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia(e).then(function(e){n.src=window.URL.createObjectURL(e),console.log(n.src),t.localstream=e,n.load()})},e.prototype.stopStream=function(){var e=this.video.nativeElement;console.log(this.localstream),e.paused||(console.log("not paused"),e.pause(),e.src="",this.localstream.getTracks().forEach(function(e){e.stop()})),console.log("Video off")},e.prototype.enumerate=function(){function e(e){for(var t=0;t!==e.length;++t){var i=e[t],r=document.createElement("option");r.value=i.deviceId,"videoinput"===i.kind&&(r.text=i.label||"Camera "+(n.length+1),n.appendChild(r))}}function t(e){console.log(e)}navigator.mediaDevices.enumerateDevices().then(e).catch(t);var n=document.getElementsByName("videoSelect")[0]},e.prototype.ngOnInit=function(){this.enumerate()},e.ctorParameters=function(){return[]},e}()},261:function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=261},262:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(341),o=n(212),s=n(331);r.a.production&&n.i(i.a)(),n.i(o.a)().bootstrapModuleFactory(s.a)},329:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[""]},330:function(e,t,n){"use strict";var i=n(339),r=n(83),o=n(17),s=n(63),_=n(38),a=n(37),h=n(49),c=n(329),l=n(217),u=n(333),p=n(23);n.d(t,"a",function(){return y});var d=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},f=function(){function e(){this._changed=!1,this.context=new i.a}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||0===e.numberOfChecks&&this.context.ngOnInit(),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}(),g=o.createRenderComponentType("",0,s.b.None,[],{}),m=function(e){function t(n,i,r,o){e.call(this,t,g,_.a.HOST,n,i,r,o,a.b.CheckAlways)}return d(t,e),t.prototype.createInternal=function(e){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-root",o.EMPTY_INLINE_ARRAY,e,null),this.compView_0=new x(this.viewUtils,this,0,this._el_0),this._AppComponent_0_3=new f,this.compView_0.create(this._AppComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._AppComponent_0_3.context)},t.prototype.injectorGetInternal=function(e,t,n){return e===i.a&&0===t?this._AppComponent_0_3.context:n},t.prototype.detectChangesInternal=function(e){this._AppComponent_0_3.ngDoCheck(this,this._el_0,e),this.compView_0.internalDetectChanges(e)},t.prototype.destroyInternal=function(){this.compView_0.destroy()},t.prototype.visitRootNodesInternal=function(e,t){e(this._el_0,t)},t}(r.a),y=new h.b("app-root",m,i.a),v=[c.a],b=o.createRenderComponentType("",0,s.b.Emulated,v,{}),x=function(e){function t(n,i,r,o){e.call(this,t,b,_.a.COMPONENT,n,i,r,o,a.b.CheckAlways),this._expr_7=p.b}return d(t,e),t.prototype.createInternal=function(e){var t=this.renderer.createViewRoot(this.parentElement);return this._el_0=o.createRenderElement(this.renderer,t,"h1",o.EMPTY_INLINE_ARRAY,null),this._text_1=this.renderer.createText(this._el_0,"",null),this._text_2=this.renderer.createText(t,"\n",null),this._el_3=o.createRenderElement(this.renderer,t,"app-photo",o.EMPTY_INLINE_ARRAY,null),this.compView_3=new u.a(this.viewUtils,this,3,this._el_3),this._PhotoComponent_3_3=new u.b,this.compView_3.create(this._PhotoComponent_3_3.context),this._text_4=this.renderer.createText(t,"\n",null),this.init(null,this.renderer.directRenderer?null:[this._el_0,this._text_1,this._text_2,this._el_3,this._text_4],null),null},t.prototype.injectorGetInternal=function(e,t,n){return e===l.a&&3===t?this._PhotoComponent_3_3.context:n},t.prototype.detectChangesInternal=function(e){this._PhotoComponent_3_3.ngDoCheck(this,this._el_3,e);var t=o.inlineInterpolate(1,"\n  ",this.context.title,"\n");o.checkBinding(e,this._expr_7,t)&&(this.renderer.setText(this._text_1,t),this._expr_7=t),this.compView_3.internalDetectChanges(e),e||0===this.numberOfChecks&&this._PhotoComponent_3_3.context.ngAfterViewInit()},t.prototype.destroyInternal=function(){this.compView_3.destroy()},t}(r.a)},331:function(e,t,n){"use strict";var i=n(125),r=n(340),o=n(170),s=n(182),_=n(142),a=n(199),h=n(312),c=n(314),l=n(58),u=n(77),p=n(86),d=n(78),f=n(48),g=n(99),m=n(41),y=n(100),v=n(98),b=n(147),x=n(114),C=n(17),w=n(143),R=n(65),E=n(139),O=n(93),A=n(208),I=n(140),k=n(330),D=n(124),S=n(59),T=n(144),N=n(145),P=n(64),M=n(97),V=n(80),H=n(122),B=n(68),j=n(96),U=n(85),L=n(128),F=n(116),G=n(117),z=n(67),X=n(210);n.d(t,"a",function(){return K});var Y=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},q=function(e){function t(t){e.call(this,t,[k.a],[k.a])}return Y(t,e),Object.defineProperty(t.prototype,"_LOCALE_ID_7",{get:function(){return null==this.__LOCALE_ID_7&&(this.__LOCALE_ID_7=s.a(this.parent.get(D.a,null))),this.__LOCALE_ID_7},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_NgLocalization_8",{get:function(){return null==this.__NgLocalization_8&&(this.__NgLocalization_8=new l.a(this._LOCALE_ID_7)),this.__NgLocalization_8},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ApplicationRef_13",{get:function(){return null==this.__ApplicationRef_13&&(this.__ApplicationRef_13=this._ApplicationRef__12),this.__ApplicationRef_13},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Compiler_14",{get:function(){return null==this.__Compiler_14&&(this.__Compiler_14=new f.a),this.__Compiler_14},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_APP_ID_15",{get:function(){return null==this.__APP_ID_15&&(this.__APP_ID_15=S.a()),this.__APP_ID_15},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DOCUMENT_16",{get:function(){return null==this.__DOCUMENT_16&&(this.__DOCUMENT_16=_.a()),this.__DOCUMENT_16},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_HAMMER_GESTURE_CONFIG_17",{get:function(){return null==this.__HAMMER_GESTURE_CONFIG_17&&(this.__HAMMER_GESTURE_CONFIG_17=new g.a),this.__HAMMER_GESTURE_CONFIG_17},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_EVENT_MANAGER_PLUGINS_18",{get:function(){return null==this.__EVENT_MANAGER_PLUGINS_18&&(this.__EVENT_MANAGER_PLUGINS_18=[new T.a,new N.a,new g.b(this._HAMMER_GESTURE_CONFIG_17)]),this.__EVENT_MANAGER_PLUGINS_18},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_EventManager_19",{get:function(){return null==this.__EventManager_19&&(this.__EventManager_19=new m.a(this._EVENT_MANAGER_PLUGINS_18,this.parent.get(P.a))),this.__EventManager_19},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_AnimationDriver_21",{get:function(){return null==this.__AnimationDriver_21&&(this.__AnimationDriver_21=_.b()),this.__AnimationDriver_21},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DomRootRenderer_22",{get:function(){return null==this.__DomRootRenderer_22&&(this.__DomRootRenderer_22=new v.a(this._DOCUMENT_16,this._EventManager_19,this._DomSharedStylesHost_20,this._AnimationDriver_21,this._APP_ID_15)),this.__DomRootRenderer_22},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RootRenderer_23",{get:function(){return null==this.__RootRenderer_23&&(this.__RootRenderer_23=M.a(this._DomRootRenderer_22,this.parent.get(M.b,null),this.parent.get(d.a,null))),this.__RootRenderer_23},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DomSanitizer_24",{get:function(){return null==this.__DomSanitizer_24&&(this.__DomSanitizer_24=new b.a),this.__DomSanitizer_24},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Sanitizer_25",{get:function(){return null==this.__Sanitizer_25&&(this.__Sanitizer_25=this._DomSanitizer_24),this.__Sanitizer_25},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_AnimationQueue_26",{get:function(){return null==this.__AnimationQueue_26&&(this.__AnimationQueue_26=new x.a(this.parent.get(P.a))),this.__AnimationQueue_26},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ViewUtils_27",{get:function(){return null==this.__ViewUtils_27&&(this.__ViewUtils_27=new C.ViewUtils(this._RootRenderer_23,this._Sanitizer_25,this._AnimationQueue_26)),this.__ViewUtils_27},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_IterableDiffers_28",{get:function(){return null==this.__IterableDiffers_28&&(this.__IterableDiffers_28=s.b()),this.__IterableDiffers_28},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_KeyValueDiffers_29",{get:function(){return null==this.__KeyValueDiffers_29&&(this.__KeyValueDiffers_29=s.c()),this.__KeyValueDiffers_29},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_SharedStylesHost_30",{get:function(){return null==this.__SharedStylesHost_30&&(this.__SharedStylesHost_30=this._DomSharedStylesHost_20),this.__SharedStylesHost_30},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Title_31",{get:function(){return null==this.__Title_31&&(this.__Title_31=new w.a),this.__Title_31},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RadioControlRegistry_32",{get:function(){return null==this.__RadioControlRegistry_32&&(this.__RadioControlRegistry_32=new R.a),this.__RadioControlRegistry_32},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_BrowserXhr_33",{get:function(){return null==this.__BrowserXhr_33&&(this.__BrowserXhr_33=new E.a),this.__BrowserXhr_33},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ResponseOptions_34",{get:function(){return null==this.__ResponseOptions_34&&(this.__ResponseOptions_34=new O.a),this.__ResponseOptions_34},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_XSRFStrategy_35",{get:function(){return null==this.__XSRFStrategy_35&&(this.__XSRFStrategy_35=c.a()),this.__XSRFStrategy_35},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_XHRBackend_36",{get:function(){return null==this.__XHRBackend_36&&(this.__XHRBackend_36=new A.a(this._BrowserXhr_33,this._ResponseOptions_34,this._XSRFStrategy_35)),this.__XHRBackend_36},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RequestOptions_37",{get:function(){return null==this.__RequestOptions_37&&(this.__RequestOptions_37=new I.a),this.__RequestOptions_37},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Http_38",{get:function(){return null==this.__Http_38&&(this.__Http_38=c.b(this._XHRBackend_36,this._RequestOptions_37)),this.__Http_38},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new o.a,this._ApplicationModule_1=new s.d,this._BrowserModule_2=new _.c(this.parent.get(_.c,null)),this._InternalFormsSharedModule_3=new a.a,this._FormsModule_4=new h.a,this._HttpModule_5=new c.c,this._AppModule_6=new r.a,this._ErrorHandler_9=_.d(),this._ApplicationInitStatus_10=new u.a(this.parent.get(u.b,null)),this._Testability_11=new p.a(this.parent.get(P.a)),this._ApplicationRef__12=new d.b(this.parent.get(P.a),this.parent.get(V.a),this,this._ErrorHandler_9,this,this._ApplicationInitStatus_10,this.parent.get(p.b,null),this._Testability_11),this._DomSharedStylesHost_20=new y.a(this._DOCUMENT_16),this._AppModule_6},t.prototype.getInternal=function(e,t){return e===o.a?this._CommonModule_0:e===s.d?this._ApplicationModule_1:e===_.c?this._BrowserModule_2:e===a.a?this._InternalFormsSharedModule_3:e===h.a?this._FormsModule_4:e===c.c?this._HttpModule_5:e===r.a?this._AppModule_6:e===D.a?this._LOCALE_ID_7:e===l.b?this._NgLocalization_8:e===H.a?this._ErrorHandler_9:e===u.a?this._ApplicationInitStatus_10:e===p.a?this._Testability_11:e===d.b?this._ApplicationRef__12:e===d.c?this._ApplicationRef_13:e===f.a?this._Compiler_14:e===S.b?this._APP_ID_15:e===B.a?this._DOCUMENT_16:e===g.c?this._HAMMER_GESTURE_CONFIG_17:e===m.b?this._EVENT_MANAGER_PLUGINS_18:e===m.a?this._EventManager_19:e===y.a?this._DomSharedStylesHost_20:e===j.a?this._AnimationDriver_21:e===v.b?this._DomRootRenderer_22:e===U.a?this._RootRenderer_23:e===b.b?this._DomSanitizer_24:e===L.a?this._Sanitizer_25:e===x.a?this._AnimationQueue_26:e===C.ViewUtils?this._ViewUtils_27:e===F.a?this._IterableDiffers_28:e===G.a?this._KeyValueDiffers_29:e===y.b?this._SharedStylesHost_30:e===w.a?this._Title_31:e===R.a?this._RadioControlRegistry_32:e===E.a?this._BrowserXhr_33:e===O.b?this._ResponseOptions_34:e===z.a?this._XSRFStrategy_35:e===A.a?this._XHRBackend_36:e===I.b?this._RequestOptions_37:e===X.a?this._Http_38:t},t.prototype.destroyInternal=function(){this._ApplicationRef__12.ngOnDestroy(),this._DomSharedStylesHost_20.ngOnDestroy()},t}(i.a),K=new i.b(q,r.a)},332:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[".videoCanvas[_ngcontent-%COMP%]{position:absolute;z-index:10}"]},333:function(e,t,n){"use strict";var i=n(217),r=n(83),o=n(17),s=n(63),_=n(38),a=n(37),h=n(49),c=n(332),l=n(218),u=n(335),p=n(23);n.d(t,"b",function(){return f}),n.d(t,"a",function(){return b});var d=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},f=function(){function e(){this._changed=!1,this.context=new i.a}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||0===e.numberOfChecks&&this.context.ngOnInit(),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}(),g=o.createRenderComponentType("",0,s.b.None,[],{}),m=function(e){function t(n,i,r,o){e.call(this,t,g,_.a.HOST,n,i,r,o,a.b.CheckAlways)}return d(t,e),t.prototype.createInternal=function(e){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-photo",o.EMPTY_INLINE_ARRAY,e,null),this.compView_0=new b(this.viewUtils,this,0,this._el_0),this._PhotoComponent_0_3=new f,this.compView_0.create(this._PhotoComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._PhotoComponent_0_3.context)},t.prototype.injectorGetInternal=function(e,t,n){return e===i.a&&0===t?this._PhotoComponent_0_3.context:n},t.prototype.detectChangesInternal=function(e){this._PhotoComponent_0_3.ngDoCheck(this,this._el_0,e),this.compView_0.internalDetectChanges(e),e||0===this.numberOfChecks&&this._PhotoComponent_0_3.context.ngAfterViewInit()},t.prototype.destroyInternal=function(){this.compView_0.destroy()},t.prototype.visitRootNodesInternal=function(e,t){e(this._el_0,t)},t}(r.a),y=(new h.b("app-photo",m,i.a),[c.a]),v=o.createRenderComponentType("",0,s.b.Emulated,y,{}),b=function(e){function t(n,i,r,o){e.call(this,t,v,_.a.COMPONENT,n,i,r,o,a.b.CheckAlways),this._expr_20=p.b,this._expr_21=p.b,this._expr_22=p.b}return d(t,e),t.prototype.createInternal=function(e){var t=this.renderer.createViewRoot(this.parentElement);this._el_0=o.createRenderElement(this.renderer,t,"h1",new o.InlineArray2(2,"id","age"),null),this._text_1=this.renderer.createText(this._el_0,"",null),this._text_2=this.renderer.createText(t,"\n",null),this._el_3=o.createRenderElement(this.renderer,t,"div",o.EMPTY_INLINE_ARRAY,null),this._text_4=this.renderer.createText(this._el_3,"\n    ",null),this._el_5=o.createRenderElement(this.renderer,this._el_3,"canvas",new o.InlineArray8(6,"class","videoCanvas","id","videoCanvas","name","videoCanvas"),null),this._text_6=this.renderer.createText(this._el_3,"\n    ",null),this._el_7=o.createRenderElement(this.renderer,this._el_3,"app-video",o.EMPTY_INLINE_ARRAY,null),this.compView_7=new u.a(this.viewUtils,this,7,this._el_7),this._VideoComponent_7_3=new u.b,this.compView_7.create(this._VideoComponent_7_3.context),this._text_8=this.renderer.createText(this._el_3,"\n",null),this._text_9=this.renderer.createText(t,"\n",null),this._el_10=o.createRenderElement(this.renderer,t,"canvas",new o.InlineArray8(6,"id","canvas","name","canvas","style","display:none;"),null),this._text_11=this.renderer.createText(t,"\n",null),this._text_12=this.renderer.createText(t,"\n",null),this._el_13=o.createRenderElement(this.renderer,t,"p",new o.InlineArray2(2,"name","description"),null),this._text_14=this.renderer.createText(this._el_13,"",null),this._text_15=this.renderer.createText(t,"\n",null),this._el_16=o.createRenderElement(this.renderer,t,"p",o.EMPTY_INLINE_ARRAY,null),this._text_17=this.renderer.createText(this._el_16,"",null);var n=o.subscribeToRenderElement(this,this._el_3,new o.InlineArray4(4,"resize","window","load","document"),this.eventHandler(this.handleEvent_3)),i=o.subscribeToRenderElement(this,this._el_5,new o.InlineArray2(2,"click",null),this.eventHandler(this.handleEvent_5)),r=o.subscribeToRenderElement(this,this._el_7,new o.InlineArray2(2,"stop",null),this.eventHandler(this.handleEvent_7));return this._VideoComponent_7_3.subscribe(this,this.eventHandler(this.handleEvent_7),!0),this.init(null,this.renderer.directRenderer?null:[this._el_0,this._text_1,this._text_2,this._el_3,this._text_4,this._el_5,this._text_6,this._el_7,this._text_8,this._text_9,this._el_10,this._text_11,this._text_12,this._el_13,this._text_14,this._text_15,this._el_16,this._text_17],[n,i,r]),null},t.prototype.injectorGetInternal=function(e,t,n){return e===l.a&&7===t?this._VideoComponent_7_3.context:n},t.prototype.detectChangesInternal=function(e){this._VideoComponent_7_3.ngDoCheck(this,this._el_7,e);var t=o.inlineInterpolate(1,"",this.context.age,"");o.checkBinding(e,this._expr_20,t)&&(this.renderer.setText(this._text_1,t),this._expr_20=t);var n=o.inlineInterpolate(1,"",this.context.description,"");o.checkBinding(e,this._expr_21,n)&&(this.renderer.setText(this._text_14,n),this._expr_21=n);var i=o.inlineInterpolate(1,"",this.context.log,"");o.checkBinding(e,this._expr_22,i)&&(this.renderer.setText(this._text_17,i),this._expr_22=i),this.compView_7.internalDetectChanges(e),e||0===this.numberOfChecks&&this._VideoComponent_7_3.context.ngAfterViewInit()},t.prototype.destroyInternal=function(){this.compView_7.destroy(),this._VideoComponent_7_3.ngOnDestroy()},t.prototype.handleEvent_3=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("window:resize"==e){n=this.context.onResize()!==!1&&n}if("document:load"==e){n=this.context.onResize()!==!1&&n}return n},t.prototype.handleEvent_5=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("click"==e){n=this.context.onClick()!==!1&&n}return n},t.prototype.handleEvent_7=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("stop"==e){n=this.context.videoButtonClick(t)!==!1&&n}return n},t}(r.a)},334:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[""]},335:function(e,t,n){"use strict";var i=n(218),r=n(83),o=n(17),s=n(63),_=n(38),a=n(37),h=n(49),c=n(334),l=n(190),u=n(338),p=n(337),d=n(336),f=n(23),g=n(62),m=n(66),y=n(18),v=n(90),b=n(39),x=n(88);n.d(t,"b",function(){return w}),n.d(t,"a",function(){return I});var C=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},w=function(){function e(){this._changed=!1,this.context=new i.a}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){this.subscription0&&this.subscription0.unsubscribe()},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||0===e.numberOfChecks&&this.context.ngOnInit(),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t,n){this._eventHandler=t,n&&(this.subscription0=this.context.stop.subscribe(t.bind(e,"stop")))},e}(),R=o.createRenderComponentType("",0,s.b.None,[],{}),E=function(e){function t(n,i,r,o){e.call(this,t,R,_.a.HOST,n,i,r,o,a.b.CheckAlways)}return C(t,e),t.prototype.createInternal=function(e){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-video",o.EMPTY_INLINE_ARRAY,e,null),this.compView_0=new I(this.viewUtils,this,0,this._el_0),this._VideoComponent_0_3=new w,this.compView_0.create(this._VideoComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._VideoComponent_0_3.context)},t.prototype.injectorGetInternal=function(e,t,n){return e===i.a&&0===t?this._VideoComponent_0_3.context:n},t.prototype.detectChangesInternal=function(e){this._VideoComponent_0_3.ngDoCheck(this,this._el_0,e),this.compView_0.internalDetectChanges(e),e||0===this.numberOfChecks&&this._VideoComponent_0_3.context.ngAfterViewInit()},t.prototype.destroyInternal=function(){this.compView_0.destroy(),this._VideoComponent_0_3.ngOnDestroy()},t.prototype.visitRootNodesInternal=function(e,t){e(this._el_0,t)},t}(r.a),O=(new h.b("app-video",E,i.a),[c.a]),A=o.createRenderComponentType("",0,s.b.Emulated,O,{}),I=function(e){function t(n,i,r,o){e.call(this,t,A,_.a.COMPONENT,n,i,r,o,a.b.CheckAlways),this._expr_15=f.b}return C(t,e),t.prototype.createInternal=function(e){var t=this.renderer.createViewRoot(this.parentElement);this._viewQuery_video_0=new l.a,this._el_0=o.createRenderElement(this.renderer,t,"video",new o.InlineArray8(6,"autoplay","","height","480","width","640"),null),this._text_1=this.renderer.createText(t,"\n",null),this._el_2=o.createRenderElement(this.renderer,t,"br",o.EMPTY_INLINE_ARRAY,null),this._text_3=this.renderer.createText(t,"\n",null),this._el_4=o.createRenderElement(this.renderer,t,"select",new o.InlineArray2(2,"name","videoSelect"),null),this._SelectControlValueAccessor_4_3=new u.a(this.renderer,new g.a(this._el_4)),this._NG_VALUE_ACCESSOR_4_4=[this._SelectControlValueAccessor_4_3.context],this._NgModel_4_5=new p.a(null,null,null,this._NG_VALUE_ACCESSOR_4_4),this._NgControl_4_6=this._NgModel_4_5.context,this._NgControlStatus_4_7=new d.a(this._NgControl_4_6),this._text_5=this.renderer.createText(t,"\n",null),this._el_6=o.createRenderElement(this.renderer,t,"button",new o.InlineArray2(2,"name","bottone"),null),this._text_7=this.renderer.createText(this._el_6,"",null),this._text_8=this.renderer.createText(t,"\n",null);var n=o.subscribeToRenderElement(this,this._el_4,new o.InlineArray8(6,"ngModelChange",null,"change",null,"blur",null),this.eventHandler(this.handleEvent_4));this._NgModel_4_5.subscribe(this,this.eventHandler(this.handleEvent_4),!0);var i=o.subscribeToRenderElement(this,this._el_6,new o.InlineArray2(2,"click",null),this.eventHandler(this.handleEvent_6));return this._viewQuery_video_0.reset([new g.a(this._el_0)]),this.context.video=this._viewQuery_video_0.first,this.init(null,this.renderer.directRenderer?null:[this._el_0,this._text_1,this._el_2,this._text_3,this._el_4,this._text_5,this._el_6,this._text_7,this._text_8],[n,i]),null},t.prototype.injectorGetInternal=function(e,t,n){return e===m.a&&4===t?this._SelectControlValueAccessor_4_3.context:e===y.a&&4===t?this._NG_VALUE_ACCESSOR_4_4:e===v.a&&4===t?this._NgModel_4_5.context:e===b.a&&4===t?this._NgControl_4_6:e===x.a&&4===t?this._NgControlStatus_4_7.context:n},t.prototype.detectChangesInternal=function(e){this._SelectControlValueAccessor_4_3.ngDoCheck(this,this._el_4,e),this._NgModel_4_5.check_name("videoSelect",e,!1);var t=this.context.selectedDevice;this._NgModel_4_5.check_model(t,e,!1),this._NgModel_4_5.ngDoCheck(this,this._el_4,e),this._NgControlStatus_4_7.ngDoCheck(this,this._el_4,e),this._NgControlStatus_4_7.checkHost(this,this,this._el_4,e);var n=o.inlineInterpolate(1,"",this.context.bottone,"");o.checkBinding(e,this._expr_15,n)&&(this.renderer.setText(this._text_7,n),this._expr_15=n)},t.prototype.destroyInternal=function(){this._NgModel_4_5.ngOnDestroy()},t.prototype.handleEvent_4=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if(n=this._SelectControlValueAccessor_4_3.handleEvent(e,t)&&n,"ngModelChange"==e){n=this.context.selectSource()!==!1&&n}return n},t.prototype.handleEvent_6=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("click"==e){n=this.context.onClick()!==!1&&n}return n},t}(r.a)},336:function(e,t,n){"use strict";var i=n(88),r=n(23),o=n(17);n.d(t,"a",function(){return s});var s=function(){function e(e){this._changed=!1,this.context=new i.a(e),this._expr_0=r.b,this._expr_1=r.b,this._expr_2=r.b,this._expr_3=r.b,this._expr_4=r.b,this._expr_5=r.b,this._expr_6=r.b}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,i},e.prototype.checkHost=function(e,t,n,i){var r=this.context.ngClassUntouched;o.checkBinding(i,this._expr_0,r)&&(e.renderer.setElementClass(n,"ng-untouched",r),this._expr_0=r);var s=this.context.ngClassTouched;o.checkBinding(i,this._expr_1,s)&&(e.renderer.setElementClass(n,"ng-touched",s),this._expr_1=s);var _=this.context.ngClassPristine;o.checkBinding(i,this._expr_2,_)&&(e.renderer.setElementClass(n,"ng-pristine",_),this._expr_2=_);var a=this.context.ngClassDirty;o.checkBinding(i,this._expr_3,a)&&(e.renderer.setElementClass(n,"ng-dirty",a),this._expr_3=a);var h=this.context.ngClassValid;o.checkBinding(i,this._expr_4,h)&&(e.renderer.setElementClass(n,"ng-valid",h),this._expr_4=h);var c=this.context.ngClassInvalid;o.checkBinding(i,this._expr_5,c)&&(e.renderer.setElementClass(n,"ng-invalid",c),this._expr_5=c);var l=this.context.ngClassPending;o.checkBinding(i,this._expr_6,l)&&(e.renderer.setElementClass(n,"ng-pending",l),this._expr_6=l)},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}();!function(){function e(e){this._changed=!1,this.context=new i.b(e),this._expr_0=r.b,this._expr_1=r.b,this._expr_2=r.b,this._expr_3=r.b,this._expr_4=r.b,this._expr_5=r.b,this._expr_6=r.b}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,i},e.prototype.checkHost=function(e,t,n,i){var r=this.context.ngClassUntouched;o.checkBinding(i,this._expr_0,r)&&(e.renderer.setElementClass(n,"ng-untouched",r),this._expr_0=r);var s=this.context.ngClassTouched;o.checkBinding(i,this._expr_1,s)&&(e.renderer.setElementClass(n,"ng-touched",s),this._expr_1=s);var _=this.context.ngClassPristine;o.checkBinding(i,this._expr_2,_)&&(e.renderer.setElementClass(n,"ng-pristine",_),this._expr_2=_);var a=this.context.ngClassDirty;o.checkBinding(i,this._expr_3,a)&&(e.renderer.setElementClass(n,"ng-dirty",a),this._expr_3=a);var h=this.context.ngClassValid;o.checkBinding(i,this._expr_4,h)&&(e.renderer.setElementClass(n,"ng-valid",h),this._expr_4=h);var c=this.context.ngClassInvalid;o.checkBinding(i,this._expr_5,c)&&(e.renderer.setElementClass(n,"ng-invalid",c),this._expr_5=c);var l=this.context.ngClassPending;o.checkBinding(i,this._expr_6,l)&&(e.renderer.setElementClass(n,"ng-pending",l),this._expr_6=l)},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}()},337:function(e,t,n){"use strict";var i=n(90),r=n(23),o=n(17);n.d(t,"a",function(){return s});var s=function(){function e(e,t,n,o){this._changed=!1,this._changes={},this.context=new i.a(e,t,n,o),this._expr_0=r.b,this._expr_1=r.b,this._expr_2=r.b,this._expr_3=r.b}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){this.context.ngOnDestroy(),this.subscription0&&this.subscription0.unsubscribe()},e.prototype.check_name=function(e,t,n){(n||o.checkBinding(t,this._expr_0,e))&&(this._changed=!0,this.context.name=e,this._changes.name=new r.e(this._expr_0,e),this._expr_0=e)},e.prototype.check_isDisabled=function(e,t,n){(n||o.checkBinding(t,this._expr_1,e))&&(this._changed=!0,this.context.isDisabled=e,this._changes.isDisabled=new r.e(this._expr_1,e),this._expr_1=e)},e.prototype.check_model=function(e,t,n){(n||o.checkBinding(t,this._expr_2,e))&&(this._changed=!0,this.context.model=e,this._changes.model=new r.e(this._expr_2,e),this._expr_2=e)},e.prototype.check_options=function(e,t,n){(n||o.checkBinding(t,this._expr_3,e))&&(this._changed=!0,this.context.options=e,this._changes.options=new r.e(this._expr_3,e),this._expr_3=e)},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||i&&(this.context.ngOnChanges(this._changes),this._changes={}),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t,n){this._eventHandler=t,n&&(this.subscription0=this.context.update.subscribe(t.bind(e,"ngModelChange")))},e}()},338:function(e,t,n){"use strict";var i=n(66),r=n(23),o=n(17);n.d(t,"a",function(){return s});var s=(function(){function e(e,t,n){this._changed=!1,this.context=new i.b(e,t,n),this._expr_0=r.b,this._expr_1=r.b}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){this.context.ngOnDestroy()},e.prototype.check_ngValue=function(e,t,n){(n||o.checkBinding(t,this._expr_0,e))&&(this._changed=!0,this.context.ngValue=e,this._expr_0=e)},e.prototype.check_value=function(e,t,n){(n||o.checkBinding(t,this._expr_1,e))&&(this._changed=!0,this.context.value=e,this._expr_1=e)},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}(),function(){function e(e,t){this._changed=!1,this.context=new i.a(e,t)}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){var n=!0;if("change"==e){n=this.context.onChange(t.target.value)!==!1&&n}if("blur"==e){n=this.context.onTouched()!==!1&&n}return n},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}())},339:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.title="Rilevamento Età"}return e.prototype.ngOnInit=function(){},e.ctorParameters=function(){return[]},e}()},340:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){}return e}()},341:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i={production:!0}},504:function(e,t,n){e.exports=n(262)}},[504]);