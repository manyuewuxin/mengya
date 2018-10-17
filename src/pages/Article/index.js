import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import ArticleEvent from "@components/Events";
import ArticleHtml from "./Html";
import ArticleAction from "../Posts/Action";
import ArticleType from "./Type";
import ArticleHeader from "./Header"; //文章头
import ArticleComment from "@components/Comment";

@inject("Appstore")
@ArticleEvent
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        match: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.getoffsetTop = this.getoffsetTop.bind(this);
    }
    getoffsetTop(e) {
        if (e.target.dataset.click === "read_comment") {
            e.stopPropagation();
            window.scroll(0, e.target.offsetTop);
        }
    }
    render() {
        if (this.props.Appstore.app.article_loading) return null;
        const article = this.props.Appstore.posts[0];
        return (
            <div className="articles">
                <div className="articles_margin">
                    <ArticleHeader
                        title={article.title}
                        image={article.image}
                        count={article.like.length}
                        author={article.author[0]}
                    />
                    <ArticleHtml html={article.html} date={article.date} />
                    <ArticleType type={article.type} />
                    <div onClick={this.getoffsetTop}>
                        <ArticleAction
                            is_like={article.like.includes(this.props.Appstore.id)}
                            open_comment={false}
                            open_article={false}
                            index={0}
                            count={article.comment_count}
                            length={article.like.length}
                            is_my_people={false}
                        />
                    </div>
                    <ArticleComment
                        posts_id={article._id}
                        author_id={article.author_id}
                        p_index={0}
                    />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.Appstore.getArticle(this.props.match.params.id);
    }
    componentWillUnmount() {
        this.props.Appstore.setState("app", {
            article_loading: true,
            posts: [],
            read_article: [],
            read_comment: []
        });
    }
}
