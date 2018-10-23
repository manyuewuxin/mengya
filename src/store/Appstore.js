import { observable, action, computed } from "mobx";
import { app as ajax } from "../request";

class Appstore {
    @observable app = {
        posts: [], //文章
        user: null, //用户
        order: [], //顺序
        page: 1, //当前页
        loginPath: null, //登录或注册
        error: null, //全局404
        path: "type=all", //默认首页文章类型
        read_article: [], //保存全文阅读状态，必须写在全局，滚动加载时会初始化
        read_comment: [], //保存打开评论状态
        update: false, //更新
        posts_loading: true, //初始化->卸载
        article_loading: true,
        collect_loading: true,
        collect_update_date: null,
        collect_user: null
    };

    @observable header = {
        message: [], //用户消息
        read_count: 0, //阅读初始化消息计数
        page: 1, //消息页
        init: false, //初始化打开消息
        open: null, //打开头部用户动作
        left: 0
    };

    @observable modal = {
        open: null, //type
        position: null,
        posts_id: null,
        author_id: null,
        message: null //全局提示消息
    };

    @observable hove = {
        opacity: 0,
        position: null,
        hove_type: null,
        article_type: null,
        author_id: null
    };

    read_article_top = null;
    queue = null;

    @computed
    get posts() {
        return this.app.posts;
    }

    @computed
    get user() {
        return this.app.user;
    }

    @computed
    get id() {
        return this.app.user !== null ? this.user._id : null;
    }
    @computed
    get following() {
        return this.app.user !== null ? this.user.following : [];
    }

    @computed
    get followers() {
        return this.app.user !== null ? this.user.followers : [];
    }
    @computed
    get followtype() {
        return this.app.user !== null ? this.user.followtype : [];
    }

    @computed
    get message() {
        return this.modal.message;
    }

    @action
    setState(stateObj, obj) {
        const toString = Object.prototype.toString;
        if (typeof stateObj == "string" && toString.call(obj) === "[object Object]") {
            const state = this[stateObj];

            for (var key in obj) {
                if (key in state) {
                    state[key] = obj[key];
                }
            }
        } else {
            this.setMessage({ text: "setState params error", is: false });
        }
    }

    getPosts(path, page) {
        if (path && page) {
            Promise.all([
                ajax.getPostsList(path, page),
                ajax.getOrder(),
                ajax.getUser(),
                ajax.getMessage(1)
            ]).then(([p, o, u, m]) => {
                if (p.posts.length > 0 && this.app.path === path) { //区分类型和搜索
                    this.setState("app", {
                        order: o.order,
                        posts: this.app.posts.concat(p.posts),
                        page: page + 1,
                        path: path,
                        update: false
                    });
                } 
                else if (this.app.path !== path) {
                    this.setState("app", {
                        order: o.order,
                        posts: [].concat(p.posts),
                        page: page + 1,
                        path: path,
                        update: false
                    });
                }
                this.setState("app", { user: u.user, posts_loading: false });
                this.setUserMessage(m, 1);
            });
        } else {
            this.setMessage({ text: "getPosts params error", is: false });
        }
    }

    getArticle(posts_id) {
        if (posts_id) {
            Promise.all([
                ajax.getArticle(posts_id),
                ajax.getUser(),
                ajax.getMessage(1)
            ]).then(([p, u, m]) => {
                this.setState("app", {
                    posts: p.posts,
                    user: u.user,
                    read_article: [p.posts[0]._id],
                    article_loading: false
                });
                this.setUserMessage(m, 1);
            });
        } else {
            this.setMessage({ text: "getArticle params error", is: false });
        }
    }

    getCollectPosts(collect_id, page) {
        if (collect_id && page) {
            Promise.all([
                ajax.getCollect(collect_id, page),
                ajax.getUser(),
                ajax.getMessage(1)
            ]).then(([c, u, m]) => {
                this.setState("app", {
                    user: u.user,
                    posts: c.posts,
                    collect_user: c.user,
                    collect_update_date: c.update_date,
                    page: c.count,
                    update: false,
                    collect_loading: false
                });
                this.setUserMessage(m, 1);
            });
        } else {
            this.setMessage({ text: "getCollectPosts params error", is: false });
        }
    }

    getUser() {
        Promise.all([ajax.getUser(), ajax.getMessage(1)]).then(([u, m]) => {
            this.setState("app", { user: u.user });
            this.setUserMessage(m, 1);
        });
    }

    getMessage(page) {
        if (typeof page == "number") {
            ajax.getMessage(page).then((m) => {
                this.setUserMessage(m, page, true);
            });
        } else {
            this.setMessage({ text: "getMessage params error", is: false });
        }
    }

