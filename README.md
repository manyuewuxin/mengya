# mengya
一个类知乎文章方面的应用项目，主要由react，mobx，react-router，axios，wangeditor，node.js，mongodb等编写

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

## 关联项目
后端：[node-mengya](https://github.com/manyuewuxin/node-mengya)

后台管理系统：[manage](https://github.com/manyuewuxin/manage)

## 项目布局
```
.
├── build                                   // webpack配置文件
├── config                                  // 项目打包路径
├── dist                                    // 打包目录
├── screenshots                             // 项目截图
├── src                                     // 源码目录
│   ├── assets
│   │   ├── css                             // css样式文件
│   │   ├── font                            // font字体文件
│   │   └── img                             // 公共图片文件
│   ├── components                          // 公共组件
│   │   ├── Author                          // 作者模态框组件
│   │   ├── Collect                         // 收藏夹模态框组件
│   │   ├── Header                          // 页面头部组件
│   │   ├── Label                           // 标签模态框
│   │   ├── Modal                           // 模态框接口
│   │   ├── Events                          // 统一文章列表整个click和mouseover事件的高阶组件
│   │   ├── Forward                         // 转发
│   │   └── Page                            // 分页组件
│   ├── pages                                   
│   │   ├── Article                         // 单独一篇文章
│   │   ├── Collect                         // 收藏文章列表展示
│   │   ├── Editor                          // 编写文章
│   │   ├── People                          // 用户个人主页
│   │   ├── Posts                           // 文章列表展示
│   │   ├── Setter                          // 用户设置个人资料
│   │   ├── Login                            // 登录注册
│   │   ├── Subscr                          // 所有标签
│   │   ├── App.js                         
│   │   └── router.js                           
│   ├── store                               // mobx状态管理
│   │   ├── index.js                        // 调出接口    
│   │   ├── Appstore.js                       
│   │   ├── Editorstore.js                                  
│   │   ├── Peoplestore.js                       
│   │   └── Setterstore.js                       
│   ├── request                             // 统一请求处理
│   ├── template                            // webpack打包HTML模板文件
│   ├── utils                               // 常用方法
│   └── index.js                            // 入口
├── .babelrc                                // babel配置
├── .eslintignore                           // eslint忽略配置
├── .eslintrc.json                          // eslint配置
├── .gitignore                              // git忽略配置
└── package.json                            // npm
.

```

## 部分截图

![](./screenshots/home.gif)

![](./screenshots/user.gif)
