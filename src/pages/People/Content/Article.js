import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import utils from "@utils";

import List from "../../Posts/List";
import Events from "@components/Events";
import Remove from "@components/Modal/remove";

//注：这个组件是唯一的交叉store引用
@inject("Appstore", "Peoplestore")
@Events
@observer
export default class PeopleArticle extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        Peoplestore: PropTypes.object,
        match: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.action = this.action.bind(this);
    }
    action(e) {
        if (e.target.dataset.remove) {
            e.stopPropagation(); //如果不是，那就继续向上冒泡
            this.props.Peoplestore.remove_article(Number(e.target.dataset.index));
        } 
        else if (e.target.dataset.editor) {
            e.stopPropagation();
            const index = Number(e.target.dataset.index);
            const { posts } = this.props.Appstore;
            this.props.history.push(`/write#${posts[index]._id}`);
        }
    }

    render() {
        const is_my_people =
            this.props.Appstore.id === this.props.match.params.id ? true : false;
        const { visibility, description } = this.props.Peoplestore;
        return (
            <React.Fragment>
                <div className="people_article" onClick={this.action}>
                    <List posts={this.props.Appstore.posts} is_my_people={is_my_people} />
                </div>
                <Remove
                    visibility={visibility}
                    description={description}
                    onRemove={this.props.Peoplestore.ok_removeArticle}
                    offRemove={this.props.Peoplestore.no_remove}
                />
            </React.Fragment>
        );
    }
    componentWillUnmount() {
        this.props.Appstore.setState("app", {
            posts: [],
            read_article: [],
            read_comment: []
        });
    }
}
