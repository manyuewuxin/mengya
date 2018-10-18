import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

import List from "./List";
import Sidebar from "./Sidebar";
import Events from "@components/Events";
import utils from "@utils";

@inject("Appstore")
@Events
@observer
export default class Content extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.time = null;
        this.scroll = this.scroll.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            nextProps.location.pathname !== this.props.location.pathname ||
            nextProps.location.search !== this.props.location.search
        ) {
            this.props.Appstore.setState("app", { update: true });
        }
    }
    scroll(e) {
        e.stopPropagation();
        if (this.time !== null) {
            window.clearTimeout(this.time);
            this.time = null;
        }
        this.time = window.setTimeout(() => {
            const scrollTop = Math.round(document.documentElement.scrollTop); //获取滚动高度像素
            const scrollHeight = scrollTop + window.innerHeight; //滚动高度像素+浏览器窗口屏幕可见高度
            if (scrollHeight >= document.documentElement.scrollHeight - 50) {
                //等于或大于整个文档高度时也就是滚动到底部时执行请求

                const { path, page } = this.props.Appstore.app;
                this.props.Appstore.getPosts(path, page);
                window.clearTimeout(this.time);
                this.time = null;
            }
        }, 100);
    }

    req({ location }) {
        if (location.pathname === "/") {
            const search = utils.search(location.search.split("?")[1]);
            const type = search.type || "all";
            this.props.Appstore.getPosts(`type=${type}`, 1);
        } else if (location.pathname === "/hot") {
            this.props.Appstore.setState("app", { read_article: [], read_comment: [] });
            this.props.Appstore.getPosts(`type=hot`, 1);
        } else if (location.pathname === "/search") {
            const search = utils.search(location.search.split("?")[1]);
            this.props.Appstore.setState("app", { read_article: [], read_comment: [] });
            this.props.Appstore.getPosts(`search=${search.query}`, 1);
        } else if (location.pathname === "/follow") {
            this.props.Appstore.getPosts("type=follow", 1);
        }
    }

    render() {
        if (this.props.Appstore.app.posts_loading) return null;
        return (
            <div className="posts">
                <div className="posts_left">
                    <List posts={this.props.Appstore.posts} is_my_people={false} />
                </div>
                <div className="posts_right">
                    <Sidebar />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.req(this.props);
        window.addEventListener("scroll", this.scroll, false);
    }

    componentDidUpdate() {
        if (this.props.Appstore.app.update) this.req(this.props);
    }
    componentWillUnmount() {
        this.props.Appstore.setState("app", {
            posts_loading: true,
            update: false,
            posts: [],
            read_article: [],
            read_comment: [],
            page: 1
        });
        window.removeEventListener("scroll", this.scroll, false);
    }
}

/*
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search || nextProps.location.pathname !== this.props.location.pathname) {
           this.props.Appstore.setState("app", { update: true });
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.Appstore.app.update;
    }

    render() {
        const { page, pagepath, posts_loading } = this.props.Appstore.app;
        const path = `${this.props.location.pathname}?${pagepath}&`;
        if (posts_loading) return null;
        return (
            <div className="blog">
                <div className="left">
                    <ArticleList id={this.props.Appstore.id} posts={this.props.Appstore.posts} />
                    <ArticlePage count={page} path={path}/>
                </div>
                <Sidebar location={location} history={this.props.history} />
            </div>
        );
    }

    componentDidMount() {
        if(this.props.location.pathname==="/"){
            this.props.Appstore.getPosts("type=all", 1);
        }
        else if(this.props.location.pathname==="/hot"){
            this.props.Appstore.getPosts("hot=p",1);
        }
    }

    componentDidUpdate() {

        if(this.props.Appstore.app.update){
            const { location, history, Appstore } = this.props;

            const search = utils.search(location.search.split("?")[1]);

            if (search.type && search.page || search.query && search.page) {
                const keys = Object.keys(search)[0];
                Appstore.getPosts(`${keys}=${search[keys]}`, Number(search.page));

            }
            else if(location.pathname === "/hot"){
                Appstore.getPosts("hot=p", Number(search.page || 1));
            }
            else if(location.pathname === "/" && location.search === "") {
                Appstore.getPosts("type=all", 1);
            } 
            else {
                history.replace("/404");
            }
        }
    }
    componentWillUnmount() {
        this.props.Appstore.setState("app", { posts_loading: true, update: false }); //卸载后初始化掉共享状态
    }
*/
