import {createStore,combineReducers} from "redux";
import {enthusiasm} from '../plugins/Hello/reducers/index';
import {incrementEnthusiasm} from '../plugins/Hello/actions/index';
import * as React from 'react'
import {connect, Dispatch} from "react-redux";
// import {loadPlugins} from "./actions";
import {TPosition} from "../interfaces/define";
import {createElement} from "react";
import {StoreState} from "./types";
import './index.css';
import * as assert from "assert";
import Viewport from "./viewport";
interface Props extends StoreState{
    setTopTool:()=>void
}
class TerminatorMain extends React.PureComponent<any>{
    constructor(props){
        super(props)
    }
    loadIcons = (position:string) =>{
        let flag;
        switch (position){
            case TPosition.TOP:flag=0;break;
            case TPosition.RIGHT:flag=1;break;
            case TPosition.Buttom:flag=2;break;
            case TPosition.LEFT:flag=3;break;
        }

        let Icons = this.props.plugins
            .filter((plugin)=>plugin.position === position)
            .map((plugin,value)=>{
                return (
                    <div className="terminator-icons" key={value} onClick={()=>this.props.setTool(flag,value)}>
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

    loadPlugins = (position:string) =>{
        let flag;
        switch (position){
            case TPosition.TOP:flag=0;break;
            case TPosition.RIGHT:flag=1;break;
            case TPosition.Buttom:flag=2;break;
            case TPosition.LEFT:flag=3;break;
        }
        let componentClasses = this.props.plugins
            .filter((plugin,index)=>(plugin.position === position && this.props.tools.get(flag)===index))
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
    public render(){
        console.log(this);
        return (
            <div className="terminator">
                {/*{this.props.actions.loadPlugins(TPosition.TOP)}*/}
                <div className="top">
                    {this.loadIcons(TPosition.TOP)}
                    {this.loadPlugins(TPosition.TOP)}
                </div>
                <div className="content">
                    <div className="left">
                        {this.loadIcons(TPosition.LEFT)}
                        {this.loadPlugins(TPosition.LEFT)}
                    </div>
                    <Viewport/>
                    <div className="right">
                        {this.loadPlugins(TPosition.RIGHT)}
                        {this.loadIcons(TPosition.RIGHT)}
                    </div>
                </div>
                <div className="bottom">
                    {this.loadPlugins(TPosition.Buttom)}
                    {this.loadIcons(TPosition.Buttom)}
                </div>
            </div>
        );
    }
}
export function mapStateToProps(state) :any{
    return state;
}
function mapDispatchToProps(dispatch:Dispatch<any>){
    return {
        setTool:(index,value)=>dispatch({type:"set-tool",index,value})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TerminatorMain);