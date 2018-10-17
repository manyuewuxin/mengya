import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import { app as ajax } from "@request";

@inject("Editorstore")
@observer
export default class Label extends Component {
    static propTypes = {
        Editorstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            quertList: [],
            value: ""
        };
        this.change = this.change.bind(this);
        this.setLabel = this.setLabel.bind(this);
        this.timeID = null;
    }

    change(e) {
        e.stopPropagation();
        const value = e.target.value;
        if (e.target.value === "") {
            this.quertList = [];
            this.setState({ quertList: [], value: "" });
        } else if (this.props.Editorstore.type.length < 3) {
            if (this.timeID !== null) {
                window.clearTimeout(this.timeID);
                this.timeID = null;
            }
            this.timeID = window.setTimeout(() => {
                ajax.getLabel(`search=${value}`, 1).then(({ label }) => {
                    if (this.state.value !== "") this.setState({ quertList: label });
                    window.clearTimeout(this.timeID);
                    this.timeID = null;
                });
            }, 0);
        }
        this.setState({ value: e.target.value });
    }
    setLabel(e) {
        e.stopPropagation();
        if (e.target.dataset.removeindex) {
            this.props.Editorstore.removeType(Number(e.target.dataset.removeindex));
        } else if (e.target.dataset.querylabel) {
            if (this.props.Editorstore.type.length < 4) {
                this.props.Editorstore.addType(e.target.dataset.querylabel);
                this.quertList = [];
                this.setState({
                    quertList: [],
                    value: ""
                });
            }
        }
    }
    render() {
        const list = this.props.Editorstore.type.map((type, index) => {
            return (
                <li
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <button>
                        {type}
                        <i data-removeindex={index} className="icon_closes" />
                    </button>
                </li>
            );
        });
        const quertLists = this.state.quertList.map((label) => (
            <li
                key={Math.random()
                    .toString(36)
                    .substring(2, 6)}
                data-querylabel={label.type}>
                {label.type}
            </li>
        ));

        return (
            <div onClick={this.setLabel}>
                <div className="editor_label">
                    <ul>{list}</ul>
                    <input
                        type="text"
                        name="label"
                        placeholder={`为文章添加标签${
                            this.props.Editorstore.type.length
                        }/3`}
                        value={this.state.value}
                        onChange={this.change}
                    />
                </div>
                <div className="editor_querylabel">
                    <ul>{quertLists}</ul>
                </div>
            </div>
        );
    }
}
