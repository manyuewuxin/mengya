import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import ArticleEvent from "@components/Events";
import List from "../Posts/List";
import Sidebar from "./Sidebar";

import utils from "@utils";
import Page from "@components/Page";
 
@inject("Appstore")
@ArticleEvent
@observer
export default class Index extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.location.search !== nextProps.location.search) {
            this.props.Appstore.setState("app", { update: true });
        }
    }

    render() {
        if (this.props.Appstore.app.collect_loading) return null;
        const {
            posts,
            page,
            collect_user,
            collect_update_date
        } = this.props.Appstore.app;
        return (
            <div className="posts">
                <div className="posts_left">
                    <List posts={posts} is_my_people={false}/>
                    <Page
                        currentStyle="posts_ispage"
                        ulStyle="page"
                        count={page}
                        setPage={`${this.props.location.pathname}?`}
                    />
                </div>
                <Sidebar user={collect_user} date={collect_update_date} />
            </div>
        );
    }
    componentDidMount() {
        this.props.Appstore.getCollectPosts(this.props.match.params.id, 1);
    }
    componentDidUpdate() {
        if (this.props.Appstore.app.update) {
            const search = utils.search(this.props.location.search.split("?")[1]);
            this.props.Appstore.getCollectPosts(
                this.props.match.params.id,
                Number(search.page)
            );
        }
    }
    componentWillUnmount() {
        this.props.Appstore.setState("app", {
            collect_loading: true,
            update: false,
            page: 1
        });
    }
}
 