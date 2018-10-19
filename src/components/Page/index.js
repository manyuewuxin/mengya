import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

@withRouter
export default class Page extends Component {
    static propTypes = {
        ulStyle: PropTypes.string.isRequired,
        currentStyle: PropTypes.string.isRequired,
        setPage: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        count: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        history: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
        this.replace = this.replace.bind(this); //跳转任意页
        this.go = this.go.bind(this); //下一页
        this.back = this.back.bind(this); //上一页

        this.arr = [];
        this.list = [];
        this.init(1, props.count);
        this.build(1, props.count);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.setPage !== this.props.setPage) {
            this.setState({ page: 1 });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.count !== nextProps.count || this.state.page !== nextState.count
        );
    }
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextProps.count !== this.props.count) {
            this.arr = [];
            this.init(nextProps.currentPage, nextProps.count);
            this.build(nextProps.currentPage, nextProps.count); //在render抽离出来
        }
        else{
            this.build(nextState.page, nextProps.count); //在render抽离出来
        }
    }

    setPage(page) {
        //调用传递参数
        if (typeof this.props.setPage === "function") {
            this.props.setPage(page);
        } else if (typeof this.props.setPage === "string") {
            window.scroll(0, 0);
            this.props.history.push(`${this.props.setPage}page=${page}`);
        }
    }

    init(start, count) {
        //当前页，父组件传递最大页数
        const length = start + 5;

        for (var index = start, i = 0; index < length; i++, index++) {
            if (index <= count) {
                this.arr[i] = index;
            } else {
                break;
            }
        }
    }

    setList(index, page) {
        //点击的索引，点击的页数
        const { count } = this.props;
        if (page < 5) {
            this.init(1, count);
        } else if (index === this.arr.length - 1) {
            for (let n = 1; n < 3; n++) {
                if (page + n < count + 1) {
                    this.arr.splice(0, 1);
                    this.arr.push(page + n);
                } else {
                    break;
                }
            }
        } else if (index === 0) {
            for (let n = 1; n < 3; n++) {
                if (page - n > 0) {
                    this.arr.splice(this.arr.length - 1, 1);
                    this.arr.unshift(page - n);
                } else {
                    break;
                }
            }
        } else if (page > count - 5) {
            this.init(count - 4, count);
        }
    }

    replace(e) {
        e.stopPropagation();
        const page = Number(e.target.dataset.page);
        const index = Number(e.target.dataset.index);
        if (page !== this.state.page) {
            this.setList(index, page);
            this.setPage(page);
            this.setState({ page: page });
        }
    }

    go(e) {
        //下一页
        e.stopPropagation();
        if (this.state.page + 1 <= this.props.count) {
            this.setList(this.arr.indexOf(this.state.page + 1), this.state.page + 1);
            this.setPage(this.state.page + 1);
            this.setState({ page: this.state.page + 1 });
        }
    }

    back(e) {
        //上一页
        e.stopPropagation();
        if (this.state.page - 1 > 0) {
            this.setList(this.arr.indexOf(this.state.page - 1), this.state.page - 1);
            this.setPage(this.state.page - 1);
            this.setState({ page: this.state.page - 1 });
        }
    }

    build(page, count) {
        //开始构建
        const style = this.props.currentStyle || "";
        this.list = this.arr.map((listpage, index) => {
            //列表
            const key = Math.random()
                .toString(36)
                .substring(2, 6);
            return (
                <li
                    key={key}
                    data-index={index}
                    data-page={listpage}
                    className={page === listpage ? style : ""}
                    onClick={this.replace}>
                    {listpage}
                </li>
            );
        });

        if (page >= 5) {
            this.list.unshift(
                <React.Fragment
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <li
                        key={Math.random()
                            .toString(36)
                            .substring(2, 6)}
                        className={page === 1 ? style : ""}
                        data-page={1}
                        onClick={this.replace}>
                        {1}
                    </li>
                    <li
                        className="current_page"
                        key={Math.random()
                            .toString(36)
                            .substring(2, 6)}>
                        ...
                    </li>
                </React.Fragment>
            );
        }

        if (page !== 1) {
            //上一页按钮
            this.list.unshift(
                <li
                    onClick={this.back}
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    上一页
                </li>
            );
        }

        if (page <= count - 4 && count > 5) {
            this.list.push(
                <React.Fragment
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <li
                        className="current_page"
                        key={Math.random()
                            .toString(36)
                            .substring(2, 6)}>
                        ...
                    </li>
                    <li
                        key={Math.random()
                            .toString(36)
                            .substring(2, 6)}
                        className={page === count ? style : ""}
                        data-page={count}
                        onClick={this.replace}>
                        {count}
                    </li>
                </React.Fragment>
            );
        }

        if (page !== count) {
            //下一页按钮
            this.list.push(
                <li
                    onClick={this.go}
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    下一页
                </li>
            );
        }
    }
    render() {
        if (this.props.count > 0) {
            const { ulStyle } = this.props;
            return <ul className={ulStyle || "comment_page"}>{this.list}</ul>;
        }
        return null;
    }
}
