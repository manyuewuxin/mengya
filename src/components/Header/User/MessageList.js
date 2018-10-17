import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@observer
export default class MessageList extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        left: PropTypes.number,
        message: PropTypes.object,
        scroll: PropTypes.func
    };
    render() {
        const list = this.props.message.map((m) => {
            const key = Math.random()
                .toString(36)
                .substring(2, 6);

            if (m.message.message_type === "reply_posts") {
                //优化合并，验证第三个参数arr本身
                return (
                    <li key={key}>
                        <Link to={`people/${m.author[0]._id}/dynamic`}>
                            {m.author[0].name}
                        </Link>
                        <span>评论了你的文章</span>
                        <Link to={`/p/${m.posts[0]._id}`}>{m.posts[0].title}</Link>
                    </li>
                );
            } else if (m.message.message_type === "reply_comment") {
                return (
                    <li key={key}>
                        <Link to={`people/${m.author[0]._id}/dynamic`}>
                            {m.author[0].name}
                        </Link>
                        <span>在文章</span>
                        <Link to={`/p/${m.posts[0]._id}`}>{m.posts[0].title}</Link>
                        <span>回复了你的评论</span>
                    </li>
                );
            } else if (m.message.message_type === "follow") {
                return (
                    <li key={key}>
                        <Link to={`people/${m.author[0]._id}/dynamic`}>
                            {m.author[0].name}
                        </Link>
                        <span>关注了你</span>
                    </li>
                );
            }
        });
        return (
            <div style={{ position: "fixed", left: `${this.props.left}px`, zIndex: "4" }}>
                <div className="show_message">
                    {list.length === 0 ? (
                        <div>还没有任何消息推送</div>
                    ) : (
                        <ul onScroll={this.props.scroll}>{list}</ul>
                    )}
                </div>
            </div>
        );
    }
}
