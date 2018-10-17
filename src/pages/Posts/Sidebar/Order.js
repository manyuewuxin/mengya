import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("Appstore")
@observer
export default class Order extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    render() {
        const list = this.props.Appstore.app.order.map((p, index) => {
            return (
                <li
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <Link to={`/p/${p._id}`}>
                        <i className={index < 3 ? "top" : ""}>{index + 1}</i>
                        {p.title}
                    </Link>
                </li>
            );
        });
        return (
            <div className="sidebar">
                <h3 className="h3_title">热门文章排行</h3>
                <ul className="order">{list}</ul>
            </div>
        );
    }
}
