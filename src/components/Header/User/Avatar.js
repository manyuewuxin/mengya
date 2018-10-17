import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

import Menu from "./Menu";

@inject("Appstore")
@observer
export default class User extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.action = this.action.bind(this);
    }
    action(e) {
        e.stopPropagation();
        this.props.Appstore.setter_message("setter", e.target.offsetLeft - 60 + 15); //模型一半宽+被点击元素一半宽
    }
    close(e) {
        e.stopPropagation();
        this.props.Appstore.setter_message("close");
    }
    render() {
        const { open, left } = this.props.Appstore.header;
        return (
            <div className="user_avatar" onMouseLeave={this.close}>
                <img src={this.props.Appstore.user.avatar} onClick={this.action} />
                {open === "setter" ? (
                    <Menu left={left} Appstore={this.props.Appstore} />
                ) : null}
            </div>
        );
    }
}
