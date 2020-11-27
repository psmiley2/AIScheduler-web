import { Grid, Paper } from "@material-ui/core"
import axios from 'axios'
import React from 'react'
import { useSelector } from "react-redux"
import HabitListPrepare from "../habits/HabitListPrepare"
import TaskListPrepare from "../tasks/newTasks/TaskListPrepare"
import DoTodayList from "./DoTodayList"

export default function PrepareContainer() {
    let userid = useSelector((state) => state.user.id);

    const generateSchedule = async () => {
        let response;
        await axios.get(`http://localhost:8080/scheduling/generateSchedule/${userid}`).then((res) => {
            response = res
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item s={12} m={6}>
                    <Paper elevation={3}>
                        Habits:
                        <HabitListPrepare />
                    </Paper>
                </Grid>
                <Grid item s={12} m={6}>
                    <Paper elevation={3}>
                        Tasks:
                        <TaskListPrepare />
                    </Paper>
                </Grid>
                <Grid item s={12} m={6}>
                    <Paper elevation={3}>
                        Do Today:
                        <DoTodayList />
                    </Paper>
                </Grid>
                {/* <Grid item s={12} m={6}>
                    <Button onClick={() => generateSchedule()}>
                        Generate Schedule
                    </Button>
                </Grid> */}
            </Grid>

        </div>
    )
}
