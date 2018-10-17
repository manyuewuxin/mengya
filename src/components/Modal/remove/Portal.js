import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export default class RemoveModal extends Component {
    static propTypes = {
        children: PropTypes.node
    };
    constructor(props) {
        super(props);
        this.node = document.createElement("div");
        this.child = document.createElement("div");

        this.node.className = "animation_opacity";
        this.child.className = "animation_backdrop";

        this.node.appendChild(this.child);
    }
    render() {
        return ReactDOM.createPortal(this.props.children, this.node);
    }

    componentDidMount() {
        //初始化后
        document.body.appendChild(this.node); //插入
    }

    componentWillUnmount() {
        //卸载
        this.node.removeChild(this.child);
        document.body.removeChild(this.node); //删除
    }
}
