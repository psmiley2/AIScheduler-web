import DateFnsUtils from '@date-io/date-fns';
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import 'date-fns';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedulingInterval, updateSchedulingInterval } from "../../actions";

export default function UpdateScheduleSettings() {
    const [open, setOpen] = useState(false)
    let userID = useSelector((state) => state.user.id);
    const dispatch = useDispatch();
    useEffect(() => {   
        dispatch(fetchSchedulingInterval(userID));
    }, []);
    let start = useSelector((state) => state.schedulings.startTime)
    let end = useSelector((state) => state.schedulings.endTime)
    const [startTime, setStartTime] = useState(start);
    const [endTime, setEndTime] = useState(end);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let body = {
            startTime,
            endTime
        }
        dispatch(updateSchedulingInterval(userID, body));
        handleClose()
    };


    const logAndChange = (date) => {
        setStartTime(date)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Scheduling Settings    
            </Button>           
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <DialogContent>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker label="Start After" value={startTime} onChange={(date) => logAndChange(date)} />
                            <TimePicker label="End Before" value={endTime} onChange={(date) => setEndTime(date)} />
                        </MuiPickersUtilsProvider>
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
        </div>
    )
}