    @action setUserMessage(m, page, is_update=false) { //第三个参数区分是滚动加载还是更换路由
        if (m.message.length > 0 && page) {
            if(this.header.message.length===0 || is_update){
                this.header.page = this.header.page + 1;
            }
            this.header.init = m.read_count !== this.header.read_count;
            this.header.read_count = m.read_count;
            this.header.message =  is_update ? this.header.message.concat(m.message) : m.message;
        }
    }

    setter_message(open, left) {
        if (this.header.open === open) {
            this.setState("header", { open: null, left: 0 });
        } else if (open === "message" && this.header.init && this.header.read_count > 0) {
            ajax.updateMessage().then(() =>
                this.setState("header", {
                    open: open,
                    left: left,
                    read_count: 0,
                    init: false
                })
            );
        } else {
            this.setState("header", { open, left });
        }
    }

    quit() {
        return ajax.signout().then(() => {
            this.setState("app", { user: null });
            this.setState("header", { init: false, open: null, page: 1, left: 0 });
        });
    }

    @action
    login(pathname, message = null) {
        if (typeof pathname == "string" || pathname === null) {
            this.app.loginPath = pathname;
            if (message !== null) this.setMessage(message);
        }
    }

    @action
    like(index, posts_id, author_id) {
        if (author_id !== this.id) {
            const like_index = this.app.posts[index].like.indexOf(this.id);

            const actionType = like_index !== -1 ? "remove" : "add";

            ajax.like({ posts_id, author_id, action: actionType }).then(
                action(() => {
                    like_index !== -1
                        ? this.app.posts[index].like.splice(like_index, 1)
                        : this.app.posts[index].like.push(this.id);
                })
            );
        } else {
            this.setMessage({ text: "你不能点赞自己的文章", is: false });
        }
    }

    @action
    comment_count(type, index) {
        if (type == "add") {
            this.app.posts[index].comment_count = this.app.posts[index].comment_count + 1;
        } else if (type == "remove") {
            this.app.posts[index].comment_count = this.app.posts[index].comment_count - 1;
        }
    }

    @action
    follow(author_id) {
        if (typeof author_id == "string" && this.id !== author_id) {
            const indexOf = this.following.indexOf(author_id);

            const actionType = indexOf !== -1 ? "remove" : "add";

            ajax.following({ author_id, action: actionType }).then(
                action(() => {
                    indexOf !== -1
                        ? this.app.user.following.splice(indexOf, 1)
                        : this.app.user.following.push(author_id);
                })
            );
        } else {
            this.setMessage({ text: "你不能自己关注自己", is: false });
        }
    }

    @action
    follow_type(type) {
        if (typeof type === "string") {
            const indexOf = this.followtype.indexOf(type);

            const actionType = indexOf !== -1 ? "remove" : "add";

            ajax.followtype({ type: type, action: actionType }).then(
                action(() => {
                    indexOf !== -1
                        ? this.app.user.followtype.splice(indexOf, 1)
                        : this.app.user.followtype.push(type);
                })
            );
        }
    }

    @action
    setMessage(message) {
        //propmptMessage
        if (this.modal.message !== null) {
            this.queue = message;
            this.modal.message = null;
        } else if (Object.prototype.toString.call(message) === "[object Object]") {
            this.modal.message = message;
        } else if (message === null) {
            this.modal.message = null;
        }
    }

    @action
    read_article_comment(type, index, top) {
        if (
            type === "article" &&
            typeof index == "number" &&
            Number.isNaN(index) === false &&
            typeof top == "number"
        ) {
            const indexOf = this.app.read_article.indexOf(index);
            if (indexOf !== -1) {
                this.app.read_article.splice(indexOf, 1);
                window.scroll(0, this.read_article_top - 170);
                this.read_article_top = null;
            } else {
                this.app.read_article.push(index);
                this.read_article_top = top;
            }
        } else if (
            type === "comment" &&
            typeof index == "number" &&
            Number.isNaN(index) === false
        ) {
            const indexOf = this.app.read_comment.indexOf(index);
            indexOf !== -1
                ? this.app.read_comment.splice(indexOf, 1)
                : this.app.read_comment.push(index);
        } else {
            this.setMessage({ text: "read_article_comment params error", is: false });
        }
    }

    @action
    removeArticle(index){
        if(typeof index === "number" && Number.isNaN(index) === false){
            this.app.posts.splice(index,1);
        }
        else{
            this.setMessage({ text: "removeArticle params error", is: false });
        }
    }
}

export default new Appstore();
