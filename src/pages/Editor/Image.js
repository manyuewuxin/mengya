import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

@inject("Editorstore")
@observer
export default class Image extends Component {
    static propTypes = {
        Editorstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.uploadImage = this.uploadImage.bind(this);
        this.action = this.action.bind(this);
        this.refx = React.createRef();
    }

    uploadImage(e) {
        e.stopPropagation();
        if (e.target.files.length > 0) {
            this.props.Editorstore.uploadTitleImage(e.target.files[0]);
            e.target.value = "";
        }
    }
    action(e) {
        e.stopPropagation();
        const { className } = e.target;
        if (className == "icon_cameras" || className == "icon_camera") {
            this.refx.current.click();
        } else if (className == "icon_removes") {
            this.props.Editorstore.removeTitleImage();
        }
    }
    render() {
        const { image } = this.props.Editorstore;
        return (
            <div className="editor_image" onClick={this.action}>
                {image !== null ? (
                    <div className="set_upload">
                        <i className="icon_cameras" />
                        <i className="icon_removes" />
                    </div>
                ) : (
                    <div className="upload">
                        <i className="icon_camera" />
                        <p>上传标题图</p>
                    </div>
                )}
                {image !== null ? <img src={this.props.Editorstore.image} /> : null}
                <input
                    ref={this.refx}
                    onChange={this.uploadImage}
                    type="file"
                    name="file"
                    accept="image/*"
                    style={{ display: "none" }}
                />
            </div>
        );
    }
}
