webpackJsonp([1,4],{217:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.age="Clicca sull'immagine per cominciare (o per mettere in pausa)",this.fermaticazzo=0}return e.prototype.evaluateAge=function(){var e=this;if(this.age=1==this.fermaticazzo?"Cercando...":"In pausa",1==this.fermaticazzo){var t=document.getElementsByTagName("video")[0],n=document.getElementsByName("canvas")[0];n.width=t.videoWidth,n.height=t.videoHeight,n.getContext("2d").drawImage(t,0,0);var i=n.toDataURL("image/jpeg",.3);this.getAgeFromImage(i).then(function(n){var i=document.getElementsByName("videoCanvas")[0],r=i.getContext("2d");r.clearRect(0,0,i.width,i.height),r.strokeStyle="#FF0000";var o=t.width/20;r.font=o+"px Georgia",r.fillStyle="#FF0000";var _=Math.min(t.videoWidth/t.width,t.videoHeight/t.height);Object.keys(n).map(function(e){return n[e]}).forEach(function(e){var t=e.faceAttributes.age,n=(e.faceAttributes.smile,e.faceAttributes.facialHair),i=e.faceAttributes.glasses.toLowerCase(),s={anger:"arrabbiato",contempt:"contento",disgust:"disgustato",fear:"spaventato",happiness:"felice",neutral:"neutro",sadness:"triste",surprise:"sorpreso"},a=e.faceRectangle,h=(a.left+a.width)/_,l=a.top/_;r.strokeRect(a.left/_,a.top/_,a.width/_,a.height/_);var c=t+" anni, ";r.fillText(c,h,l),l+=1.3*o;var u=e.scores,p=Math.max.apply(null,Object.keys(u).map(function(e){return u[e]}));switch(c=Object.keys(u).filter(function(e){return u[e]==p})[0],r.fillText(s[c],h,l),l+=1.3*o,c=(n.beard>=.2?"barba ":"")+(n.moustache>=.2?"baffi ":""),r.fillText(c,h,l),l+=1.3*o,i){case"noglasses":c="Non porti gli occhiali";break;case"readingglasses":c="Occhiali da lettura";break;case"sunglasses":c="Occhiali da sole";break;default:c=""}r.fillText(c,h,l)}),setTimeout(function(){return e.evaluateAge()},3e3)})}},e.prototype.onClick=function(){this.fermaticazzo=(this.fermaticazzo+1)%2,this.evaluateAge()},e.prototype.onResize=function(){var e=document.getElementsByTagName("video")[0],t=document.getElementsByName("videoCanvas")[0];e.width=parent.innerWidth/2;var n=e.videoHeight/e.videoWidth;e.height=e.width*n,t.height=e.height,t.width=2*e.width},e.prototype.getAgeFromImage=function(e){var t,n=this,i=!1,r=!1,o=this.dataURItoBlob(e),_=this;return new Promise(function(s,a){var h=["https://westus.api.cognitive.microsoft.com/face/v1.0/detect?","returnFaceId=true","returnFaceLandmarks=false","returnFaceAttributes=age,smile,facialHair,glasses"].join("&"),l="https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?",c=new XMLHttpRequest;c.open("POST",h,!0),c.setRequestHeader("content-type","application/octet-stream"),c.setRequestHeader("Ocp-Apim-Subscription-Key","6e2715cbea564f4f95f9a097e935e8c7"),c.onreadystatechange=function(){if(200==c.status){var e=JSON.parse(c.response);i=!0,r?(t=_.addFaceToEmotion(t,e),s(t)):t=e}else s(c.status)},c.send(o);var u=new XMLHttpRequest;u.open("POST",l,!0),u.setRequestHeader("content-type","application/octet-stream"),u.setRequestHeader("Ocp-Apim-Subscription-Key","81f079954302459e904d8c98d06263b1"),u.onreadystatechange=function(){if(200==u.status){var e=JSON.parse(u.response);r=!0,i?(t=_.addEmotionToFace(t,e),s(t)):t=e}else s(u.status)},u.send(n.dataURItoBlob(e))})},e.prototype.dataURItoBlob=function(e){for(var t=atob(e.split(",")[1]),n=new ArrayBuffer(t.length),i=new Uint8Array(n),r=0;r<t.length;r++)i[r]=t.charCodeAt(r);return new Blob([n],{type:"image/jpeg"})},e.prototype.ngOnInit=function(){var e=this,t=setInterval(function(){e.onResize();var n=document.getElementsByTagName("video")[0];console.log("gira"),n.height>0&&(clearInterval(t),console.log("stop"))},100)},e.prototype.addEmotionToFace=function(e,t){var n=e;return Object.keys(e).map(function(t){return e[t]}).forEach(function(e){var n=e.faceRectangle.top,i=e.faceRectangle.left;Object.keys(t).map(function(e){return t[e]}).forEach(function(t){var r=t.faceRectangle.top,o=t.faceRectangle.left;Math.sqrt(Math.pow(n-r,2)+Math.pow(i-o,2))<1e4&&(e.scores=t.scores)})}),n},e.prototype.addFaceToEmotion=function(e,t){return this.addEmotionToFace(t,e)},e.ctorParameters=function(){return[]},e}()},218:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){}return e.prototype.ngAfterViewInit=function(){var e=this.video.nativeElement;this.enumerate();var t=document.getElementsByName("videoSelect")[0].value;navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{deviceId:t?{exact:t}:void 0}}).then(function(t){e.src=window.URL.createObjectURL(t),console.log(e.src),e.play()})},e.prototype.enumerate=function(){function e(e){for(var t=0;t!==e.length;++t){var o=e[t],_=document.createElement("option");_.value=o.deviceId,"audioinput"===o.kind?(_.text=o.label||"Microphone "+(n.length+1),n.appendChild(_)):"audiooutput"===o.kind?(_.text=o.label||"Speaker "+(i.length+1),i.appendChild(_)):"videoinput"===o.kind&&(_.text=o.label||"Camera "+(r.length+1),r.appendChild(_))}console.log(i.value),console.log(r.value),console.log(navigator.mediaDevices.getUserMedia({video:!0}))}function t(e){console.log(e)}navigator.mediaDevices.enumerateDevices().then(e).catch(t);var n=document.getElementsByName("audioInputSelect")[0],i=document.getElementsByName("audioOutputSelect")[0],r=document.getElementsByName("videoSelect")[0]},e.prototype.ngOnInit=function(){},e.ctorParameters=function(){return[]},e}()},261:function(e,t){function n(e){throw new Error("Cannot find module '"+e+"'.")}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=261},262:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n(338),o=n(212),_=n(331);r.a.production&&n.i(i.a)(),n.i(o.a)().bootstrapModuleFactory(_.a)},329:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[""]},330:function(e,t,n){"use strict";var i=n(336),r=n(82),o=n(31),_=n(63),s=n(37),a=n(36),h=n(48),l=n(329),c=n(217),u=n(333),p=n(45);n.d(t,"a",function(){return g});var d=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},f=function(){function e(){this._changed=!1,this.context=new i.a}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||0===e.numberOfChecks&&this.context.ngOnInit(),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}(),m=o.createRenderComponentType("",0,_.b.None,[],{}),y=function(e){function t(n,i,r,o){e.call(this,t,m,s.a.HOST,n,i,r,o,a.b.CheckAlways)}return d(t,e),t.prototype.createInternal=function(e){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-root",o.EMPTY_INLINE_ARRAY,e,null),this.compView_0=new R(this.viewUtils,this,0,this._el_0),this._AppComponent_0_3=new f,this.compView_0.create(this._AppComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._AppComponent_0_3.context)},t.prototype.injectorGetInternal=function(e,t,n){return e===i.a&&0===t?this._AppComponent_0_3.context:n},t.prototype.detectChangesInternal=function(e){this._AppComponent_0_3.ngDoCheck(this,this._el_0,e),this.compView_0.internalDetectChanges(e)},t.prototype.destroyInternal=function(){this.compView_0.destroy()},t.prototype.visitRootNodesInternal=function(e,t){e(this._el_0,t)},t}(r.a),g=new h.b("app-root",y,i.a),b=[l.a],v=o.createRenderComponentType("",0,_.b.Emulated,b,{}),R=function(e){function t(n,i,r,o){e.call(this,t,v,s.a.COMPONENT,n,i,r,o,a.b.CheckAlways),this._expr_7=p.b}return d(t,e),t.prototype.createInternal=function(e){var t=this.renderer.createViewRoot(this.parentElement);return this._el_0=o.createRenderElement(this.renderer,t,"h1",o.EMPTY_INLINE_ARRAY,null),this._text_1=this.renderer.createText(this._el_0,"",null),this._text_2=this.renderer.createText(t,"\n",null),this._el_3=o.createRenderElement(this.renderer,t,"app-photo",o.EMPTY_INLINE_ARRAY,null),this.compView_3=new u.a(this.viewUtils,this,3,this._el_3),this._PhotoComponent_3_3=new u.b,this.compView_3.create(this._PhotoComponent_3_3.context),this._text_4=this.renderer.createText(t,"\n",null),this.init(null,this.renderer.directRenderer?null:[this._el_0,this._text_1,this._text_2,this._el_3,this._text_4],null),null},t.prototype.injectorGetInternal=function(e,t,n){return e===c.a&&3===t?this._PhotoComponent_3_3.context:n},t.prototype.detectChangesInternal=function(e){this._PhotoComponent_3_3.ngDoCheck(this,this._el_3,e);var t=o.inlineInterpolate(1,"\n  ",this.context.title,"\n");o.checkBinding(e,this._expr_7,t)&&(this.renderer.setText(this._text_1,t),this._expr_7=t),this.compView_3.internalDetectChanges(e)},t.prototype.destroyInternal=function(){this.compView_3.destroy()},t}(r.a)},331:function(e,t,n){"use strict";var i=n(122),r=n(337),o=n(168),_=n(180),s=n(140),a=n(197),h=n(312),l=n(314),c=n(58),u=n(76),p=n(85),d=n(77),f=n(47),m=n(96),y=n(39),g=n(97),b=n(95),v=n(145),R=n(111),w=n(31),E=n(141),C=n(65),A=n(137),O=n(90),I=n(208),x=n(138),T=n(330),P=n(121),D=n(59),S=n(142),N=n(143),M=n(64),k=n(94),H=n(79),V=n(119),j=n(67),U=n(93),L=n(84),z=n(125),B=n(113),F=n(114),G=n(66),X=n(210);n.d(t,"a",function(){return Q});var Y=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},q=function(e){function t(t){e.call(this,t,[T.a],[T.a])}return Y(t,e),Object.defineProperty(t.prototype,"_LOCALE_ID_7",{get:function(){return null==this.__LOCALE_ID_7&&(this.__LOCALE_ID_7=_.a(this.parent.get(P.a,null))),this.__LOCALE_ID_7},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_NgLocalization_8",{get:function(){return null==this.__NgLocalization_8&&(this.__NgLocalization_8=new c.a(this._LOCALE_ID_7)),this.__NgLocalization_8},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ApplicationRef_13",{get:function(){return null==this.__ApplicationRef_13&&(this.__ApplicationRef_13=this._ApplicationRef__12),this.__ApplicationRef_13},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Compiler_14",{get:function(){return null==this.__Compiler_14&&(this.__Compiler_14=new f.a),this.__Compiler_14},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_APP_ID_15",{get:function(){return null==this.__APP_ID_15&&(this.__APP_ID_15=D.a()),this.__APP_ID_15},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DOCUMENT_16",{get:function(){return null==this.__DOCUMENT_16&&(this.__DOCUMENT_16=s.a()),this.__DOCUMENT_16},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_HAMMER_GESTURE_CONFIG_17",{get:function(){return null==this.__HAMMER_GESTURE_CONFIG_17&&(this.__HAMMER_GESTURE_CONFIG_17=new m.a),this.__HAMMER_GESTURE_CONFIG_17},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_EVENT_MANAGER_PLUGINS_18",{get:function(){return null==this.__EVENT_MANAGER_PLUGINS_18&&(this.__EVENT_MANAGER_PLUGINS_18=[new S.a,new N.a,new m.b(this._HAMMER_GESTURE_CONFIG_17)]),this.__EVENT_MANAGER_PLUGINS_18},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_EventManager_19",{get:function(){return null==this.__EventManager_19&&(this.__EventManager_19=new y.a(this._EVENT_MANAGER_PLUGINS_18,this.parent.get(M.a))),this.__EventManager_19},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_AnimationDriver_21",{get:function(){return null==this.__AnimationDriver_21&&(this.__AnimationDriver_21=s.b()),this.__AnimationDriver_21},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DomRootRenderer_22",{get:function(){return null==this.__DomRootRenderer_22&&(this.__DomRootRenderer_22=new b.a(this._DOCUMENT_16,this._EventManager_19,this._DomSharedStylesHost_20,this._AnimationDriver_21,this._APP_ID_15)),this.__DomRootRenderer_22},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RootRenderer_23",{get:function(){return null==this.__RootRenderer_23&&(this.__RootRenderer_23=k.a(this._DomRootRenderer_22,this.parent.get(k.b,null),this.parent.get(d.a,null))),this.__RootRenderer_23},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DomSanitizer_24",{get:function(){return null==this.__DomSanitizer_24&&(this.__DomSanitizer_24=new v.a),this.__DomSanitizer_24},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Sanitizer_25",{get:function(){return null==this.__Sanitizer_25&&(this.__Sanitizer_25=this._DomSanitizer_24),this.__Sanitizer_25},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_AnimationQueue_26",{get:function(){return null==this.__AnimationQueue_26&&(this.__AnimationQueue_26=new R.a(this.parent.get(M.a))),this.__AnimationQueue_26},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ViewUtils_27",{get:function(){return null==this.__ViewUtils_27&&(this.__ViewUtils_27=new w.ViewUtils(this._RootRenderer_23,this._Sanitizer_25,this._AnimationQueue_26)),this.__ViewUtils_27},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_IterableDiffers_28",{get:function(){return null==this.__IterableDiffers_28&&(this.__IterableDiffers_28=_.b()),this.__IterableDiffers_28},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_KeyValueDiffers_29",{get:function(){return null==this.__KeyValueDiffers_29&&(this.__KeyValueDiffers_29=_.c()),this.__KeyValueDiffers_29},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_SharedStylesHost_30",{get:function(){return null==this.__SharedStylesHost_30&&(this.__SharedStylesHost_30=this._DomSharedStylesHost_20),this.__SharedStylesHost_30},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Title_31",{get:function(){return null==this.__Title_31&&(this.__Title_31=new E.a),this.__Title_31},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RadioControlRegistry_32",{get:function(){return null==this.__RadioControlRegistry_32&&(this.__RadioControlRegistry_32=new C.a),this.__RadioControlRegistry_32},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_BrowserXhr_33",{get:function(){return null==this.__BrowserXhr_33&&(this.__BrowserXhr_33=new A.a),this.__BrowserXhr_33},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ResponseOptions_34",{get:function(){return null==this.__ResponseOptions_34&&(this.__ResponseOptions_34=new O.a),this.__ResponseOptions_34},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_XSRFStrategy_35",{get:function(){return null==this.__XSRFStrategy_35&&(this.__XSRFStrategy_35=l.a()),this.__XSRFStrategy_35},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_XHRBackend_36",{get:function(){return null==this.__XHRBackend_36&&(this.__XHRBackend_36=new I.a(this._BrowserXhr_33,this._ResponseOptions_34,this._XSRFStrategy_35)),this.__XHRBackend_36},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RequestOptions_37",{get:function(){return null==this.__RequestOptions_37&&(this.__RequestOptions_37=new x.a),this.__RequestOptions_37},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Http_38",{get:function(){return null==this.__Http_38&&(this.__Http_38=l.b(this._XHRBackend_36,this._RequestOptions_37)),this.__Http_38},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new o.a,this._ApplicationModule_1=new _.d,this._BrowserModule_2=new s.c(this.parent.get(s.c,null)),this._InternalFormsSharedModule_3=new a.a,this._FormsModule_4=new h.a,this._HttpModule_5=new l.c,this._AppModule_6=new r.a,this._ErrorHandler_9=s.d(),this._ApplicationInitStatus_10=new u.a(this.parent.get(u.b,null)),this._Testability_11=new p.a(this.parent.get(M.a)),this._ApplicationRef__12=new d.b(this.parent.get(M.a),this.parent.get(H.a),this,this._ErrorHandler_9,this,this._ApplicationInitStatus_10,this.parent.get(p.b,null),this._Testability_11),this._DomSharedStylesHost_20=new g.a(this._DOCUMENT_16),this._AppModule_6},t.prototype.getInternal=function(e,t){return e===o.a?this._CommonModule_0:e===_.d?this._ApplicationModule_1:e===s.c?this._BrowserModule_2:e===a.a?this._InternalFormsSharedModule_3:e===h.a?this._FormsModule_4:e===l.c?this._HttpModule_5:e===r.a?this._AppModule_6:e===P.a?this._LOCALE_ID_7:e===c.b?this._NgLocalization_8:e===V.a?this._ErrorHandler_9:e===u.a?this._ApplicationInitStatus_10:e===p.a?this._Testability_11:e===d.b?this._ApplicationRef__12:e===d.c?this._ApplicationRef_13:e===f.a?this._Compiler_14:e===D.b?this._APP_ID_15:e===j.a?this._DOCUMENT_16:e===m.c?this._HAMMER_GESTURE_CONFIG_17:e===y.b?this._EVENT_MANAGER_PLUGINS_18:e===y.a?this._EventManager_19:e===g.a?this._DomSharedStylesHost_20:e===U.a?this._AnimationDriver_21:e===b.b?this._DomRootRenderer_22:e===L.a?this._RootRenderer_23:e===v.b?this._DomSanitizer_24:e===z.a?this._Sanitizer_25:e===R.a?this._AnimationQueue_26:e===w.ViewUtils?this._ViewUtils_27:e===B.a?this._IterableDiffers_28:e===F.a?this._KeyValueDiffers_29:e===g.b?this._SharedStylesHost_30:e===E.a?this._Title_31:e===C.a?this._RadioControlRegistry_32:e===A.a?this._BrowserXhr_33:e===O.b?this._ResponseOptions_34:e===G.a?this._XSRFStrategy_35:e===I.a?this._XHRBackend_36:e===x.b?this._RequestOptions_37:e===X.a?this._Http_38:t},t.prototype.destroyInternal=function(){this._ApplicationRef__12.ngOnDestroy(),this._DomSharedStylesHost_20.ngOnDestroy()},t}(i.a),Q=new i.b(q,r.a)},332:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[".videoCanvas[_ngcontent-%COMP%]{position:absolute;z-index:10}"]},333:function(e,t,n){"use strict";var i=n(217),r=n(82),o=n(31),_=n(63),s=n(37),a=n(36),h=n(48),l=n(332),c=n(218),u=n(335),p=n(45);n.d(t,"b",function(){return f}),n.d(t,"a",function(){return v});var d=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},f=function(){function e(){this._changed=!1,this.context=new i.a}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||0===e.numberOfChecks&&this.context.ngOnInit(),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}(),m=o.createRenderComponentType("",0,_.b.None,[],{}),y=function(e){function t(n,i,r,o){e.call(this,t,m,s.a.HOST,n,i,r,o,a.b.CheckAlways)}return d(t,e),t.prototype.createInternal=function(e){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-photo",o.EMPTY_INLINE_ARRAY,e,null),this.compView_0=new v(this.viewUtils,this,0,this._el_0),this._PhotoComponent_0_3=new f,this.compView_0.create(this._PhotoComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._PhotoComponent_0_3.context)},t.prototype.injectorGetInternal=function(e,t,n){return e===i.a&&0===t?this._PhotoComponent_0_3.context:n},t.prototype.detectChangesInternal=function(e){this._PhotoComponent_0_3.ngDoCheck(this,this._el_0,e),this.compView_0.internalDetectChanges(e)},t.prototype.destroyInternal=function(){this.compView_0.destroy()},t.prototype.visitRootNodesInternal=function(e,t){e(this._el_0,t)},t}(r.a),g=(new h.b("app-photo",y,i.a),[l.a]),b=o.createRenderComponentType("",0,_.b.Emulated,g,{}),v=function(e){function t(n,i,r,o){e.call(this,t,b,s.a.COMPONENT,n,i,r,o,a.b.CheckAlways),this._expr_17=p.b}return d(t,e),t.prototype.createInternal=function(e){var t=this.renderer.createViewRoot(this.parentElement);this._el_0=o.createRenderElement(this.renderer,t,"h1",new o.InlineArray2(2,"id","age"),null),this._text_1=this.renderer.createText(this._el_0,"",null),this._text_2=this.renderer.createText(t,"\n",null),this._el_3=o.createRenderElement(this.renderer,t,"div",o.EMPTY_INLINE_ARRAY,null),this._text_4=this.renderer.createText(this._el_3,"\n    ",null),this._el_5=o.createRenderElement(this.renderer,this._el_3,"canvas",new o.InlineArray8(6,"class","videoCanvas","id","videoCanvas","name","videoCanvas"),null),this._text_6=this.renderer.createText(this._el_3,"\n    ",null),this._el_7=o.createRenderElement(this.renderer,this._el_3,"app-video",o.EMPTY_INLINE_ARRAY,null),this.compView_7=new u.a(this.viewUtils,this,7,this._el_7),this._VideoComponent_7_3=new u.b,this.compView_7.create(this._VideoComponent_7_3.context),this._text_8=this.renderer.createText(this._el_3,"\n",null),this._text_9=this.renderer.createText(t,"\n",null),this._el_10=o.createRenderElement(this.renderer,t,"canvas",new o.InlineArray8(6,"id","canvas","name","canvas","style","display:none;"),null),this._text_11=this.renderer.createText(t,"\n",null),this._el_12=o.createRenderElement(this.renderer,t,"button",new o.InlineArray2(2,"id","take"),null),this._text_13=this.renderer.createText(this._el_12,"Take a photo",null),this._el_14=o.createRenderElement(this.renderer,t,"br",o.EMPTY_INLINE_ARRAY,null);var n=o.subscribeToRenderElement(this,this._el_3,new o.InlineArray4(4,"resize","window","load","document"),this.eventHandler(this.handleEvent_3)),i=o.subscribeToRenderElement(this,this._el_5,new o.InlineArray2(2,"click",null),this.eventHandler(this.handleEvent_5)),r=o.subscribeToRenderElement(this,this._el_12,new o.InlineArray2(2,"click",null),this.eventHandler(this.handleEvent_12));return this.init(null,this.renderer.directRenderer?null:[this._el_0,this._text_1,this._text_2,this._el_3,this._text_4,this._el_5,this._text_6,this._el_7,this._text_8,this._text_9,this._el_10,this._text_11,this._el_12,this._text_13,this._el_14],[n,i,r]),null},t.prototype.injectorGetInternal=function(e,t,n){return e===c.a&&7===t?this._VideoComponent_7_3.context:n},t.prototype.detectChangesInternal=function(e){this._VideoComponent_7_3.ngDoCheck(this,this._el_7,e);var t=o.inlineInterpolate(1,"",this.context.age,"");o.checkBinding(e,this._expr_17,t)&&(this.renderer.setText(this._text_1,t),this._expr_17=t),this.compView_7.internalDetectChanges(e),e||0===this.numberOfChecks&&this._VideoComponent_7_3.context.ngAfterViewInit()},t.prototype.destroyInternal=function(){this.compView_7.destroy()},t.prototype.handleEvent_3=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("window:resize"==e){n=this.context.onResize()!==!1&&n}if("document:load"==e){n=this.context.onResize()!==!1&&n}return n},t.prototype.handleEvent_5=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("click"==e){n=this.context.onClick()!==!1&&n}return n},t.prototype.handleEvent_12=function(e,t){this.markPathToRootAsCheckOnce();var n=!0;if("click"==e){n=this.context.onClick()!==!1&&n}return n},t}(r.a)},334:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=[""]},335:function(e,t,n){"use strict";var i=n(218),r=n(82),o=n(31),_=n(63),s=n(37),a=n(36),h=n(48),l=n(334),c=n(188),u=n(62);n.d(t,"b",function(){return d}),n.d(t,"a",function(){return b});var p=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},d=function(){function e(){this._changed=!1,this.context=new i.a}return e.prototype.ngOnDetach=function(e,t,n){},e.prototype.ngOnDestroy=function(){},e.prototype.ngDoCheck=function(e,t,n){var i=this._changed;return this._changed=!1,n||0===e.numberOfChecks&&this.context.ngOnInit(),i},e.prototype.checkHost=function(e,t,n,i){},e.prototype.handleEvent=function(e,t){return!0},e.prototype.subscribe=function(e,t){this._eventHandler=t},e}(),f=o.createRenderComponentType("",0,_.b.None,[],{}),m=function(e){function t(n,i,r,o){e.call(this,t,f,s.a.HOST,n,i,r,o,a.b.CheckAlways)}return p(t,e),t.prototype.createInternal=function(e){return this._el_0=o.selectOrCreateRenderHostElement(this.renderer,"app-video",o.EMPTY_INLINE_ARRAY,e,null),this.compView_0=new b(this.viewUtils,this,0,this._el_0),this._VideoComponent_0_3=new d,this.compView_0.create(this._VideoComponent_0_3.context),this.init(this._el_0,this.renderer.directRenderer?null:[this._el_0],null),new h.a(0,this,this._el_0,this._VideoComponent_0_3.context)},t.prototype.injectorGetInternal=function(e,t,n){return e===i.a&&0===t?this._VideoComponent_0_3.context:n},t.prototype.detectChangesInternal=function(e){this._VideoComponent_0_3.ngDoCheck(this,this._el_0,e),this.compView_0.internalDetectChanges(e),e||0===this.numberOfChecks&&this._VideoComponent_0_3.context.ngAfterViewInit()},t.prototype.destroyInternal=function(){this.compView_0.destroy()},t.prototype.visitRootNodesInternal=function(e,t){e(this._el_0,t)},t}(r.a),y=(new h.b("app-video",m,i.a),[l.a]),g=o.createRenderComponentType("",0,_.b.Emulated,y,{}),b=function(e){function t(n,i,r,o){e.call(this,t,g,s.a.COMPONENT,n,i,r,o,a.b.CheckAlways)}return p(t,e),t.prototype.createInternal=function(e){var t=this.renderer.createViewRoot(this.parentElement);return this._viewQuery_video_0=new c.a,this._el_0=o.createRenderElement(this.renderer,t,"video",new o.InlineArray8(6,"autoplay","","height","480","width","640"),null),this._text_1=this.renderer.createText(t,"\n",null),this._el_2=o.createRenderElement(this.renderer,t,"br",o.EMPTY_INLINE_ARRAY,null),this._text_3=this.renderer.createText(t,"\n",null),this._el_4=o.createRenderElement(this.renderer,t,"select",new o.InlineArray2(2,"name","audioInputSelect"),null),this._text_5=this.renderer.createText(t,"\n",null),this._el_6=o.createRenderElement(this.renderer,t,"select",new o.InlineArray2(2,"name","audioOutputSelect"),null),this._text_7=this.renderer.createText(t,"\n",null),this._el_8=o.createRenderElement(this.renderer,t,"select",new o.InlineArray2(2,"name","videoSelect"),null),this._viewQuery_video_0.reset([new u.a(this._el_0)]),this.context.video=this._viewQuery_video_0.first,this.init(null,this.renderer.directRenderer?null:[this._el_0,this._text_1,this._el_2,this._text_3,this._el_4,this._text_5,this._el_6,this._text_7,this._el_8],null),null},t}(r.a)},336:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.title="Rilevamento Età"}return e.prototype.ngOnInit=function(){},e.ctorParameters=function(){return[]},e}()},337:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){}return e}()},338:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i={production:!0}},501:function(e,t,n){e.exports=n(262)}},[501]);