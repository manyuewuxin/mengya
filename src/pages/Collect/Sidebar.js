import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import utils from "@utils";

export default class CollectSidebar extends Component {
    static propTypes = {
        user: PropTypes.object,
        date: PropTypes.node
    };
    render() {
        const { user, date } = this.props;
        const dt = utils.format(date);
        return (
            <div className="people_right">
                <div className="sidebar">
                    <h3 className="h3_title">关于创建者</h3>
                    <div className="collect_author">
                        <Link to={`/people/${user._id}/dynamic`}>
                            <img src={user.avatar} />
                        </Link>
                        <Link to={`/people/${user._id}/dynamic`}>{user.name}</Link>
                    </div>
                </div>
                <div className="sidebar">
                    <h3 className="h3_title">收藏夹状态</h3>
                    <div className="collect_updatedate">{`最近活动于 ${dt.date} ${
                        dt.time
                    }`}</div>
                </div>
            </div>
        );
    }
}
