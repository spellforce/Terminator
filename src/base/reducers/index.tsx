import {Map,List} from 'immutable';
import {Constants} from "../../define";
// import Actions from "../actions";
const initialState = [];
export function actions(state = null,action){
    switch (action.type) {
        case Constants.SET_ACTION:
            return action.value;
        default: break;
    }
    return state;
}
export function plugins(state = initialState as any, action:any) {
    // console.log('plugins')
    switch (action.type) {
        case "add_plugin":
            return [...state,action.plugin];
        default: break;
    }
    return state;
}
export function tools(state = List([-1,-1,-1,-1]) as any, action:any) {
    // console.log('tools')
    switch (action.type) {
        case Constants.SET_TOOL:
            if(action.index!==-1) {
                if (state.get(action.index) === action.value) {
                    return state.set(action.index, -1);
                } else {
                    return state.set(action.index, action.value);
                }
            }
        break;
    }
    return state;
}