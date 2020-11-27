import {
    CREATE_TASK, DELETE_TASK, FETCH_TASKS, UPDATE_TASK
} from "../actions/types";

let initialState = {
    tasks: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            state.tasks[action.payload._id] = action.payload
            return {
                ...state,
                tasks: Object.assign({}, state.tasks)
            };
        case FETCH_TASKS:
            let tasksAsAnObject = {}
            for (let i = 0; i < action.payload.length; i++) {
                tasksAsAnObject[action.payload[i]._id] = action.payload[i]
            }
            return {
                ...state,
                tasks: tasksAsAnObject 
            };
        case UPDATE_TASK:
            state.tasks[action.payload._id] = action.payload
            return {
                ...state,
                tasks: Object.assign({}, state.tasks)
            }
        case DELETE_TASK:
            delete state.tasks[action.payload]
            return {
                ...state,
                tasks: Object.assign({}, state.tasks)
            }
        default:
            return state;
    }
};
