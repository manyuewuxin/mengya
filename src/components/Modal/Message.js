import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject("Appstore")
@observer
export default class Message extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.time = null;
        this.style = props.Appstore.styel || "animation";
        this.animationiteration = this.animationiteration.bind(this);
        this.animationend = this.animationend.bind(this);
    }
    animationiteration(e) {
        e.stopPropagation();
        e.persist();
        if (this.time !== null) {
            window.clearTimeout(this.time);
            this.time = null;
        }
        e.target.style.animationPlayState = "paused";

        this.time = window.setTimeout(() => {
            e.target.style.animationPlayState = "running";
            window.clearTimeout(this.time);
            this.time = null;
        }, 1500);
    }

    animationend(e) {
        e.stopPropagation();
        this.props.Appstore.setMessage(null);
    }

    render() {
        if (this.props.Appstore.message === null) return null;
        const { message } = this.props.Appstore;
        return (
            <div
                className="message"
                onAnimationIteration={this.animationiteration}
                onAnimationEnd={this.animationend}>
                <i className={message.is ? "icon_message_ok" : "icon_message_no"} />
                <p>{message.text}</p>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.Appstore.queue !== null) {
            var queue = this.props.Appstore.queue;
            this.props.Appstore.queue = null;
            this.props.Appstore.setMessage(queue);
        }
    }
}
