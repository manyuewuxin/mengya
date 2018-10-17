import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

import Image from "./Image";
import Title from "./Title";
import Write from "./Write";
import Center from "./Center";

@inject("Appstore", "Editorstore")
@observer
export default class Editor extends Component {
    static propTypes = {
        Editorstore: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object
    };
    render() {
        if (this.props.Editorstore.loading) return <div />;
        return (
            <div className="editor">
                <div className="editor_container">
                    <Image />
                    <Title />
                    <Write />
                    <Center />
                </div>
            </div>
        );
    }
    componentDidMount() {
        const posts_id =
            this.props.location.hash !== ""
                ? this.props.location.hash.split("#")[1]
                : null;
        this.props.Editorstore.getArticle(posts_id);
    }
    componentWillUnmount() {
        this.props.Editorstore.init();
    }
    componentDidUpdate() {
        if (this.props.Editorstore.loading) {
            this.props.Editorstore.update_init();
        }
    }
}
