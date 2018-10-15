import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class CollectTitle extends Component {
    static propTypes = {
        is_create: PropTypes.bool,
        continues: PropTypes.func
    };
    render() {
        return (
            <div className="collect_title">
                <div>{this.props.is_create ? "创建收藏夹" : "添加到收藏夹"}</div>
                <div onClick={this.props.continues}>X</div>
            </div>
        );
    }
}
