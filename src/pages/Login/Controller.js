import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { app as ajax } from "@request";

import Login from "./Login";
import Register from "./Register";
import Submit from "./Submit";

@inject("Appstore")
@observer
export default class Index extends Component {
    static propTypes = {
        pathname: PropTypes.string,
        type: PropTypes.string,
        Appstore: PropTypes.object,
        history: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            passwords: "",
            error: null,
            captcha: 0 //验证码
        };

        this.login = this.login.bind(this); //提交事件
        this.switchLogin = this.switchLogin.bind(this);
        this.close = this.close.bind(this);
        this.change = this.change.bind(this);
        this.keyup = this.keyup.bind(this);

        //this.change=this.change.bind(this);
        //this.blur = this.blur.bind(this); //失去焦点
        //this.focus = this.focus.bind(this); //获得焦点

        this.messages = {
            name: "用户名必须为2-8个非符号字符",
            email: "邮箱格式错误",
            password: "密码必须为6个以上字母数字符号",
            passwords: "前后两次密码不一致"
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.pathname !== this.props.pathname || nextState !== this.state; //route 登录和注册共享一份组件强制更新
    }

    test(key, value) {
        switch (key) {
            case "name":
                return /^[a-zA-Z0-9\u4e00-\u9fa5]{2,8}$/.test(value);

            case "email":
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    value
                );

            case "password":
                return /^[a-zA-Z0-9]{6,15}$/.test(value);

            case "passwords":
                return this.state.password === value && /^[a-zA-Z0-9]{6,15}$/.test(value);
        }
    }

    change(e) {
        e.stopPropagation();
        const name = e.target.name;
        this.setState({ [name]: e.target.value, error: null });
    }

    keyup(e) {
        e.stopPropagation();
        if (e.key === "Enter") this.login();
    }

    verify({ error, captcha, ...filds }) {
        const { pathname } = this.props;
        const data = {};

        if (pathname === "/signup") {
            for (let key in filds) {
                if (this.test(key, filds[key]) === false) {
                    return Promise.reject({ err: this.messages[key] });
                } else if (key !== "passwords") {
                    data[key] = filds[key];
                }
            }
        } else if (pathname === "/signin") {
            data.key = this.test("name", filds.name) ? "name" : "email"; //不验证对不对
            data.value = filds.name;
            data.password = filds.password;
        }

        return Promise.resolve(data);
    }

    login() {
        this.verify(this.state)
            .then((data) => {
                return ajax.login(this.props.pathname, data);
            })
            .then(() => {
                if (this.props.type === "click") {
                    this.props.Appstore.login(null);
                    this.props.Appstore.getUser(1);
                } else {
                    this.props.history.push("/");
                }
            })
            .catch(({ err }) => {
                console.log(err);
                this.setState({
                    error: err || "请求错误",
                    captcha: this.state.captcha + 1
                });
            });
    }

    switchLogin(e) {
        e.stopPropagation();

        if (this.props.type === "click") {
            this.props.Appstore.login(e.target.dataset.path);
        } else if (this.props.type === "path") {
            this.props.history.push(e.target.dataset.path);
        }
    }

    close(e) {
        e.stopPropagation();
        if (this.props.type === "click") {
            this.props.Appstore.login(null);
        } else if (this.props.type === "path") {
            this.props.history.replace("/");
        }
    }
    render() {
        if (this.props.Appstore.id !== null) {
            return <Redirect to="/" />;
        }
        const { pathname, type } = this.props;

        return (
            <div className={type === "click" ? "sign s_click" : "sign s_path"}>
                <div className="signin_signup">
                    <div className="close">
                        <span className="icon_close" onClick={this.close} />
                    </div>
                    <div className="padding">
                        <div className="links">
                            <span
                                className={pathname === "/signin" ? "is_link" : ""}
                                data-path="/signin"
                                onClick={this.switchLogin}>
                                登录
                            </span>
                            <i>·</i>
                            <span
                                className={pathname === "/signup" ? "is_link" : ""}
                                data-path="/signup"
                                onClick={this.switchLogin}>
                                注册
                            </span>
                        </div>
                        <div className="error">{this.state.error}</div>
                        {pathname === "/signin" ? (
                            <Login
                                keyup={this.keyup}
                                change={this.change}
                                state={this.state}
                            />
                        ) : (
                            <Register
                                keyup={this.keyup}
                                change={this.change}
                                state={this.state}
                            />
                        )}
                        <Submit
                            pathname={pathname}
                            captcha={this.state.captcha}
                            login={this.login}
                            keyup={this.keyup}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
