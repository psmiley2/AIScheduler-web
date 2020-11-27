import { List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../actions";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";

export default function TaskListBuild() {
    useEffect(() => {   
        dispatch(fetchTasks(userID));
    }, []);
    const dispatch = useDispatch();
    let list = Object.values(useSelector((state) => state.tasks.tasks));
    let userID = useSelector((state) => state.user.id);
    

    return (
        <>
        <List>
            {list.map((task, index) => (
                <ListItem button key={index}>
                    <ListItemText primary={task.title} />
                    <ListItemSecondaryAction>                    
                        <DeleteTask task={task} />
                        <UpdateTask task={task} />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </>
    )
}

