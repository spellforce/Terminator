import * as React from "react"
import * as ReactDOM from "react-dom"
import {StoreState, ViewportStore} from "../types";
import Helper from "./Helper";

export default class Viewport extends React.Component<StoreState,ViewportStore> {
    helper = null;
    /**
     * 当前组件 dom 对象
     */
    private domInstance: HTMLElement

    constructor(props){
        super(props);
        this.helper = new Helper({...this.props,...this.state});
    }
    handleMouseOver(){

    }
    handleClick(){

    }
    public componentDidMount() {
        this.domInstance = document.getElementById("items") as HTMLElement

        // 绑定监听
        // this.domInstance.addEventListener("mouseover", this.handleMouseOver)
        // this.domInstance.addEventListener("click", this.handleClick)


        // 设置此实例的 dom 节点
        // this.props.actions.ViewportAction.setDomInstance(this.props.instanceKey, this.domInstance)

        // 如果自己是布局元素, 给子元素绑定 sortable
        // if (this.setting.isContainer) {
            // 添加可排序拖拽
            this.helper.registerInnerDrag(null, this.domInstance, {
                draggable: ".gaea-draggable"
            })
        // }
    }

    render(){
        return (
            <div className="viewport">
                <ul id="items">
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                </ul>
            </div>
        )
    }
}