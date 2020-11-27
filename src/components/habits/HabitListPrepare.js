import { Button, List, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, updateHabit } from "../../actions";

export default function HabitList() {
    useEffect(() => {   
        dispatch(fetchHabits(userID));
    }, []);
    const dispatch = useDispatch();
    let list = Object.values(useSelector((state) => state.habits.habits));
    let userID = useSelector((state) => state.user.id);
    
    const handleDoTodayToggle = (habit) => {
        let newHabitInfo = {
            ...habit,
            doToday: !habit.doToday
        } 
        dispatch(updateHabit(userID, habit._id, newHabitInfo))
    }

    const renderButton = (habit) => {
        if (habit.doToday === false) {
            return(
                <Button onClick={() => handleDoTodayToggle(habit)}>
                    <ListItemText>{habit.title}</ListItemText>
                </Button>
            )
        } else {
            return (
                <Button onClick={() => handleDoTodayToggle(habit)} style={{backgroundColor: "lightGreen"}}>
                    <ListItemText>{habit.title}</ListItemText>
                </Button>
            )
        }
    }

    return (
        <>
            {list.map((habit, index) => (
                <List key={index}>
                    {renderButton(habit)}
                </List>
            ))}
        </>
    )
}

