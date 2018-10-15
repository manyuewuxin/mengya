# mengya
一个类知乎文章方面的应用项目，主要由react，mobx，react-router，axios，node.js，mongodb等编写

## 实现功能
- [x] 登录注册
- [x] 创建文章
- [x] 关注标签
- [x] 文章过滤
- [x] 文章排序
- [x] 用户设置
- [x] 用户消息
- [x] 用户动态
- [x] 关注用户
- [x] 收藏文章
- [x] 评论文章
- [x] 个人主页
- [x] 后台管理系统等

## 注意事项
本项目是在pc端最新版chrome浏览器开发测试，且使用纯CSS3原生开发没有使用任何UI组件库和预编译器，除了后台管理系统是使用蚂蚁金服的antd UI组件开发，在其他pc端浏览器、移动端浏览器和旧版本浏览器运行可能会出现页面布局、样式怪异行为，所以请使用最新版pc端chrome浏览器运行测试

## 安装
在运行前端项目前请先安装后端项目[node-mengya](https://github.com/manyuewuxin/node-mengya)
，由于build没有配置过复杂的各种环境打包开发测试，需要后端的mongodb支持，不然打开浏览器运行前端项目没有数据响应会报错

    git clone https://github.com/manyuewuxin/mengya.git
    cd mengya
    npm install
    npm run build
    npm run dev 
    访问: http://localhost:3000

## 项目布局

    |-- [build]                   // webpack构建
    |-- [config]                  // 配置
    |-- [public]                  // 打包输出静态目录
    |-- [src]                     // 应用            
    |-- .babelrc                  // babel配置
    |-- .eslintignore             // eslint忽略配置
    |-- .eslintrc.json            // eslint规则配置
    |-- .gitignore                // git忽略配置
    |-- .nodemonrc                // nodemon配置
    |-- package.json              // npm

## 部分截图

![](./screenshots/home.gif)

![](./screenshots/user.gif)
