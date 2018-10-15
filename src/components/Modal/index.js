import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Modals from "./Modals";
import Collect from "../Collect";
import Forward from "../Forward";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object
    };
    render() {
        if(this.props.Appstore.modal.open!==null) {
            return(
                <Modals modal={this.props.Appstore.modal} render={({ open, posts_id, author_id, position })=>{
                    switch(open){
                        case "collect":
                        return <Collect posts_id={posts_id} author_id={author_id} />;

                        case "forward":
                        return <Forward posts_id={posts_id} position={position}/>;

                        default:
                        console.log('没有找到modal');
                        return null;                        
                    }
                }}/>
            );
        }
        return null;
    }
}
