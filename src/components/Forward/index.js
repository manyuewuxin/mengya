import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Forward extends Component {
    static propTypes = {
        position: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.openWeixin = this.openWeixin.bind(this);
        this.openWeibo = this.openWeibo.bind(this);
    }
    openWeibo(e) {
        e.stopPropagation(); //没买服务器就别转了
        const top = window.screen.height / 2 - 250;
        const left = window.screen.width / 2 - 300;
        const title = encodeURIComponent("封装axios");
        const url = encodeURIComponent(
            "http://localhost:3000/p/5ba0d6128e392c0e142fc3ee"
        );

        window.open(
            `http://service.weibo.com/share/share.php?title=${title}&url=${url}`,
            "分享至新浪微博",
            `height=500, 
            width=600, 
            top=${top}, 
            left=${left}, 
            toolbar=no, 
            menubar=no, 
            scrollbars=no, 
            resizable=no, 
            location=no, status=no`
        );
    }
    openWeixin(e) {
        e.stopPropagation();
        //待测试
    }
    render() {
        const position = this.props.position;
        return (
            <div style={{ position: "absolute", top: position.top, left: position.left }}>
                <div className="forward">
                    <button onClick={this.openWeibo}>
                        <i className="icon_weibo" />
                        <span>新浪微博</span>
                    </button>
                    <button onClick={this.openWeixin}>
                        <i className="icon_weixin" />
                        <span>腾讯微信</span>
                    </button>
                </div>
            </div>
        );
    }
}
