import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Render from "./Render";
import Collect from "../../Collect";
import Forward from "../../Forward";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    render() {
        if(this.props.Appstore.modal.open!==null) {
            return(
                <Render modal={this.props.Appstore.modal} render={({ open, posts_id, author_id, position })=>{
                    switch(open){
                        case "collect":
                        return <Collect posts_id={posts_id} author_id={author_id} />;

                        case "forward":
                        return <Forward posts_id={posts_id} position={position}/>;

                        default:
                        return null;                        
                    }
                }}/>
            );
        }
        return null;
    }
}
