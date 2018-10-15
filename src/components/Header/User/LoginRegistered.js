import React from "react";
import { Link } from "react-router-dom";
export default function Loginbutton() {
    return (
        <div className="login_registered">
            <Link to="/signin">
                <i className="icon_login" />
                登录
            </Link>
            <Link to="/signup">
                注册
            </Link>
        </div>
    );
}
