import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class Label extends Component {
    static propTypes = {
        location: PropTypes.object,
        label: PropTypes.object
    };
    render() {
        const { location, label } = this.props;

        const list = label.map((type) => {
            const isLink = new RegExp(type, "i").test(location.search);
            return(
                <li key={Math.random().toString(36).substring(2, 6)} className="label">
                    <Link to={`/?type=${type}&page=1`} className={ isLink ? "label_background" : "" }>
                        {type}
                    </Link>
                </li>
            );
        });

        return(
            <div className="right_container">
                <h3 className="right_title">我关注的标签</h3>
                <ul className="list_label">{list}</ul>
            </div>
        );
    }
}
