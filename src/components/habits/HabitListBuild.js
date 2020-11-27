import { List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../../actions";
import DeleteHabit from "./DeleteHabit";
import UpdateHabit from "./UpdateHabit";

export default function HabitList() {
    useEffect(() => {   
        dispatch(fetchHabits(userID));
    }, []);
    const dispatch = useDispatch();
    let list = Object.values(useSelector((state) => state.habits.habits));
    let userID = useSelector((state) => state.user.id);
    

    return (
        <>
            <List>
                {list.map((habit, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={habit.title} />
                        <ListItemSecondaryAction>                    
                            <DeleteHabit habit={habit} />
                            <UpdateHabit habit={habit} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

