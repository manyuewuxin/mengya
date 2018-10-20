import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class ArticleAction extends Component {
    static propTypes = {
        is_like: PropTypes.bool,
        is_my_people: PropTypes.bool,
        open_comment: PropTypes.bool,
        open_article: PropTypes.bool,
        index: PropTypes.number,
        count: PropTypes.number,
        length: PropTypes.number
    };
    render() {
        const {
            is_like,
            is_my_people,
            open_comment,
            open_article,
            index,
            count,
            length
        } = this.props;
        return (
            <div className="posts_action">
                <div
                    className={is_like ? "is_like" : ""}
                    data-click="like"
                    data-index={index}>
                    {length}
                </div>
                <div data-click="read_comment" data-index={index}>
                    {open_comment ? "收起评论" : `${count} 评论`}
                </div>
                <div data-click="collect" data-index={index}>
                    收藏
                </div>
                <div data-click="forward" data-index={index}>
                    转发
                </div>
                {is_my_people ? (
                    <React.Fragment>
                        <div data-remove="remove" data-index={index}>删除</div>
                        <div data-editor="editor" data-index={index}>编辑</div>
                    </React.Fragment>
                ) : null}
                {open_article ? (
                    <p data-click="read_article" data-index={index}>
                        收起∧
                    </p>
                ) : null}
            </div>
        );
    }
}
