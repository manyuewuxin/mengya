import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class CollectCreate extends Component {
    static propTypes = {
        switchs: PropTypes.func,
        is_create: PropTypes.bool
    };
    render() {
        return (
            <div className="collect_forms">
                <button onClick={this.props.switchs}>
                    {this.props.is_create ? "确认创建" : "创建收藏夹"}
                </button>
            </div>
        );
    }
}
 