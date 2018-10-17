import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentAction extends Component {
    static propTypes = {
        comment: PropTypes.object,
        author: PropTypes.array,
        user_id: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        index: PropTypes.number
    };
    render() {
        const { comment, author, user_id, index } = this.props;
        const is_good = comment.good.includes(user_id);
        return (
            <div className="commect_action">
                <button
                    data-action="good"
                    data-index={index}
                    className={is_good ? "is_good" : ""}>
                    {comment.good.length}
                </button>

                <button data-action="reply" data-index={index}>
                    回复
                </button>

                {user_id === author[0]._id ? (
                    <button data-action="remove" data-index={index}>
                        删除
                    </button>
                ) : null}
            </div>
        );
    }
}
