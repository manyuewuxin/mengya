import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

import Links from "./Links";
import Account from "./Account";
import Password from "./Password";


@observer
export default class Setter extends Component {
    static propTypes = {
        location: PropTypes.object
    };
    render() {
        return (
            <div>
                <div className="setter">
                    <div className="setter_width">
                        <Links location={this.props.location} />
                        <Switch>
                            <Route path="/setter/account" component={Account} />
                            <Route path="/setter/password" component={Password} />
                            <Route render={()=>{
                                return <Redirect to={{pathname:'/404',state:{ error: window.location.href}}}/>;
                            }} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
