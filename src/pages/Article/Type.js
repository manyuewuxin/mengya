import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

@observer
export default class ArticleType extends Component {
    static propTypes = {
        type: PropTypes.object
    };
    render() {
        const { type } = this.props;
        const list = type.map((types) => {
            return (
                <li
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <Link to={`/?type=${types}&page=1`}>{types}</Link>
                </li>
            );
        });
        return <ul className="article_label">{list}</ul>;
    }
}
