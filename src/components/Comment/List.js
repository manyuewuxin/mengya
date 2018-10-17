import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentAuthor from "./Author";
import CommentText from "./Text";
import CommentAction from "./Action";

export default class CommentList extends Component {
    static propTypes = {
        user_id: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        comments: PropTypes.array,
        action: PropTypes.func
    };
    render() {
        const list = this.props.comments.map((comments, index) => {
            const { comment, author } = comments;
            const key = Math.random()
                .toString(36)
                .substring(2, 6);
            return (
                <li key={key}>
                    <CommentAuthor author={author} comment={comment} />
                    <CommentText text={comment.text} />
                    <CommentAction
                        comment={comment}
                        author={author}
                        user_id={this.props.user_id}
                        index={index}
                    />
                </li>
            );
        });
        return (
            <ul className="comment_border" onClick={this.props.action}>
                {list}
            </ul>
        );
    }
}
