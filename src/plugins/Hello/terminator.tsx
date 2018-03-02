import * as reducers from "./reducers";
// src/containers/Hello.tsx

import Hello from './components/Hello';
import * as actions from './actions/';
import { StoreState } from './types/index';
import { connect, Dispatch } from 'react-redux';
import {TPosition} from "../../interfaces/define";

export function mapStateToProps(state) :any{
    console.log(state);
    return {
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

export default {'Hello':{
    class: connect(mapStateToProps)(Hello),
    position: TPosition.TOP,
    reducers
}}