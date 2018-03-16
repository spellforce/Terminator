import {StoreState} from "../../base/types";
import {createElement} from "react";
import * as React from "react";
import Icon from "antd/lib/icon";
import Tooltip from "antd/lib/tooltip";

export class TIcon extends React.Component<StoreState>{
    beContainer=(e)=>{
        e.stopPropagation();
        console.log("beContainer")
        this.props.actions.registerInnerDrag(this.props.viewport.instances.get(this.props.actions.getCurrentEditId()).dom);
    };
    render(){
        return (
            <Tooltip title="Be a Container" placement="left">
                <Icon type="ant-design" style={{width: 40,lineHeight: '40px'}} onClick={this.beContainer}/>
            </Tooltip>
        )
    }
}
export class BeContainer extends React.Component<StoreState>{
    private draggable = [];
    componentDidMount(){
        this.props.actions.registerOuterDrag(this.draggable as HTMLElement[]);
    }

    render(){
        return (<div></div>);
    }
}