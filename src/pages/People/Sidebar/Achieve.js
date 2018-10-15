import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
export default class Create extends Component {
    static propTypes = {
        create_p_count: PropTypes.number,
        collect: PropTypes.number,
        like: PropTypes.number
    };
    render() {
        const { create_p_count, collect, like } = this.props;
        return (
            <div className="sidebar">
                <h3 className="h3_title">个人成就</h3>
                <div className="people_achievement">
                    <p>
                        <i className="icon_writes" />
                        {`创建${create_p_count}篇文章`}
                    </p>
                    <p>
                        <i className="icon_like" />
                        {`获得${like}喜欢，${collect}个收藏`}
                    </p>
                </div>
            </div>
        );
    }
}
