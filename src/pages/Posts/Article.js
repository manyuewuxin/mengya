import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import PropTypes from "prop-types";

import ArticleType from "./Type";
import ArticleAuthor from "./Author";
import ArticleHtml from "./Html";
import ArticleAction from "./Action";
import Comment from "@components/Comment";

@inject("Appstore")
@observer
export default class ArticleContainer extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        article: PropTypes.object.isRequired,
        is_my_people: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired
    };
    render() {
        const { article, is_my_people, index } = this.props;
        const { read_article, read_comment } = this.props.Appstore.app;
        const user_id = this.props.Appstore.id;
        return (
            <article>
                <ArticleType type={article.type} index={index} />
                <ArticleAuthor author={article.author} index={index} />
                <ArticleHtml
                    article={article}
                    open_article={read_article.includes(index)}
                    index={index}
                />
                <ArticleAction
                    is_like={article.like.includes(user_id)}
                    is_my_people={is_my_people}
                    open_comment={read_comment.includes(index)}
                    open_article={read_article.includes(index)}
                    index={index}
                    count={article.comment_count}
                    length={article.like.length}
                />
                {read_comment.includes(index) ? (
                    <Comment
                        posts_id={article._id}
                        author_id={article.author_id}
                        p_index={index}
                    />
                ) : null}
            </article>
        );
    }
    //componentDidMount(){console.log("componentDidMount");}
}
