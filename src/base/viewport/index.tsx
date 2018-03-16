import * as React from "react"
import * as ReactDOM from "react-dom"
import {StoreState} from "../types";
import Helper from "./Helper";
import {Button} from 'antd'
import {connect} from "react-redux";
import {Constants} from "../../define";
import './index.css';

class Viewport extends React.Component<StoreState> {
    helper = null;
    constructor(props){
        super(props);
        this.helper = new Helper({...this.props,...this.state});
    }

    /**
     * 获取自己的实例
     */
    public getRef = (ref: React.ReactInstance) => {
        this.props.dispatch({type:Constants.SET_VIEWPORT_DOM,value:ReactDOM.findDOMNode(ref) as HTMLElement});
        // console.info('ref',ref);
        this.props.actions.registerInnerDrag(ref)
    };
    /**
     * 鼠标移开视图区域
     */
    public handleMouseLeave = (event) => {
        event.stopPropagation();
        // console.log('handleMouseLeave')
        // 触发事件
        // this.props.actions.EventAction.emit(this.props.stores.EventStore.mouseLeaveViewport)

        // 设置当前 hover 的元素为 null
        this.props.actions.setCurrentHoverInstanceKey(null);
    };

    public componentDidMount() {
        console.log('Viewport componentDidMount');
        console.log(new Button({type:'danger'}))
        console.log((
            <Button />
        ))
    }

    render(){
        return (
            <div className="viewport" onMouseLeave={this.handleMouseLeave}>
                <div className="viewport_root" ref={this.getRef} id="zx_root">

                </div>
                {this.props.actions.loadNoPositionPlugins()}
            </div>
        )
    }
}
export default connect((state)=>{return state})(Viewport);