import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import E from "wangeditor";
import { app as ajax } from "@request";
import Label from "./Label";

@inject("Editorstore")
@observer
export default class Write extends Component {
    static propTypes = {
        Editorstore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.getHtml = this.getHtml.bind(this);
        this.editor = null;
    }
    remove(e) {
        e.stopPropagation();
        if (e.target.tagName === "IMG") {
            ajax.removeFile({ folder: "editor", url: e.target.src });
        }
    }

    upload(files, insert) {
        if (files.length > 0) {
            ajax.uploadFile("editor", files[0]).then(({ url }) => {
                insert(url);
            });
        }
    }
    getHtml(html) {
        this.props.Editorstore.html = html;
    }
    submit(e) {
        e.stopPropagation();
        if (this.editor !== null) {
            this.props.Editorstore.send(this.editor.txt.html(), this.editor.txt.text());
        }
    }
    render() {
        return (
            <React.Fragment>
                <div id="write" />
                <Label />
                <button className="editor_submit" onClick={this.submit}>
                    创建文章
                </button>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.editor = new E("#write");

        this.editor.customConfig.debug = location.href.indexOf("/file") > 0; //debug
        this.editor.customConfig.lang = {
            //title
            正文: "p",
            链接文字: "链接文字",
            链接: "链接",
            上传图片: "上传图片",
            创建: "init"
        };

        this.editor.customConfig.menus = [
            "head", //标题
            "bold", //粗体
            "italic", //斜体
            "quote", // 引用
            "code", // 插入代码
            "list", // 列表
            "link", // 插入链接
            "image", // 插入图片
            "video", // 插入视频
            "undo" // 撤销
        ];
        this.editor.customConfig.pasteIgnoreImg = true; //只允许上传图片，不允许任何复制过来的图片
        this.editor.customConfig.zIndex = 1;
        this.editor.customConfig.customUploadImg = this.upload;
        this.editor.customConfig.onchangeTimeout = 0;
        this.editor.customConfig.onchange = this.getHtml;
        this.editor.create();
        this.editor.txt.html(toJS(this.props.Editorstore.html));
        document
            .querySelector("#write")
            .addEventListener("DOMNodeRemoved", this.remove, false);
    }
}
