import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import utils from "@utils";

@observer
export default class Html extends Component {
    static propTypes = {
        html: PropTypes.string,
        date: PropTypes.string
    };
    render() {
        const { html, date } = this.props;
        const dt = utils.format(date);
        return (
            <div>
                <div className="posts_html" dangerouslySetInnerHTML={{ __html: html }} />
                <div className="posts_date">{`发布于 ${dt.date} ${dt.time}`}</div>
            </div>
        );
    }
}
