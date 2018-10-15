import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

@observer
export default class PasswordView extends Component {
    static propTypes = {
        change: PropTypes.func,
        form: PropTypes.object
    };
    render() {
        const { password, newpassword, newpasswords } = this.props.form;
        return (
            <form autoComplete="off">
                <ul>
                    <li>
                        <div>原密码</div>
                        <div>
                            <input
                                type="password"
                                placeholder="输入原密码"
                                onChange={this.props.change}
                                value={password}
                                name="password"
                                maxLength="15"
                            />
                        </div>
                    </li>

                    <li>
                        <div>新密码</div>
                        <div>
                            <input
                                type="password"
                                placeholder="输入新密码"
                                onChange={this.props.change}
                                value={newpassword}
                                name="newpassword"
                                maxLength="15"
                            />
                        </div>
                    </li>

                    <li>
                        <div>重复新密码</div>
                        <div>
                            <input
                                type="password"
                                placeholder="重复新密码"
                                onChange={this.props.change}
                                value={newpasswords}
                                name="newpasswords"
                                maxLength="15"
                            />
                        </div>
                    </li>
                </ul>
            </form>
        );
    }
}
