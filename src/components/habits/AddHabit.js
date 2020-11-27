import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import AddHabitForm from "./AddHabitForm";

const AddHabit = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen} color="inherit">
                Create Habit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Habit</DialogTitle>
                <AddHabitForm handleClose={handleClose}/>
            </Dialog>
        </div>
    );
};

export default AddHabit;
