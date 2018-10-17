import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@observer
export default class ArticleAuthor extends Component {
    static propTypes = {
        author: PropTypes.object,
        index: PropTypes.number
    };
    render() {
        const author = this.props.author[0];
        const index = this.props.index;
        return (
            <div className="posts_author">
                <Link to={`/people/${author._id}/dynamic`}>
                    <img src={author.avatar} data-hove="author" data-index={index} />
                </Link>
                <div>
                    <Link
                        to={`/people/${author._id}/dynamic`}
                        data-hove="author"
                        data-index={index}>
                        {author.name}
                    </Link>
                    <span>{`，${author.information}`}</span>
                </div>
            </div>
        );
    }
}
