import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentTextarea extends Component {
    static propTypes = {
        create: PropTypes.func,
        refx: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value;
    }
    change(e) {
        e.stopPropagation();
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight - 20}px`;
        e.target.scrollTop = e.target.scrollHeight;

        this.setState({ value: e.target.value });
    }
    submit(e) {
        e.stopPropagation();
        const { value } = this.state;

        this.props.create(value);
        this.setState({ value: "" });
    }
    render() {
        return (
            <div className="comment_textarea">
                <textarea
                    type="text"
                    name="reply"
                    rows="1"
                    maxLength="500"
                    value={this.state.value}
                    ref={this.props.refx}
                    onChange={this.change}
                />
                <button onClick={this.submit}>评论</button>
            </div>
        );
    }
}
