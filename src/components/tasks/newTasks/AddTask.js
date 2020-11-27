import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import AddTaskForm from "./AddTaskForm";

const AddTask = () => {
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
                Create Task
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Task</DialogTitle>
                <AddTaskForm handleClose={handleClose}/>
            </Dialog>
        </div>
    );
};

export default AddTask;
