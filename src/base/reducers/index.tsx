import { EnthusiasmAction } from '../actions/index';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';
const initialState = {enthusiasmLevel:1};
export function enthusiasm(state = initialState as any, action) {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return {...state,enthusiasmLevel: state.enthusiasm.enthusiasmLevel + 1 };
        case DECREMENT_ENTHUSIASM:
            return {...state,enthusiasmLevel: Math.max(1, state.enthusiasm.enthusiasmLevel - 1) };
        default: break;
    }
    return state;
}