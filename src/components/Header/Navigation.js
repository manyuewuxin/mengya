import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

@withRouter
export default class Navigation extends Component {
    static propTypes = {
        location: PropTypes.object
    };
    render() {
        const { pathname } = this.props.location;
        return (
            <div className="navig_links">
                <Link to="/" className="logo" />
                <div>
                    <Link 
                        className={pathname == "/" ? "is_home" : ""} 
                        to="/">
                        <i className="icon_home" />
                        首页
                    </Link>
                    <Link
                        className={pathname == "/hot" ? "is_home" : ""}
                        to="/hot">
                        <i className="icon_popular" />
                        热门
                    </Link>
                    <Link
                        className={pathname == "/follow" ? "is_home" : ""}
                        to="/follow">
                        <i className="icon_contact" />
                        关注
                    </Link>
                </div>
            </div>
        );
    }
}
