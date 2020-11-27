import DateFnsUtils from '@date-io/date-fns';
import { Button, DialogActions, DialogContent, Slider, TextField, Typography } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import 'date-fns';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../actions";

export default function AddTaskForm({handleClose}) {
    const dispatch = useDispatch();
    const [priority, setPriority] = useState(1);
    const [task, setTask] = useState("");
    let userID = useSelector((state) => state.user.id);
    const [showAdvancedSchedulingOptions, setShowAdvancedSchedulingOptions] = useState(false)
    const [startTime, setStartTime] = useState(new Date('2020-08-18T08:00:00'));
    const [endTime, setEndTime] = useState(new Date('2020-08-18T20:00:00'));
    const [timeEstimate, setTimeEstimate] = useState(30)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task === "") {
            return
        }

        // let morphedStartTime = String(startTime)
        // morphedStartTime = morphedStartTime.substring(16, 21)
        // let morphedEndTime = String(endTime)        
        // morphedEndTime = morphedEndTime.substring(16, 21)

        dispatch(createTask(userID, { 
            title: task, 
            priority, 
            startTime: String(startTime), 
            endTime: String(endTime), 
            timeEstimate 
        }));
        setTask("");
        setStartTime(new Date('2020-08-18T08:00:00'))
        setEndTime(new Date('2020-08-18T20:00:00'))
        setTimeEstimate(30)
        setPriority(1)
    };
    
    const renderAdvancedSchedulingOptions = () => {
        const timeEstimateMarks = [
            {
              value: 60,
              label: '1 hr',
            },
            {
                value: 120,
                label: '2 hrs',
              },
              {
                value: 180,
                label: '3 hrs',
              },
              {
                value: 240,
                label: '4 hrs',
              },
          ];
        if (showAdvancedSchedulingOptions === true) {
            return (
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker label="Start After" value={startTime} onChange={(date) => setStartTime(date)} />
                        <TimePicker label="End Before" value={endTime} onChange={(date) => setEndTime(date)} />
                    </MuiPickersUtilsProvider>
                    <Typography id="Time-Estimate-Slider" gutterBottom>
                        Time Estimate
                    </Typography>
                    <Slider 
                        value={timeEstimate}
                        onChange={(e, val) => setTimeEstimate(val)}
                        step={5}
                        min={5}
                        max={240}
                        valueLabelDisplay="auto"
                        marks={timeEstimateMarks}
                    />
                </div>
            )
        } else {
            return (
                <Button onClick={() => setShowAdvancedSchedulingOptions(true)}>
                    Show Advanced Scheduling Options
                </Button>
            )
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
        <TextField
                autoFocus
                id="task-add"
                type="text"
                label="Add A New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Typography id="priority-slider" gutterBottom>
                Priority
            </Typography>
            <Slider
                value={priority}
                aria-labelledby="priority-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={(e, val) => setPriority(val)}
            />
            {renderAdvancedSchedulingOptions()}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button type="submit" color="primary">
                Create Task
            </Button>
        </DialogActions>
    </form>
    )
}
