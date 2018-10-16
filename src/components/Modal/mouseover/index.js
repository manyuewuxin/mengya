import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import Render from "./Render";
import Author from "../../Author";
import Label from "../../Label";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore:PropTypes.object
    };
    render() {
        if (this.props.Appstore.hove.hove_type !== null){
            return (
                <Render Appstore={this.props.Appstore} render={({ hove_type, author_id, article_type})=>{
                    switch(hove_type){
                        case "author":
                        return <Author user_id={author_id} />;

                        case "label":
                        return <Label type={article_type}/>;

                        default:
                        console.log('没有找到hove');
                        return null;
                    }
                }}/>

            );
        }
        return null;
    }
}
