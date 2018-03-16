import {List} from "immutable";
import * as _ from "lodash";
export interface StoreState {
    actions?:any,
    plugins?:any,
    tools?:List<number>,
    /**
     * dom数据映射
     */
    viewport?:ViewportStore,
    /**
     * 创建的APP总数据
     */
    app?:InnerAppStore,
    dispatch?:any,
}

export interface InnerAppStore {
    components?:any,
    container?:any,
    config?:any,
    routers?:any,
    pages?:any
}
export class ViewportStore{
    public viewportDOM: HTMLElement = null;
    instances = new Map<string, InstanceStore>();
    currentHoverId:string;
    currentEditId:string;
}

export class InstanceStore{
    dom:HTMLElement = null;
    children:string[] = [];
    parent:string;
    index:number;
    data:any;
    id:string = _.uniqueId('zx_id_');
}

export interface DragEvent{
    bubbles:boolean,
    cancelBubble:boolean,
    cancelable:boolean,
    clone:any,
    composed:boolean,
    currentTarget:any,
    defaultPrevented:boolean,
    eventPhase:number,
    from:any,
    isTrusted:boolean,
    item:any,
    newIndex:number,
    oldIndex:number,
    path:any,
    returnValue:boolean,
    srcElement:any,
    target:any,
    timeStamp:any,
    to:any,
    type:string
}
export class DomDataStore {
    /**
     * 视图区域 dom
     */
    public viewportDOM: HTMLElement = null
    /**
     * 根级实例的 key
     */
    public rootInstanceKey: string = null
    /**
     * 当前所有组件实例
     */
    public instances = new Map<string, any>()
    /**
     * 组件实例到dom节点的映射
     */
    public instanceDoms = new Map<string, HTMLElement>()
    /**
     * current drag info
     */
    public currentDragInfo: any = null

    public currentHoverInstanceKey: string = null

    public currentEditInstanceKey: string

    /*public get currentFullInformation() {
        const fullObj: any = {}
        this.instances.forEach((instanceInfo, instanceKey) => {
            fullObj[instanceKey] = instanceInfo
        })
        return fullObj
    }*/

    /**
     * 拖拽前数据获取是否完毕
     */
    public dragStartDataReady = false
}