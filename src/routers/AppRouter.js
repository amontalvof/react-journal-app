import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { firebase } from "../firebase/firebaseConfig";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import WaitScreen from "../components/auth/WaitScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLogedIn(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLogedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLogedIn]);

    if (checking) {
        return <WaitScreen />;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLogedIn}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLogedIn}
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
