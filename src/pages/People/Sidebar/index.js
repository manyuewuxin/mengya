import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

import Achieve from "./Achieve";
import Follow from "./Follow";

@observer
export default class Sidebar extends Component {
    static propTypes = {
        author: PropTypes.object,
        is_myhome: PropTypes.bool
    };
    render() {
        const { author } = this.props;
        return (
            <div className="people_right">
                <Achieve
                    create_p_count={author.create_p_count}
                    collect={author.collect}
                    like={author.like}
                />
                <Follow
                    following_count={author.following_count}
                    followers_count={author.followers_count}
                    is_myhome={this.props.is_myhome}
                />
            </div>
        );
    }
}
