import { Button,Icon } from 'antd';
import * as React from 'react';
import {StoreState} from "../../base/types";
import * as Antd from 'antd';
import {createElement} from "react";
import {findDOMNode} from "react-dom";
import './index.css';
export class AntdIcon extends React.Component{
    render(){
        return (
            <Icon type="ant-design" />
        )
    }
}
export class Antds extends React.Component<StoreState>{
    private draggable = [];
    componentDidMount(){
            this.props.actions.registerOuterDrag(this.draggable as HTMLElement[]);
    }
    shouldComponentUpdate(next:StoreState){
        if(next.tools.get(3)===this.props.tools.get(3)){
            return false;
        }
        return true;
    }
    mapElement=()=>{
        let Nodes = [];
        for(let key in Antd){
            // console.log(key);
        }
        // console.log(Antd.Button);
        let node = [
            createElement(Antd.Button),
            createElement(Antd.Affix),
            createElement(Antd.Card),
        ];
        // console.log(node[0]);
        // return Nodes;
        return node.map((value,index)=>{
            let name = value.type.name;
            return (
                <div key={index} className="t-component">
                    <div ref={(ref)=>this.draggable.push(ref)} className="t-drag-display">
                        {value}
                    </div>
                    <div className="t-component-name">{name}</div>
                </div>
            )
        });
    };
    render(){
        return <div id="antds">
            {this.mapElement()}
        </div>
    }
}