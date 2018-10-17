import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("Appstore")
@observer
export default class PeopleHeader extends Component {
    static propTypes = {
        author: PropTypes.object,
        Appstore: PropTypes.object,
        history: PropTypes.object,
        match: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.follow = this.follow.bind(this);
        this.is_myhome = false;
    }
    follow(e) {
        e.stopPropagation();
        if (this.is_myhome === false) {
            this.props.Appstore.follow(e.target.dataset.author_id);
        } else {
            this.props.history.push("/setter/account");
        }
    }
    render() {
        this.is_myhome =
            this.props.Appstore.id === this.props.match.params.id ? true : false;
        const is_follow = this.props.Appstore.following.includes(
            this.props.match.params.id
        )
            ? "已关注"
            : "关注他";
        const style = is_follow === "已关注" ? "is_follow_button" : "no_follow_button";
        const author = this.props.author;
        return (
            <div className="people_header">
                <div className="user_data_d">
                    <div>
                        <img src={author.avatar} />
                    </div>
                    <div>
                        <p>{author.name}</p>
                        <p>{author.information}</p>
                    </div>
                    <div>
                        <button
                            onClick={this.follow}
                            className={this.is_myhome ? "" : style}
                            data-author_id={author._id}>
                            {this.is_myhome ? "编辑个人资料" : is_follow}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
