import {createElement} from 'react'
import * as Sortable from "sortablejs"
import {DragEvent, InstanceStore, StoreState} from "../types";
import * as _ from "lodash"
import {TPosition,Constants} from "../../define/index";
import * as React from 'react';
import Util from "../Util";

// export function setTool(index,value){
//     return Terminator.stores.dispatch({type: Constants.SET_TOOL, index, value});
// }
let actions={};
function Action(target: any, propertyKey: string, descriptor: PropertyDescriptor):any {
    // console.log('target',target,"propertyKey",propertyKey,"descriptor",descriptor);
    actions[propertyKey] = null;
}

// function actionDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     // const func = descriptor.value
//     // actions[propertyKey] = (...args)=>runInAction(func.bind(this, ...args));
//     // console.log(target.constructor.prototype[propertyKey],target.constructor.prototype)
//     actions[propertyKey] = null;
// }
// function runInAction(fn: () => any | Promise<any>) {
//     try {
//         return fn()
//     } finally {
//
//     }
// }
export default class Actions{
    private readonly store:any;
    private actions = {};
    private dispatch;
    private static _instance = null;
    constructor(store){
        this.store = store;
        this.dispatch = this.store.dispatch;
    }

    static get instance(): any {
        return this._instance;
    }

    static set instance(value: any) {
        if(Actions.instance===null) {
            this._instance = new Actions(value);
        }
    }

    private export(){
        for(let key in actions)
            this.actions[key] = (...args) =>this[key](...args)
        return this.actions;
    }

    @Action setTool(index,value){
        this.dispatch({type: Constants.SET_TOOL, index, value});
    }

    @Action loadIcons(position:string){
        let {plugins} = this.store.getState();
        let flag;
        switch (position){
            case TPosition.TOP:flag=0;break;
            case TPosition.RIGHT:flag=1;break;
            case TPosition.Bottom:flag=2;break;
            case TPosition.LEFT:flag=3;break;
        }

        let Icons = plugins
            .filter((plugin)=>plugin.position === position)
            .map((plugin,value)=>{
                return (
                    <div className="terminator-icons" key={value} onClick={()=>this.setTool(flag,value)}>
                        {createElement(plugin.icon)}
                    </div>
                )
            });
        if(Icons.length){
            return (<div className="icons">{Icons}</div>);
        }else {
            return '';
        }
    };
    @Action loadNoPositionPlugins(){
        let {plugins} = this.store.getState();
        let componentClasses = plugins
            .filter((plugin,index)=>(plugin.position === null || plugin.position === undefined))
            .map((plugin,index)=>{
                if(plugin.class!==null)
                    return createElement(plugin.class,{
                        key:index,
                        hidden:true
                    })
            });
        return componentClasses;
    }
    @Action loadPlugins(position:string){
        let {plugins,tools} = this.store.getState();
        let flag;
        switch (position){
            case TPosition.TOP:flag=0;break;
            case TPosition.RIGHT:flag=1;break;
            case TPosition.Bottom:flag=2;break;
            case TPosition.LEFT:flag=3;break;
        }
        let componentClasses = plugins
            .filter((plugin,index)=>(plugin.position === position && tools.get(flag)===index))
            .map((plugin,index)=>{
                if(plugin.class!==null)
                return (
                    <div className="one-plugin" key={index}>
                        {createElement(plugin.class)}
                    </div>
                )
            });
        if(componentClasses.length){
            return (<div className="plugins">{componentClasses}</div>);
        }else {
            return '';
        }
    };

