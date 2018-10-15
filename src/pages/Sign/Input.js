/*
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Signinput extends Component {
    static propTypes = {
        blur: PropTypes.func,
        focus: PropTypes.func,
        pathname: PropTypes.string,
        state: PropTypes.object,
        change: PropTypes.func
    };
    render() {

        const sign = {
            "/signup": [
                {
                    type: "text",
                    id: "name",
                    placeholder: "你的呢称",
                    maxLength: 20,
                    className: "icon_username",

                },
                {
                    type: "email",
                    id: "email",
                    placeholder: "联系邮箱",
                    maxLength: 20,
                    className: "icon_email",

                },
                {
                    type: "password",
                    id: "password",
                    placeholder: "密码",
                    maxLength: 15,
                    className: "icon_password",
   
                },
                {
                    type: "password",
                    id: "passwords",
                    placeholder: "确认密码",
                    maxLength: 15,
                    className: "icon_password",

                }
            ],
            "/signin": [
                {
                    type: "text",
                    id: "name",
                    placeholder: "你的呢称",
                    maxLength: 20,
                    className: "icon_username",

                },
                {
                    type: "password",
                    id: "password",
                    placeholder: "密码",
                    maxLength: 15,
                    className: "icon_password",

                }
            ]
        };
        const arr = sign[this.props.pathname];
        const list = arr.map((input) => {
            return (
                <li key={Math.random().toString(36).substring(2, 6)} id={input.id}>
                    <i className={input.className} />
                    <input
                        type={input.type}
                        name={input.id}
                        placeholder={input.placeholder}
                        maxLength={input.maxLength}
                        value = {this.props.state[input.id]}
                        onChange={this.props.change}
                    />
                </li>
            );
        });

        return (
            <form className="sign_input" autoComplete="off">
                <ul>{list}</ul>
            </form>
        );
    }
}

onBlur={this.props.blur}
onFocus={this.props.focus

    message(target) {
        if (this.state.opacity == 0) {
            var top = target.offsetTop;
            var left = target.offsetLeft + target.clientWidth + 7;
            this.top = `${top}px`;
            this.left = `${left}px`;
            this.setState({ error: target.error || this.messages[target.id], opacity: 1 });
        } else if (this.state.send) {
            this.setState({ send: false });
        }
    }

    focus(e) { //获取光标
        e.stopPropagation();
        if (this.state.error !== null && this._name === e.target.name) { //获取光标是否为上一次出错表单
            this._name = null;
            this.setState({ error: null, opacity: 0 });
        }
        if(this.state.aberrant !== null) this.setState({ aberrant: null })
    }

    blur(e) { //失去光标
        e.stopPropagation();
        if (e.target.name) {
            if (this.test(e.target) === false) {
                if(this._name===null) this._name = e.target.name;
                this.message(e.target.parentElement);
            } else if (e.target.name === "name" || e.target.name === "email" && this.props.pathname === "/signup") {

                const { name } = e.target;

                const error = name === "name" ? "该用户已注册" : "该邮箱已注册";

                const { offsetTop, offsetLeft, id, clientWidth } = e.target.parentElement;

                const value = e.target.value;

                ajax.getUID(id, value).then(({ query }) => {
                    if(query){ 
                        if(this._name===null) this._name = name;
                        this.message({ offsetLeft, offsetTop, id, error, clientWidth });
                    }
                });
            }
        }
    }
       blur={this.blur} focus={this.focus}              
       <div
                        style={{
                            position: "absolute",
                            top: this.top,
                            left: this.left,
                            opacity: this.state.opacity
                        }}>
                        <p className="sign_errortext">{this.state.error}</p>
                    </div>

        for (var input of elements) {
            if (this.test(input) === false) {
                return Promise.reject({ e:input.parentElement });
            }
            if (input.name !== "passwords") data[input.name] = input.value;
        }
  
*/