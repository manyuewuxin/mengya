import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Avatar from "./Avatar";
import List from "./List";
import Follow from "./Follow";
import { app as ajax } from "@request";

@inject("Appstore")
@observer
export default class Author extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        user_id: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            author: null
        };
        this.follow = this.follow.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseover = this.mouseover.bind(this);
    }

    follow(e) {
        e.stopPropagation();
        this.props.Appstore.follow(this.state.author._id);
    }

    mouseover(e) {
        e.stopPropagation();
        this.props.Appstore.setState("hove", { opacity: 1 });
    }
    mouseLeave(e) {
        e.stopPropagation();
        this.props.Appstore.setState("hove", { opacity: 0 });
    }
    render() {
        if (this.state.author === null) {
            return <div />;
        }
        const { author } = this.state;
        const is_follow = this.props.Appstore.following.includes(this.state.author._id);
        return (
            <div
                className="author"
                onMouseLeave={this.mouseLeave}
                onMouseOver={this.mouseover}>
                <Avatar author={author} />
                <List posts={author.posts} />
                <Follow author={author} follow={this.follow} is_follow={is_follow} />
            </div>
        );
    }

    componentDidMount() {
        ajax.getAuthor(this.props.user_id, false).then(({ author }) =>
            this.setState({ author })
        );
    }
    //componentWillUnmount(){}
}
