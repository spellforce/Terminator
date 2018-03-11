import {createStore,combineReducers} from "redux";
import {enthusiasm} from '../plugins/Hello/reducers/index';
import {incrementEnthusiasm} from '../plugins/Hello/actions/index';
import * as React from 'react'
import {connect} from "react-redux";
import {TPosition} from "../define/index";
import {StoreState} from "./types";
import './index.css';
import Viewport from "./viewport";

class TerminatorMain extends React.PureComponent<StoreState>{
    constructor(props){
        super(props)
    }

    public render(){
        console.log(this);
        return (
            <div className="terminator">
                {/*{this.props.actions.loadPlugins(TPosition.TOP)}*/}
                <div className="top">
                    {this.props.actions.loadIcons(TPosition.TOP)}
                    {this.props.actions.loadPlugins(TPosition.TOP)}
                </div>
                <div className="content">
                    <div className="left">
                        {this.props.actions.loadIcons(TPosition.LEFT)}
                        {this.props.actions.loadPlugins(TPosition.LEFT)}
                    </div>
                    <Viewport/>
                    <div className="right">
                        {this.props.actions.loadPlugins(TPosition.RIGHT)}
                        {this.props.actions.loadIcons(TPosition.RIGHT)}
                    </div>
                </div>
                <div className="bottom">
                    {this.props.actions.loadPlugins(TPosition.Bottom)}
                    {this.props.actions.loadIcons(TPosition.Bottom)}
                </div>
            </div>
        );
    }
}
export function mapStateToProps(state) :any{
    return state;
}
export default connect(mapStateToProps)(TerminatorMain);