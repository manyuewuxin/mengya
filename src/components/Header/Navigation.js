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
                        className={pathname == "/about" ? "is_home" : ""}
                        to="/about">
                        <i className="icon_contact" />
                        关于
                    </Link>
                </div>
            </div>
        );
    }
}
