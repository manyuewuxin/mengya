import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import AccountView from "./AccountView";

@inject("Appstore", "Setterstore")
@observer
export default class Account extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        Setterstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.changefile = this.changefile.bind(this);
        this.openfile = this.openfile.bind(this);
        this.change = this.change.bind(this);
        this.refx = React.createRef();
    }

    change(e) {
        e.stopPropagation();
        this.props.Setterstore.change(e.target.name, e.target.value);
    }

    openfile(e) {
        e.stopPropagation();
        this.refx.current.click();
    }

    changefile(e) {
        e.stopPropagation();
        if (e.target.files.length > 0) {
            this.props.Setterstore.uploadImage(e.target.files[0]);
        }
    }
    send(e) {
        e.stopPropagation();
        this.props.Setterstore.setInform();
    }
    render() {
        return (
            <div className="setter_list">
                <AccountView
                    changefile={this.changefile}
                    change={this.change}
                    openfile={this.openfile}
                    refx={this.refx}
                    form={this.props.Setterstore.form}
                />
                <div className="setter_submit">
                    <button onClick={this.send}>保存</button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.Setterstore.init();
    }
}
