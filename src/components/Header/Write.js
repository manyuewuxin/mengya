import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@inject("Appstore")
@observer
export default class Write extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.switch = this.switch.bind(this);
    }
    switch(e) {
        e.stopPropagation();
        this.props.Appstore.login("/signin", { text: "请登录后再发表文章", is: false });
    }
    render() {
        return (
            <div className="write">
                {this.props.Appstore.id == null ? (
                    <a onClick={this.switch}>
                        <i className="icon_write" />
                        写文章
                    </a>
                ) : (
                    <Link to="/write">
                        <i className="icon_write" />
                        写文章
                    </Link>
                )}
            </div>
        );
    }
}
