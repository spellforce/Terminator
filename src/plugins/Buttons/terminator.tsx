
// src/containers/Hello.tsx

import { Button,Icon } from 'antd';
import * as React from 'react';
import {TPosition} from "../../interfaces/define";
class TestIcon extends React.Component{
    render(){
        return (
            <Icon type="down"/>
        )
    }
}
export default {
    class: Button,
    icon: TestIcon,
    position: TPosition.LEFT,
}