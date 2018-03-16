
// src/containers/Hello.tsx


import {connect} from "react-redux";
import {TPosition} from "../../define";
import {AntdIcon, Antds} from "./index";

export function mapStateToProps(state) :any{
    return state;
}

export default {
    class: connect(mapStateToProps)(Antds),
    icon: AntdIcon,
    position: TPosition.LEFT,
}