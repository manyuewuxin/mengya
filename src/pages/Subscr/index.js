import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { app as ajax } from "@request";

import Search from "./Search";
import List from "./List";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            label: null,
            page: 1,
            query: "type=all",
            updataPath: false
        };
        this.search = this.search.bind(this);
        this.follow_type = this.follow_type.bind(this);
        this.scroll = this.scroll.bind(this);
        this.time = null;
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({ updataPath: true });
        }
    }
    search(value) {
        if (value) {
            ajax.getLabel(`search=${value}`, 1).then(({ label }) => {
                this.setState({ label: label, query: `search=${value}` });
            });
        }
    }

    follow_type(e) {
        e.stopPropagation();
        const { index } = e.target.dataset;
        this.props.Appstore.follow_type(this.state.label[index].type);
    }
    scroll(e) {
        e.stopPropagation();
        if (this.time !== null) {
            window.clearTimeout(this.time);
            this.time = null;
        }
        this.time = window.setTimeout(() => {
            const scrollTop = Math.round(document.documentElement.scrollTop); //获取滚动高度像素
            const scrollHeight = scrollTop + window.innerHeight; //滚动高度像素+浏览器窗口屏幕可见高度
            if (scrollHeight >= document.documentElement.scrollHeight - 100) {
                const { label, page, query } = this.state;
                ajax.getLabel(query, page).then((data) => {
                    const arr = label.concat(data.label);

                    if (data.label.length > 0)
                        this.setState({ label: arr, page: page + 1 });

                    window.clearTimeout(this.time);
                    this.time = null;
                });
            }
        }, 100);
    }
    render() {
        if (this.state.label === null) return <div />;
        return (
            <div className="posts label">
                <Search search={this.search} path={this.props.match.params.path} />
                <List
                    label={this.state.label}
                    followtype={this.props.Appstore.followtype}
                    follow_type={this.follow_type}
                />
            </div>
        );
    }
    componentDidMount() {
        ajax.getLabel(`type=${this.props.match.params.path}`, 1).then(({ label }) => {
            this.setState({
                label: label,
                page: this.state.page + 1,
                query: `type=${this.props.match.params.path}`
            });
            this.props.Appstore.getUser(1);
        });
        window.addEventListener("scroll", this.scroll, false);
    }
    componentDidUpdate() {
        if (this.state.updataPath) {
            ajax.getLabel(`type=${this.props.match.params.path}`, 1).then(({ label }) => {
                this.setState({
                    label: label,
                    page: this.state.page + 1,
                    query: `type=${this.props.match.params.path}`,
                    updataPath: false
                });
            });
        }
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scroll, false);
    }
}
