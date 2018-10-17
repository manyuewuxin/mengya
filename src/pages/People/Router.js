import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dynamic from "./Content/Dynamic";
import Article from "./Content/Article";
import Collect from "./Content/Collect";
import Follow from "./Content/Follow";

export default class PeopleRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path="/people/:id/dynamic" component={Dynamic} />
                <Route path="/people/:id/article" component={Article} />
                <Route path="/people/:id/collect" component={Collect} />
                <Route path="/people/:id/following" component={Follow} />
                <Route path="/people/:id/followers" component={Follow} />
                <Route
                    render={() => {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/404",
                                    state: { error: window.location.href }
                                }}
                            />
                        );
                    }}
                />
            </Switch>
        );
    }
}
