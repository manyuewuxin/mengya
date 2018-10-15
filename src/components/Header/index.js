import React, { Component } from "react";
import Navigation from "./Navigation";
import Write from "./Write";
import User from "./User";

export default class Header extends Component {
    render() {
        return (
            <header className="navig">
                <nav>
                    <Navigation />
                    <div className="login_write">
                        <Write />
                        <User />
                    </div>
                </nav>
            </header>
        );
    }
}
