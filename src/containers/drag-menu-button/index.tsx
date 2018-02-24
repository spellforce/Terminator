import { Tooltip ,Icon} from "antd"
import * as React from "react"

export class Props extends StoreProps<void, void> {

}

export class State {

}

class DragMenuButton extends React.Component<Props, State> {
    public static defaultProps = new Props();
    public state = new State();

    public render() {
        return (
            <Tooltip title="Pick Component" placement="right">
                <Icon type="component" onClick={this.handleClick} />
            </Tooltip>
        )
    }

    private handleClick = () => {
        if (this.props.stores.ApplicationStore.leftTool !== "dragMenu") {
            this.props.actions.ApplicationAction.setLeftTool("dragMenu")
            this.props.actions.ApplicationAction.setRightTool(null)
        } else {
            this.props.actions.ApplicationAction.setLeftTool(null)
            this.props.actions.ApplicationAction.setRightTool(null)
        }
    }
}

export default {
    position: "leftBarTop",
    class: DragMenuButton
}
