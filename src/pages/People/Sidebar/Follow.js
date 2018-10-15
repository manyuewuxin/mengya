import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class FollowCount extends Component {
    static propTypes = {
        is_myhome: PropTypes.bool,
        followers_count: PropTypes.number,
        following_count: PropTypes.number
    };
    render() {
        const { is_myhome, followers_count, following_count } = this.props;
        return (
            <div className="sidebar">
                <h3 className="h3_title">关注用户</h3>
                <div className="people_follow">
                    <div>
                        <p>{`${is_myhome ? "我" : "他"}关注的用户`}</p>
                        <p>{following_count}</p>
                    </div>
                    <div>
                        <p>{`关注${is_myhome ? "我" : "他"}的用户`}</p>
                        <p>{followers_count}</p>
                    </div>
                </div>
            </div>
        );
    }
}
