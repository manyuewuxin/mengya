import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@observer
export default class Follow extends Component {
    static propTypes = {
        author: PropTypes.object,
        is_follow: PropTypes.bool,
        follow: PropTypes.func
    };
    render() {
        const { author, is_follow } = this.props;
        return (
            <div className="author_follow">
                <p>
                    关注者：
                    <Link to={`/people/${author._id}/followers`}>
                        {author.followers_count}
                    </Link>
                </p>
                <button
                    className={is_follow ? "is_follow_button" : "no_follow_button"}
                    onClick={this.props.follow}>
                    {is_follow ? "已关注" : "关注他"}
                </button>
            </div>
        );
    }
}
