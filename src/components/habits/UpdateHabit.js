import DateFnsUtils from '@date-io/date-fns';
import { Dialog, DialogActions, DialogContent, IconButton, Slider, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Edit } from "@material-ui/icons";
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import 'date-fns';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHabit } from "../../actions";


export default function UpdateHabit({habit}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(habit.title);
    const [priority, setPriority] = useState(habit.priority);
    const [timesPerWeek, setTimesPerWeek] = useState(habit.timesPerWeek);
    let userID = useSelector((state) => state.user.id);
    const [showAdvancedSchedulingOptions, setShowAdvancedSchedulingOptions] = useState(false)
    const [startTime, setStartTime] = useState(new Date(habit.startTime))
    const [endTime, setEndTime] = useState(new Date(habit.endTime));
    const [timeEstimate, setTimeEstimate] = useState(habit.timeEstimate)
    const [open, setOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === "") {
            return
        }

        // let morphedStartTime = String(startTime)
        // morphedStartTime = morphedStartTime.substring(16, 21)
        // let morphedEndTime = String(endTime)        
        // morphedEndTime = morphedEndTime.substring(16, 21)

        let body = {
            _id: habit._id,
            title, 
            priority, 
            timesPerWeek, 
            startTime: String(startTime), 
            endTime: String(endTime), 
            timeEstimate 
        }
        dispatch(updateHabit(userID, habit._id, body));
        handleClose()
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        <>
            <IconButton onClick={handleClickOpen}edge="end">
                <Edit />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="habit-title"
                        type="text"
                        label="Add A New Habit"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <TextField
                        id="habit-times-per-week"
                        type="number"
                        label="Times Per Week"
                        value={timesPerWeek}
                        min={1}
                        onChange={(e) => setTimesPerWeek(e.target.value)}
                    />
                    {renderAdvancedSchedulingOptions()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
    )
}
