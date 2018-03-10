import { Tooltip ,Icon} from 'antd';
import * as React from 'react';

export default class DragMenuButton extends React.Component {

    public render() {
        // console.log("this.props",this.props);
        return (
            <Tooltip title="Pick Component" placement="right">
                <Icon type="plus" onClick={this.handleClick} style={{fontSize:24}}/>
            </Tooltip>
        )
    }

    private handleClick = () => {
        // if (this.props.stores.ApplicationStore.leftTool !== "dragMenu") {
        //     this.props.actions.ApplicationAction.setLeftTool("dragMenu")
        //     this.props.actions.ApplicationAction.setRightTool(null)
        // } else {
        //     this.props.actions.ApplicationAction.setLeftTool(null)
        //     this.props.actions.ApplicationAction.setRightTool(null)
        // }
    }
}
