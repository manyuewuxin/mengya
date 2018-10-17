import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class PeopleSwitchList extends Component {
    static propTypes = {
        match: PropTypes.object
    };
    render() {
        const arr = [
            { path: "dynamic", match: "dynamic", text: "动态" },
            { path: "article", match: "article", text: "文章" },
            { path: "collect", match: "collect", text: "收藏" },
            { path: "following", match: "following|followers", text: "关注" }
        ];
        const match = this.props.match;
        const list = arr.map((route) => {
            const key = Math.random()
                .toString(36)
                .substring(2, 6);
            return (
                <li key={key}>
                    <Link
                        to={`/people/${match.params.id}/${route.path}`}
                        className={
                            new RegExp(route.match, "i").test(match.params.path)
                                ? "switch"
                                : ""
                        }>
                        {route.text}
                    </Link>
                </li>
            );
        });
        return <ul className="people_ul">{list}</ul>;
    }
}
