import { observable, action, toJS } from "mobx";
import { app, editor } from "../request";
import appstore from "./Appstore";
import xss from "xss";

class Editorstore {
    @observable image = null;
    @observable type = [];
    @observable title = "";
    @observable message = null;
    @observable loading = true;

    html = null;
    is_update = false;
    timeID = null;
    article = null;

    @action
    setState(obj) {
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            for (var key in obj) {
                if (key in this) {
                    this[key] = obj[key];
                }
            }
        }
    }

    async getUMA(posts_id) {
        var p = null;
        const u = await app.getUser();
        const m = await app.getMessage(1);
        if (posts_id !== null) p = await app.getArticle(posts_id);
        return { p, u, m };
    }

    @action
    getArticle(posts_id) {
        this.getUMA(posts_id).then(
            action(({ p, u, m }) => {
                if (p !== null) {
                    this.article = p.posts[0];
                    this.html = this.article.html;
                    this.image = this.article.image;
                    this.type = this.article.type;
                    this.title = this.article.title;

                    this.is_update = true;
                    this.loading = false;
                } else {
                    this.loading = false;
                }
                appstore.setState("app", { user: u.user });
                appstore.setUserMessage(m, 1);
            })
        );
    }

    @action
    removeTitleImage() {
        app.removeFile({ url: this.image, folder: "editor" }).then(
            action(() => {
                this.image = null;
            })
        );
    }

    @action
    uploadTitleImage(file) {
        Promise.resolve(1)
            .then(() => {
                const url = toJS(this.image);
                return this.image !== null
                    ? app.removeFile({ url: url, folder: "editor" })
                    : true;
            })
            .then(() => {
                return app.uploadFile("editor", file);
            })
            .then(
                action(({ url }) => {
                    this.image = url;
                })
            );
    }

    test(key, value) {
        switch (key) {
            case "title":
                return /^.{1,30}$/.test(value);

            case "text":
                return /^.{50,}$/.test(value);

            case "type":
                return value.length > 0;

            case "html":
                return true;

            case "image":
                return true;
        }
    }

    verify(html, text) {
        const form = {
            title: xss(toJS(this.title).replace(/\s+/g, "")),
            text: xss(text.replace(/\s+/g, "")),
            type: toJS(this.type),
            html: xss(html),
            image: toJS(this.image)
        };

        var message = {
            text: "文章字节不低于100以上，不包括空格",
            type: "请填写至少一个文章类型",
            title: "标题限制在1-30个字节，不包括空格"
        };

        var p = {};

        for (let key in form) {
            if (this.test(key, form[key]) === false) {
                return Promise.reject({ err: message[key] });
            }
            p[key] = form[key];
        }
        if (this.is_update) {
            const { author, ...article } = this.article;
            p = Object.assign({}, article, p);
        }
        p.text = p.text.length > 100 ? p.text.slice(0, 99) : p.text;
        return Promise.resolve(p);
    }

    @action
    send(html, text) {
        this.verify(html, text)
            .then((p) => {
                this.setMessage({ text: "发布文章中", is: false });
                return editor.createArticle(p);
            })
            .then(() => {
                this.timeID = window.setTimeout(() => {
                    this.setMessage({
                        text: this.is_update ? "更新文章成功" : "发布文章成功",
                        is: true
                    });
                    window.clearTimeout(this.timeID);
                }, 1000);
            })
            .catch(({ err }) => {
                this.setMessage(null);
                appstore.setMessage({ text: err || "发布文章出错", is: false });
            });
    }

    @action
    setMessage(message) {
        this.message = message;
    }

    @action
    addType(type) {
        if (type) this.type.push(type);
    }

    @action
    removeType(index) {
        if (typeof index == "number") this.type.splice(index, 1);
    }

    @action
    changeTitle(value) {
        this.title = value;
    }

    @action
    empty() {
        this.image = null;
        this.type = [];
        this.title = "";
        this.html = null;
        this.is_update = false;
        this.article = null;
        this.loading = true;
    }

    @action
    update_init() {
        this.loading = false;
    }

    @action
    init() {
        this.loading = true;
    }
    /*
    @action changeHtml(html){//wangeditor这个简陋富文本编辑器无法因为状态重组html
        this.html = html;
    }*/
}

export default new Editorstore();
/*
    storage(key,value){
        if(window.sessionStorage){
            window.sessionStorage.setItem(key, JSON.stringify(toJS(value)));
        }
    }

    @action removeItem(key,value){
        if(window.sessionStorage.getItem(key)){
            window.sessionStorage.removeItem(key);
            this[key] = value;
        }
    }*/
