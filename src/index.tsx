import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
// import DragMenuButton from './containers/drag-menu-button';
import { Provider } from 'react-redux';
import './index.css';
import "antd/dist/antd.css"
import Terminator from "./Terminator";
import TerminatorMain from "./base/index";

export default class TerminatorEditor extends React.Component{
    public terminator = new Terminator();
    componentWillMount() {
        this.terminator.init();
    }
    render(){
        return (
            <Provider {...this.terminator.getStore()}>
                <TerminatorMain />
            </Provider>
        )
    }
}
ReactDOM.render(
    <TerminatorEditor />,
    document.getElementById('terminator-root') as HTMLElement
);
registerServiceWorker();