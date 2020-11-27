import { FETCH_SCHEDULING_INTERVAL, UPDATE_SCHEDULING_INTERVAL } from "../actions/types";

let initialState = {
    startTime: "a",
    endTime: "b"
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SCHEDULING_INTERVAL:
            return {
                ...state,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime
            };
        case UPDATE_SCHEDULING_INTERVAL:
            return {
                ...state,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime
            }
        default:
            return state;
    }
}
