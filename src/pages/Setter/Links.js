import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class SwitchLike extends Component {
    static propTypes = {
        location: PropTypes.object
    };
    render() {
        const link = [
            { path: "/setter/account", type: "个人资料" },
            { path: "/setter/password", type: "修改密码" }
        ];
        const list = link.map((elem) => {
            return (
                <Link
                    to={elem.path}
                    key={Math.random().toString(36).substring(2, 6)}
                    className={elem.path === this.props.location.pathname ? "select" : ""}>
                    {elem.type}
                </Link>
            );
        });
        return <div className="setter_switch">{list}</div>;
    }
}
