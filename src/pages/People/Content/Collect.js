import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import utils from "@utils";
import Remove from "@components/Modal/remove";

@inject("Appstore", "Peoplestore")
@observer
export default class Collect extends Component {
    static propTypes = {
        match: PropTypes.object,
        Appstore: PropTypes.object,
        Peoplestore: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.is_myhome = false;
    }

    remove(e) {
        e.stopPropagation(); //禁止冒泡
        this.props.Peoplestore.remove_collect(Number(e.target.dataset.index));
    }

    render() {
        this.is_myhome =
            this.props.Appstore.id === this.props.match.params.id ? true : false; //追踪
        const { people, visibility, description } = this.props.Peoplestore;
        const list = people.map((collect, index) => {
            const dt = utils.format(collect.date);
            return (
                <li
                    className="people_collect_list"
                    key={Math.random()
                        .toString(36)
                        .substring(2, 6)}>
                    <div>
                        <img src={collect.image} />
                    </div>
                    <div>
                        <p>{collect.name}</p>
                        <p className="information_text">{`${dt.date} 创建 · 收藏 ${
                            collect.collect_count
                        } 篇文章`}</p>
                    </div>
                    <div>
                        <Link to={`/collect/${collect._id}`}>查看</Link>
                        {this.is_myhome ? (
                            <a onClick={this.remove} data-index={index}>
                                删除
                            </a>
                        ) : null}
                    </div>
                </li>
            );
        });
        return (
            <React.Fragment>
                <ul className="people_padding">{list}</ul>
                <Remove
                    visibility={visibility}
                    description={description}
                    onRemove={this.props.Peoplestore.ok_removeCollect}
                    offRemove={this.props.Peoplestore.no_remove}
                />
            </React.Fragment>
        );
    }
}
