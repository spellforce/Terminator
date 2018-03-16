import {connect} from "react-redux";
import {ViewportGuideline} from "./index";


function mapStateToProps(state) :any {
    return state;
}
export default {
    class: connect(mapStateToProps)(ViewportGuideline),
    icon: null
}