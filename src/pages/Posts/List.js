import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import Article from "./Article";

@observer
export default class List extends Component {
    //防更新抖动，利用mobx监听render引用精确更新
    static propTypes = {
        posts: PropTypes.object.isRequired,
        is_my_people: PropTypes.bool.isRequired
    };
    render() {
        const { posts, is_my_people } = this.props;
        const list = posts.map((article, index) => {
            return (
                <Article
                    article={article}
                    is_my_people={is_my_people}
                    index={index}
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}
                />
            );
        });
        return list.length === 0 ? (
            <div className="text-center">列表为空</div>
        ) : (
            <div>{list}</div>
        );
    }
}
