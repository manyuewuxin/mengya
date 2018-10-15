import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@observer
export default class Actionview extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        left: PropTypes.number
    };
    constructor(props) {
        super(props);
        this.quit = this.quit.bind(this);
    }
    quit(e) {
        e.stopPropagation(); //禁止冒泡，防止父捕捉
        this.props.Appstore.quit();
    }

    render() {
        return (
            <div ref={this.refx} style={{ position: "fixed", left: `${this.props.left}px`, zIndex: "4" }}>
                <div className="user_menu">
                    <ul>
                        <li>
                            <Link to={`/people/${this.props.Appstore.id}/dynamic`}>
                                <i className="icon_user" />
                                个人主页
                            </Link>
                        </li>
                        <li>
                            <Link to="/subscr/all">
                                <i className="icon_label"/>
                                标签管理
                            </Link>
                        </li>
                        <li>
                            <Link to="/setter/account">
                                <i className="icon_set" />
                                设置
                            </Link>
                        </li>
                        <li>
                            <a onClick={this.quit}>
                                <i className="icon_sginout" />
                                退出
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
