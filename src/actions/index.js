import axios from "axios";
import history from "../history";
import {
    CREATE_HABIT,
    CREATE_TASK,
    DELETE_HABIT, DELETE_TASK,
    FETCH_DO_TODAYS,
    FETCH_HABITS,
    FETCH_SCHEDULING_INTERVAL, FETCH_TASKS,
    LOGIN,
    LOGOUT,
    REGISTER,
    SET_SESSION,
    UPDATE_HABIT,
    UPDATE_SCHEDULING_INTERVAL, UPDATE_TASK
} from "./types";

// SECTION - Users
export const login = (email, password) => async (dispatch) => {
    let body = {
        email: email,
        password: password,
    };
    let response;
    await axios
        .post("http://localhost:8080/users/login", body, {
            withCredentials: true,
        })
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: LOGIN, payload: response.data });
};

export const logout = () => async (dispatch) => {
    await axios
        .post("http://localhost:8080/users/logout", {
            withCredentials: true,
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: LOGOUT });
};

export const register = (email, password) => async (dispatch) => {
    let body = {
        email: email,
        password: password,
    };
    let response;
    await axios
        .post("http://localhost:8080/users/register", body)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: REGISTER, payload: response.data });
};

export const setSession = () => async (dispatch) => {
    let response = {};
    await axios
        .get("http://localhost:8080/users/session", { withCredentials: true })
        .then((res) => {
            if (res.status == 400) {
                response = "";
            } else {
                response = res;
            }
        })
        .catch((err) => {
            if (err == "Request failed with status code 400") {
                response.data = null;
            } else {
                console.error(err);
            }
        });
    
    history.push("/")
    dispatch({ type: SET_SESSION, payload: response.data });
};

// SECTION - NEW
export const createHabit = (userid, habitInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(`http://localhost:8080/habits/${userid}`, habitInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_HABIT, payload: response.data });
};

export const fetchHabits = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/habits/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_HABITS, payload: response.data });
};


export const fetchTasks = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/tasks/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_TASKS, payload: response.data });
};

export const createTask = (userid, taskInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(`http://localhost:8080/tasks/${userid}`, taskInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_TASK, payload: response.data });
};

export const updateHabit = (userid, habitid, updateInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(`http://localhost:8080/habits/${userid}/${habitid}`, {updateInfo})
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: UPDATE_HABIT, payload: response.data });
};

export const fetchDoTodays = (userid, listid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/doTodays/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });
    dispatch({ type: FETCH_DO_TODAYS, payload: response.data });
};

export const deleteHabit = (userid, habitid) => async(dispatch) => {
    let response;
    await axios.delete(`http://localhost:8080/habits/${userid}/${habitid}`).then((res) => {
        response = res
    }).catch((err) => {
        console.error(err)
    })

    dispatch({type: DELETE_HABIT, payload: response.data})
}

export const deleteTask = (userid, taskid) => async(dispatch) => {
    let response;
    await axios.delete(`http://localhost:8080/tasks/${userid}/${taskid}`).then((res) => {
        response = res
    }).catch((err) => {
        console.error(err)
    })

    dispatch({type: DELETE_TASK, payload: response.data})
}

export const updateSchedulingInterval = (userid, updateInfo) => async(dispatch) => {
    let response;
    await axios.post(`http://localhost:8080/scheduling/${userid}`, {updateInfo}).then((res) => {
        response = res
    }).catch((err) => {
        console.error(err)
    })

    dispatch({type: UPDATE_SCHEDULING_INTERVAL, payload: response.data})
}

export const fetchSchedulingInterval = (userid) => async(dispatch) => {
    let response;
    await axios.get(`http://localhost:8080/scheduling/${userid}`).then((res) => {
        response = res
    }).catch((err) => {
        console.error(err)
    })

    dispatch({type: FETCH_SCHEDULING_INTERVAL, payload: response.data})
}

export const updateTask = (userID, taskID, taskInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(
            `http://localhost:8080/tasks/${userID}/${taskID}`,
            {taskInfo}
        )
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: UPDATE_TASK, payload: response.data });
};
