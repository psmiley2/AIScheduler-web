import { Button, List, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask } from "../../../actions";

export default function TaskList() {
    useEffect(() => {   
        dispatch(fetchTasks(userID));
    }, []);
    const dispatch = useDispatch();
    let list = Object.values(useSelector((state) => state.tasks.tasks));
    let userID = useSelector((state) => state.user.id);

    const handleDoTodayToggle = (task) => {
        let newTaskInfo = {
            ...task,
            doToday: !task.doToday
        } 
        dispatch(updateTask(userID, task._id, newTaskInfo))
    }

    const renderButton = (task) => {
        if (task.doToday === false) {
            return(
                <Button onClick={() => handleDoTodayToggle(task)}>
                    <ListItemText>{task.title}</ListItemText>
                </Button>
            )
        } else {
            return (
                <Button onClick={() => handleDoTodayToggle(task)} style={{backgroundColor: "lightBlue"}}>
                    <ListItemText>{task.title}</ListItemText>
                </Button>
            )
        }
    }


    return (
        <>
            {list.map((task, index) => (
                <List key={index}>
                    {renderButton(task)}
                </List>
            ))}
        </>
    )
}

