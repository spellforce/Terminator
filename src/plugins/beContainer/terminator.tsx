
// src/containers/Hello.tsx


import {connect} from "react-redux";
import {TPosition} from "../../define";
import {TIcon} from "./index";

export function mapStateToProps(state) :any{
    return state;
}

export default {
    class: null,
    icon: connect(mapStateToProps)(TIcon),
    position: TPosition.RIGHT,
}