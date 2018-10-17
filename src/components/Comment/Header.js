import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentCount extends Component {
    static propTypes = {
        count: PropTypes.number,
        setReversed: PropTypes.func,
        sort: PropTypes.number
    };
    render() {
        const { count, sort } = this.props;
        return (
            <div className="comment_border">
                <div className="comment_count">
                    <p>{count > 0 ? `${count} 条评论` : "还没有评论"}</p>
                    {count > 0 ? (
                        <p onClick={this.props.setReversed}>
                            {sort === -1 ? "正序显示" : "倒序显示"}
                        </p>
                    ) : null}
                </div>
            </div>
        );
    }
}
