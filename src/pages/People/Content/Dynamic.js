import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import utils from "@utils";

@inject("Peoplestore")
@observer
export default class Dynamic extends Component {
    static propTypes = {
        Peoplestore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.type = { like: "喜欢了文章", create: "创建了文章", collect: "收藏了文章" };
    }

    render() {
        const { people } = this.props.Peoplestore;
        const list = people.map((d) => {
            const dt = utils.format(d.dynamic.date);
            return (
                <li
                    className="people_dynamic"
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <div className="actions-type">
                        <p>{this.type[d.dynamic.dynamic_type]}</p>
                        <p>{`${dt.date} ${dt.time}`}</p>
                    </div>
                    <div className="people_posts">
                        <Link to={`/p/${d.posts[0]._id}`}>{d.posts[0].title}</Link>
                        {d.posts[0].image !== null ? (
                            <img src={d.posts[0].image} />
                        ) : null}
                    </div>
                </li>
            );
        });
        return <ul className="people_padding">{list}</ul>;
    }
}
