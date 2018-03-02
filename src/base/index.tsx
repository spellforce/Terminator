import {createStore,combineReducers} from "redux";
import {enthusiasm} from '../plugins/Hello/reducers/index';
import {incrementEnthusiasm} from '../plugins/Hello/actions/index';
import * as React from 'react'
import {connect} from "react-redux";
import {Props} from "../interfaces/PS";
import {TPosition} from "../interfaces/define";

class TerminatorMain extends React.PureComponent<Props,{}>{
    public render(){
        console.log(this);
        return (
            <div>
                {this.props.functions.loadPlugins(TPosition.TOP)}
            </div>
        );
    }
}
export function mapStateToProps(state) :any{
    return state;
}
export default connect(mapStateToProps)(TerminatorMain);