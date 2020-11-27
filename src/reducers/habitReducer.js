import { CREATE_HABIT, DELETE_HABIT, FETCH_HABITS, UPDATE_HABIT } from "../actions/types";

let initialState = {
    habits: {},
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CREATE_HABIT:
            state.habits[action.payload._id] = action.payload
            return {
                ...state,
                habits: Object.assign({}, state.habits)
            }
        case FETCH_HABITS:
            let habitsAsAnObject = {}
            for (let i = 0; i < action.payload.length; i++) {
                habitsAsAnObject[action.payload[i]._id] = action.payload[i]
            }
            return {
                ...state,
                habits: habitsAsAnObject,
            };
        case UPDATE_HABIT:
            state.habits[action.payload._id] = action.payload
            return {
                ...state,
                habits: Object.assign({}, state.habits)
            }
        case DELETE_HABIT:
            delete state.habits[action.payload]
            return {
                ...state,
                habits: Object.assign({}, state.habits)
            }
        default:
            return state;
    }
}
