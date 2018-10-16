import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NotFound extends Component {
    static propTypes = {
        location: PropTypes.object
    }
    render() {
    	const { state } = this.props.location;
    	return(
            <div>
                <h1>Not Found</h1>
                <div>{`没有找到${state?this.props.location.state.error:'该路径'}资源`}</div>
            </div>
        );
    }
}
