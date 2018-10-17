import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

@inject("Editorstore")
@withRouter
@observer
export default class Center extends Component {
    static propTypes = {
        Editorstore: PropTypes.object,
        history: PropTypes.object
    };
    render() {
        if (this.props.Editorstore.message === null) return null;
        const { message } = this.props.Editorstore;
        return (
            <div className="center">
                <div>
                    <i className={message.is ? "icon_oks" : "icon_loading"} />
                    <i>{message.text}</i>
                </div>
            </div>
        );
    }
    componentDidUpdate() {
        if (
            this.props.Editorstore.message !== null &&
            this.props.Editorstore.message.is
        ) {
            this.timeID = window.setTimeout(() => {
                this.props.Editorstore.setMessage(null);
                this.props.Editorstore.empty();
                window.scroll(0, 0);
                window.clearTimeout(this.timeID);
            }, 1000);
        }
    }
}
