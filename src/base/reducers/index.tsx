import {Map,List} from 'immutable';
import {Constants} from "../../define";
import {InstanceStore, ViewportStore} from "../types";
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

export function viewport(state:ViewportStore = new ViewportStore(), action:any) {
    switch (action.type) {
        case Constants.SET_VIEWPORT_DOM:
            state.viewportDOM = action.value;
            let Instance = new InstanceStore();
            Instance.dom = action.value;
            Instance.id = action.value.id;
            // Instance.dom.instanceKey = Instance.key;
            state.instances.set(Instance.id,Instance);
            return state;
        case Constants.SET_NEW_INSTANCE:
            state.instances.set(action.value.id,action.value);
            return state;
        case Constants.SET_HOVER_INSTANCE:
            state.currentHoverId = action.value;
            return Object.assign({}, state);
        default:break;
    }
    return state;
}

// export class TerminatorStore{
//     private _store;
//
//     get store() {
//         return this._store;
//     }
//
//     set store(value) {
//         this._store = value;
//     }
//
//     viewport(state:ViewportStore = new ViewportStore(), action:any) {
//         switch (action.type) {
//             case Constants.SET_VIEWPORT_DOM:
//                 state.viewportDOM = action.value;
//                 return state;
//             default:break;
//         }
//         return state;
//     }
//
//
// }