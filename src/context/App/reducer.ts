//Interfaces
import ReducerAction from '../../interfaces/ReducerAction';

//Shared
import { actionTypes } from '../../shared/const';


export const reducer = (state: any, action: ReducerAction) => {
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
    userdata: null
}