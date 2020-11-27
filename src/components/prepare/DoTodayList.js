import { Button, List, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, fetchTasks, updateHabit, updateTask } from "../../actions";

export default function DoTodayList() {
    useEffect(() => {   
        dispatch(fetchTasks(userID));
        dispatch(fetchHabits(userID));
    }, []);

    const dispatch = useDispatch();
    let userID = useSelector((state) => state.user.id);
    let habitList = Object.values(useSelector((state) => state.habits.habits));
    let taskList = Object.values(useSelector((state) => state.tasks.tasks));

    let list = habitList.concat(taskList)
    let doTodays = []

    for (let i = 0; i < list.length; i++) {
        if (list[i].doToday == true) {
            doTodays.push(list[i])
        }
    }

    const handleDoTodayToggle = (item) => {
        let newItemInfo = {
            ...item,
            doToday: !item.doToday
        } 
        if (item.type === "habit") {
            dispatch(updateHabit(userID, item._id, newItemInfo))
        } else if (item.type === "task") {
            dispatch(updateTask(userID, item._id, newItemInfo))
        }
    }

    const renderButton = (item) => {
        if (item.doToday === false) {
            return(
                <Button onClick={() => handleDoTodayToggle(item)}>
                    <ListItemText>{item.title}</ListItemText>
                </Button>
            )
        } else {
            let backgroundColor = item.type === "habit" ? "lightGreen" : "lightBlue"
            return (
                <Button onClick={() => handleDoTodayToggle(item)} style={{backgroundColor}}>
                    <ListItemText>{item.title}</ListItemText>
                </Button>
            )
        }
    }

    return (
        <>
            {doTodays.map((item, index) => (
                <List key={index}>
                    {renderButton(item)}
                </List>
            ))}
        </>
    )
}

