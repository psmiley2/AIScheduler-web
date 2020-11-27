import { Grid, Paper } from "@material-ui/core"
import React from 'react'
import AddHabit from '../habits/AddHabit'
import HabitListBuild from "../habits/HabitListBuild"
import AddTask from "../tasks/newTasks/AddTask"
import TaskListBuild from '../tasks/newTasks/TaskListBuild'

export default function BuildContainer() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item s={12} m={6}>
                    <Paper elevation={3}>
                        <AddHabit />
                        <HabitListBuild />
                    </Paper>
                </Grid>
                <Grid item s={12} m={6}>
                    <Paper elevation={3}>
                        <AddTask />
                        <TaskListBuild />
                    </Paper>
                </Grid>
                {/* <Grid item s={12} m={6}>
                    <Paper elevation={3}>
                        <UpdateScheduleSettings />
                    </Paper>
                </Grid> */}
            </Grid>
        </div>
    )
}
