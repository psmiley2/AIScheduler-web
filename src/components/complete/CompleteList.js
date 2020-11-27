import { Button, List, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, fetchTasks, updateHabit, updateTask } from "../../actions";


const generateList = (habitList, taskList) => {
    let list = habitList.concat(taskList)
    let doTodays = []
    let completed = []

    if (list.length === 0) {
        return [[], null]
    }

    let mostImportantTaskPriority = 1

    for (let i = 0; i < list.length; i++) {
        if (list[i].doToday === true) {
            mostImportantTaskPriority = Math.max(mostImportantTaskPriority, list[i].priority)
            if (list[i].completed === true) {
                completed.push(list[i])
            } else{
                doTodays.push(list[i])
            }
        }
    }

    doTodays.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
    doTodays.reverse()
    doTodays = doTodays.concat(completed)
    
    return [doTodays, mostImportantTaskPriority]
}


export default function CompleteList() {
    useEffect(() => {   
        dispatch(fetchTasks(userID));
        dispatch(fetchHabits(userID));
    }, []);

    const dispatch = useDispatch();
    let userID = useSelector((state) => state.user.id);
    let habitList = Object.values(useSelector((state) => state.habits.habits));
    let taskList = Object.values(useSelector((state) => state.tasks.tasks));

    let res = generateList(habitList, taskList)
    let doTodays = res[0]
    let mostImportantTaskPriority = res[1]


    const handleCompleteToggle = (item) => {
        let newItemInfo = {
            ...item,
            completed: !item.completed
        } 
        if (item.type === "habit") {
            dispatch(updateHabit(userID, item._id, newItemInfo))
        } else if (item.type === "task") {
            dispatch(updateTask(userID, item._id, newItemInfo))
        }
    }

    const renderButton = (item) => {
        if (item.completed === false) {
            let backgroundColor = item.type === "habit" ? "lightGreen" : "lightBlue"
            if (item.priority === mostImportantTaskPriority) {
                backgroundColor = "pink"
            }
            return(
                <Button onClick={() => handleCompleteToggle(item)} style={{backgroundColor}}>
                    <ListItemText>{item.title}</ListItemText>
                </Button>
            )
        } else {
            let backgroundColor = "yellow"
            return (
                <Button onClick={() => handleCompleteToggle(item)} style={{backgroundColor}}>
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

