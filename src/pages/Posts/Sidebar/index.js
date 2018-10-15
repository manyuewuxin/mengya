import React, { Component } from "react";
import Search from "./Search";
import Order from "./Order";

export default class SidebarList extends Component {
    render() {
        return (
            <div>
                <Search/>
                <Order/>
            </div>
        );
    }
}
//import Label from "./Label"; <Label location={this.props.location} label={this.props.Appstore.label}/> 