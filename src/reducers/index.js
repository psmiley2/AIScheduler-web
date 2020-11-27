import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import habitReducer from "./habitReducer";
import schedulingReducer from "./schedulingReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

export default combineReducers({
    form: formReducer,
    user: userReducer,
    tasks: taskReducer,
    habits: habitReducer,
    schedulings: schedulingReducer,
});
