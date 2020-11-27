import { Paper } from "@material-ui/core"
import React from 'react'
import CompleteList from "./CompleteList"

export default function CompleteContainer() {
    return (
        <Paper elevation={3} style={{textAlign: 'center',}}>
            Click to complete:
            <CompleteList />
        </Paper>
    )
}
