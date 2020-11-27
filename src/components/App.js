import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { setSession } from "../actions";
import BuildContainer from "../components/build/BuildContainer";
import history from "../history";
import CompleteContainer from "./complete/CompleteContainer";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import PrepareContainer from "./prepare/PrepareContainer";
import TestAuth from "./TestAuth";

export default function App() {
    const dispatch = useDispatch();
    let userID = useSelector((state) => state.user.id);
    useEffect(() => {
        dispatch(setSession());
    }, []);

    if (userID) {
        return (
            <Box>
                <Router history={history}>
                    <NavBar />
                    <Box display="flex" flexDirection="row" textAlign="center" justifyContent='center' alignItems='center' style={{paddingTop: 20}}>
                        <Switch>
                            <Route path="/" exact component={Dashboard} />
                            <Route path="/auth" exact component={TestAuth} />
                            <Route path="/build" exact component={BuildContainer} />
                            <Route path="/prepare" exact component={PrepareContainer} />
                            <Route path="/complete" exact component={CompleteContainer} />
                        </Switch>
                    </Box>
                </Router>
            </Box>
        );
    } else {
        return (
            <Router history={history}>
                <NavBar />
                <Box textAlign="center" justifyContent='center' alignItems='center' style={{paddingTop: 20}}>
                    <Dashboard />
                </Box>
            </Router>
        )
    }
}
