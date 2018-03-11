import * as React from "react"
import * as ReactDOM from "react-dom"
import {StoreState, ViewportStore} from "../types";
import Helper from "./Helper";
import {Button} from 'antd'

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
        this.domInstance = document.getElementById("items") as HTMLElement;

        // 绑定监听
        // this.domInstance.addEventListener("mouseover", this.handleMouseOver)
        // this.domInstance.addEventListener("click", this.handleClick)


        // 设置此实例的 dom 节点
        // this.props.actions.ViewportAction.setDomInstance(this.props.instanceKey, this.domInstance)

        // 如果自己是布局元素, 给子元素绑定 sortable
        // if (this.setting.isContainer) {
        // 添加可排序拖拽
        this.helper.registerInnerDrag(null,  document.getElementById("item2"), {
            draggable: ".gaea-draggable"
        });
        this.helper.registerInnerDrag(null,  document.getElementById("item3"), {
            draggable: ".gaea-draggable"
        });
            this.helper.registerInnerDrag(null, this.domInstance, {
                draggable: ".gaea-draggable"
            })
        // }
    }

    render(){
        return (
            <div className="viewport">
                <div id="items">
                    <div>item 1</div>
                    <div id="item3">item 2 <Button>111</Button> <Button>111</Button></div>
                    <div>item 3</div>
                    <Button>111</Button>
                </div>
                <div id="item2">
                    <div>item 4</div>
                    <div>item 5</div>
                    <div>item 6</div>
                </div>
            </div>
        )
    }
}