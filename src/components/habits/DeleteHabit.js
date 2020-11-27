import { Button, DialogActions, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DeleteOutline } from "@material-ui/icons";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteHabit } from "../../actions";

export default function DeleteHabit({habit}) {
    const [open, setOpen] = React.useState(false);
    let dispatch = useDispatch()
    let userID = useSelector((state) => state.user.id);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteHabit(userID, habit._id))

        setOpen(false)
    }

    return (
        <>
            <IconButton onClick={handleClickOpen}edge="end">
                <DeleteOutline />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Habit?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} type="submit" color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
