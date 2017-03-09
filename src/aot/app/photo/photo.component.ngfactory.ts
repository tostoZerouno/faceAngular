/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../app/photo/photo.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from './photo.component.css.shim.ngstyle';
import * as import9 from '../../../app/video/video.component';
import * as import10 from '../video/video.component.ngfactory';
import * as import11 from '@angular/core/src/change_detection/change_detection_util';
export class Wrapper_PhotoComponent {
  /*private*/ _eventHandler:Function;
  context:import0.PhotoComponent;
  /*private*/ _changed:boolean;
  constructor() {
    this._changed = false;
    this.context = new import0.PhotoComponent();
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  ngDoCheck(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if ((view.numberOfChecks === 0)) { this.context.ngOnInit(); } }
    return changed;
  }
  checkHost(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import1.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_PhotoComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_PhotoComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.PhotoComponent>;
  _PhotoComponent_0_3:Wrapper_PhotoComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_PhotoComponent_Host0,renderType_PhotoComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'app-photo',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_PhotoComponent0(this.viewUtils,this,0,this._el_0);
    this._PhotoComponent_0_3 = new Wrapper_PhotoComponent();
    this.compView_0.create(this._PhotoComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._PhotoComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.PhotoComponent) && (0 === requestNodeIndex))) { return this._PhotoComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._PhotoComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const PhotoComponentNgFactory:import7.ComponentFactory<import0.PhotoComponent> = new import7.ComponentFactory<import0.PhotoComponent>('app-photo',View_PhotoComponent_Host0,import0.PhotoComponent);
const styles_PhotoComponent:any[] = [import8.styles];
var renderType_PhotoComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.Emulated,styles_PhotoComponent,{});
export class View_PhotoComponent0 extends import1.AppView<import0.PhotoComponent> {
  _el_0:any;
  _text_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _el_7:any;
  compView_7:import1.AppView<import9.VideoComponent>;
  _VideoComponent_7_3:import10.Wrapper_VideoComponent;
  _text_8:any;
  _text_9:any;
  _el_10:any;
  _text_11:any;
  _el_12:any;
  _text_13:any;
  _el_14:any;
  /*private*/ _expr_17:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_PhotoComponent0,renderType_PhotoComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
    this._expr_17 = import11.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import3.createRenderElement(this.renderer,parentRenderNode,'h1',new import3.InlineArray2(2,'id','age'),(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'',(null as any));
    this._text_2 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,parentRenderNode,'div',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n    ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'canvas',new import3.InlineArray8(6,'class','videoCanvas','id','videoCanvas','name','videoCanvas'),(null as any));
    this._text_6 = this.renderer.createText(this._el_3,'\n    ',(null as any));
    this._el_7 = import3.createRenderElement(this.renderer,this._el_3,'app-video',import3.EMPTY_INLINE_ARRAY,(null as any));
    this.compView_7 = new import10.View_VideoComponent0(this.viewUtils,this,7,this._el_7);
    this._VideoComponent_7_3 = new import10.Wrapper_VideoComponent();
    this.compView_7.create(this._VideoComponent_7_3.context);
    this._text_8 = this.renderer.createText(this._el_3,'\n',(null as any));
    this._text_9 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_10 = import3.createRenderElement(this.renderer,parentRenderNode,'canvas',new import3.InlineArray8(6,'id','canvas','name','canvas','style','display:none;'),(null as any));
    this._text_11 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,parentRenderNode,'button',new import3.InlineArray2(2,'id','take'),(null as any));
    this._text_13 = this.renderer.createText(this._el_12,'Take a photo',(null as any));
    this._el_14 = import3.createRenderElement(this.renderer,parentRenderNode,'br',import3.EMPTY_INLINE_ARRAY,(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_3,new import3.InlineArray4(4,'resize','window','load','document'),this.eventHandler(this.handleEvent_3));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_5,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_5));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_12,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_12));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._el_7,
      this._text_8,
      this._text_9,
      this._el_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._el_14
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import9.VideoComponent) && (7 === requestNodeIndex))) { return this._VideoComponent_7_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._VideoComponent_7_3.ngDoCheck(this,this._el_7,throwOnChange);
    const currVal_17:any = import3.inlineInterpolate(1,'',this.context.age,'');
    if (import3.checkBinding(throwOnChange,this._expr_17,currVal_17)) {
      this.renderer.setText(this._text_1,currVal_17);
      this._expr_17 = currVal_17;
    }
    this.compView_7.internalDetectChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._VideoComponent_7_3.context.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this.compView_7.destroy();
  }
  handleEvent_3(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'window:resize')) {
      const pd_sub_0:any = ((<any>this.context.onResize()) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'document:load')) {
      const pd_sub_1:any = ((<any>this.context.onResize()) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
  handleEvent_5(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.onClick()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_12(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.onClick()) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}