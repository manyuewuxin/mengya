import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("Appstore", "Peoplestore")
@observer
export default class Followers extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        Peoplestore: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.follow = this.follow.bind(this);
        this.is_myhome = false;
    }

    follow(e) {
        e.stopPropagation(); //禁止冒泡
        this.props.Peoplestore.follow(Number(e.target.dataset.index));
    }

    render() {
        this.is_myhome =
            this.props.Appstore.id === this.props.match.params.id ? true : false;

        const following = this.props.Appstore.following;

        const { people } = this.props.Peoplestore;

        const list = people.map((f, index) => {
            const author = f.author[0];
            const is_follow = following.includes(author._id);
            return (
                <li
                    className="people_collect_list"
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <div>
                        <Link to={`/people/${author._id}/dynamic`}>
                            <img src={author.avatar} />
                        </Link>
                    </div>
                    <div>
                        <p className="name_text">
                            <Link to={`/people/${author._id}/dynamic`}>
                                {author.name}
                            </Link>
                        </p>
                        <p className="information_text">{author.information}</p>
                        <p className="detailed_text">{`${
                            author.create_p_count
                        } 篇文章 · ${author.followers_count} 关注者`}</p>
                    </div>
                    <div>
                        <a
                            className={is_follow ? "is_follow_button" : ""}
                            data-index={index}
                            onClick={this.follow}>
                            {is_follow ? "已关注" : "关注他"}
                        </a>
                    </div>
                </li>
            );
        });
        return (
            <React.Fragment>
                <div className="people_follow_show">
                    <p>
                        <Link
                            to={`/people/${this.props.match.params.id}/following`}
                            className={
                                this.props.location.pathname.includes("following")
                                    ? "follow_switch"
                                    : ""
                            }>{`${this.is_myhome ? "我" : "他"}关注的用户`}</Link>
                    </p>
                    <p>
                        <Link
                            to={`/people/${this.props.match.params.id}/followers`}
                            className={
                                this.props.location.pathname.includes("followers")
                                    ? "follow_switch"
                                    : ""
                            }>{`关注${this.is_myhome ? "我" : "他"}的用户`}</Link>
                    </p>
                </div>
                <ul className="people_padding">{list}</ul>
            </React.Fragment>
        );
    }
}
