import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { app as ajax } from "@request";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        type: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            label: null
        };
        this.follow = this.follow.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.mouseover = this.mouseover.bind(this);
    }
    follow(e) {
        e.stopPropagation();
        this.props.Appstore.follow_type(this.state.label.type);
    }
    mouseover(e) {
        e.stopPropagation();
        this.props.Appstore.setState("hove", { opacity: 1 });
    }
    mouseLeave(e) {
        e.stopPropagation();
        this.props.Appstore.setState("hove", { opacity: 0 });
    }
    render() {
        if (this.state.label === null) {
            return <div />;
        }
        const { label } = this.state;
        const isFollow = this.props.Appstore.followtype.includes(label.type);
        return (
            <div
                className="labels"
                onMouseLeave={this.mouseLeave}
                onMouseOver={this.mouseover}>
                <div className="label_image">
                    <img crossOrigin="anonymous" src={label.image} />
                    <p>{label.type}</p>
                </div>
                <div className="label_describe">{label.describe}</div>
                <div className="label_count">
                    <p>
                        <span>{`文章 ${label.article_count}`}</span>
                        <span>{`关注 ${label.followtype_count}`}</span>
                    </p>
                </div>
                <button
                    className={isFollow ? "is_follow_button" : "no_follow_button"}
                    onClick={this.follow}>
                    {isFollow ? "已关注" : "关注"}
                </button>
            </div>
        );
    }
    componentDidMount() {
        ajax.getLabel(`type=${this.props.type}`, 1).then(({ label }) => {
            this.setState({ label: label[0] });
        });
    }
}
