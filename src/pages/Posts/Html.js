import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import utils from "@utils";

@observer
export default class ArticleHtml extends Component {
    static propTypes = {
        article: PropTypes.object,
        open_article: PropTypes.bool,
        index: PropTypes.number
    };
    render() {
        const { article, open_article, index } = this.props;
        const text =
            article.image === null
                ? `<div class=posts_connent>
                        <div class=posts_text>
                            <span>${article.text}...</span>
                            <span class="readset" data-click=read_article data-index=${index}>阅读全文</span></div>
                        </div>
                    </div>`
                : `<div class=posts_connent>
                        <div class=posts_image><img src=${article.image}></div>
                        <div class=posts_text>
                            <span>${article.text}...</span>
                            <span class="readset" data-click=read_article data-index=${index}>阅读全文</span></div>
                        </div>
                    </div>`;
        const html =
            article.image === null
                ? article.html
                : `<div><img src=${article.image}></div>${article.html}`;
        const innerHTML = open_article ? html : text;
        const dt = utils.format(article.date);

        return (
            <div>
                <h2 className="posts_title">
                    <Link to={`/p/${article._id}`}>{article.title}</Link>
                </h2>
                <div
                    className="posts_html"
                    dangerouslySetInnerHTML={{ __html: innerHTML }}
                />
                {open_article ? (
                    <div className="posts_date">{`发布于 ${dt.date} ${dt.time}`}</div>
                ) : null}
            </div>
        );
    }
}
