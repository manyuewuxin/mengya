import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import xss from "xss"; //过滤xss
import PropTypes from "prop-types";
import { app as ajax } from "@request";

import CommentHeader from "./Header";
import CommentList from "./List";
import CommentTextarea from "./Textarea";
import CommentPage from "../Page";
import CommentRmoeve from "../Modal/remove";
import Loading from "./Loading";

@inject("Appstore")
@observer
export default class Comment extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        posts_id: PropTypes.string,
        author_id: PropTypes.string,
        p_index: PropTypes.number
    };
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            loading: true,
            count: 0,
            page: 0, //评论页数
            sort: 1, //-1是正序
            currentPage: 1,
            remove: null,
            visibility: false
        };
        this.setReversed = this.setReversed.bind(this);
        this.create = this.create.bind(this);
        this.setPage = this.setPage.bind(this);
        this.action = this.action.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.offRemove = this.offRemove.bind(this);
        this.refx = React.createRef();
        this.refc = React.createRef();
        this.accept_user_id = null;
        this.index = null;
    }

    getComment(posts_id, currentPage, sort) {
        ajax.getComment(posts_id, currentPage, sort).then(({ comment, count, page }) => {
            const timeID = window.setTimeout(() => {
                this.setState({
                    comments: comment,
                    loading: false,
                    currentPage,
                    count,
                    page,
                    sort
                });
                window.clearTimeout(timeID);
            }, 500);
        });
    }

    reply(e) {
        e.stopPropagation();
        const index = Number(e.target.dataset.index);
        const { comments } = this.state;
        const author = comments[index].author;
        this.accept_user_id = author[0]._id;
        this.refx.current.placeholder = `回复${author[0].name}:`;
        this.refx.current.focus();
        //const height = window.innerHeight/2;

        window.scroll(0, this.refx.current.parentElement.offsetTop - 300);
    }

    setReversed(e) {
        e.stopPropagation();
        const sort = this.state.sort === -1 ? 1 : -1;
        this.setState({ loading: true });
        this.getComment(this.props.posts_id, this.state.currentPage, sort);
    }

    setPage(page) {
        //跳到某页评论
        if (typeof page == "number") {
            window.scroll(0, this.refc.current.offsetTop - 50);
            this.setState({ loading: true });
            this.getComment(this.props.posts_id, page, this.state.sort);
        }
    }

    good(e) {
        //点赞评论
        e.stopPropagation();

        const index = Number(e.target.dataset.index);
        const { comments } = this.state;

        const comment_id = comments[index].comment.comment_id;
        const author = comments[index].author;
        const good = comments[index].comment.good;

        const posts_id = this.props.posts_id;

        if (this.props.Appstore.id !== author[0]._id) {
            const good_index = good.indexOf(this.props.Appstore.id);
            const action = good_index === -1 ? "add" : "remove";

            ajax.good({ comment_id, posts_id, action }).then(() => {
                good_index === -1
                    ? comments[index].comment.good.push(this.props.Appstore.id)
                    : comments[index].comment.good.splice(good_index, 1);
                this.setState({ comments });
            });
        } else {
            this.props.Appstore.setMessage({ text: "你不能点赞自己的评论", is: false });
        }
    }

    create(value) {
        if (/^.{1,300}$/.test(value)) {
            const text = xss(value);
            const user =
                this.accept_user_id !== null
                    ? [this.props.Appstore.id, this.accept_user_id]
                    : [this.props.Appstore.id];
            const { posts_id, author_id } = this.props;

            ajax.createComment({ posts_id, author_id, user, text }).then(
                ({ comment }) => {
                    const { comments, count } = this.state;
                    comments.push(comment);
                    this.setState({ comments: comments, count: count + 1 });
                    this.props.Appstore.comment_count("add", this.props.p_index);
                    this.props.Appstore.setMessage({ text: "发表评论成功", is: true });
                }
            );
        } else {
            this.props.Appstore.setMessage({
                text: "评论内容限制在1-300个字节内",
                is: false
            });
        }
    }

    onRemove() {
        const { comments, currentPage, sort, count } = this.state;

        const { posts_id, author_id } = this.props;
        const comment_id = comments[this.index].comment.comment_id;
        const user = comments[this.index].comment.user;

        if (user[0] === this.props.Appstore.id) {
            ajax.removeComment({ comment_id, posts_id, author_id, user }).then(() => {
                if(comments.length-1 > 0){
                    comments.splice(this.index, 1);
                    this.props.Appstore.comment_count("remove", this.props.p_index);
                    this.setState({
                        comments: comments,
                        count: count - 1,
                        visibility: false,
                        description: null
                    });
                }
                else{
                    const pages = currentPage - 1 > 0 ? currentPage-1 : 1;
                    this.props.Appstore.comment_count("remove", this.props.p_index);
                    this.setState({ visibility: false, description: null });
                    this.getComment(posts_id, pages, sort);
                }
            });
        }
    }

    offRemove() {
        this.index = null;
        this.setState({ visibility: false, description: null });
    }

    remove(e) {
        e.stopPropagation();
        this.index = Number(e.target.dataset.index);
        this.setState({
            visibility: true,
            description: { title: "你确定要删除这条评论吗？" }
        });
    }

    action(e) {
        e.stopPropagation();
        if (e.target.dataset.action) {
            switch (e.target.dataset.action) {
                case "reply":
                    this.reply(e);
                    break;

                case "good":
                    this.good(e);
                    break;

                case "remove":
                    this.remove(e);
                    break;
            }
        }
    }
    render() {
        const {
            sort,
            comments,
            loading,
            count,
            page,
            visibility,
            description,
            currentPage
        } = this.state;
        return (
            <React.Fragment key="fesd">
                <div className="comment" ref={this.refc}>
                    <CommentHeader sort={sort} count={count} setReversed={this.setReversed}/>
                    {loading ? <Loading /> : <CommentList comments={comments} user_id={this.props.Appstore.id} action={this.action}/>}
                    <CommentPage
                        ulStyle="comment_page"
                        currentStyle="current_page"
                        count={page}
                        setPage={this.setPage}
                        currentPage={currentPage}
                    />
                    <CommentTextarea refx={this.refx} create={this.create} />
                </div>
                <CommentRmoeve
                    visibility={visibility}
                    description={description}
                    onRemove={this.onRemove}
                    offRemove={this.offRemove}
                />
            </React.Fragment>
        );
    }
    componentDidMount() {
        this.getComment(this.props.posts_id, 1, 1);
    }
}
//
