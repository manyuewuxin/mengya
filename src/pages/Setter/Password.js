import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import PasswordView from "./PasswordView";

@inject("Appstore", "Setterstore")
@observer
export default class Password extends Component {
    static propTypes = {
        Setterstore: PropTypes.object,
        Appstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.change = this.change.bind(this);
    }
    send(e) {
        e.stopPropagation();
        this.props.Setterstore.setPassword();
    }

    change(e) {
        e.stopPropagation();
        const name = e.target.name;
        this.props.Setterstore.change(name, e.target.value);
    }

    render() {
        return (
            <div className="setter_list">
                <PasswordView change={this.change} form={this.props.Setterstore.form}/>
                <div className="setter_submit">
                    <button onClick={this.send}>保存</button>
                </div>
            </div>
        );
    }
}
