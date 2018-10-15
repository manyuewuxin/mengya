import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class Hove extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        render: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.transition = this.transition.bind(this);
    }
    transition(e) {
        e.stopPropagation();
        if (this.props.Appstore.hove.opacity === 0) this.props.Appstore.setState("hove", { hove_type: null });
    }
    render() {
        const { position, opacity } = this.props.Appstore.hove;
        const style = { 
            position: "absolute", 
            top: position.top, 
            left: position.left, 
            opacity: opacity, 
            transition: "opacity 0.3s" 
        };
        return (
            <div style={style} onTransitionEnd={this.transition}>
                {this.props.render(this.props.Appstore.hove)}
            </div>
        );
    }
}
