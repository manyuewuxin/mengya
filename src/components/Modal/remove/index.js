import React, { Component } from "react";
import PropTypes from "prop-types";
import Portal from "./Portal";

export default class Index extends Component {
    static propTypes = {
        visibility: PropTypes.bool,
        description: PropTypes.object,
        onRemove: PropTypes.func,
        offRemove: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.animationiteration = this.animationiteration.bind(this);
        this.animationend = this.animationend.bind(this);

        this.no = this.no.bind(this);
        this.ok = this.ok.bind(this);
        this.refc = React.createRef(); //控制过渡动画
    }

    animationiteration(e) {
        //初加载
        e.stopPropagation();
        this.refc.current.style.animationPlayState = "paused";
    }

    animationend(e) {
        //动画结束
        e.stopPropagation();
        this.props.offRemove();
    }

    no(e) {
        //取消
        e.stopPropagation();
        this.refc.current.parentElement.style.opacity = 0;
        this.refc.current.style.animationPlayState = "running";
    }
    ok(e) {
        //确定
        e.stopPropagation();
        this.props.onRemove();
    }
    render() {
        if (this.props.visibility === false) return null;
        return (
            <Portal>
                <div
                    className="remove"
                    ref={this.refc}
                    onAnimationIteration={this.animationiteration}
                    onAnimationEnd={this.animationend}>
                    <h3>{this.props.description.title}</h3>
                    <div>
                        <button onClick={this.no}>取消</button>
                        <button onClick={this.ok} className="no_follow_button">
                            确定
                        </button>
                    </div>
                </div>
            </Portal>
        );
    }
}
