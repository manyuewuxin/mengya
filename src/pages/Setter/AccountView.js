import React, { Component } from "react";
import PropTypes from "prop-types";

import { observer } from "mobx-react";

@observer
export default class AccountView extends Component {
    static propTypes = {
        changefile: PropTypes.func,
        openfile: PropTypes.func,
        change: PropTypes.func,
        refx: PropTypes.object,
        form: PropTypes.object
    };
    render() {
        const { avatar, name, carrer, company, information, userlike } = this.props.form;
        return (
            <form autoComplete="off" onChange={this.props.change}>
                <ul>
                    <li className="setter_avatar">
                        <div>头像</div>
                        <div>
                            <img src={avatar} />
                        </div>
                        <div>
                            <p>支持jpg、jpeg、png格式</p>
                            <button type="button" onClick={this.props.openfile}>
                                上传图片
                            </button>
                            <input
                                type="file"
                                name="avatar"
                                style={{ display: "none" }}
                                onChange={this.props.changefile}
                                ref={this.props.refx}
                                accept="image/*"
                            />
                        </div>
                    </li>

                    <li>
                        <div>用户名</div>
                        <div className="input_width">
                            <input
                                type="text"
                                name="name"
                                placeholder="填写你的用户名，注意用户名必须是唯一的"
                                maxLength="8"
                                value={name}
                            />
                        </div>
                    </li>
                    <li>
                        <div>职位</div>
                        <div>
                            <input
                                type="text"
                                placeholder="填写你的职位"
                                name="carrer"
                                maxLength="100"
                                value={carrer}
                            />
                        </div>
                    </li>
                    <li>
                        <div>公司</div>
                        <div>
                            <input
                                type="text"
                                placeholder="填写你的公司"
                                name="company"
                                maxLength="100"
                                value={company}
                            />
                        </div>
                    </li>
                    <li>
                        <div>个人介绍</div>
                        <div>
                            <input
                                type="text"
                                placeholder="填写你的个性签名"
                                name="information"
                                maxLength="100"
                                value={information}
                            />
                        </div>
                    </li>
                    <li>
                        <div>个人主页</div>
                        <div>
                            <input
                                type="text"
                                placeholder="填写你的个人主页"
                                name="userlike"
                                maxLength="100"
                                value={userlike}
                            />
                        </div>
                    </li>
                </ul>
            </form>
        );
    }
}
