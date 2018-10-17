import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

@withRouter
export default class Search extends Component {
    static propTypes = {
        history: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.submit = this.submit.bind(this);
        this.keyup = this.keyup.bind(this);
        this.change = this.change.bind(this);
    }
    send(value) {
        if (/^.{1,30}$/.test(value)) {
            this.props.history.push(`/search?query=${value}`);
        }
    }
    change(e) {
        e.stopPropagation();
        this.setState({ value: e.target.value });
    }
    keyup(e) {
        e.stopPropagation();
        if (e.key === "Enter" && this.state.value !== "")
            this.send(this.state.value.replace(/\s+/g, ""));
    }
    submit(e) {
        e.stopPropagation();
        this.send(this.state.value.replace(/\s+/g, ""));
    }
    render() {
        return (
            <div className="sidebar">
                <h3 className="h3_title">文章搜索</h3>
                <form className="search_forms">
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.change}
                        onKeyUp={this.keyup}
                        maxLength="50"
                        autoComplete="off"
                    />
                    <button onClick={this.submit} type="button">
                        <i className="icon_search" />
                    </button>
                </form>
            </div>
        );
    }
}
