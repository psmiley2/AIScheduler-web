import DateFnsUtils from '@date-io/date-fns';
import { DialogActions, DialogContent, Slider, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import 'date-fns';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHabit } from "../../actions/index";

export default function AddHabitForm({handleClose}) {
    const dispatch = useDispatch();
    const [habit, setHabit] = useState("");
    const [priority, setPriority] = useState(1);
    const [timesPerWeek, setTimesPerWeek] = useState(1);
    let userID = useSelector((state) => state.user.id);
    const [showAdvancedSchedulingOptions, setShowAdvancedSchedulingOptions] = useState(false)
    const [startTime, setStartTime] = useState(new Date('2020-08-18T08:00:00'));
    const [endTime, setEndTime] = useState(new Date('2020-08-18T20:00:00'));
    const [timeEstimate, setTimeEstimate] = useState(30)
      
    const handleSubmit = (e) => {
        e.preventDefault();

        if (habit === "") {
            return
        }

        // let morphedStartTime = String(startTime)
        // morphedStartTime = morphedStartTime.substring(16, 21)
        // let morphedEndTime = String(endTime)        
        // morphedEndTime = morphedEndTime.substring(16, 21)

        dispatch(createHabit(userID, { 
            title: habit, 
            priority, 
            timesPerWeek, 
            startTime: String(startTime), 
            endTime: String(endTime), 
            timeEstimate 
        }));
        setHabit("");
        setPriority(1)
        setStartTime(new Date('2020-08-18T08:00:00'))
        setEndTime(new Date('2020-08-18T20:00:00'))
        setTimeEstimate(30)
        setTimesPerWeek(1)
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
                id="habit-title"
                type="text"
                label="Add A New Habit"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
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
                Create Habit
            </Button>
        </DialogActions>
    </form>
    )
}
