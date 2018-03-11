
// src/containers/Hello.tsx

import { Button,Icon } from 'antd';
import * as React from 'react';
import {TPosition} from "../../define/index";
import {connect} from "react-redux";
import {StoreState} from "../../base/types";
class TestIcon extends React.Component{
    render(){
        return (
            <Icon type="down"/>
        )
    }
}
class Botton2 extends React.Component<StoreState>{
    componentDidMount(){
        this.props.actions.registerOuterDrag(document.getElementById('mm') as HTMLElement);
    }
    render(){
        return <div id="mm">
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
        </div>
    }
}
export function mapStateToProps(state) :any{
    return state;
}
export default {
    class: connect(mapStateToProps)(Botton2),
    icon: TestIcon,
    position: TPosition.LEFT,
}