    private dragType;
    @Action getDragType(){
        return this.dragType;
    }
    @Action registerInnerDrag(dragParentDom: any,params?:any) {
        // 上次拖拽的位置
        let lastDragStartIndex = -1;
        // if(dragParentDom.length === undefined){
        //     dragParentDom = [dragParentDom]
        // }
        // for (let i in dragParentDom) {
            Util.addClass(dragParentDom,'zx-draggable');
            Sortable.create(dragParentDom, {
                draggable: ".zx-draggable",
                animation: 50,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: "terminator-container",
                    pull: true,
                    put: true
                },
                sort: true,
                delay: 0,
                onStart: (event: any) => {
                    this.dragType = 'move';
                    console.log('onStart',event)
                },
                onEnd: (event: any) => {
                    this.dragType = null;
                    console.log('onEnd',event)
                },
                onAdd:(event:DragEvent)=>{
                    console.log('onAdd',event);
                    let props:StoreState = this.store.getState();
                    /*判断是移动还是新增*/
                    switch (this.dragType){
                        case 'new':
                            this.addNewInstance(event);
                            break;
                        case 'move':
                            this.moveInstance(event);
                            break;
                    }
                    // console.log(props);
                    // props.viewport.instance.dom = event.item;
                }
            })
        // }
    }
    addNewInstance(event:DragEvent){
        let props:StoreState = this.store.getState();
        const newInstance = new InstanceStore();
        newInstance.data = {props: event.item.props};
        newInstance.dom = event.item;
        newInstance.dom.id = newInstance.id;
        Util.addClass(newInstance.dom,'zx-draggable');
        newInstance.dom.onclick = (e)=>{
            e.stopPropagation();this.setCurrentEditId(newInstance.id)
        };
        newInstance.dom.onmouseover = (e)=>{
            e.stopPropagation();
            this.setCurrentHoverInstanceKey(newInstance.id);
        };
        newInstance.parent = event.target.id;
        //修改了props
        let Parent = props.viewport.instances.get(event.to.id);
        Parent.children.splice(event.newIndex,0,event.item.id);
        this.dispatch({type:Constants.SET_NEW_INSTANCE,value:newInstance});
    }
    moveInstance(event:DragEvent){
        let props:StoreState = this.store.getState();
        //从旧的父节点中删除id
        let oldParent = props.viewport.instances.get(event.from.id);
        _.pull(oldParent.children, event.item.id);
        props.viewport.instances.set(oldParent.id,oldParent);
        //在新的父节点中添加id
        let newParent = props.viewport.instances.get(event.to.id);
        // console.log(newParent)
        // console.log(event.to.id)
        newParent.children.splice(event.newIndex,0,event.item.id);
        props.viewport.instances.set(newParent.id,newParent);
        this.dispatch({type:Constants.SET_MOVE_INSTANCE,oldParent,newParent});
    }
    @Action registerOuterDrag(dragParentDom: any,params?:any) {
        // 上次拖拽的位置
        let lastDragStartIndex = -1
        if(dragParentDom.length === undefined){
            dragParentDom = [dragParentDom]
        }
        for (let i in dragParentDom) {
            Sortable.create(dragParentDom[i], {
                ...params,
                animation: 50,
                // 放在一个组里,可以跨组拖拽
                group: {
                    name: "terminator-container",
                    pull: "clone",
                    put: false
                },
                sort: true,
                delay: 0,
                onStart: (event: any) => {
                    this.dragType = 'new'
                },
                onEnd: (event: any) => {
                    this.dragType = null;
                }
            })
        }
    }

    private currentEditId = null;
    private currentHoverId = null;
    /**
     * 设置当前 edit 元素的 instanceKey
     */

    @Action public setCurrentEditId(id: string) {
        // 如果和当前正在编辑元素相同，不做操作
        if (this.currentEditId === id) {
            return
        }
        console.log('currentEditId',id);
        // 修改 mapUniqueKey
        this.currentEditId = id
    }
    @Action public getCurrentEditId() {
        return this.currentEditId;
    }
    @Action public setCurrentHoverInstanceKey(id: string) {
        let props:StoreState = this.store.getState();
        if (props.viewport.currentHoverId === id) {
            return
        }
        console.log('currentHoverId',id);
        this.dispatch({type:Constants.SET_HOVER_INSTANCE,value:id});
    }
}