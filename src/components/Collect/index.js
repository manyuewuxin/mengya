import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { app as ajax } from "@request";

import CollectTitle from "./Title";
import CollectList from "./List";
import CollectSwitch from "./Switch";
import CollectCreate from "./Create";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        posts_id: PropTypes.string.isRequired,
        author_id: PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            collect: [], //数据
            is_create: false,
            page: 1, //滚动加载size
            name: "",
            image: "/collect/dafault.png",
            loading: true
        };

        this.change = this.change.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.openFile = this.openFile.bind(this);
        this.collectArticle = this.collectArticle.bind(this);
        this.switchs = this.switchs.bind(this);

        this.continues = this.continues.bind(this);
        this.animationiteration = this.animationiteration.bind(this);
        this.animationend = this.animationend.bind(this);

        this.scroll = this.scroll.bind(this);

        this.time = null;
        this.refc = React.createRef(); //控制过渡动画
        this.refx = React.createRef(); //获取elem
    }
    change(e) {
        e.stopPropagation();
        this.setState({ name: e.target.value });
    }

    openFile(e) {
        //模拟文件表单点击
        e.stopPropagation();
        this.refx.current.click();
    }

    changeFile(e) {
        e.stopPropagation();
        if (e.target.files.length > 0) {
            this.uploadImg(e.target.files[0]).then((url) => {
                this.setState({ image: url });
            });
        }
    }
    async uploadImg(file) {
        const { image } = this.state;
        const { url } = await ajax.uploadFile("collect", file);
        try {
            await ajax.removeFile({ url: image, folder: "collect" });
        } catch (err) {
            console.log(err);
        }
        return url;
    }
    switchs(e) {
        e.stopPropagation();
        if (this.state.is_create === false) {
            this.setState({ is_create: true, animation: false });
        } else {
            this.create();
        }
    }

    collectArticle(e) {
        e.stopPropagation();
        if (e.target.dataset.index) {
            const { posts_id, author_id } = this.props;
            const { collect } = this.state;
            const index = Number(e.target.dataset.index);
            const collect_id = collect[index]._id;
            const indexOf = collect[index].collect_article.indexOf(posts_id);
            const action = indexOf !== -1 ? "remove" : "add"; //获取收藏夹是否收藏了文章

            ajax.updateCollect({ collect_id, action, posts_id, author_id }).then(() => {
                if (indexOf !== -1) {
                    collect[index].collect_article.splice(indexOf, 1);
                    collect[index].collect_count = collect[index].collect_count - 1;
                } else {
                    collect[index].collect_article.push(posts_id);
                    collect[index].collect_count = collect[index].collect_count + 1;
                }
                this.setState({ collect: collect });
            });
        }
    }
    create() {
        if (/^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/.test(this.state.name)) {
            const { collect, image, name } = this.state;
            ajax.createCollect({ image, name }).then((data) => {
                collect.unshift(data.collect);
                this.setState({
                    collect: collect,
                    is_create: false,
                    image: "/collect/dafault.png"
                });
            });
        } else {
            this.props.Appstore.setMessage({
                text: "收藏夹名字必须为1-8个字符",
                is: false
            });
        }
    }

    animationiteration(e) {
        e.stopPropagation();
        this.refc.current.style.animationPlayState = "paused"; //停止
    }
    animationend(e) {
        e.stopPropagation();
        this.props.Appstore.setState("modal", { open: null });
    }
    continues(e) {
        e.stopPropagation();
        ajax.removeFile({ url: this.state.image, folder: "collect" }).finally(() => {
            this.refc.current.parentElement.style.opacity = 0;
            this.refc.current.style.animationPlayState = "running";
        });
    }

    scroll(e) {
        e.stopPropagation();
        if (this.time !== null) {
            window.clearTimeout(this.time);
            this.time = null;
        }
        this.time = window.setTimeout(() => {
            const scrollTop = Math.round(document.documentElement.scrollTop);
            const scrollHeight = scrollTop + window.innerHeight; 
            if (scrollHeight >= document.documentElement.scrollHeight - 50) {

                const { collect, page } = this.state;

                ajax.getCollectList(page).then((data) => {
                    const arr = collect.concat(data.collect);

                    if (data.collect.length > 0)
                        this.setState({ collect: arr, page: page + 1 });

                    window.clearTimeout(this.time);
                    this.time = null;
                });
            }
        }, 100);
    }

    render() {
        if (this.state.loading) return null;
        const { is_create, image, name, collect } = this.state;
        return (
            <div className="animation_opacity">
                <div className="animation_backdrop" />
                <div
                    className="collect"
                    ref={this.refc}
                    onAnimationIteration={this.animationiteration}
                    onAnimationEnd={this.animationend}>
                    <CollectTitle is_create={is_create} continues={this.continues} />
                    {is_create ? (
                        <CollectCreate
                            image={image}
                            refx={this.refx}
                            name={name}
                            openFile={this.openFile}
                            changeFile={this.changeFile}
                            change={this.change}
                        />
                    ) : (
                        <CollectList
                            posts_id={this.props.posts_id}
                            collect={collect}
                            collectArticle={this.collectArticle}
                            scroll={this.scroll}
                        />
                    )}
                    <CollectSwitch switchs={this.switchs} is_create={is_create} />
                </div>
            </div>
        );
    }
    componentDidMount() {
        ajax.getCollectList(1)
            .then(({ collect }) => {
                this.setState({
                    collect: collect,
                    page: this.state.page + 1,
                    loading: false
                });
            })
            .catch(() => {
                this.props.Appstore.setState("modal", { open: null });
            });
    }
}
