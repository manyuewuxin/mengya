import axios from "axios";
import nprogress from "nprogress";
import appstore from "../store/Appstore"; 
 
const CancelToken=axios.CancelToken; //取消请求,'cancelToken':source.token，工厂返回每次只能一个cance
axios.interceptors.request.use(
    function(config) {
        nprogress.start();
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response) {
        nprogress.done();
        return response.data;
    },
    function(error) {
        nprogress.done();
        switch (error.response.status) {
            case 400:
                appstore.setMessage({ text: error.response.data.err, is: false });
                break;

            case 403:
                if(appstore.id !== null){
                    appstore.quit();
                    appstore.login("/signin", { text: "你的登录状态已到期，请重新登录", is: false });
                }
                else{
                    appstore.login("/signin", { text: "你还没有登录，请登录后在操作", is: false });
                }
                break;

            case 404:
                appstore.setState("app", { error: `找不到该资源` });
                break;

            case 408:
                nprogress.done();
                appstore.setMessage({ text: "请求超时", is: false });
                break;
        }
        return Promise.reject(error.response.data);
    }
);


const req = {
    get: (url, config = {}) => {
        return axios({
            url: url,
            method: "get",
            timeout: 50000,
            "X-Requested-With": "XMLHttpRequest",
            ...config
        });
    },
    post: (url, body, config = {}) => {
        return axios({
            url: url,
            method: "post",
            timeout: 50000,
            "X-Requested-With": "XMLHttpRequest",
            data: body,
            ...config
        });
    }
};

const app = {
    getPostsList: (type, page) => req.get(`/posts?${type}&page=${page}`),
    getArticle: (posts_id) => req.get(`/posts/p/${posts_id}`),
    getOrder: () => req.get("/posts/order"),
    getUser: () => req.get("/user"),
    getLabel: (type,page) => req.get(`/posts/label?${type}&page=${page}`),
    getMessage: (skip) => req.get(`/user/message?page=${skip}`),
    getAuthor: (user_id, is_home) => req.get(`/user/author?user_id=${user_id}&is_home=${is_home}`),
    getCollectList: (skip) => req.get(`/user/collect?page=${skip}`),
    getCollect: (collect_id, page) => req.get(`/user/collect/${collect_id}?page=${page}`),
    getComment: (posts_id, page, sort) => req.get(`/posts/comment?posts_id=${posts_id}&page=${page}&sort=${sort}`),

    updateCollect: (data) => req.post("/user/collect/update", data),
    createCollect: (data) => req.post("/user/collect/create", data),
    good: (data) => req.post("/posts/comment/good", data),
    createComment: (data) => req.post("/posts/comment/create", data),
    removeComment: (data) => req.post("/posts/comment/remove", data),
    updateMessage: () => req.post("/user/message"),
    login: (path, data) => req.post(`/user${path}`, data),
    signout: () => req.post("/user/signout"),
    like: (data) => req.post("/posts/like", data),
    following: (data) => req.post("/user/following", data),
    followtype: (data) => req.post("/user/followtype",data),

    uploadFile: (key,file) => {
        if (file.size < 2000000) {
            if(/^image\/|^audio\/|^video\//.test(file.type)){
                const formdata = new FormData();
                formdata.append(key, file);
                return req.post("/file/upload", formdata, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            else{
                appstore.setMessage({text:"你上传的文件不是图片或视频格式", is:false});
                return Promise.reject();
            }
        }
        else {
            appstore.setMessage({text:"请上传低于2M的图片或视频", is:false});
            return Promise.reject();
        }
    },
    removeFile: (data) => req.post("/file/remove",data)
};

const people = {
    getPeople: (pathname, user_id, page) => req.get(`/user/people/${pathname}?user_id=${user_id}&page=${page}`),
    removeArticle: (data) => req.post("/posts/remove", data),
    removeCollect: (data) => req.post("/user/collect/remove", data)
};

const setter = {
    setAccount: (data) => req.post("/user/account?method=profile", data),
    setPassword: (data) => req.post("/user/account?method=password", data)
};

const editor = {
    createArticle: (data) => req.post("/posts/create", data)
};

export { app, people, setter, editor, CancelToken };
