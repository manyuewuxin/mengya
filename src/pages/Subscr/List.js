import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class List extends Component {
    static propTypes = {
        label: PropTypes.array,
        followtype: PropTypes.node,
        follow_type: PropTypes.func
    };
    render() {
        const { label, followtype } = this.props;
        const labelList = label.map((labels, index) => {
            const isFollow = followtype.includes(labels.type);
            return (
                <li
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <div className="label_describes">
                        <img crossOrigin="anonymous" src={labels.image} />
                        <p>{labels.type}</p>
                        <div>
                            <span>{`${labels.followtype_count} 关注`}</span>
                            <span>{`${labels.article_count} 文章`}</span>
                        </div>
                        <button
                            className={isFollow ? "is_follow_button" : "no_follow_button"}
                            data-index={index}
                            onClick={this.props.follow_type}>
                            {isFollow ? "已关注" : "关注"}
                        </button>
                    </div>
                </li>
            );
        });
        return (
            <div className="labelall">
                {label.length === 0 ? (
                    <div className="text-center">没有找到该标签</div>
                ) : (
                    <ul className="labellist">{labelList}</ul>
                )}
            </div>
        );
    }
}
