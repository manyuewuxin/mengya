import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

import Avatar from "./Avatar";
import Message from "./Message";
import LoginRegistered from "./LoginRegistered";

@inject("Appstore")
@observer
export default class User extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    render() {
        if (this.props.Appstore.id !== null) {
            return (
                <React.Fragment>
                    <Message />
                    <Avatar />
                </React.Fragment>
            );
        } else {
            return <LoginRegistered />;
        }
    }
}
