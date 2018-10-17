import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import utils from "@utils";

export default class CommentAuthor extends Component {
    static propTypes = {
        author: PropTypes.array,
        comment: PropTypes.object
    };
    render() {
        const { author, comment } = this.props;
        const { user, date } = comment;
        const authors = user.length > 1 && user[0] === user[1] ? author[0] : author[1];
        const dt = utils.format(date);
        return (
            <div className="comment_author">
                <div>
                    <Link to={`/people/${author[0]._id}/dynamic`}>
                        <img src={author[0].avatar} />
                    </Link>
                    <Link to={`/people/${author[0]._id}/dynamic`}>{author[0].name}</Link>
                    {user.length > 1 ? (
                        <React.Fragment>
                            <span>回复</span>
                            <Link
                                to={`/people/${authors._id}/dynamic`}
                                data-accept_user_id={authors._id}>
                                {authors.name}
                            </Link>
                        </React.Fragment>
                    ) : null}
                </div>
                <div className="comment_date">{`${dt.date} ${dt.time}`}</div>
            </div>
        );
    }
}
