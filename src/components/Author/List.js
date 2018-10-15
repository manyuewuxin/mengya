import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@observer
export default class List extends Component {
    static propTypes = {
        posts: PropTypes.array
    };
    render() {
        const list = this.props.posts.map((p, index) => {
            return (
                <li key={p._id} className="author_article">
                    <Link to={`/p/${p._id}`}>{`${index + 1}、${p.title}`}</Link>
                </li>
            );
        });
        return (
            <React.Fragment>
                <h3 className="h3_title">最近发表的文章:</h3>
                <ul>{list}</ul>
            </React.Fragment>
        );
    }
}
