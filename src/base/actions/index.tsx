import {createElement} from 'react'
import * as Sortable from "sortablejs"
import {StoreState} from "../types";
import {TPosition,Constants} from "../../define/index";
import * as React from 'react';

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

    @Action registerOuterDrag(dragParentDom: HTMLElement) {
        // 上次拖拽的位置
        let lastDragStartIndex = -1

        Sortable.create(dragParentDom, {
            animation: 50,
            // 放在一个组里,可以跨组拖拽
            group: {
                name: "gaea-container",
                pull: "clone",
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event: any) => {

            },
            onEnd: (event: any) => {

            }
        })
    }
}