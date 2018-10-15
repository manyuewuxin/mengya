import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Sign from "./Sign";

@inject("Appstore")
@withRouter
@observer
export default class Signin extends Component {
    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        Appstore: PropTypes.object
    };
    render() {
        const { Appstore, location, history } = this.props;

        if (Appstore.app.loginPath !== null) {

            return <Sign history={history} pathname={Appstore.app.loginPath} type="click" />;
            
        } else if (location.pathname === "/signin" || location.pathname === "/signup") {

            return <Sign history={history} pathname={location.pathname} type="path" />;

        }
        return null;
    }
}
