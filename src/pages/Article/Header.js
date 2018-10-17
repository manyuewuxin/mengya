import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("Appstore")
@observer
export default class PropsHeader extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        title: PropTypes.string,
        image: PropTypes.string,
        count: PropTypes.number,
        author: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.follow = this.follow.bind(this);
    }

    follow(e) {
        e.stopPropagation(); //禁止冒泡
        this.props.Appstore.follow(this.props.author._id);
    }
    render() {
        const { title, image, count, author } = this.props;
        const is_follow = this.props.Appstore.following.includes(author._id);
        return (
            <div className="articles_header">
                <div className="articles_image">
                    <img src={image} />
                </div>
                <h1 className="articles_title">{title}</h1>
                <div className="articles_author">
                    <div>
                        <Link to={`/people/${author._id}/dynamic`}>
                            <img src={author.avatar} />
                        </Link>
                    </div>
                    <div>
                        <p>
                            <Link to={`/people/${author._id}/dynamic`}>
                                {author.name}
                            </Link>
                        </p>
                        <p>{author.information}</p>
                    </div>
                    <div>
                        <button
                            onClick={this.follow}
                            className={
                                is_follow ? "is_follow_button" : "no_follow_button"
                            }>
                            {is_follow ? "已关注" : "关注他"}
                        </button>
                    </div>
                </div>
                <div className="articles_good_count">{`${count}人喜欢该文章`}</div>
            </div>
        );
    }
}
