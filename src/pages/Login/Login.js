import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Login extends Component {
    static propTypes = {
        state: PropTypes.object,
        keyup: PropTypes.func,
        change: PropTypes.func
    };
    render() {
        return (
            <form
                className="sign_input"
                autoComplete="off"
                onKeyUp={this.props.keyup}
                onChange={this.props.change}>
                <ul>
                    <li id="name">
                        <i className="icon_username" />
                        <input
                            type="text"
                            name="name"
                            placeholder="用户名或邮箱"
                            maxLength="20"
                            value={this.props.state.name}
                        />
                    </li>
                    <li id="password">
                        <i className="icon_password" />
                        <input
                            type="password"
                            name="password"
                            placeholder="密码"
                            maxLength="15"
                            value={this.props.state.password}
                        />
                    </li>
                </ul>
            </form>
        );
    }
}
