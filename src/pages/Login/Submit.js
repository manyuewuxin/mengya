import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
    static propTypes = {
        captcha: PropTypes.number,
        login: PropTypes.func,
        pathname: PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            captcha: 0,
            error: null
        };
        this.send = this.send.bind(this);
        this.change = this.change.bind(this);
        this.keyup = this.keyup.bind(this);
        this.captcha = null;
    }

    send(e) {
        e.stopPropagation();
        if (this.props.captcha > 0) {
            if (this.captcha === this.state.value) {
                this.props.login();
            } else {
                this.setState({ captcha: this.state.captcha + 1, error: "验证码错误" });
            }
        } else {
            this.props.login();
        }
    }
    change(e) {
        e.stopPropagation();
        this.setState({ value: e.target.value });
        if (e.target.value === this.captcha) this.setState({ error: null });
    }
    createCaptcha() {
        const canvas = document.querySelector("#canvas"); //获取画布
        this.captcha = Math.random()
            .toString(36)
            .substring(2, 6); //随机生成四个字符串，或者for随机一个
        if (canvas) {
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 70, 32); //擦除画布
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, 70, 27);
            ctx.font = "23px arial";
            ctx.textAlign = "left";
            // 创建渐变
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // 用渐变填色
            ctx.strokeStyle = gradient;
            ctx.strokeText(this.captcha, 10, 23); //画布上添加验证码
        }
    }
    keyup(e) {
        e.stopPropagation();
        if (e.key === "Enter") this.send(e);
    }
    render() {
        const { value, error } = this.state;
        return (
            <div>
                {this.props.captcha > 0 ? (
                    <div>
                        <input
                            className="sign_captcha"
                            type="text"
                            maxLength="4"
                            placeholder="验证码"
                            value={value}
                            onChange={this.change}
                            onKeyUp={this.keyup}
                        />
                        <canvas
                            id="canvas"
                            width="70"
                            height="32"
                            style={{
                                transform: "translateY(11.7px)",
                                border: "1px solid #c8c8c8",
                                margin: "0 5px"
                            }}
                        />
                        <span className="error">{error}</span>
                    </div>
                ) : null}
                <button
                    className={
                        this.props.pathname === "/signin"
                            ? "signin_submit"
                            : "signup_submit"
                    }
                    onClick={this.send}>
                    {this.props.pathname === "/signin" ? "登录" : "注册"}
                </button>
            </div>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.captcha !== prevProps.captcha ||
            this.state.captcha !== prevState.captcha
        ) {
            this.createCaptcha();
        }
    }
}
