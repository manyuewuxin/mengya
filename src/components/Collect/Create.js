import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CollectCreateView extends Component {
    static propTypes = {
        image: PropTypes.string,
        openFile: PropTypes.func,
        refx: PropTypes.object,
        change: PropTypes.func,
        changeFile: PropTypes.func,
        name: PropTypes.string
    };
    render() {
        return (
            <ul className="setter_list">
                <li className="setter_avatar">
                    <div>收藏夹头像</div>
                    <div>
                        <img src={this.props.image} />
                    </div>
                    <div>
                        <p>支持jpg、jpeg、png格式</p>
                        <button onClick={this.props.openFile}>上传图片</button>
                        <input
                            type="file"
                            name="file"
                            style={{ display: "none" }}
                            onChange={this.props.changeFile}
                            ref={this.props.refx}
                        />
                    </div>
                </li>
                <li>
                    <div>收藏夹名</div>
                    <div className="input_width">
                        <input
                            type="text"
                            name="name"
                            placeholder="输入收藏夹名字"
                            autoComplete="off"
                            maxLength="20"
                            onChange={this.props.change}
                            value={this.props.name}
                        />
                    </div>
                </li>
            </ul>
        );
    }
}
