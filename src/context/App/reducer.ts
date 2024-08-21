//Interfaces
import IReducerAction from '../../interfaces/ReducerAction';
import IState from '../../interfaces/State';

//Shared
import {
    actionTypes,
    initialUserdata
} from '../../shared/const';


/**
 * reducer
 * 
 * A state objektum frissítése a műveletnek megfelelően.
 * 
 * @param state 
 * @param action 
 * @returns 
 */
export const reducer = (state: IState, action: IReducerAction) => {
    switch (action.type) {
        case actionTypes.app.SET_USERDATA:
            return {
                ...state,
                userdata: action.payload
            }
        default:
            return state
    }
}

export const initialState = {
    userdata: initialUserdata
}