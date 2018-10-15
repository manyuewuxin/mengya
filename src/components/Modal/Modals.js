import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class Index extends Component {
    static propTypes = {
        modal: PropTypes.object,
        render: PropTypes.func
    };
    render() {
        return this.props.render(this.props.modal);
    }
}