import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Search extends Component {
    static propTypes = {
        search: PropTypes.func,
        path: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.change = this.change.bind(this);
        this.keyup = this.keyup.bind(this);
    }
    change(e) {
        e.stopPropagation();
        this.setState({ value: e.target.value });
    }
    keyup(e) {
        e.stopPropagation();
        if (e.key === "Enter" && this.state.value !== "")
            this.props.search(this.state.value);
    }
    render() {
        const { path } = this.props;
        return (
            <div className="labelsswitch">
                <Link to="/subscr/all" className={path === "all" ? "selects" : ""}>
                    全部标签
                </Link>
                <Link
                    to="/subscr/subscribed"
                    className={path === "subscribed" ? "selects" : ""}>
                    已关注
                </Link>
                <input
                    type="text"
                    name="label"
                    placeholder="搜索标签"
                    value={this.state.value}
                    onChange={this.change}
                    onKeyUp={this.keyup}
                />
            </div>
        );
    }
}
