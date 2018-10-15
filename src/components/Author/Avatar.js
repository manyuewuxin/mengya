import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

@observer
export default class Header extends Component {
    static propTypes = {
        author: PropTypes.object
    };
    render() {
        const { author } = this.props;
        return (
            <div className="avatar_name">
                <div>
                    <Link to={`/people/${author._id}/dynamic`}>
                        <img src={author.avatar} />
                    </Link>
                </div>
                <div>
                    <Link to={`/people/${author._id}/dynamic`}>{author.name}</Link>
                    <a>{author.information}</a>
                </div>
            </div>
        );
    }
}
