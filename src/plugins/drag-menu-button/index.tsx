import { Tooltip ,Icon} from 'antd';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
// import * as actions from '../../actions';
// import {StoreState} from "../../types";
// eslint-disable-next-line
export interface Props {
    name: string;
}

export class State {

}

class DragMenuButton extends React.Component<Props> {

    public render() {
        console.log("this.props",this.props);
        return (
            <Tooltip title="Pick Component" placement="right">
                <Icon type="plus" onClick={this.handleClick} />
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
export function mapStateToProps(state) {
    console.log("state" ,state)
    return {
        name: "x",
    };
}

export default connect(mapStateToProps)(DragMenuButton);
// export default {
//     position: "leftBarTop",
//     class: DragMenuButton
// }
