import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

@inject("Editorstore")
@observer
export default class Title extends Component {
    static propTypes = {
        Editorstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }
    change(e) {
        e.stopPropagation();
        this.props.Editorstore.changeTitle(e.target.value);
    }
    render() {
        const { title } = this.props.Editorstore;
        return (
            <div className="editor_title">
                <input
                    type="text"
                    name="title"
                    placeholder="请输入标题（最多30个字节)"
                    maxLength="30"
                    onChange={this.change}
                    value={title}
                />
            </div>
        );
    }
}
