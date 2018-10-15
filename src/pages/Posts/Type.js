import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { toJS } from "mobx";

@observer
export default class ArticleType extends Component {
    static propTypes = {
        type: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    };
    render() {
        const t = toJS(this.props.type);
        const type = Array.isArray(t) ? t[0] : t;
        return (
            <div className="posts_type">
                <div>
                    <span>来自分类:</span>
                    <Link to={`/?type=${type}`} data-hove="label" data-type={type}>
                        {type}
                    </Link>
                </div>
            </div>
        );
    }
}
