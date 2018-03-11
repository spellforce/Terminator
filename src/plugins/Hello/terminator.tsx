import * as reducers from "./reducers/index";
// src/containers/Hello.tsx

import Hello from './components/Hello';
import * as actions from './actions/index';
import { StoreState } from './types/index';
import { connect, Dispatch } from 'react-redux';
import {TPosition} from "../../define/index";
import DragMenuButton from "./components/Icon";

export function mapStateToProps(state) :any{
    return {
        ...state,
        enthusiasmLevel:1,
        name: "张鑫",
    };
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    };
}

export default {
    class: connect(mapStateToProps)(Hello),
    icon: DragMenuButton,
    position: TPosition.LEFT,
    reducers
}