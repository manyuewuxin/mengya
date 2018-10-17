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