import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CollectList extends Component {
    static propTypes = {
        posts_id: PropTypes.string,
        collect: PropTypes.array,
        collectArticle: PropTypes.func,
        scroll: PropTypes.func
    };
    render() {
 
        const { collect, posts_id } = this.props;
        const list = collect.map((collects, index) => {
            const iscollect = collects.collect_article.includes(posts_id);
            return (
                <li
                    className="people_collect_list"
                    key={Math.random().toString(36).substring(2, 6)}>
                    <div>
                        <img src={collects.image} />
                    </div>
                    <div>
                        <p>{collects.name}</p>
                        <p className="information_text">{`收藏 ${collects.collect_count} 篇文章`}</p>
                    </div>
                    <div>
                        <a className={iscollect ? "is_follow_button" : ""} data-index={index}>
                            {iscollect ? "已收藏" : "收藏"}
                        </a>
                    </div>
                </li>
            );
        });
        return <ul className="collect_ul" onClick={this.props.collectArticle} onScroll={this.props.scroll}>{list}</ul>;
    }
}
