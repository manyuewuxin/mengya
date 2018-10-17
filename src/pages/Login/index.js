import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Controller from "./Controller";

@inject("Appstore")
@withRouter
@observer
export default class Index extends Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        Appstore: PropTypes.object
    };
    render() {
        const { Appstore, location, history } = this.props;

        if (Appstore.app.loginPath !== null) {
            return (
                <Controller
                    history={history}
                    pathname={Appstore.app.loginPath}
                    type="click"
                />
            );
        } else if (location.pathname === "/signin" || location.pathname === "/signup") {
            return (
                <Controller history={history} pathname={location.pathname} type="path" />
            );
        }
        return null;
    }
}
