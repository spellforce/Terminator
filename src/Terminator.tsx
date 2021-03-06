import {createStore,combineReducers} from "redux";
import * as reducers from './base/reducers';
import * as React from 'react';
import {Props} from "./interfaces/PS";
import * as fs from 'fs';
import {StoreState} from "./base/types";
import Actions from "./base/actions";
import {Constants} from "./define";
declare const require: any;
interface IPlugin{
    icon: any
    class: any
    position: string,
    reducers?: any
}
export default class Terminator{
    static get stores(): any {
        return this._stores;
    }

    static set stores(value: any) {
        this._stores = value;
    }

    private static _stores = null;
    private rootReducer = null;
    private reducers:any = {};
    private constatants = [];
    private types = [];
    private plugins:IPlugin[] = [];
    private static debug = true;
    constructor(){
        // this.initRenders();
    }

    public init(){
        Terminator.log("Terminator init start");

        const context = require.context("./plugins", true, /terminator\.(tsx|js)$/)
        context.keys().forEach((key: string) => {
            // this.plugins.set(i,context(key).default[i]);
            // this.plugins[i] = context(key).default[i];
            this.plugins.push(context(key).default)
        });
        // Terminator.log(this.plugins);
        // this.addRenders();
        this.rootReducer = combineReducers(
            {...reducers}
        );
        Terminator.stores = createStore<StoreState>(this.rootReducer,{plugins:this.plugins});
        Actions.instance = Terminator.stores;
        /**
         * 将action注入props方便插件调用
         * */
        Terminator.stores.dispatch({type:Constants.SET_ACTION,value:Actions.instance.export()});
        Terminator.log("Terminator init end");

    }

    static log(message?: any, ...optionalParams: any[]){
        if(Terminator.debug){
            console.log(message,...optionalParams);
        }
    }
    // addRenders(){
    //     for(let i in this.plugins){
    //         for(let j in this.plugins[i].reducers){
    //             this.reducers[j] = this.plugins[i].reducers[j];
    //             // this.reducers
    //         }
    //     }
    //     console.log(this.reducers)
    // }

    // public getProps():Props{
    //     return {
    //         functions: {loadPlugins: (p:string)=>this.loadPlugins(p)},
    //         plugins: this.plugins
    //     }
    // }


    // public getStore(){
    //     return {store:createStore<StoreState>(this.rootReducer,{plugins:this.plugins})};
    // }
}